import React from 'react';
import { Table } from 'antd';

const ShareList = ({ ...props }) => {
  const columns = [
    {
      title: '时间',
      dataIndex: 'day',
      width: 200,
      align: 'center',
      key: 'day',
    },
    {
      title: '分享人数',
      dataIndex: 'shareNumber',
      width: 150,
      align: 'center',
      key: 'shareNumber',
    },
    {
      title: '分享率',
      dataIndex: 'sharePercentage',
      width: 120,
      align: 'center',
      key: 'sharePercentage',
    },
  ];

  return (
    <Table
      {...props}
      bordered
      columns={columns}
      rowKey={(record, index) => index}
      pagination={false}
    />
  );
};

export default ShareList;
