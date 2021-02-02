import React, { Component } from "react";
import { connect } from "react-redux";
import { Select } from "antd";
import "./css/Message.less";
const { Option } = Select;
class Message extends Component {
  state = {};
  componentDidMount() {
    const { getDropdownbox, getGroupNumber } = this.props;
    getDropdownbox();
    getGroupNumber();
  }
  setCourseData(value) {
    const { setCourseDataFn } = this.props;
    setCourseDataFn(value);
  }
  setCourseName(value) {
    const { setCourseNameFn } = this.props;
    setCourseNameFn(value);
  }
  setGroupNumber(value) {
    const { setGroupNumberFn } = this.props;
    setGroupNumberFn(value);
  }
  render() {
    const {
      DropdownboxData,
      CourseData,
      defaultIndex,
      GroupNumberData
    } = this.props;
    return (
      <div className="Message">
        <h5>基本信息</h5>
        <div
          className={
            defaultIndex === 0 ? "Message-warp " : "Message-warp hiddrenwarp"
          }
        >
          <span></span>
          <div className="form-select-item">
            <h6>产品线</h6>
            <div>
              <Select
                style={{ width: 200 }}
                placeholder="请选择产品线"
                onChange={this.setCourseData.bind(this)}
              >
                {DropdownboxData && DropdownboxData.length
                  ? DropdownboxData.map((item, index) => {
                      return (
                        <Option key={item.product} value={item.product}>
                          {item.product}
                        </Option>
                      );
                    })
                  : null}
              </Select>
            </div>
          </div>
          <div className="form-select-item">
            <h6>课程</h6>
            <div>
              <Select
                style={{ width: 200 }}
                placeholder="请选择课程"
                onChange={this.setCourseName.bind(this)}
              >
                {CourseData && CourseData.length
                  ? CourseData.map((item, index) => {
                      return (
                        <Option key={item.courseId} value={item.courseId}>
                          {item.courseName}
                        </Option>
                      );
                    })
                  : null}
              </Select>
            </div>
          </div>
        </div>

        <div
          className={
            defaultIndex === 0 ? "Message-warp hiddrenwarp" : "Message-warp "
          }
        >
          <div className="form-select-item">
            <h6>选择社群</h6>
            <div>
              <Select
                style={{ width: 300 }}
                placeholder="可以选择多个社群"
                onChange={this.setGroupNumber.bind(this)}
                mode="tags"
              >
                {GroupNumberData && GroupNumberData.length
                  ? GroupNumberData.map((item, index) => {
                      return (
                        <Option key={item} value={item}>
                          {item}
                        </Option>
                      );
                    })
                  : null}
              </Select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
  ({ eventset }) => ({ ...eventset }),
  ({ eventset }) => ({ ...eventset })
)(Message);
