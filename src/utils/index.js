/* eslint-disable no-use-before-define */
import moment from 'moment';
import cloneDeep from 'lodash/cloneDeep';
import { pathToRegexp } from 'path-to-regexp';
import { message } from 'antd';
import { CMP_TYPES } from '../consts/cmpTypes';

export const isFunc = v => typeof v === 'function';
export const assert = (condition, msg) => {
  if (!condition) throw new Error(`[dashboard]${msg}`);
};
export const toThousands = num => {
  let number = (num || 0).toString();
  let result = '';

  while (number.length > 3) {
    result = `,${number.slice(-3)}${result}`;

    number = number.slice(0, number.length - 3);
  }

  if (number) {
    result = number + result;
  }
  return result;
};

export const timingFun = (func = () => {}, interval = 1, defaultCall = true) => {
  assert(isFunc(func), `${func} is not function`);
  const m = interval * 60 * 1000;
  if (defaultCall) func();
  const time = window.setInterval(() => {
    func();
  }, m);
  return time;
};

export const isChinese = str => {
  if (escape(str).indexOf('%u') < 0) return false;
  return true;
};

export const emoj2str = str => {
  return unescape(escape(str).replace(/%uD.{3}/g, ''));
};

export const handleText = str => {
  let res = emoj2str(str);
  if (isChinese(res)) {
    res = res.length > 4 ? `${res.slice(0, 6)}...` : res;
  } else {
    res = res.length > 7 ? `${res.slice(0, 7)}...` : res;
  }
  return res;
};

// echarts 获取相对字号
export const getFontSize = () => {
  const screenWidth = document.documentElement.offsetWidth;
  return (screenWidth * 12) / 1920;
};

// 获取最近14天日期
export const getDate = (date = new Date(), count = 14) => {
  let now = moment(date);
  let res = [];
  let len = count;
  while (len--) {
    res.unshift(now.format('MM-DD'));
    now = now.add(-1, 'day');
  }
  return res;
};

/**
 * Convert an array to a tree-structured array.
 * @param   {array}     array     The Array need to Converted.
 * @param   {string}    id        The alias of the unique ID of the object in the array.
 * @param   {string}    parentId       The alias of the parent ID of the object in the array.
 * @param   {string}    children  The alias of children of the object in the array.
 * @return  {array}    Return a tree-structured array.
 */
export function arrayToTree(array, id = 'id', parentId = 'parentId', children = 'children') {
  if (!Array.isArray(array)) {
    return [];
  }
  const result = [];
  const hash = {};
  const data = cloneDeep(array);

  data.forEach((item, index) => {
    hash[data[index][id]] = data[index];
  });

  data.forEach(item => {
    const hashParent = hash[item[parentId]];
    if (hashParent) {
      !hashParent[children] && (hashParent[children] = []);
      hashParent[children].push(item);
    } else {
      result.push(item);
    }
  });
  return result;
}

/**
 * In an array of objects, specify an object that traverses the objects whose parent ID matches.
 * @param   {array}     array     The Array need to Converted.
 * @param   {string}    current   Specify the object that needs to be queried.
 * @param   {string}    parentId  The alias of the parent ID of the object in the array.
 * @param   {string}    id        The alias of the unique ID of the object in the array.
 * @return  {array}    Return a key array.
 */
export function queryAncestors(array, current, parentId, id = 'id') {
  const result = [current];
  const hashMap = new Map();
  array.forEach(item => hashMap.set(item[id], item));

  const getPath = cur => {
    const currentParentId = hashMap.get(cur[id])[parentId];
    if (currentParentId >= 0) {
      result.push(hashMap.get(currentParentId));
      getPath(hashMap.get(currentParentId));
    }
  };

  getPath(current);
  return result;
}

/**
 * Whether the path matches the regexp if the language prefix is ignored, https://github.com/pillarjs/path-to-regexp.
 * @param   {string|regexp|array}     regexp     Specify a string, array of strings, or a regular expression.
 * @param   {string}                  pathname   Specify the pathname to match.
 * @return  {array|null}              Return the result of the match or null.
 */
export function pathMatchRegexp(regexp, pathname) {
  return pathToRegexp(regexp).exec(pathname);
}

/**
 * tree结构转化为数组
 * @param {*} treeObj
 * @param {*} idAttr
 * @param {*} parentAttr
 * @param {*} childrenAttr
 * @param {*} levelAttr
 */
export function treeToArray(
  treeObj,
  idAttr = 'id',
  parentAttr = 'parentId',
  childrenAttr = 'children',
  levelAttr = 'level',
) {
  function processChildren(obj, level) {
    if (!level) level = 1;
    let array = [];
    obj[childrenAttr] &&
      obj[childrenAttr].forEach(childObj => {
        array = array.concat(flattenChild(childObj, obj[idAttr], level + 1));
      });

    return array;
  }
  function flattenChild(childObj, parentId, level) {
    let array = [];

    let childCopy = Object.assign({}, childObj);
    childCopy[levelAttr] = level;
    childCopy[parentAttr] = parentId;
    delete childCopy[childrenAttr];
    array.push(childCopy);

    array = array.concat(processChildren(childObj, level));

    return array;
  }

  let result = flattenChild(treeObj, 0, 1);
  return result;
}

