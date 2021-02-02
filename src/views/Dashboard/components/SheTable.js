import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "antd";
class SheTable extends Component {
  render() {
    const { dataSource, columns } = this.props;
    return (
      <div className="SheTable" style={{ borderBottom: "1px solid #f0f0f0" }}>
        <Table
          dataSource={dataSource}
          columns={columns}
          scroll={{ x: "100%", y: 300 }}
          pagination={false}
          bordered
        />
      </div>
    );
  }
}
export default connect(
  ({ dashboard }) => ({ ...dashboard }),
  ({ dashboard }) => ({ ...dashboard })
)(SheTable);
