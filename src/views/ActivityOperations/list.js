import React from 'react';
import { Table, Popconfirm } from 'antd';
import { formatTime } from '../../utils/filter';
import './index.css';

const List = ({ onDel, ...props }) => {
  const columns = [
    {
      title: '公司名称',
      dataIndex: 'company',
      width: 200,
      align: 'center',
      key: 'company',
    },
    {
      title: '渠道',
      dataIndex: 'course',
      width: 200,
      align: 'center',
      key: '',
    },
    {
      title: '账号',
      dataIndex: 'groupName',
      width: 150,
      align: 'center',
      key: 'groupName',
    },
    {
      title: '发布时间',
      dataIndex: 'startTime',
      width: 200,
      align: 'center',
      key: 'startTime',
      render: text => formatTime(text),
    },
    {
      title: '文案标题',
      dataIndex: 'operator',
      width: 120,
      align: 'center',
      key: 'operator',
    },
    {
      title: '文案',
      dataIndex: 'members',
      width: 120,
      align: 'center',
      key: 'members',
    },
    {
      title: '关键词',
      dataIndex: 'status',
      width: 120,
      align: 'center',
      key: 'status',
    },
    {
      title: '抓取时间',
      dataIndex: 'crawlDate',
      width: 200,
      align: 'center',
      key: 'crawlDate',
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
            <Popconfirm
              placement="topRight"
              title="你确定要删除这行内容吗？"
              onConfirm={() => {
                onDel(groupMd5Id);
              }}
              okText="确 定"
              cancelText="取 消"
            >
              删除
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return <Table {...props} bordered columns={columns} rowKey={record => record.groupMd5Id} />;
};

export default List;
