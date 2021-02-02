import request from "../../utils/request";
import { apiBaseUrl } from "../../consts/env";
import { message } from "antd";

export default {
  state: {
    // 通用事件源
    CommentEvent: [
      {
        days: null,
        nodes: [
          {
            memberEndTime: "",
            memberKeyword: null,
            memberStartTime: "",
            pointName: null,
            sellerEndTime: "",
            sellerKeyword: null,
            sellerSartTime: "",
            standard: null
          }
        ]
      }
    ],
    // 新增事件一 数据源
    newAdExtendEvent: [
      {
        days: "",
        nodes: [
          {
            memberEndTime: "",
            memberKeyword: "",
            memberStartTime: "",
            pointName: "",
            sellerEndTime: "",
            sellerKeyword: "",
            sellerSartTime: "",
            standard: ""
          }
        ]
      }
    ]
  },
  reducers: {
    updateState(state, payload) {
      return {
        ...state,
        ...payload
      };
    },

    setGroupNumberFn(state, payload) {
      return {
        ...state,
        ...payload,
        groupNumberList: payload
      };
    },
    setCourseDataFn(state, payload) {
      const { DropdownboxData } = state;
      let arr = DropdownboxData.filter(item => item.product === payload);
      return {
        ...state,
        ...payload,
        product: payload,
        CourseData: arr[0].course
      };
    },
    setCourseNameFn(state, payload) {
      const { CourseData } = state;
      let arr = CourseData.filter(item => item.courseId === payload);
      return {
        ...state,
        ...payload,
        courseName: arr[0].courseName,
        courseId: arr[0].courseId
      };
    },
    deleitemFn(state, payload) {
      if (localStorage.getItem("EditorItemShow")) {
        if (localStorage.getItem("setgrounp")) {
          const { EditorExtendConfig } = state;
          let arr = EditorExtendConfig.filter(
            (item, index) => index !== payload
          );
          if (arr.length <= 1) {
            arr.map(item => (item.deleteMark = false));
          }
          return {
            ...state,
            ...payload,
            EditorExtendConfig: arr
          };
        } else {
          const { EditorCommonConfig } = state;
          let arr = EditorCommonConfig.filter(
            (item, index) => index !== payload
          );
          if (arr.length <= 1) {
            arr.map(item => (item.deleteMark = false));
          }
          return {
            ...state,
            ...payload,
            EditorCommonConfig: arr
          };
        }
      } else {
        if (localStorage.getItem("setgrounp")) {
          const { newAdExtendEvent } = state;
          let arr = newAdExtendEvent.filter((item, index) => index !== payload);
          if (arr.length <= 1) {
            arr.map(item => (item.deleteMark = false));
          }
          return {
            ...state,
            ...payload,
            newAdExtendEvent: arr
          };
        } else {
          const { CommentEvent } = state;

          let arr = CommentEvent.filter((item, index) => index !== payload);
          console.log(arr, payload, 888);
          if (arr.length <= 1) {
            arr.map(item => (item.deleteMark = false));
          }
          return {
            ...state,
            ...payload,
            CommentEvent: arr
          };
        }
      }
    },
    addDaysFn(state, payload) {
      if (localStorage.getItem("EditorItemShow")) {
        if (localStorage.getItem("setgrounp")) {
          const { EditorExtendConfig } = state;
          let arr = [];
          arr.push({
            days: null,
            deleteMark: false,
            nodes: [
              {
                memberEndTime: null,
                memberKeyword: null,
                memberStartTime: null,
                pointName: null,
                sellerEndTime: null,
                sellerKeyword: null,
                sellerSartTime: null,
                standard: null
              }
            ]
          });
          let newarr = EditorExtendConfig.concat(arr);
          newarr.map(item => (item.deleteMark = true));
          return {
            ...state,
            ...payload,
            EditorExtendConfig: newarr
          };
        } else {
          const { EditorCommonConfig } = state;
          let arr = [];
          arr.push({
            days: null,
            deleteMark: false,
            nodes: [
              {
                memberEndTime: null,
                memberKeyword: null,
                memberStartTime: null,
                pointName: null,
                sellerEndTime: null,
                sellerKeyword: null,
                sellerSartTime: null,
                standard: null
              }
            ]
          });
          let newarr = EditorCommonConfig.concat(arr);
          newarr.map(item => (item.deleteMark = true));
          return {
            ...state,
            ...payload,
            EditorCommonConfig: newarr
          };
        }
      } else {
        if (localStorage.getItem("setgrounp")) {
          const { newAdExtendEvent } = state;
          let arr = [];
          arr.push({
            days: "",
            deleteMark: false,
            nodes: [
              {
                memberEndTime: "",
                memberKeyword: "",
                memberStartTime: "",
                pointName: "",
                sellerEndTime: "",
                sellerKeyword: "",
                sellerSartTime: "",
                standard: ""
              }
            ]
          });
          let newarr = newAdExtendEvent.concat(arr);
          newarr.map(item => (item.deleteMark = true));
          return {
            ...state,
            ...payload,
            newAdExtendEvent: newarr
          };
        } else {
          const { CommentEvent } = state;
          let arr = [];
          arr.push({
            days: null,
            deleteMark: false,
            nodes: [
              {
                memberEndTime: "",
                memberKeyword: null,
                memberStartTime: "",
                pointName: null,
                sellerEndTime: "",
                sellerKeyword: null,
                sellerSartTime: "",
                standard: null
              }
            ]
          });
          let newarr = CommentEvent.concat(arr);
          newarr.map(item => (item.deleteMark = true));
          return {
            ...state,
            ...payload,
            CommentEvent: newarr
          };
        }
      }
    },
    setStandardFn(state, payload) {
      if (localStorage.getItem("EditorItemShow")) {
        if (localStorage.getItem("setgrounp")) {
          const { EditorExtendConfig } = state;
          const { index, nodeindex, val } = payload;
          EditorExtendConfig[index].nodes[nodeindex].standard = val;
          return {
            ...state,
            ...payload
          };
        } else {
          const { EditorCommonConfig } = state;
          const { index, nodeindex, val } = payload;
          EditorCommonConfig[index].nodes[nodeindex].standard = val;
          return {
            ...state,
            ...payload
          };
        }
      } else {
        if (localStorage.getItem("setgrounp")) {
          const { newAdExtendEvent } = state;
          const { index, nodeindex, val } = payload;
          newAdExtendEvent[index].nodes[nodeindex].standard = val;
          return {
            ...state,
            ...payload
          };
        } else {
          const { CommentEvent } = state;
          const { index, nodeindex, val } = payload;
          CommentEvent[index].nodes[nodeindex].standard = val;
          return {
            ...state,
            ...payload
          };
        }
      }
    },
    setDaysFn(state, payload) {
      if (localStorage.getItem("EditorItemShow")) {
        if (localStorage.getItem("setgrounp")) {
          const { EditorExtendConfig } = state;
          const { index, val } = payload;
          EditorExtendConfig[index].days = val;
          return {
            ...state,
            ...payload
          };
        } else {
          const { EditorCommonConfig } = state;
          const { index, val } = payload;
          EditorCommonConfig[index].days = val;
          return {
            ...state,
            ...payload
          };
        }
      } else {
        if (localStorage.getItem("setgrounp")) {
          const { newAdExtendEvent } = state;
          const { index, val } = payload;
          newAdExtendEvent[index].days = val;
          return {
            ...state,
            ...payload
          };
        } else {
          const { CommentEvent } = state;
          const { index, val } = payload;
          CommentEvent[index].days = val;
          return {
            ...state,
            ...payload
          };
        }
      }
    },
    setNodesFn(state, payload) {
      if (localStorage.getItem("EditorItemShow")) {
        if (localStorage.getItem("setgrounp")) {
          const { EditorExtendConfig } = state;
          const { index, nodeindex, value } = payload;
          EditorExtendConfig[index].nodes[nodeindex].pointName = value;

          return {
            ...state,
            ...payload
          };
        } else {
          const { EditorCommonConfig } = state;
          const { index, nodeindex, value } = payload;
          EditorCommonConfig[index].nodes[nodeindex].pointName = value;

          return {
            ...state,
            ...payload
          };
        }
      } else {
        if (localStorage.getItem("setgrounp")) {
          const { newAdExtendEvent } = state;
          const { index, nodeindex, value } = payload;
          newAdExtendEvent[index].nodes[nodeindex].pointName = value;

          return {
            ...state,
            ...payload
          };
        } else {
          const { CommentEvent } = state;
          const { index, nodeindex, value } = payload;
          CommentEvent[index].nodes[nodeindex].pointName = value;

          return {
            ...state,
            ...payload
          };
        }
      }
    },
    setMemberKeywordFn(state, payload) {
      if (localStorage.getItem("EditorItemShow")) {
        if (localStorage.getItem("setgrounp")) {
          const { EditorExtendConfig } = state;
          const { index, nodeindex, value } = payload;
          EditorExtendConfig[index].nodes[nodeindex].memberKeyword = value;

          return {
            ...state,
            ...payload
          };
        } else {
          const { EditorCommonConfig } = state;
          const { index, nodeindex, value } = payload;
          EditorCommonConfig[index].nodes[nodeindex].memberKeyword = value;

          return {
            ...state,
            ...payload
          };
        }
      } else {
        if (localStorage.getItem("setgrounp")) {
          const { newAdExtendEvent } = state;
          const { index, nodeindex, value } = payload;
          newAdExtendEvent[index].nodes[nodeindex].memberKeyword = value;

          return {
            ...state,
            ...payload
          };
        } else {
          const { CommentEvent } = state;
          const { index, nodeindex, value } = payload;
          CommentEvent[index].nodes[nodeindex].memberKeyword = value;

          return {
            ...state,
            ...payload
          };
        }
      }
    },
    setSellerKeywordFn(state, payload) {
      if (localStorage.getItem("EditorItemShow")) {
        if (localStorage.getItem("setgrounp")) {
          const { EditorExtendConfig } = state;
          const { index, nodeindex, value } = payload;
          EditorExtendConfig[index].nodes[nodeindex].sellerKeyword = value;

          return {
            ...state,
            ...payload
          };
        } else {
          const { EditorCommonConfig } = state;
          const { index, nodeindex, value } = payload;
          EditorCommonConfig[index].nodes[nodeindex].sellerKeyword = value;

          return {
            ...state,
            ...payload
          };
        }
      } else {
        if (localStorage.getItem("setgrounp")) {
          const { newAdExtendEvent } = state;
          const { index, nodeindex, value } = payload;
          newAdExtendEvent[index].nodes[nodeindex].sellerKeyword = value;

          return {
            ...state,
            ...payload
          };
        } else {
          const { CommentEvent } = state;
          const { index, nodeindex, value } = payload;
          CommentEvent[index].nodes[nodeindex].sellerKeyword = value;

          return {
            ...state,
            ...payload
          };
        }
      }
    },
    setMemberStartTimeFn(state, payload) {
      if (localStorage.getItem("EditorItemShow")) {
        if (localStorage.getItem("setgrounp")) {
          const { EditorExtendConfig } = state;
          const { index, nodeindex, memberStartTime } = payload;
          EditorExtendConfig[index].nodes[
            nodeindex
          ].memberStartTime = memberStartTime;
          return {
            ...state,
            ...payload
          };
        } else {
          const { EditorCommonConfig } = state;
          const { index, nodeindex, memberStartTime } = payload;
          EditorCommonConfig[index].nodes[
            nodeindex
          ].memberStartTime = memberStartTime;
          return {
            ...state,
            ...payload
          };
        }
      } else {
        if (localStorage.getItem("setgrounp")) {
          const { newAdExtendEvent } = state;
          const { index, nodeindex, memberStartTime } = payload;
          newAdExtendEvent[index].nodes[
            nodeindex
          ].memberStartTime = memberStartTime;
          return {
            ...state,
            ...payload
          };
        } else {
          const { CommentEvent } = state;
          const { index, nodeindex, memberStartTime } = payload;
          CommentEvent[index].nodes[
            nodeindex
          ].memberStartTime = memberStartTime;
          return {
            ...state,
            ...payload
          };
        }
      }
    },
    setSellerSartTimeFn(state, payload) {
      if (localStorage.getItem("EditorItemShow")) {
        //
        if (localStorage.getItem("setgrounp")) {
          const { EditorExtendConfig } = state;
          const { index, nodeindex, sellerSartTime } = payload;
          EditorExtendConfig[index].nodes[
            nodeindex
          ].sellerSartTime = sellerSartTime;
          return {
            ...state,
            ...payload
          };
        } else {
          const { EditorCommonConfig } = state;
          const { index, nodeindex, sellerSartTime } = payload;
          EditorCommonConfig[index].nodes[
            nodeindex
          ].sellerSartTime = sellerSartTime;
          return {
            ...state,
            ...payload
          };
        }
      } else {
        if (localStorage.getItem("setgrounp")) {
          const { newAdExtendEvent } = state;
          const { index, nodeindex, sellerSartTime } = payload;
          newAdExtendEvent[index].nodes[
            nodeindex
          ].sellerSartTime = sellerSartTime;
          return {
            ...state,
            ...payload
          };
        } else {
          const { CommentEvent } = state;
          const { index, nodeindex, sellerSartTime } = payload;
          CommentEvent[index].nodes[nodeindex].sellerSartTime = sellerSartTime;
          return {
            ...state,
            ...payload
          };
        }
      }
    },
    setMemberEndTimeFn(state, payload) {
      if (localStorage.getItem("EditorItemShow")) {
        //EditorExtendConfig
        if (localStorage.getItem("setgrounp")) {
          const { EditorExtendConfig } = state;
          const { index, nodeindex, memberEndTime } = payload;
          EditorExtendConfig[index].nodes[
            nodeindex
          ].memberEndTime = memberEndTime;
          return {
            ...state,
            ...payload
          };
        } else {
          const { EditorCommonConfig } = state;
          const { index, nodeindex, memberEndTime } = payload;
          EditorCommonConfig[index].nodes[
            nodeindex
          ].memberEndTime = memberEndTime;
          return {
            ...state,
            ...payload
          };
        }
      } else {
        if (localStorage.getItem("setgrounp")) {
          const { newAdExtendEvent } = state;
          const { index, nodeindex, memberEndTime } = payload;
          newAdExtendEvent[index].nodes[
            nodeindex
          ].memberEndTime = memberEndTime;
          return {
            ...state,
            ...payload
          };
        } else {
          const { CommentEvent } = state;
          const { index, nodeindex, memberEndTime } = payload;
          CommentEvent[index].nodes[nodeindex].memberEndTime = memberEndTime;
          return {
            ...state,
            ...payload
          };
        }
      }
    },
    setSellerEndTimeFn(state, payload) {
      if (localStorage.getItem("EditorItemShow")) {
        //EditorExtendConfig
        if (localStorage.getItem("setgrounp")) {
          const { EditorExtendConfig } = state;
          const { index, nodeindex, sellerEndTime } = payload;
          EditorExtendConfig[index].nodes[
            nodeindex
          ].sellerEndTime = sellerEndTime;
          return {
            ...state,
            ...payload
          };
        } else {
          const { EditorCommonConfig } = state;
          const { index, nodeindex, sellerEndTime } = payload;
          EditorCommonConfig[index].nodes[
            nodeindex
          ].sellerEndTime = sellerEndTime;
          return {
            ...state,
            ...payload
          };
        }
      } else {
        if (localStorage.getItem("setgrounp")) {
          const { newAdExtendEvent } = state;
          const { index, nodeindex, sellerEndTime } = payload;
          newAdExtendEvent[index].nodes[
            nodeindex
          ].sellerEndTime = sellerEndTime;
          return {
            ...state,
            ...payload
          };
        } else {
          const { CommentEvent } = state;
          const { index, nodeindex, sellerEndTime } = payload;
          CommentEvent[index].nodes[nodeindex].sellerEndTime = sellerEndTime;
          return {
            ...state,
            ...payload
          };
        }
      }
    },
    canceFormFn(state, payload) {
      if (localStorage.getItem("EditorItemShow")) {
        localStorage.removeItem("EditorItemShow");
      } else {
        let arr = [
          // 通用事件数据
          {
            days: "",
            deleteMark: false,
            nodes: [
              {
                memberEndTime: "",
                memberKeyword: "",
                memberStartTime: "",
                pointName: "",
                sellerEndTime: "",
                sellerKeyword: "",
                sellerSartTime: "",
                standard: ""
              }
            ]
          }
        ];
        return {
          ...state,
          ...payload,
          CommentEvent: arr
        };
      }
    },
    delenodesFn(state, payload) {
      if (localStorage.getItem("EditorItemShow")) {
        //EditorExtendConfig
        if (localStorage.getItem("setgrounp")) {
          const { EditorExtendConfig } = state;

          const { dayindex, nodesindex } = payload;
          let newCommentEvent = JSON.parse(JSON.stringify(EditorExtendConfig));
          let arr = newCommentEvent[dayindex].nodes.filter(
            (item, index) => index !== nodesindex
          );
          if (arr.length <= 1) {
            arr.map(item => (item.deleteMark = false));
          }
          newCommentEvent[dayindex].nodes = arr;

          return {
            ...state,
            ...payload,
            EditorExtendConfig: newCommentEvent
          };
        } else {
          const { EditorCommonConfig } = state;

          const { dayindex, nodesindex } = payload;
          let newCommentEvent = JSON.parse(JSON.stringify(EditorCommonConfig));
          let arr = newCommentEvent[dayindex].nodes.filter(
            (item, index) => index !== nodesindex
          );
          if (arr.length <= 1) {
            arr.map(item => (item.deleteMark = false));
          }
          newCommentEvent[dayindex].nodes = arr;

          return {
            ...state,
            ...payload,
            EditorCommonConfig: newCommentEvent
          };
        }
      } else {
        if (localStorage.getItem("setgrounp")) {
          const { newAdExtendEvent } = state;
          const { dayindex, nodesindex } = payload;
          let newCommentEvent = JSON.parse(JSON.stringify(newAdExtendEvent));
          let arr = newCommentEvent[dayindex].nodes.filter(
            (item, index) => index !== nodesindex
          );
          if (arr.length <= 1) {
            arr.map(item => (item.deleteMark = false));
          }
          newCommentEvent[dayindex].nodes = arr;

          return {
            ...state,
            ...payload,
            newAdExtendEvent: newCommentEvent
          };
        } else {
          const { CommentEvent } = state;
          const { dayindex, nodesindex } = payload;
          let newCommentEvent = JSON.parse(JSON.stringify(CommentEvent));
          let arr = newCommentEvent[dayindex].nodes.filter(
            (item, index) => index !== nodesindex
          );
          if (arr.length <= 1) {
            arr.map(item => (item.deleteMark = false));
          }
          newCommentEvent[dayindex].nodes = arr;

          return {
            ...state,
            ...payload,
            CommentEvent: newCommentEvent
          };
        }
      }
    },
    addnodesFn(state, payload) {
      if (localStorage.getItem("EditorItemShow")) {
        // EditorExtendConfig
        if (localStorage.getItem("setgrounp")) {
          const { EditorExtendConfig } = state;
          const { dayindex } = payload;
          let newCommentEvent = JSON.parse(JSON.stringify(EditorExtendConfig));
          newCommentEvent[dayindex].nodes.push({
            memberEndTime: "",
            memberKeyword: "",
            memberStartTime: "",
            pointName: "",
            sellerEndTime: "",
            sellerKeyword: "",
            sellerSartTime: "",
            standard: ""
          });
          newCommentEvent[dayindex].nodes.map(item => (item.deleteMark = true));
          return {
            ...state,
            ...payload,
            EditorExtendConfig: newCommentEvent
          };
        } else {
          const { EditorCommonConfig } = state;
          const { dayindex } = payload;
          let newCommentEvent = JSON.parse(JSON.stringify(EditorCommonConfig));
          newCommentEvent[dayindex].nodes.push({
            memberEndTime: "",
            memberKeyword: "",
            memberStartTime: "",
            pointName: "",
            sellerEndTime: "",
            sellerKeyword: "",
            sellerSartTime: "",
            standard: ""
          });
          newCommentEvent[dayindex].nodes.map(item => (item.deleteMark = true));
          return {
            ...state,
            ...payload,
            EditorCommonConfig: newCommentEvent
          };
        }
      } else {
        if (localStorage.getItem("setgrounp")) {
          const { newAdExtendEvent } = state;
          const { dayindex } = payload;
          let newCommentEvent = JSON.parse(JSON.stringify(newAdExtendEvent));
          newCommentEvent[dayindex].nodes.push({
            memberEndTime: "",
            memberKeyword: "",
            memberStartTime: "",
            pointName: "",
            sellerEndTime: "",
            sellerKeyword: "",
            sellerSartTime: "",
            standard: ""
          });
          newCommentEvent[dayindex].nodes.map(item => (item.deleteMark = true));
          return {
            ...state,
            ...payload,
            newAdExtendEvent: newCommentEvent
          };
        } else {
          const { CommentEvent } = state;
          const { dayindex } = payload;
          let newCommentEvent = JSON.parse(JSON.stringify(CommentEvent));
          newCommentEvent[dayindex].nodes.push({
            memberEndTime: "",
            memberKeyword: "",
            memberStartTime: "",
            pointName: "",
            sellerEndTime: "",
            sellerKeyword: "",
            sellerSartTime: "",
            standard: ""
          });
          newCommentEvent[dayindex].nodes.map(item => (item.deleteMark = true));
          return {
            ...state,
            ...payload,
            CommentEvent: newCommentEvent
          };
        }
      }
    }
  },
  effects: {
    // 事件设置列表
    async getEventList() {
      const data = await request.get(`${apiBaseUrl}/api/op/business`);
      const { results } = data.data;
      this.updateState({
        EventList: results
      });
    },
    //获取社群

    async getGroupNumber() {
      const data = await request.get(`${apiBaseUrl}/api/qc/groupNumber`);
      const { results } = data.data;
      this.updateState({
        GroupNumberData: results
      });
    },
    // 获取基本信息 通用事件 下拉框
    async getDropdownbox(payload) {
      const data = await request.get(`${apiBaseUrl}/api/op/dropdownbox`);
      const { results } = data.data;
      this.updateState({
        DropdownboxData: results
      });
    },
    // 删除
    async detEventItem(id) {
      const data = await request.get(`${apiBaseUrl}/api/op/delete/${id}`);
      if (data.data.code === 0) {
        message.success("已删除选中的数据");
        this.getEventList();
      } else {
        message.error("操作失败", data.data.message);
      }
    },
    // 编辑
    async editorItemFn(payload) {
      const data = await request.get(
        `${apiBaseUrl}/api/op/fetchConfig/${payload}`
      );
      const { results } = data.data;
      let EditCommentEvent = [];
      let daysarr = [];
      results.commonConfig.commentEvent.map(item => {
        if (daysarr.indexOf(item.days) == -1) {
          daysarr.push(item.days);
        }
      });

      daysarr.map(item => {
        EditCommentEvent.push({
          days: item,
          nodes: []
        });
      });

      for (let i = 0; i < EditCommentEvent.length; i++) {
        for (let j = 0; j < results.commonConfig.commentEvent.length; j++) {
          if (
            EditCommentEvent[i].days ===
            results.commonConfig.commentEvent[j].days
          ) {
            EditCommentEvent[i].nodes.push(
              results.commonConfig.commentEvent[j]
            );
          }
        }
      }
      if (EditCommentEvent.length > 1) {
        EditCommentEvent.map(item => (item.deleteMark = true));
      }
      for (let i = 0; i < EditCommentEvent.length; i++) {
        if (EditCommentEvent[i].nodes.length > 1) {
          EditCommentEvent[i].nodes.map(item => (item.deleteMark = true));
        }
      }
      console.log(EditCommentEvent, 888);
      let EditExtendEvent = [];

      let daysarrtwo = [];
      results.extendConfig.extendEvent.map(item => {
        if (daysarrtwo.indexOf(item.days) == -1) {
          daysarrtwo.push(item.days);
        }
      });

      daysarrtwo.map(item => {
        EditExtendEvent.push({
          days: item,
          nodes: []
        });
      });

      for (let i = 0; i < EditExtendEvent.length; i++) {
        for (let j = 0; j < results.extendConfig.extendEvent.length; j++) {
          if (
            EditExtendEvent[i].days === results.extendConfig.extendEvent[j].days
          ) {
            EditExtendEvent[i].nodes.push(results.extendConfig.extendEvent[j]);
          }
        }
      }
      for (let i = 0; i < EditExtendEvent.length; i++) {
        if (EditExtendEvent[i].nodes.length > 1) {
          EditExtendEvent[i].nodes.map(item => (item.deleteMark = true));
        }
      }

      this.updateState({
        EditorItemData: results,
        EditorCommonConfig: EditCommentEvent,
        courseId: results.commonConfig.courseId,
        courseName: results.commonConfig.course,
        product: results.commonConfig.product,
        EditorExtendConfig: EditExtendEvent,
        groupNumberList: results.extendConfig.groupNumberList
      });
    },
    // 提交
    async subFormDataFn(payload) {
      payload.commonConfig.commentEvent.map(item => {
        item.sellerSartTime = item.sellerSartTime
          ? item.sellerSartTime
          : "00:00:00";
        item.sellerEndTime = item.sellerEndTime
          ? item.sellerEndTime
          : "00:00:00";
        item.memberEndTime = item.memberEndTime
          ? item.memberEndTime
          : "00:00:00";
        item.memberStartTime = item.memberStartTime
          ? item.memberStartTime
          : "00:00:00";
      });
      if (localStorage.getItem("EditorItemShow")) {
        const data = await request.post(`${apiBaseUrl}/api/op/edit`, payload);
        if (data.data.code === 0) {
          localStorage.removeItem("EditorItemShow");
          window.location.href = "/app/monitor/quality";
        } else {
          message.error(`操作失败,${data.data.message}`);
        }
      } else {
        payload.commonConfig.commentEvent.map(item => {
          item.sellerSartTime = item.sellerSartTime
            ? item.sellerSartTime
            : "00:00:00";
          item.sellerEndTime = item.sellerEndTime
            ? item.sellerEndTime
            : "00:00:00";
          item.memberEndTime = item.memberEndTime
            ? item.memberEndTime
            : "00:00:00";
          item.memberStartTime = item.memberStartTime
            ? item.memberStartTime
            : "00:00:00";
        });
        const data = await request.post(`${apiBaseUrl}/api/op/add`, payload);
        if (data.data.code === 0) {
          message.success("添加成功");
          window.location.href = "/app/monitor/quality";
        } else {
          message.error(`操作失败,${data.data.message}`);
        }
      }
    }
  }
};
