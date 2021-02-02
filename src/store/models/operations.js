import request from "../../utils/request";

import { message } from "antd";
import { apiBaseUrl } from "../../consts/env";

export default {
  state: {
    list: [],
    mapData: [],
    pagination: {},
    query: {}, // 查询条件
    operate: "create", // 当前操作 create / update
    linkModalVisible: false // 查看图片对比弹窗是否可见
  },
  reducers: {
    updateState(state, payload) {
      return Object.assign({}, state, payload);
    }
  },
  effects: dispatch => ({
    async operationschart(payload, sdfasdf) {
      const data = await request.post(
        `${apiBaseUrl}/operations/chart`,
        payload
      );
      let arr = [];
      let num = 3;
      if (payload.days === "全部") {
        num = 1;

        for (let key in data.data.results) {
          data.data.results[key].map(item => {
            let obj = {};
            obj.city = key;
            obj.day = item.dtime;
            obj.temperature = item.v;
            arr.push(obj);
          });
        }
      } else if (payload.timeDime === "一天") {
        if (data.data.results && data.data.results.all.length === 0) {
          message.warn("没有数据");
          return false;
        }
        num = 2;
        data.data.results.all.map(item => {
          let obj = {};
          obj.city = payload.index;
          obj.day = item.dtime;
          obj.temperature = item.v;
          arr.push(obj);
        });
      } else {
        num = 3;
        if (data.data.results && data.data.results[payload.days].length === 0) {
          message.warn("没有数据");
          return false;
        }
        data.data.results[payload.days].map(item => {
          let obj = {};
          obj.city = payload.index;
          obj.day = item.dtime;
          obj.temperature = item.v;
          arr.push(obj);
        });
      }

      this.updateState({
        mapData: arr,
        showDayType: num
      });
    },
    async productline() {
      const data = await request.get(
        `${apiBaseUrl}/operations/community/company`
      );
      let coursename = [];
      let productlinelist = [];
      if (data.data.results) {
        if (data.data.results[0]) {
          let arr = data.data.results[0];
          coursename = arr.courseList.map((item, index) => {
            return {
              value: index,
              text: item
            };
          });
          data.data.results.map((item, index) =>
            productlinelist.push({ text: item.productLine, value: index })
          );
        }
      }
      this.updateState({
        productlinelistData: data.data.results,
        productlinelist: productlinelist,
        coursename
      });
    },
    async getcommunitystatus() {
      const data = await request.get(
        `${apiBaseUrl}/operations/community/status`
      );

      let newdata = data.data.results.map((item, index) => {
        return {
          value: index,
          text: item
        };
      });
      this.updateState({
        groupstate: newdata
      });
    },
    async gethandleproductlinelist(value) {
      const data = await request.get(
        `${apiBaseUrl}/operations/community/company`
      );
      let arr = data.data.results.filter(item => item.productLine === value);
      let coursename = arr[0].courseList.map((item, index) => {
        return {
          value: index,
          text: item
        };
      });
      this.updateState({
        coursename
      });
    },
    // 社群列表
    async getcommunityList(payload) {
      this.filter = payload;
      const params = {
        pageNum: 1,
        pageSize: 20,
        ...payload
      };
      const datas = await request.post(
        `${apiBaseUrl}/operations/community/list`,
        params
      );
      if (datas) {
        const { data } = datas;
        data.results.result.map((item, index) => (item.key = index));
        this.updateState({
          list: data.results.result,
          pagination: {
            current: data.results.pageNum,
            pageNum: data.results.pageNum,
            pageSize: data.results.pageSize,
            total: data.results.totalElements,
            showTotal: totalPage => `共 ${data.results.totalElements} 条记录`
          }
        });
      }
    },

    // 创建表单
    async create(payload) {
      const data = await request.post(
        `${apiBaseUrl}/operations/community/add`,
        payload
      );
      if (data.data && data.data.code === 0) {
        message.success("新增成功");
        this.getcommunityList(this.filter);
        this.getcommunityCompany();
      } else {
        message.error(`新增失败-${data.data.message}`);
      }
    },

    // 社群详情
    async preview(id) {
      const datas = await request.get(
        `${apiBaseUrl}/operations/community/detail/${id}`,
        {}
      );
      datas.data.results.map((item, index) => (item.key = index));
      if (datas) {
        this.updateState({
          list: datas.data.results
        });
      }
    },

    // 聊天记录展示
    async getcommunityRecord(payload) {
      const data = await request.get(`${apiBaseUrl}/operations/chat/record`, {
        kgId: payload.id,
        operator: payload.operator,
        startTime: payload.startTime,
        endTime: payload.endTime
      });
      this.updateState({
        recordList: data.data.results
      });
    },

    // 聊天记录关键词
    async getChatKeywordList(payload) {
      const data = await request.get(`${apiBaseUrl}/operations/chat/keyword`, {
        kgId: payload.id,
        startTime: payload.startTime,
        endTime: payload.endTime
      });

      this.updateState({
        setKeywordList: data.data.results
      });
    },
    // 图表选择项
    async getChartParam(payload) {
      const data = await request.get(`${apiBaseUrl}/operations/chart/param`);
      this.updateState({
        ChartParamData: data.data.results
      });
    },
    // 设置埋点
    async setBuriedPoint(payload) {
      const data = await request.post(
        `${apiBaseUrl}/api/statistics/add`,
        payload
      );
      console.log(data);
    }
  })
};
