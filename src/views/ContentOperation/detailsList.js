import React from 'react';
import { Table } from 'antd';
import { formatTime } from '../../utils/filter';

const List = ({ onLink, ...props }) => {
  const columns = [
    {
      title: '序号',
      dataIndex: 'members',
      width: 80,
      align: 'center',
      key: 'members',
    },
    {
      title: '公司名称',
      dataIndex: 'company',
      width: 200,
      align: 'center',
      key: 'company',
    },
    {
      title: '详情页图片',
      dataIndex: 'groupName',
      width: 250,
      align: 'center',
      key: 'groupName',
    },
    {
      title: '抓取时间',
      dataIndex: 'startTime',
      width: 200,
      align: 'center',
      key: 'startTime',
      render: text => formatTime(text),
    },
    {
      title: '是否变化',
      dataIndex: 'status',
      width: 120,
      align: 'center',
      key: 'status',
    },
  ];

  return <Table {...props} bordered columns={columns} rowKey={record => record.groupMd5Id} />;
};

export default List;
