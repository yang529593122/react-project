import request from "../../utils/request";
import { ddhttpurl, apiBaseUrl } from "../../consts/env";
import { message } from "antd";
export default {
  state: {
    groupList: [],
    activeRatearr: [],
    replyRatearr: [],
    classnamelist: []
  },
  reducers: {
    updateState(state, payload) {
      return Object.assign({}, state, payload);
    },
    setBusinessValueEvent(state, payload) {
      const { BusinessData } = state;
      let arr = BusinessData.filter(item => item.businessId === payload);

      return {
        ...state,
        ...payload,
        defaultBusinessValue: arr[0].businessId
      };
    },
    setGroupNumber(state, payload) {
      state.GroupNumber = payload.kgID;
      state.delvalue = payload.value;
      return {
        ...state,
        ...payload
      };
    },

    delItemLineMap(state, payload) {
      state.activeRatearr = state.activeRatearr.filter(
        item => item.city !== payload.title + payload.num
      );

      let arr = [];
      for (let i = 0; i < state.classnamelist.length; i++) {
        if (
          state.classnamelist[i].title === payload.title &&
          state.classnamelist[i].num === payload.num
        ) {
        } else {
          arr.push(state.classnamelist[i]);
        }
      }
      state.classnamelist = arr;

      state.replyRatearr = state.replyRatearr.filter(
        item => item.city !== payload.title + payload.num
      );
      return {
        ...state,
        ...payload
      };
    }
  },
  effects: dispatch => ({
    // 设置埋点
    async setBuriedPoint(payload) {
      const data = await request.post(
        `${apiBaseUrl}/api/statistics/add`,
        payload
      );
      return data.data;
    },
    //  获取头部业务线内容
    async getBusinessId() {
      const data = await request.get(`${apiBaseUrl}/api/user/businessId`);
      const { results } = data.data;
      if (results && results.length) {
        let defaultBusinessValue = "";
        if (localStorage.getItem("businessId")) {
          let arr = results.filter(
            item => item.businessId == localStorage.getItem("businessId")
          );
          defaultBusinessValue = arr[0].businessId;
        } else {
          localStorage.setItem("businessId", results[0].businessId);
          defaultBusinessValue = results[0].businessId;
          this.getConversationCount();
          this.getCommunityCount();
          this.getCommunityCourse();
        }

        this.updateState({
          BusinessData: results,
          defaultBusinessValue
        });
      }
    },
    // 获取用户信息
    async getUser(payload) {
      const data = await request.get(`${ddhttpurl}/corgi/upms/user/info`);
      if (data.data.code === 0) {
        window.location.href = "/login";
      } else {
        return data.data;
      }
    },
    // 获取菜单
    async getRouteMeau(uid) {
      const data = await request.get(`${ddhttpurl}/corgi/upms/resource/client`);
      return data.data.resources;
    },
    async getRate(payload) {
      const data = await request.get(`${apiBaseUrl}/dashboard/rate`, payload);
      return data.data;
    },
    //日报
    async getConversationCount() {
      const datas = await request.get(
        `${apiBaseUrl}/api/community/dashboard/conversationCount`
      );
      this.updateState({
        ConversationCountData: datas.data.results
      });
    },
    // 社群数量
    async getCommunityCount() {
      let dataSource = [];
      let columns = [
        {
          title: "课程",
          dataIndex: "courseName",
          key: "courseName",
          align: "center"
        },
        {
          title: "群总数",
          dataIndex: "total",
          key: "total",
          align: "center"
        }
      ];
      const datas = await request.get(
        `${apiBaseUrl}/api/community/dashboard/count`
      );
      datas.data.results.map((item, index) => {
        let obj = {};
        obj.key = index;
        obj.courseName = item.courseName;

        item.communityVo.map((it, ind) => {
          obj[`day${ind}`] = it.count;
          obj.total = item.total;
          obj.createTime = it.createTime;
        });
        dataSource.push(obj);
      });

      datas.data.results[0] &&
        datas.data.results[0].communityVo.map((it, ind) => {
          let columnsobj = {};
          columnsobj.title = it.createTime;
          columnsobj.dataIndex = `day${ind}`;
          columnsobj.key = `day${ind}`;
          columnsobj.align = "center";
          columns.push(columnsobj);
        });
      this.updateState({
        CommunityCount: datas.data.results,
        dataSource,
        columns
      });
    },
    // 公司名称
    async getCommunityCourse() {
      const datas = await request.get(
        `${apiBaseUrl}/api/community/dashboard/course`
      );
      this.updateState({
        CommunityCourse: datas.data.results
      });
    },
    //
    async getDashboardGroup(value) {
      const datas = await request.get(
        `${apiBaseUrl}/api/community/dashboard/group?courseName=${value}`
      );
      let arr = [];
      datas.data.results.map(item => arr.push(item.groupNumber));
      this.updateState({
        DashboardGroup: datas.data.results,
        DashboardGroupArr: arr,
        ClassTitle: value,
        delvalue: "请选群号"
      });
    },

    // 获取 活跃 回复率 数据
    // 各种率, 默认情况下 出平均值

    async getCommunityRate(obj, payload) {
      const datas = await request.get(
        `${apiBaseUrl}/api/community/dashboard/rate?kgID=${obj.GroupNumber}`
      );
      if (!datas.data.results) {
        return false;
      }
      let classnamelist = payload.dashboard.classnamelist;
      if (classnamelist.length === 0) {
        classnamelist.push({
          title: datas.data.results.courseName,
          num: datas.data.results.groupNumber
        });
      } else {
        const option = {
          title: datas.data.results.courseName,
          num: datas.data.results.groupNumber
        };
        //如果数组里面本身不存在这个对象则把这个加进去
        if (
          JSON.stringify(classnamelist).indexOf(JSON.stringify(option)) === -1
        ) {
          classnamelist.push(option); // 进行动态的操作
        } else {
          message.warn("该数据已经存在");
        }
      }

      let activeRatearr = payload.dashboard.activeRatearr;
      // 用户活跃度
      for (let key in datas.data.results.activeRate) {
        let obj = {
          day: key,
          city: datas.data.results.courseName + datas.data.results.groupNumber,
          temperature: datas.data.results.activeRate[key]
        };
        activeRatearr.push(obj);
      }

      // 学员回复占比
      let replyRatearr = payload.dashboard.replyRatearr;
      for (let key in datas.data.results.replyRate) {
        let obj = {
          day: key,
          city: datas.data.results.courseName + datas.data.results.groupNumber,
          temperature: datas.data.results.replyRate[key]
        };
        replyRatearr.push(obj);
      }
      this.updateState({
        CommunityRate: datas.data.results,
        replyRatearr,
        activeRatearr,
        classnamelist
      });
    }
  })
};
