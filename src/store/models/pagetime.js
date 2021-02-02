import request from "../../utils/request";
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
    async setPageTime(payload) {
      const data = await request.post(
        `${apiBaseUrl}/api/statistics/add`,
        payload
      );
      return data;
    }
  }
};
