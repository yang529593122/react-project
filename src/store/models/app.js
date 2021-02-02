import request from '../../utils/request';

export default {
  state: {
    collapsed: false,
  },
  reducers: {
    updateState(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    async login(payload) {
      const data = await request.post(`/auth/signin`, payload);
      if (data && data.data) {
        return data.data;
      }
      return false;
    },
  },
};
