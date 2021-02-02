import React, { Component } from "react";
import { Table } from "antd";
import { TABLEB_COLUMNS } from "../data";
import "./Tablebox.less";

class Tablebox extends Component {
  render() {
    const { analyzeTableData } = this.props;
    return (
      <div className="Tablebox">
        <Table
          columns={TABLEB_COLUMNS}
          dataSource={analyzeTableData}
          pagination={false}
          bordered
          scroll={{ y: 440 }}
        />
      </div>
    );
  }
}

export default Tablebox;
