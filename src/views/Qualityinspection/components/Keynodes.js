import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Table, Tag, Space } from "antd";
import "./css/keynodes.css";
class Keynodes extends Component {
  state = {
    columns: [
      {
        title: "关键节点",
        dataIndex: "pointName",
        width: 100,
        align: "center",
        key: "pointName"
      },
      {
        title: "天数",
        dataIndex: "days",
        width: 100,
        align: "center",
        key: "days"
      },
      {
        title: "时间段",
        dataIndex: "period",
        width: 200,
        align: "center",
        key: "period"
      },
      {
        title: "完成情况",
        dataIndex: "finishStatus",
        width: 120,
        align: "center",
        key: "finishStatus",
        render: text => {
          return (
            <div>
              {this.round(text)}
              {text}
            </div>
          );
        }
      },
      {
        title: "达标情况",
        dataIndex: "upToStandard",
        width: 120,
        align: "center",
        key: "upToStandard",
        render: (text, record) => {
          return (
            <div>
              {this.round(record.ok)}
              {text}
            </div>
          );
        }
      },
      {
        title: "标准",
        dataIndex: "standard",
        width: 120,
        align: "center",
        key: "standard",
        render: text => {
          return text != null ? { text } : "/";
        }
      }
    ]
  };
  round(val) {
    if (val === "完成" || val === true) {
      return <span className="round-color-box round-success" />;
    } else if (val === "失败" || val === false) {
      return <span className="round-color-box round-failure" />;
    } else if (val === "未开始") {
      return <span className="round-color-box round-not" />;
    } else {
      return <span className="round-color-box round-no" />;
    }
  }
  componentDidMount() {
    const { getKeynodesData, match } = this.props;
    getKeynodesData(match.params.id);
  }
  render() {
    const { columns } = this.state;
    const { KeynodesData } = this.props;
    return (
      <div className="keynodes_warp">
        <Table columns={columns} dataSource={KeynodesData} pagination={false} />
      </div>
    );
  }
}

export default connect(
  ({ keynodes }) => ({ ...keynodes }),
  ({ keynodes }) => ({ ...keynodes })
)(withRouter(Keynodes));
