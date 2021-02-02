import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Space, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddKoyword from "./components/AddKoyword";
import EditKeyWords from "./components/EditKeyWords";
import "./Keywords.less";
class Keywords extends Component {
  state = {
    columns: [
      {
        title: "产品线",
        dataIndex: "productLine",
        key: "productLine",
        align: "center"
      },
      {
        title: "课程名称",
        dataIndex: "courseName",
        key: "courseName",
        align: "center"
      },
      {
        title: "关键词",
        dataIndex: "keywords",
        key: "keywords",
        align: "center"
      },
      {
        title: "操作",
        align: "center",
        render: (text, record) => (
          <Space size="middle">
            <span
              className="fontcoloritems"
              onClick={() => {
                this.editorItem(record);
              }}
            >
              编辑
            </span>
            <span
              className="fontcoloritems"
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
    itemData: null
  };
  componentDidMount() {
    const { getKeyWordData } = this.props;
    getKeyWordData({ pageNum: 1, pageSize: 20 });
  }
  delItem(item) {
    const { delKeywords } = this.props;
    delKeywords(item.courseId);
  }
  editorItem(item) {
    const { setKeywordshow } = this.props;
    this.setState({
      itemData: item
    });
    setKeywordshow(true);
  }
  showformword() {
    const { setshowformword } = this.props;
    setshowformword(true);
  }
  render() {
    const { columns, itemData } = this.state;
    const { KeyWordData, formKeyWords, Keywordshow } = this.props;
    return (
      <div className="Keywords">
        {formKeyWords ? <AddKoyword /> : null}
        {Keywordshow ? <EditKeyWords itemData={itemData} /> : null}
        <div className="Keywords-btn">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={this.showformword.bind(this)}
          >
            新增
          </Button>
        </div>
        <Table dataSource={KeyWordData} columns={columns} />
      </div>
    );
  }
}

export default connect(
  ({ keywords }) => ({ ...keywords }),
  ({ keywords }) => ({ ...keywords })
)(Keywords);
