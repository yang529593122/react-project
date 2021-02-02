import request from "../../utils/request";
import { message } from "antd";
import { apiBaseUrl } from "../../consts/env";

export default {
  state: {
    collapsed: false,
    addShowIcon: false,
    delShowIcon: false
  },
  reducers: {
    updateState(state, payload) {
      return {
        ...state,
        ...payload
      };
    },
    changeSeleItemShow(state, payload) {
      const { OpDisData } = state;

      OpDisData.map((item, index) => {
        if (item.groupMd5Id === payload.groupMd5Id) {
          item.show = !item.show;
        }
      });
      let flag = OpDisData.some(item => item.show === true);

      state.addShowIcon = flag;
      return {
        ...state,
        ...payload
      };
    },
    changeSeleItemShow2(state, payload) {
      const { list } = state;
      list.map((item, index) => {
        if (item.groupMd5Id === payload.groupMd5Id) {
          item.show = !item.show;
        }
      });
      let flag = list.some(item => item.show === true);

      state.delShowIcon = flag;
      return {
        ...state,
        ...payload
      };
    },

    changeSelectClass(state, payload) {
      const { AllCourseData } = state;
      AllCourseData.map((item, index) => {
       
        if (item.groupMd5Id === payload.groupMd5Id) {
          item.show = true;
        } else {
          item.show = false;
        }
      });
      return {
        ...state,
        ...payload
      };
    },
    handleSearchChange(state, payload) {
      const { AllCourseDataOld } = state;
      let arr = [];
      if (payload) {
        arr = AllCourseDataOld.filter(item => {
          return item.syntheticString.indexOf(payload) !== -1;
        });
      } else {
        arr = AllCourseDataOld;
      }
      return {
        ...state,
        AllCourseData: arr,
        ...payload
      };
    },
    handleSearchChangeWfz(state, payload) {
      const {  OpDisDataOld} = state;
      let arr = [];
      if (payload) {
        arr = OpDisDataOld.filter(item => {
          return item.groupName.indexOf(payload) !== -1;
        });
      } else {
        arr = OpDisDataOld;
      }
      return {
        ...state,
        OpDisData: arr,
        ...payload
      };
    }
  },
  effects: {
    // 全部课程
    async getAllCourse() {
      const datas = await request.get(
        `${apiBaseUrl}/api/community/op/allCourse`
      );
      if (datas && datas.data && datas.data.results) {
        datas.data.results.map(item => {
          item.show = false;
          item.groupName = item.courseName;
          item.groupMd5Id = item.courseId;
          item.syntheticString=item.courseId+''+item.courseName
        });
      }
      this.updateState({
        AllCourseData: datas.data.results,
        AllCourseDataOld: datas.data.results
      });
    },
    // 未分组
    async getOpDis() {
      const datas = await request.get(`${apiBaseUrl}/api/community/op/dis`);
      if (datas && datas.data && datas.data.results) {
        datas.data.results.map(item => (item.show = false));
      }
      this.updateState({
        OpDisData: datas.data.results,
        OpDisDataOld: datas.data.results,
        addShowIcon: false
      });
    },
    // 已分组
    async getOpgroup(datassss) {
      let str = datassss
        ? `${apiBaseUrl}/api/community/op/group?courseId=${datassss}`
        : `${apiBaseUrl}/api/community/op/group`;
      const datas = await request.get(str);

      let list = [];
      if (
        datas &&
        datas.data &&
        datas.data.results &&
        datas.data.results.length
      ) {
        if (datas.data.results.length) {
          localStorage.setItem("courseId", datas.data.results[0].courseId);
          localStorage.setItem("courseName", datas.data.results[0].courseName);
          list = datas.data.results[0].groupvo.map(item => {
            return {
              groupMd5Id: item.groupMd5Id,
              groupName: item.groupName,
              show: false
            };
          });
        }
      } else {
        message.warn("暂无数据");
      }
      this.updateState({
        courseName:
          datas.data.results && datas.data.results.length
            ? datas.data.results[0].courseName
            : localStorage.getItem("courseName"),
        courseId:
          datas.data.results && datas.data.results.length
            ? datas.data.results[0].courseId
            : localStorage.getItem("courseId"),
        list,
        delShowIcon: false
      });
    },
    //add
    async getOpAdd(payload) {
      const datas = await request.post(
        `${apiBaseUrl}/api/community/op/add`,
        payload
      );
      if (datas.data.results === "添加成功") {
        return true;
      }
    },
    // 删除
    async getOpRemove(payload) {
      const datas = await request.post(
        `${apiBaseUrl}/api/community/op/remove`,
        payload
      );
      if (datas.data.results === "移除成功") {
        return true;
      }
    }
  }
};
