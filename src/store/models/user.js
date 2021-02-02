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
    },
    // 设置 用户信息 from
    setUseInfoOptionValue(state, payload) {
      const { userInfoNavData } = state;
      const { value, index } = payload;
      let target = JSON.parse(JSON.stringify(userInfoNavData));
      target[index].value = value;
      return {
        ...state,
        userInfoNavData: target
      };
    },
    // 设置 社群成员 form 参数
    setUseListOptionValue(state, payload) {
      const { navlist } = state;
      const { value, index } = payload;
      let target = JSON.parse(JSON.stringify(navlist));
      let ind = target[index].data.indexOf(value);
      target.map(item => (item.value = item.data[ind]));

      return {
        ...state,
        navlist: target
      };
    },
    // 重置 用户列表
    resetUserInfoForm(state, payload) {
      const { userInfoNavData } = state;
      let target = JSON.parse(JSON.stringify(userInfoNavData));
      target.map(item => (item.value = null));
      return {
        ...state,
        ...payload,
        userInfoNavData: target
      };
    },
    // 重置 社群成员 form
    resetUserListForm(state, payload) {
      const { navlist } = state;
      let target = JSON.parse(JSON.stringify(navlist));
      target.map(item => (item.value = null));
      return {
        ...state,
        ...payload,
        navlist: target
      };
    }
  },
  effects: {
    //

    async getUserInfoForm(params) {
      const datas = await request.get(
        `${apiBaseUrl}/operations/community/member/param`
      );
      const { results } = datas.data;
      let userInfoNavData = [
        { title: "出现次数", data: [], value: null },
        { title: "身份", data: [], value: null }
      ];
      userInfoNavData[0].data = results.joinedGroupCount;
      userInfoNavData[1].data = results.memberType;

      this.updateState({
        userInfoNavData
      });
    },
    // 查询 社群成员
    async submitUserListForm(params) {
      const datas = await request.get(
        `${apiBaseUrl}/operations/community/course`
      );
      const { results } = datas.data;
      let navlist = [
        { title: "课程ID", data: [], value: null },
        { title: "课程名称", data: [], value: null }
      ];
      results.map((item, index) => {
        navlist[0].data.push(item.courseId);
        navlist[1].data.push(item.courseName);
      });
      this.updateState({
        navlist,
        navlistformdata: results
      });
    },
    // 点击按查询社群成员列表
    async submitUserList(params) {
      let obj = params || {};
      const datas = await request.post(
        `${apiBaseUrl}/operations/community/member`,
        obj
      );
      const { results } = datas.data;

      results.result.map((item, index) => (item.key = index));
      this.updateState({
        UserListData: results
      });
    },
    // 获取社群成员详情

    async getUserInfoData(params) {
      const datas = await request.post(
        `${apiBaseUrl}/operations/community/member/detail`,
        params
      );
      const { results } = datas.data;

      results.result.map((item, index) => (item.key = index));
      this.updateState({
        UserInfoData: results
      });
    }
  }
};
