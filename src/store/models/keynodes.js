import request from "../../utils/request";
import { message } from "antd";
import { apiBaseUrl } from "../../consts/env";

export default {
  state: {},
  reducers: {
    updateState(state, payload) {
      return {
        ...state,
        ...payload
      };
    }
  },
  effects: {
    // 关键节点
    async getKeynodesData(id) {
      const data = await request.get(
        `${apiBaseUrl}/api/qc/keypoint?kgId=${id}`
      );
      const resultsData = data.data;
      if (resultsData.results && resultsData.results.length) {
        resultsData.results.map((item, index) => {
          item.key = index;
        });
      }
      this.updateState({
        KeynodesData: resultsData.results
      });
    },
    // 社群详情
    async preview(id) {
      const data = await request.get(`${apiBaseUrl}/api/qc/detail`, {
        kgId: id
      });
      const { results } = data.data;
      this.updateState({
        detailsList: results
      });
    },
    // 更新质检状态
    async getUpdateQualityInspectionStatus(payload) {
      const data = await request.get(
        `${apiBaseUrl}/api/qc/updateStatus`,
        payload
      );
      const { code, results } = data.data;
      if (code === 0) {
        message.success(results);
      } else {
        message.error(results);
      }
    }
  }
};
