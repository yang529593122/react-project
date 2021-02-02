import React from "react";
import { Table } from "antd";
const List = ({ ...props }) => {
  const columns = [
    {
      title: "微信群名称",
      dataIndex: "groupName",
      width: 200,
      align: "center",
      key: "groupName"
    },
    {
      title: "时间",
      dataIndex: "day",
      width: 100,
      align: "center",
      key: "day"
    },
    {
      title: "运营者",
      dataIndex: "operator",
      width: 170,
      align: "center",
      key: "operator"
    },
    {
      title: "群人数",
      dataIndex: "members",
      width: 120,
      align: "center",
      key: "members"
    },
    {
      title: "当日新增",
      dataIndex: "joinCount",
      width: 120,
      align: "center",
      key: "joinCount"
    },
    {
      title: "当日退群",
      dataIndex: "retreatCount",
      width: 120,
      align: "center",
      key: "retreatCount"
    },
    {
      title: "对话数",
      dataIndex: "chatCount",
      width: 100,
      align: "center",
      key: "chatCount"
    },
    {
      title: "对话数(运营者)",
      dataIndex: "operatorChatCount",
      width: 100,
      align: "center",
      key: "operatorChatCount"
    },
    {
      title: "活跃人数",
      dataIndex: "active",
      width: 150,
      align: "center",
      key: "active"
    }
  ];

  return <Table {...props} bordered columns={columns} pagination={false} />;
};

export default List;
