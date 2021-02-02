import moment from "moment";

export const getStorage = key => {
  return localStorage.getItem(key);
};
export const getCookie = name => {
  let arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  arr = document.cookie.match(reg);
  if (arr) return unescape(arr[2]);
  else return null;
};
export const setStorage = (key, value) => {
  return localStorage.setItem(key, value);
};

export const removeStorage = key => {
  return localStorage.removeItem(key);
};
// 判断是是否是pc端 Browser
export const IsPC = () => {
  let userAgentInfo = navigator.userAgent;
  let Agents = [
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod"
  ];
  let flag = true;
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
};
// mos formatDateTime
export const formatDateTime = UnixTime => {
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

// 展示价格格式
export const priceType = (s, n) => {
  n = n > 0 && n <= 20 ? n : 2;
  // eslint-disable-next-line no-useless-escape
  s = `${parseFloat(`${s}`.replace(/[^\d\.-]/g, "")).toFixed(n)}`;
  let l = s
      .split(".")[0]
      .split("")
      .reverse(),
    r = s.split(".")[1],
    t = "";
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && i + 1 !== l.length ? "," : "");
  }
  return `${t
    .split("")
    .reverse()
    .join("")}.${r}`;
};

//  收款管理付款类型 status
export const renderPayType = id => {
  switch (id) {
    case 0:
      return "全款";
    case 1:
      return "订金";
    case 2:
      return "尾款";
  }
};

// 支付方式 status
export const renderPaymentMethod = id => {
  switch (id) {
    case 0:
      return "支付宝";
    case 1:
      return "微信";
    case 5:
      return "信用卡分期";
    case 9:
      return "芝士分期";
    default:
      return "/";
  }
};
// 保留两位小数
export const getNum = (s, n) => {
  n = n > 0 && n <= 20 ? n : 2;
  // eslint-disable-next-line no-useless-escape
  s = `${parseFloat(`${s}`.replace(/[^\d\.-]/g, "")).toFixed(n)}`;
  let l = s
      .split(".")[0]
      .split("")
      .reverse(),
    r = s.split(".")[1],
    t = "";
  for (let i = 0; i < l.length; i++) {
    t += l[i];
  }
  return `${t
    .split("")
    .reverse()
    .join("")}.${r}`;
};

export const formatNumberNN = number => {
  return `${number < 10 ? "0" : ""}${number}`;
};

export const timeToDate = time => {
  return `${new Date(time).getFullYear()}-${formatNumberNN(
    new Date(time).getMonth() + 1
  )}-${formatNumberNN(new Date(time).getDate())}`;
};

/**
 **datestr:形如‘2017-06-12’的字符串
 **return Date 对象
 * */
function getDate(datestr) {
  let temp = datestr.split("-");
  if (temp[1] === "01") {
    temp[0] = parseInt(temp[0], 10) - 1;
    temp[1] = "12";
  } else {
    temp[1] = parseInt(temp[1], 10) - 1;
  }
  // new Date()的月份入参实际都是当前值-1
  let date = new Date(temp[0], temp[1], temp[2]);
  return date;
}

/**
 ***获取两个日期间的所有日期
 ***默认start<end
 * */
function getDiffDate(start, end) {
  let startTime = getDate(start); // GMT 格林威治时间
  let endTime = getDate(end);
  let dateArr = [];
  while (endTime.getTime() - startTime.getTime() >= 0) {
    // endTime.getTime 时间戳
    let year = startTime.getFullYear();
    let month =
      startTime.getMonth().toString().length === 1
        ? `0${parseInt(startTime.getMonth().toString(), 10) + 1}`
        : startTime.getMonth() + 1;
    let day =
      startTime.getDate().toString().length === 1
        ? `0${startTime.getDate()}`
        : startTime.getDate();
    dateArr.push(`${year}-${month}-${day}`);
    startTime.setDate(startTime.getDate() + 1);
  }
  return dateArr;
}

// 获取当前天
export const getDay = () => {
  let days = [];
  for (let i = 0; i <= 23; i++) {
    days.push(`${formatNumberNN(i)}:00`);
  }
  return days;
};

export const getXDate = (start, end) => {
  let arr = getDiffDate(start, end);
  if (arr.length === 1) {
    return {
      type: "today",
      xDate: getDay(),
      date: arr
    };
  }
  if (arr.length <= 31) {
    let day = [];
    for (let i = 0; i < arr.length; i++) {
      day.push(`${arr[i].split("-")[1]}-${arr[i].split("-")[2]}`);
    }
    return {
      type: "month",
      xDate: day,
      date: arr
    };
  }
  if (arr.length > 31 && arr.length < 180) {
    let week = [];
    let weekCount = Math.ceil(arr.length / 7);
    for (let i = 1; i <= weekCount; i++) {
      week.push(`第${i}周`);
    }
    return {
      type: "month_week",
      xDate: week,
      date: arr
    };
  }
  if (arr.length > 180) {
    let month = [],
      array = [];
    // eslint-disable-next-line no-shadow
    let start = arr[0].split("-");
    // eslint-disable-next-line no-shadow
    let end = arr[arr.length - 1].split("-");
    // eslint-disable-next-line radix
    if (parseInt(start[0]) === parseInt(end[0])) {
      // eslint-disable-next-line radix
      for (let i = parseInt(start[1]); i <= parseInt(end[1]); i++) {
        month.push(`${i}月`);
        array.push(`${start[0]}-${formatNumberNN(i)}`);
      }
    } else {
      // eslint-disable-next-line radix
      for (let i = parseInt(start[1]); i <= 12; i++) {
        month.push(`${i}月`);
        array.push(`${start[0]}-${formatNumberNN(i)}`);
      }
      // eslint-disable-next-line radix
      for (let i = 1; i <= parseInt(end[1]); i++) {
        month.push(`${i}月`);
        array.push(`${end[0]}-${formatNumberNN(i)}`);
      }
    }
    return {
      type: "year",
      xDate: month,
      date: array
    };
  }
};

/**
 * 时间戳转化为日期字符串
 * @param {timestamp} stamp 时间戳
 * @param {bool} unix 秒级使用unix
 * @param {string} format 格式化字符串
 */
export const formatTime = (
  stamp,
  unix = false,
  format = "YYYY-MM-DD HH:mm:ss"
) => {
  return unix
    ? moment.unix(stamp).format(format)
    : moment(stamp).format(format);
};
