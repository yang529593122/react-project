import React from "react";
import { Table } from "antd";

const List = ({ onLink, ...props }) => {
  const columns = [
    {
      title: "群号",
      dataIndex: "groupNumber",
      width: 200,
      align: "center",
      key: "groupNumber"
    },
    {
      title: "产品线",
      dataIndex: "productLine",
      width: 200,
      align: "center",
      key: "productLine",
      render: text => {
        return text != null ? text : "/";
      }
    },
    {
      title: "课程名称",
      dataIndex: "courseName",
      width: 200,
      align: "center",
      key: "courseName",
      render: text => {
        return text != null ? text : "/";
      }
    },
    {
      title: "群名称",
      dataIndex: "groupName",
      width: 150,
      align: "center",
      key: "groupName",
      render: text => {
        return text != null ? text : "/";
      }
    },
    {
      title: "运营者",
      dataIndex: "seller",
      width: 120,
      align: "center",
      key: "seller",
      render: text => {
        return text != null ? text : "/";
      }
    },
    {
      title: "群人数",
      dataIndex: "groupMemberCount",
      width: 120,
      align: "center",
      key: "groupMemberCount",
      render: text => {
        return text != null ? text : "/";
      }
    },
    {
      title: "开群时间",
      dataIndex: "startTime",
      width: 200,
      align: "center",
      key: "startTime",
      render: (text, record) => {
        return text != null ? text : "/";
      }
    },
    {
      title: "抓取时间",
      dataIndex: "crawlTime",
      width: 200,
      align: "center",
      key: "crawlTime",
      render: (text, record) => {
        return text != null ? text : "/";
      }
    },
    {
      title: "群状态",
      dataIndex: "status",
      width: 120,
      align: "center",
      key: "status",
      render: text => {
        return text != null ? text : "未同步";
      }
    },
    {
      title: "操作",
      width: 100,
      align: "center",
      key: "operation",
      render: (text, record) => {
        return (
          <div className="operation">
            <span onClick={() => onLink(record)}>本群详情 </span>
          </div>
        );
      }
    }
  ];

  return <Table {...props} bordered columns={columns} />;
};

export default List;
