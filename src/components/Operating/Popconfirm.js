import React from 'react';
import { Button } from 'antd';
import { FundViewOutlined, FallOutlined } from '@ant-design/icons';
import './index.css';

const Popconfirms = props => {
  function herf(boolean) {
    window.open(`/operations/community/view?groupMd5Id=${props.md5}&operator=${boolean}`);
  }
  // 全部
  function confirm() {
    herf(false);
  }

  // 运营者
  function cancel() {
    herf(true);
  }

  return (
    <div>
      <Button
        type="dashed"
        className="exportBox"
        onClick={() => {
          cancel();
        }}
        icon={<FundViewOutlined />}
      >
        运营者话术
      </Button>
      <Button
        type="dashed"
        className="exportBox"
        onClick={() => {
          confirm();
        }}
        icon={<FallOutlined />}
      >
        全部话术
      </Button>
    </div>
  );
};

export default Popconfirms;
