import React from "react";
import { Table } from "antd";

const List = ({ onLink, ...props }) => {
  const columns = [
    {
      title: "群ID",
      dataIndex: "groupNumber",
      width: 180,
      align: "center",
      key: "groupNumber",
      fixed: "left"
    },
    {
      title: "产品线",
      dataIndex: "product",
      width: 180,
      align: "center",
      key: "product",
      render: text => {
        return text != null ? text : "/";
      }
    },
    {
      title: "商品",
      dataIndex: "courseName",
      width: 180,
      align: "center",
      key: "courseName",
      render: text => {
        return text != null ? text : "/";
      }
    },
    {
      title: "营",
      dataIndex: "sellerCamp",
      width: 150,
      align: "center",
      key: "sellerCamp",
      render: text => {
        return text != null ? text : "/";
      }
    },
    {
      title: "组",
      dataIndex: "sellerGroup",
      width: 150,
      align: "center",
      key: "sellerGroup",
      render: text => {
        return text != null ? text : "/";
      }
    },
    {
      title: "销售",
      dataIndex: "sellerName",
      width: 120,
      align: "center",
      key: "sellerName",
      render: text => {
        return text != null ? text : "/";
      }
    },
    {
      title: "昵称",
      dataIndex: "sellerNickname",
      width: 140,
      align: "center",
      key: "sellerNickname",
      render: text => {
        return text != null ? text : "/";
      }
    },
    {
      title: "leads量",
      dataIndex: "leadsCount",
      width: 80,
      align: "center",
      key: "leadsCount",
      render: text => {
        return text != null ? text : "/";
      }
    },
    {
      title: "开群时间",
      dataIndex: "startTime",
      width: 140,
      align: "center",
      key: "startTime",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.startTime - b.startTime,
      render: (text, record) => {
        return text != null ? text : "/";
      }
    },
    {
      title: "销转天数",
      dataIndex: "days",
      width: 100,
      align: "center",
      key: "days",
      // defaultSortOrder: "descend",
      sorter: (a, b) => a.days - b.days,
      render: text => {
        return text != null ? text : "/";
      }
    },
    {
      title: "质检状态",
      dataIndex: "state",
      width: 100,
      align: "center",
      key: "state",
      render: text => {
        return text != null ? text : "/";
      }
    },
    {
      title: "操作",
      width: 150,
      align: "center",
      key: "operation",
      fixed: "right",
      render: (text, record) => {
        const { kgId } = record;

        return (
          <div className="operation" key={kgId}>
            <span onClick={() => onLink(kgId)}>本群详情</span>
          </div>
        );
      }
    }
  ];

  return (
    <Table
      {...props}
      bordered
      columns={columns}
      rowKey={record => record.groupNumber}
      size="middle"
      scroll={{ x: 1500, y: 800 }}
    />
  );
};

export default List;
