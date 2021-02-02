import React, { Component } from "react";
import { Input } from "antd";
import "./GroupItem.less";
class GroupItem extends Component {
  state = {};
  tapclick(item) {
    if (this.props.handleSelect) {
      this.props.handleSelect(item);
    }
  }
  SwitchCourse() {
    this.props.handleSwitchCourse();
  }
  AddCourse() {
    this.props.handleAddCourse();
  }
  ClickClose() {
    this.props.handleClickClose();
  }
  ClickReally() {
    this.props.handleClickReally();
  }
  render() {
    const { title, data, GroupItemBtn, titlelist } = this.props;
    return (
      <div className="GroupItem">
        <div className="GroupItem_title">
          <div className="GroupItem_title_left">{title}</div>
        </div>
        <div className="input_list">
          <Input placeholder="请输入课程ID" />
        </div>

        {GroupItemBtn ? (
          <div className="GroupItem_btn">
            <div
              className="GroupItem_btn_close"
              onClick={this.ClickClose.bind(this)}
            >
              取消
            </div>
            <div onClick={this.ClickReally.bind(this)}>确定</div>
          </div>
        ) : (
          ""
        )}
        <div className="GroupItem_title">
          <div className="GroupItem_title_left">{titlelist}</div>
        </div>
        <div className="GroupItem_list add_list">
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className={`GroupItem_list_item ${item.show ? "active" : ""}`}
                onClick={this.tapclick.bind(this, item)}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default GroupItem;
