import React from "react";
import { Space, Tooltip } from "antd";
const overlayStyle = {
  width: "100%",
  maxHeight: "300px",
  overflow: "auto"
};

const CONTENT_HEAD = {
  title: "社群成员",
  describe: "",
  data: [
    {
      href: "",
      title: "运营"
    },
    {
      href: "",
      title: "社群成员"
    }
  ]
};

const USER_LIST_COLUMNS = [
  {
    title: "课程ID",
    dataIndex: "courseId",
    key: "courseId",
    align: "center"
  },
  {
    title: "课程名称",
    dataIndex: "courseName",
    key: "courseName",
    align: "center"
  },
  {
    title: "开始服务时间",
    dataIndex: "servedStartTime",
    key: "servedStartTime",
    align: "center"
  },
  {
    title: "服务用户数量",
    key: "servedMemberCount",
    dataIndex: "servedMemberCount",
    align: "center"
  },
  {
    title: "用户情况",
    key: "action",
    align: "center",
    render: (text, record) => (
      <Space>
        <a href={`/app/community/userinfo/${text.courseId}`}>用户详情</a>
      </Space>
    )
  }
];
const USER_INFO_LIST_COLUMNS = [
  {
    title: "用户昵称",
    dataIndex: "nickname",
    key: "nickname",
    align: "center"
  },
  {
    title: "用户微信ID",
    dataIndex: "wxid",
    key: "wxid",
    align: "center"
  },
  {
    title: "身份",
    dataIndex: "role",
    key: "role",
    align: "center"
  },
  {
    title: "用户出现次数",
    key: "joinedGroupCount",
    dataIndex: "joinedGroupCount",
    align: "center"
  },
  {
    title: "用户所在社群",
    key: "joinedGroupDetail",
    dataIndex: "joinedGroupDetail",
    align: "center",
    // ellipsis: true
    ellipsis: {
      showTitle: false
    },
    render: address => (
      <Tooltip
        arrowPointAtCenter={false}
        overlayStyle={overlayStyle}
        title={address}
      >
        {address}
      </Tooltip>
    )
  }
];
export { CONTENT_HEAD, USER_LIST_COLUMNS, USER_INFO_LIST_COLUMNS };