/**
 * 扁平化数组
 * @param {*} arr
 */
export function flatten(arr) {
  return arr.reduce((flat, toFlatten) => {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

/**
 * 接口处理结果
 * @param {*} res 接口返回的data
 * @param {*} text 操作
 * @param {*} cb 回调
 */
export const operateResult = (data, text = '操作', cb) => {
  const { code, msg } = data;
  if (code === 0) {
    message.success(`${text}成功`);
    cb && cb();
  } else {
    message.error(msg || 'Error');
  }
};

/**
 * 生成一个随机字符串 格式为日期YYYYMMDDHHmmss翻转+4位随机字符
 * @param {*} format
 */
export const generateName = (format = 'YYYYMMDDHHmm') => {
  const date = moment(new Date())
    .format(format)
    .split('')
    .reverse()
    .join('');

  return date + randomString(4);
};

/**
 * 生成随机字符串
 * @param {*} length
 * @param {*} chars
 */
export const randomString = (length = 4, chars = 'abcdefghijklmnopqrstuvwxyz') => {
  let result = '';
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

/**
 * 字节转换为MB
 * @param {*} size
 */
export const byteToMB = size => {
  if (Number.isNaN(size)) {
    return 0;
  }
  size = size / 1024 / 1024;
  return size.toFixed(2);
};

export const formatTime = UnixTime => {
  let date = new Date(UnixTime * 1000);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? `0${m}` : m;
  let d = date.getDate();
  d = d < 10 ? `0${d}` : d;
  let h = date.getHours();
  h = h < 10 ? `0${h}` : h;
  let minute = date.getMinutes();
  let second = date.getSeconds();
  minute = minute < 10 ? `0${minute}` : minute;
  second = second < 10 ? `0${second}` : second;
  return `${y}-${m}-${d} ${h}:${minute}:${second}`;
};

/**
 * 下载文件
 * @param {*} blob 文件blob对象
 * @param {*} fileName 保存的文件名
 * @param {*} type 文件类型，默认pdf
 */
export const downFile = (content, fileName, type = 'application/pdf') => {
  const buf = Buffer.from(content, 'binary');
  let blob = new Blob([buf], { type });
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, fileName);
  } else {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
  }
};

/**
 * 二进制流转为pdf
 * @param {*} content arrayBuffer
 */
export const bufferToPDF = content => {
  const buf = Buffer.from(content, 'binary');
  let blob = new Blob([buf], { type: 'application/pdf;charset-UTF-8' });
  return window.URL.createObjectURL(blob);
};

/**
 * 二进制流转为pdf
 * @param {*} date 时间字符串
 */
export const dateToTimesStamp = date => {
  return new Date(date).getTime();
};

export function getTimeDistance(type) {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === 'today') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [moment(now), moment(now.getTime() + (oneDay - 1000))];
  }

  if (type === 'week') {
    let day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }

    const beginTime = now.getTime() - day * oneDay;

    return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
  }

  if (type === 'month') {
    const year = now.getFullYear();
    const month = now.getMonth();
    const nextDate = moment(now).add(1, 'months');
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();

    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
    ];
  }

  if (type === 'year') {
    const year = now.getFullYear();

    return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
  }
}

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

export function getDateInFinancial(type) {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === 'today') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return {
      datePick: [moment(now), moment(now.getTime() + (oneDay - 1000))],
      value: [moment(now).valueOf(), moment(now.getTime() + (oneDay - 1000)).valueOf()],
    };
  }
  if (type === 'week') {
    let day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }

    const beginTime = now.getTime() - day * oneDay;

    return {
      datePick: [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))],
      value: [moment(beginTime).valueOf(), moment(beginTime + (7 * oneDay - 1000)).valueOf()],
    };
  }
  if (type === 'month') {
    const year = now.getFullYear();
    const month = now.getMonth();
    const nextDate = moment(now).add(1, 'months');
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();

    return {
      datePick: [
        moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
        moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
      ],
      value: [
        moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`).valueOf(),
        moment(
          moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000,
        ).valueOf(),
      ],
    };
  }
  if (type === 'year') {
    const year = now.getFullYear();

    return {
      datePick: [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)],
      value: [
        moment(`${year}-01-01 00:00:00`).valueOf(),
        moment(`${year}-12-31 23:59:59`).valueOf(),
      ],
    };
  }
}

export const exportExcel = (data, name = '导出数据') => {
  const url = window.URL.createObjectURL(
    new Blob([data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
    }),
  );
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${name}.xlsx`); // 需要指定文件格式。
  document.body.appendChild(link);
  link.click(); //点击事件
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

// 获取组件名称 （逻辑事件）
export const getCmpName = options => {
  const { componentType, appType } = options;
  let title = Object.keys(CMP_TYPES).map(item => {
    let cmpItem = CMP_TYPES[item];
    if (cmpItem.componentType === componentType && cmpItem.appType === appType) {
      return cmpItem.name;
    }
  });
  return title;
};

//  信息组件是否已经保存
export const setInfoCmpChangeStatus = (status = false) => {
  localStorage.setItem('isChangeInfoCmp', status);
};
