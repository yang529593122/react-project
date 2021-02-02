import React, { Component } from "react";
import { connect } from "react-redux";
import { Select, Input, Button, TimePicker } from "antd";
import moment from "moment";
import { PlusOutlined } from "@ant-design/icons";
import "./css/EvenInfo.less";
import { STANDARD_LIST, DAYS_LIST } from "./data";
const { Option } = Select;
class Message extends Component {
  state = {};
  componentDidMount() {}
  addDays() {
    const { addDaysFn } = this.props;
    addDaysFn();
  }
  setDays(index, val) {
    const { setDaysFn } = this.props;
    let obj = { index, val };
    setDaysFn(obj);
  }
  setStandard(index, nodeindex, val) {
    const { setStandardFn } = this.props;
    const obj = {
      index,
      nodeindex,
      val
    };
    setStandardFn(obj);
  }
  setNodes(index, nodeindex, val) {
    const value = val.target.value;
    const obj = {
      index,
      nodeindex,
      value
    };
    const { setNodesFn } = this.props;
    setNodesFn(obj);
  }
  setSellerKeyword(index, nodeindex, val) {
    const value = val.target.value;
    const obj = {
      index,
      nodeindex,
      value
    };
    const { setSellerKeywordFn } = this.props;
    setSellerKeywordFn(obj);
  }
  setMemberKeyword(index, nodeindex, val) {
    const value = val.target.value;
    const obj = {
      index,
      nodeindex,
      value
    };
    const { setMemberKeywordFn } = this.props;
    setMemberKeywordFn(obj);
  }
  setMemberStartTime(index, nodeindex, memberStartTime) {
    const { setMemberStartTimeFn } = this.props;
    const obj = { index, nodeindex, memberStartTime };
    setMemberStartTimeFn(obj);
  }
  setMemberEndTime(index, nodeindex, memberEndTime) {
    const { setMemberEndTimeFn } = this.props;
    const obj = { index, nodeindex, memberEndTime };
    setMemberEndTimeFn(obj);
  }
  setSellerSartTime(index, nodeindex, sellerSartTime) {
    const { setSellerSartTimeFn } = this.props;
    const obj = { index, nodeindex, sellerSartTime };
    setSellerSartTimeFn(obj);
  }
  setSellerEndTime(index, nodeindex, sellerEndTime) {
    const { setSellerEndTimeFn } = this.props;
    const obj = { index, nodeindex, sellerEndTime };
    setSellerEndTimeFn(obj);
  }
  submitFn() {
    const {
      courseId,
      courseName,
      product,
      subFormDataFn,
      EditorCommonConfig,
      EditorExtendConfig,
      groupNumberList
    } = this.props;
    let commonConfig = {}; // 通用事件
    let extendConfig = {}; // 事件一
    if (localStorage.getItem("EditorItemShow")) {
      let arr = [];
      for (let i = 0; i < EditorCommonConfig.length; i++) {
        for (let j = 0; j < EditorCommonConfig[i].nodes.length; j++) {
          let obj = {
            days: EditorCommonConfig[i].days,
            memberEndTime: EditorCommonConfig[i].nodes[j].memberEndTime,
            memberKeyword: EditorCommonConfig[i].nodes[j].memberKeyword,
            memberStartTime: EditorCommonConfig[i].nodes[j].memberStartTime,
            pointName: EditorCommonConfig[i].nodes[j].pointName,
            sellerEndTime: EditorCommonConfig[i].nodes[j].sellerEndTime,
            sellerKeyword: EditorCommonConfig[i].nodes[j].sellerKeyword,
            sellerSartTime: EditorCommonConfig[i].nodes[j].sellerSartTime,
            standard: EditorCommonConfig[i].nodes[j].standard
          };
          arr.push(obj);
        }
        commonConfig.course = courseName;
        commonConfig.product = product;
        commonConfig.courseId = courseId;
        commonConfig.commentEvent = arr;
      }
      if (localStorage.getItem("setgrounp")) {
        let arra = [];
        for (let i = 0; i < EditorExtendConfig.length; i++) {
          for (let j = 0; j < EditorExtendConfig[i].nodes.length; j++) {
            let obj = {
              days: EditorExtendConfig[i].days,
              memberEndTime: EditorExtendConfig[i].nodes[j].memberEndTime,
              memberKeyword: EditorExtendConfig[i].nodes[j].memberKeyword,
              memberStartTime: EditorExtendConfig[i].nodes[j].memberStartTime,
              pointName: EditorExtendConfig[i].nodes[j].pointName,
              sellerEndTime: EditorExtendConfig[i].nodes[j].sellerEndTime,
              sellerKeyword: EditorExtendConfig[i].nodes[j].sellerKeyword,
              sellerSartTime: EditorExtendConfig[i].nodes[j].sellerSartTime,
              standard: EditorExtendConfig[i].nodes[j].standard
            };
            arra.push(obj);
          }
          extendConfig.courseId = courseId;
          extendConfig.extendEvent = arra;
          extendConfig.groupNumberList = groupNumberList;
        }
      } else {
        extendConfig = {};
      }
      let obj = {};
      obj.commonConfig = commonConfig;
      obj.extendConfig = extendConfig;
      subFormDataFn(obj);
    }
  }
  canceForm() {
    const { canceFormFn } = this.props;
    canceFormFn();
    window.location.href = "/app/monitor/quality";
  }
  deleitem(index) {
    const { deleitemFn } = this.props;
    deleitemFn(index);
  }
  addnodes(dayindex, nodesindex) {
    const { addnodesFn } = this.props;
    const obj = { dayindex, nodesindex };
    addnodesFn(obj);
  }
  delenodes(dayindex, nodesindex) {
    const { delenodesFn } = this.props;
    const obj = { dayindex, nodesindex };
    delenodesFn(obj);
  }
  render() {
    const { EditorCommonConfig, defaultIndex, EditorExtendConfig } = this.props;

    return (
      <div className="EvenInfo">
        <h5>事件设置</h5>
        <div
          className={
            defaultIndex === 0 ? "EvenInfo-warp" : "EvenInfo-warp hiddrenwarp"
          }
        >
          <div className="EvenInfo-adddays" onClick={this.addDays.bind(this)}>
            <Button type="primary" shape="round" icon={<PlusOutlined />}>
              新增天数
            </Button>
          </div>
          <div className="EvenInfo-days">
            {EditorCommonConfig &&
              EditorCommonConfig.map((dayitem, dayindex) => {
                return (
                  <div key={dayindex} className="EvenInfo-days-items">
                    <div className="EvenInfo-days-items-day">
                      <div className="seleitem-header">
                        <Select
                          showSearch
                          style={{ width: 200 }}
                          placeholder="请选择天数"
                          className="EvenInfo-days-items-day-selebtn"
                          onChange={value => {
                            this.setDays(dayindex, value);
                          }}
                          value={dayitem.days}
                        >
                          {DAYS_LIST.map((dayseleitem, dayseleindex) => {
                            return (
                              <Option
                                key={dayseleitem.id}
                                value={dayseleitem.id}
                              >
                                {dayseleitem.value}
                              </Option>
                            );
                          })}
                        </Select>
                        {dayitem.deleteMark ? (
                          <div
                            className="seleitem-delbtn"
                            onClick={() => {
                              this.deleitem(dayindex);
                            }}
                          >
                            删除
                          </div>
                        ) : null}
                      </div>

                      {dayitem.nodes.map((nodesitems, nodesindex) => {
                        return (
                          <div className="EvenInfo-nodes-lsit" key={nodesindex}>
                            <div className="form-select-item">
                              <h6>社群节点</h6>
                              <div>
                                <Input
                                  placeholder="请输入社群节点"
                                  onChange={value => {
                                    this.setNodes(dayindex, nodesindex, value);
                                  }}
                                  value={nodesitems.pointName}
                                />
                              </div>
                              <div
                                className="addnodesbtn"
                                onClick={() => {
                                  this.addnodes(dayindex, nodesindex);
                                }}
                              >
                                新增
                              </div>
                              {nodesitems.deleteMark ? (
                                <div
                                  className="addnodesbtn"
                                  onClick={() => {
                                    this.delenodes(dayindex, nodesindex);
                                  }}
                                >
                                  删除
                                </div>
                              ) : null}
                            </div>
                            <div className="border-color">
                              <h2>质检设置</h2>
                              <div className="form-select-item">
                                <h6>关键词语</h6>
                                <div>
                                  <Input
                                    placeholder="请输入关键词语"
                                    onChange={value => {
                                      this.setSellerKeyword(
                                        dayindex,
                                        nodesindex,
                                        value
                                      );
                                    }}
                                    value={nodesitems.sellerKeyword}
                                  />
                                </div>
                              </div>
                              <div className="form-select-item">
                                <h6>开始时间</h6>
                                <div>
                                  <TimePicker
                                    onChange={(value, dateString) => {
                                      this.setSellerSartTime(
                                        dayindex,
                                        nodesindex,
                                        dateString
                                      );
                                    }}
                                    value={moment(
                                      nodesitems.sellerSartTime || "00:00:00",
                                      "HH:mm:ss"
                                    )}
                                  />
                                </div>
                              </div>
                              <div className="form-select-item">
                                <h6>结束时间</h6>
                                <div>
                                  <TimePicker
                                    onChange={(value, dateString) => {
                                      this.setSellerEndTime(
                                        dayindex,
                                        nodesindex,
                                        dateString
                                      );
                                    }}
                                    value={moment(
                                      nodesitems.sellerEndTime || "00:00:00",
                                      "HH:mm:ss"
                                    )}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="border-color">
                              <h2>达标设置</h2>
                              <div className="form-select-item">
                                <h6>关键内容</h6>
                                <div>
                                  <Input
                                    placeholder="请输入关键内容"
                                    onChange={value => {
                                      this.setMemberKeyword(
                                        dayindex,
                                        nodesindex,
                                        value
                                      );
                                    }}
                                    value={nodesitems.memberKeyword}
                                  />
                                </div>
                              </div>
                              <div className="form-select-item">
                                <h6>开始时间</h6>
                                <div>
                                  <TimePicker
                                    onChange={(value, dateString) => {
                                      this.setMemberStartTime(
                                        dayindex,
                                        nodesindex,
                                        dateString
                                      );
                                    }}
                                    value={moment(
                                      nodesitems.memberStartTime || "00:00:00",
                                      "HH:mm:ss"
                                    )}
                                  />
                                </div>
                              </div>
                              <div className="form-select-item">
                                <h6>结束时间</h6>
                                <div>
                                  <TimePicker
                                    onChange={(value, dateString) => {
                                      this.setMemberEndTime(
                                        dayindex,
                                        nodesindex,
                                        dateString
                                      );
                                    }}
                                    value={moment(
                                      nodesitems.memberEndTime || "00:00:00",
                                      "HH:mm:ss"
                                    )}
                                  />
                                </div>
                              </div>
                              <div className="form-select-item">
                                <h6>达标标准</h6>
                                <div>
                                  <Select
                                    showSearch
                                    style={{ width: 300 }}
                                    placeholder="请选择达标标准，此标准为百分比"
                                    onChange={value => {
                                      this.setStandard(
                                        dayindex,
                                        nodesindex,
                                        value
                                      );
                                    }}
                                    value={nodesitems.standard}
                                  >
                                    {STANDARD_LIST.map(standarditem => {
                                      return (
                                        <Option
                                          key={standarditem}
                                          value={standarditem}
                                        >
                                          {standarditem}
                                        </Option>
                                      );
                                    })}
                                  </Select>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div
          className={
            defaultIndex === 0 ? "EvenInfo-warp hiddrenwarp" : "EvenInfo-warp "
          }
        >
          <div className="EvenInfo-adddays" onClick={this.addDays.bind(this)}>
            <Button type="primary" shape="round" icon={<PlusOutlined />}>
              新增天数
            </Button>
          </div>
          <div className="EvenInfo-days">
            {EditorExtendConfig &&
              EditorExtendConfig.map((dayitem, dayindex) => {
                return (
                  <div key={dayindex} className="EvenInfo-days-items">
                    <div className="EvenInfo-days-items-day">
                      <div className="seleitem-header">
                        <Select
                          showSearch
                          style={{ width: 200 }}
                          placeholder="请选择天数"
                          className="EvenInfo-days-items-day-selebtn"
                          onChange={value => {
                            this.setDays(dayindex, value);
                          }}
                          value={dayitem.days}
                        >
                          {DAYS_LIST.map((dayseleitem, dayseleindex) => {
                            return (
                              <Option
                                key={dayseleitem.id}
                                value={dayseleitem.id}
                              >
                                {dayseleitem.value}
                              </Option>
                            );
                          })}
                        </Select>
                        {dayitem.deleteMark ? (
                          <div
                            className="seleitem-delbtn"
                            onClick={() => {
                              this.deleitem(dayindex);
                            }}
                          >
                            删除
                          </div>
                        ) : null}
                      </div>

                      {dayitem.nodes.map((nodesitems, nodesindex) => {
                        return (
                          <div className="EvenInfo-nodes-lsit" key={nodesindex}>
                            <div className="form-select-item">
                              <h6>社群节点</h6>
                              <div>
                                <Input
                                  placeholder="请输入社群节点"
                                  onChange={value => {
                                    this.setNodes(dayindex, nodesindex, value);
                                  }}
                                  value={nodesitems.pointName}
                                />
                              </div>
                              <div
                                className="addnodesbtn"
                                onClick={() => {
                                  this.addnodes(dayindex, nodesindex);
                                }}
                              >
                                新增
                              </div>
                              {nodesitems.deleteMark ? (
                                <div
                                  className="addnodesbtn"
                                  onClick={() => {
                                    this.delenodes(dayindex, nodesindex);
                                  }}
                                >
                                  删除
                                </div>
                              ) : null}
                            </div>
                            <div className="border-color">
                              <h2>质检设置</h2>
                              <div className="form-select-item">
                                <h6>关键词语</h6>
                                <div>
                                  <Input
                                    placeholder="请输入关键词语"
                                    onChange={value => {
                                      this.setSellerKeyword(
                                        dayindex,
                                        nodesindex,
                                        value
                                      );
                                    }}
                                    value={nodesitems.sellerKeyword}
                                  />
                                </div>
                              </div>
                              <div className="form-select-item">
                                <h6>开始时间</h6>
                                <div>
                                  <TimePicker
                                    onChange={(value, dateString) => {
                                      this.setSellerSartTime(
                                        dayindex,
                                        nodesindex,
                                        dateString
                                      );
                                    }}
                                    value={moment(
                                      nodesitems.sellerSartTime || "00:00:00",
                                      "HH:mm:ss"
                                    )}
                                  />
                                </div>
                              </div>
                              <div className="form-select-item">
                                <h6>结束时间</h6>
                                <div>
                                  <TimePicker
                                    onChange={(value, dateString) => {
                                      this.setSellerEndTime(
                                        dayindex,
                                        nodesindex,
                                        dateString
                                      );
                                    }}
                                    value={moment(
                                      nodesitems.sellerEndTime || "00:00:00",
                                      "HH:mm:ss"
                                    )}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="border-color">
                              <h2>达标设置</h2>
                              <div className="form-select-item">
                                <h6>关键内容</h6>
                                <div>
                                  <Input
                                    placeholder="请输入关键内容"
                                    onChange={value => {
                                      this.setMemberKeyword(
                                        dayindex,
                                        nodesindex,
                                        value
                                      );
                                    }}
                                    value={nodesitems.memberKeyword}
                                  />
                                </div>
                              </div>
                              <div className="form-select-item">
                                <h6>开始时间</h6>
                                <div>
                                  <TimePicker
                                    onChange={(value, dateString) => {
                                      this.setMemberStartTime(
                                        dayindex,
                                        nodesindex,
                                        dateString
                                      );
                                    }}
                                    value={moment(
                                      nodesitems.memberStartTime || "00:00:00",
                                      "HH:mm:ss"
                                    )}
                                  />
                                </div>
                              </div>
                              <div className="form-select-item">
                                <h6>结束时间</h6>
                                <div>
                                  <TimePicker
                                    onChange={(value, dateString) => {
                                      this.setMemberEndTime(
                                        dayindex,
                                        nodesindex,
                                        dateString
                                      );
                                    }}
                                    value={moment(
                                      nodesitems.memberEndTime || "00:00:00",
                                      "HH:mm:ss"
                                    )}
                                  />
                                </div>
                              </div>
                              <div className="form-select-item">
                                <h6>达标标准</h6>
                                <div>
                                  <Select
                                    showSearch
                                    style={{ width: 300 }}
                                    placeholder="请选择达标标准，此标准为百分比"
                                    onChange={value => {
                                      this.setStandard(
                                        dayindex,
                                        nodesindex,
                                        value
                                      );
                                    }}
                                    value={nodesitems.standard}
                                  >
                                    {STANDARD_LIST.map(standarditem => {
                                      return (
                                        <Option
                                          key={standarditem}
                                          value={standarditem}
                                        >
                                          {standarditem}
                                        </Option>
                                      );
                                    })}
                                  </Select>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="btnlist-sub">
          <Button
            type="primary"
            shape="round"
            onClick={this.submitFn.bind(this)}
            className="btn-item"
          >
            提交
          </Button>
          <Button
            shape="round"
            className="btn-item"
            onClick={this.canceForm.bind(this)}
          >
            取消
          </Button>
        </div>
      </div>
    );
  }
}
export default connect(
  ({ eventset }) => ({ ...eventset }),
  ({ eventset }) => ({ ...eventset })
)(Message);
