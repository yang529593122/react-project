import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Table, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddModel from "./AddModel";
import EditorItem from "./EditorItem";

import "./css/EventSet.less";

class EventSet extends Component {
  state = {
    columns: [
      {
        title: "产品线",
        dataIndex: "product",
        key: "product"
      },
      {
        title: "课程",
        dataIndex: "course",
        key: "course"
      },
      {
        title: "操作",
        render: (text, record) => (
          <Space size="middle">
            <span
              className="fontColor"
              onClick={() => {
                this.editorItem(record);
              }}
            >
              编辑
            </span>
            <span
              className="fontColor"
              onClick={() => {
                this.delItem(record);
              }}
            >
              移除
            </span>
          </Space>
        )
      }
    ],
    EditorItemShow: false,
    visible: false
  };
  componentDidMount() {
    const { getEventList } = this.props;
    getEventList();
  }
  delItem(item) {
    const { detEventItem } = this.props;
    detEventItem(item.courseId);
  }
  editorItem(item) {
    const { editorItemFn } = this.props;
    editorItemFn(item.courseId);
    this.setState({
      EditorItemShow: true
    });
    localStorage.setItem("EditorItemShow", true);
  }

  setVisible = show => {
    const { getEventList } = this.props;
    this.setState({
      visible: show
    });
    getEventList();
  };
  showform() {
    this.setState({
      visible: true
    });
    localStorage.removeItem("EditorItemShow");
    localStorage.removeItem("setgrounp");
  }
  render() {
    const { EventList } = this.props;
    const { columns, visible, EditorItemShow } = this.state;
    return (
      <div className="EventSet">
        {visible || EditorItemShow ? null : (
          <div className="EventSet_top">
            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={this.showform.bind(this)}
            >
              新增
            </Button>
          </div>
        )}

        {visible ? (
          <AddModel />
        ) : (
          <div>
            {EditorItemShow ? (
              <EditorItem />
            ) : (
              <Table
                className="table-warp"
                columns={columns}
                dataSource={EventList}
                pagination={false}
                rowKey={(record, index) => index}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}
export default connect(
  ({ eventset }) => ({ ...eventset }),
  ({ eventset }) => ({ ...eventset })
)(EventSet);
