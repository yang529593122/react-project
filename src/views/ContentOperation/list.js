import React from 'react';
import { Table } from 'antd';
import { formatTime } from '../../utils/filter';

const List = ({ onLink, ...props }) => {
  const columns = [
    {
      title: '公司名称',
      dataIndex: 'company',
      width: 200,
      align: 'center',
      key: 'company',
    },
    {
      title: '课程名称',
      dataIndex: '',
      width: 200,
      align: 'center',
      key: '',
    },
    {
      title: '详情页链接',
      dataIndex: 'groupName',
      width: 250,
      align: 'center',
      key: 'groupName',
    },
    {
      title: '最近变动时间',
      dataIndex: 'startTime',
      width: 200,
      align: 'center',
      key: 'startTime',
      render: text => formatTime(text),
    },
    {
      title: '操作',
      width: 100,
      align: 'center',
      key: 'operation',
      render: (text, record) => {
        const { groupMd5Id } = record;
        return (
          <div className="operation" key={groupMd5Id}>
            <span onClick={() => onLink(groupMd5Id)}>详情</span>
          </div>
        );
      },
    },
  ];

  return <Table {...props} bordered columns={columns} rowKey={record => record.groupMd5Id} />;
};

export default List;
