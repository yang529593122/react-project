import request from "../../utils/request";
import { message } from "antd";
import { apiBaseUrl } from "../../consts/env";

export default {
  state: {
    formKeyWords: false,
    Keywordshow: false
  },
  reducers: {
    updateState(state, payload) {
      return {
        ...state,
        ...payload
      };
    },
    setshowformword(state, payload) {
      state.formKeyWords = payload;
      return {
        ...state,
        ...payload
      };
    },
    setKeywordshow(state, payload) {
      state.Keywordshow = payload;
      return {
        ...state,
        ...payload
      };
    },
    setCourseNameList(state, payload) {
      const { SelectParams } = state;
      let arr = SelectParams.filter(item => item.productLine === payload);
      return {
        ...state,
        ...payload,
        courseNameList: arr[0].courseList
      };
    }
  },
  effects: {
    // 关键词列表
    async getKeyWordData(pamars) {
      const data = await request.post(
        `${apiBaseUrl}/api/community/keywords/list`,
        pamars
      );
      const { results } = data.data;
      if (results.result && results.result.length) {
        results.result.map((item, index) => {
          item.key = index;
        });
      }
      this.updateState({
        KeyWordData: results.result
      });
    },
    // 删除关键词
    async delKeywords(pamars) {
      const data = await request.get(
        `${apiBaseUrl}/api/community/keywords/delete/${pamars}`
      );
      const { code } = data.data;
      if (code === 0) {
        message.success("删除成功");
        this.getKeyWordData({ pageNum: 1, pageSize: 20 });
      } else {
        message.error("删除失败");
      }
      this.updateState({});
    },
    // 获取下拉选项
    async getSelectParams(pamars) {
      const data = await request.get(
        `${apiBaseUrl}/api/community/keywords/dropdown`
      );
      const { results } = data.data;
      this.updateState({
        SelectParams: results,
        courseNameList: []
      });
    },
    // 添加关键词
    async addKeywordsform(pamars) {
      const data = await request.post(
        `${apiBaseUrl}/api/community/keywords/add`,
        pamars
      );
      const { results, code } = data.data;
      if (code === 0) {
        message.success(results);
        this.getKeyWordData({ pageNum: 1, pageSize: 20 });
      } else {
        message.error("添加失败");
      }
      this.updateState({
        formKeyWords: false
      });
    },
    // 编辑关键词
    async editKeystring(pamars) {
      const data = await request.post(
        `${apiBaseUrl}/api/community/keywords/edit`,
        pamars
      );
      const { code } = data.data;

      if (code === 0) {
        message.success("编辑成功");
        this.getKeyWordData({ pageNum: 1, pageSize: 20 });
      } else {
        message.error("编辑失败");
      }
      this.updateState({
        Keywordshow: false
      });
    }
  }
};
