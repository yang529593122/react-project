import React, { Component } from "react";
import { Table } from "antd";

class UserList extends Component {
  state = {};
  pagefn(page, pagesize) {
    const { changepage } = this.props;
    changepage(page);
  }
  render() {
    const { columns, data } = this.props;
    return (
      <>
        {data ? (
          <Table
            style={{ marginTop: 30 }}
            columns={columns}
            dataSource={data.result}
            onChange={this.pagefn.bind(this)}
            pagination={{
              current: data.pageNum,
              pageSize: data.pageSize,
              total: data.totalElements,
              showTotal: totalPage => `共 ${data.totalElements} 条记录`
            }}
          />
        ) : null}
      </>
    );
  }
}

export default UserList;
