import request from "../../utils/request";

function group(array, subGroupLength) {
  let index = 0;
  let newArray = [];
  while (index < array.length) {
    newArray.push(array.slice(index, (index += subGroupLength)));
  }
  return newArray;
}
export default {
  state: {},
  reducers: {
    updateState(state, payload) {
      return { ...state, ...payload };
    }
  },
  effects: dispatch => ({
    // 分析 table 数据
    async getAnalyzeTableData() {
      const data = await request.get("/dashboard/untreated");
      data.data.results.map((item, index) => (item.key = index));
      this.updateState({
        analyzeTableData: data.data.results
      });
    },

    async getAnalyzeDailyData() {
      const data = await request.get("/dashboard/daily");
      // let groupedArray = group(data.data.results, 2);
      this.updateState({
        DailyData: data.data.results
      });
    }
  })
};
