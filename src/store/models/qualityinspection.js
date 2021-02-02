import request from "../../utils/request";
import { apiBaseUrl } from "../../consts/env";
import { message } from "antd";
export default {
  state: {
    list: [],
    pagination: {},
    query: {}, // 查询条件
    operate: "create", // 当前操作 create / update
    linkModalVisible: false // 查看图片对比弹窗是否可见
  },
  reducers: {
    updateState(state, payload) {
      return Object.assign({}, state, payload);
    },
    setSellerGroupList(state, payload) {
      let arr = state.communityStatusData.campGroups.filter(item => {
        return item.camp === payload;
      });
      let newsellerGroupList = arr[0].group.map(item => {
        return { value: item, text: item };
      });
      return {
        ...state,
        ...payload,
        sellerGroupList: newsellerGroupList
      };
    }
  },
  effects: dispatch => ({
    // 获取列表参数
    // 筛选社群参数
    async getcommunityStatus(payload) {
      const data = await request.get(`${apiBaseUrl}/api/qc/param`);

      const { productLine, campGroups, status } = data.data.results;
      const newStatus = status.map(item => {
        return { value: item, text: item };
      });
      const newProductList = productLine.map(item => {
        return { value: item, text: item };
      });
      const sellerCampList = campGroups.map(item => {
        return { value: item.camp, text: item.camp };
      });
      const sellerGroupList =
        campGroups.length &&
        campGroups[0].group.map(item => {
          return { value: item, text: item };
        });

      this.updateState({
        communityStatusData: data.data.results,
        productList: newProductList,
        sellerCampList,
        sellerGroupList,
        inspectionStatu: newStatus
      });
    },
    // 筛选社群列表
    async getcommunityList(payload) {
      this.filter = payload;
      const params = {
        pageNum: 1,
        pageSize: 20,
        ...payload
      };
      const data = await request.post(`${apiBaseUrl}/api/qc/filter`, params);
      const { results } = data.data;

      this.updateState({
        list: results.result,
        pagination: {
          pageNum: results.pageNum,
          pageSize: results.pageSize,
          total: results.totalElements,
          showTotal: totalPage => `共 ${results.totalElements} 条记录`
        }
      });
    },
    // 查询话术
    async getcommunityRecord(payload) {
      const data = await request.get(`${apiBaseUrl}/api/qc/dialogue`, payload);
      const { dialogueDtos, troubleType } = data.data.results;
      const newTroubleType = troubleType.map(item => {
        return { value: item, text: item };
      });

      this.updateState({
        recordList: dialogueDtos,
        troubleType: newTroubleType
      });
    },
    // 纠错
    async getChatKeywordList(payload) {
      const data = await request.get(`${apiBaseUrl}/api/qc/correct`, payload);
      const { code } = data.data;
      if (code === 0) {
        message.success("纠错成功");
      } else {
        message.error("纠错失败");
      }
    }
  })
};
