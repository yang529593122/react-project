import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Select, Table } from "antd";
import "./css/index.less";
const { Option } = Select;
const style = {
  width: 78,
  height: 34
};
class Details extends Component {
  state = {
    columns: [
      {
        title: "微信群名称",
        dataIndex: "groupName",
        width: 220,
        align: "center",
        key: "groupName"
      },
      {
        title: "时间",
        dataIndex: "convertDate",
        width: 140,
        align: "center",
        key: "convertDate"
      },
      {
        title: "主运营者",
        dataIndex: "primaryOperatorName",
        width: 180,
        align: "center",
        key: "primaryOperatorName",
        render: text => {
          return text != null ? text : "/";
        }
      },
      {
        title: "群人数",
        dataIndex: "peopleCount",
        width: 80,
        align: "center",
        key: "peopleCount"
      },
      {
        title: "群人数(除水军)",
        dataIndex: "dewater",
        width: 90,
        align: "center",
        key: "dewater"
      },
      {
        title: "对话数",
        dataIndex: "dialogueCount",
        width: 100,
        align: "center",
        key: "dialogueCount"
      },
      {
        title: "对话数(运营者)",
        dataIndex: "primaryOperatorDialogueCount",
        width: 90,
        align: "center",
        key: "primaryOperatorDialogueCount"
      },
      {
        title: "活跃人数",
        dataIndex: "activeCount",
        width: 90,
        align: "center",
        key: "activeCount"
      },
      {
        title: "是否质检",
        dataIndex: "state",
        width: 100,
        align: "center",
        key: "state",
        render: (text, record) => {
          const defaultValue = text === 0 ? "0" : "1";
          return (
            <Select
              className="details-list-select-box"
              defaultValue={defaultValue}
              style={style}
              onChange={val => this.handleChange(val, record)}
            >
              <Option value="0">否</Option>
              <Option value="1">是</Option>
            </Select>
          );
        }
      },
      {
        title: "质检问题",
        dataIndex: "problemCount",
        width: 100,
        align: "center",
        key: "problemCount",
        render: (text, record) => {
          return text != null ? (
            <a
              onClick={() => {
                this.cancel(record);
              }}
            >
              {text}
            </a>
          ) : (
            "/"
          );
        }
      }
    ]
  };
  componentDidMount() {
    const { preview, match } = this.props;
    preview(match.params.id);
  }
  handleChange(value, record) {
    const { getUpdateQualityInspectionStatus } = this.props;
    const query = {
      convertDate: record.convertDate,
      kgId: record.kgId,
      state: Number(value)
    };
    getUpdateQualityInspectionStatus(query);
  }
  cancel(record) {
    this.props.history.push(
      `/app/qualityinspection/dayinfo?kgId=${record.kgId}&convertDate=${record.convertDate}`
    );
  }
  render() {
    const { columns } = this.state;
    const { detailsList } = this.props;
    return (
      <div className="keynodes_warp">
        <Table
          columns={columns}
          dataSource={detailsList}
          rowKey={(record, index) => index}
          pagination={false}
        />
      </div>
    );
  }
}

export default connect(
  ({ keynodes }) => ({ ...keynodes }),
  ({ keynodes }) => ({ ...keynodes })
)(withRouter(Details));
