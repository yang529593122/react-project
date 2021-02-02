//搜索值转换成 组件可配制的格式 例如
/*const gongsiName = [
  { value: '风变科技', text: '风变科技' },
  { value: '扇贝编程', text: '扇贝编程' }
];*/
// val 为数组
export function searchValue(val) {
  const newVal = val.results.map((item, index) => {
    return {
      value: item,
      text: item
    };
  });
  return newVal;
}

// obj 为数组
export function searchStatus(obj) {
  var arr = [];
  for (let i in obj) {
    arr.push({ value: i, text: obj[i] }); //属性
  }
  return arr;
}
