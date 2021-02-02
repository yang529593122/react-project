import React, { Component } from "react";
import { Input } from "antd";

import "./GroupItem.less";

const { Search } = Input;
class GroupItem extends Component {
  state = {
    defIndex: null
  };
  tapclick(item, index) {
    if (this.props.GroupItemBtn) {
      this.setState({
        defIndex: index
      });
    }
    this.props.handleSelect(item);
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
  onSearch = value => this.props.handleSearch(value);
  render() {
    const { title, showbtn, data, GroupItemBtn, num,seacrchbtn } = this.props;
    const { defIndex } = this.state;
    return (
      <div className="GroupItem">
        <div className="GroupItem_title">
          <div className="GroupItem_title_left">
            <span>{title}</span>
            {num ? <span>({num})</span> : null}
          </div>
          {showbtn ? (
            <div className="GroupItem_title_right">
              <span onClick={this.SwitchCourse.bind(this)}>切换</span>
              {/* <span onClick={this.AddCourse.bind(this)}>添加</span> */}
            </div>
          ) : (
            ""
          )}
          
          
        </div>
          {
              seacrchbtn ? (<div className="wfzsearch">
              <Search
                placeholder="请输入社群名称"
                onSearch={this.onSearch}
                enterButton
              />
            </div>) : ''
            }
            {GroupItemBtn ? (
            <div className="wfzsearch">
            <Search
              placeholder="请输入课程名称"
              onSearch={this.onSearch}
              enterButton
            />
          </div>
          ) : (
            ""
          )}
        {GroupItemBtn ? (
          <div className="GroupItem_list">
            {data &&
              data.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`GroupItem_list_item ${
                      defIndex === index ? "active" : ""
                    }`}
                    onClick={this.tapclick.bind(this, item, index)}
                  >
                    （{item.courseId || ""}） {item.groupName}
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="GroupItem_list">
            {data &&
              data.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`GroupItem_list_item ${
                      item.show ? "active" : ""
                    }`}
                    onClick={this.tapclick.bind(this, item)}
                  >
                    {item.groupName}
                  </div>
                );
              })}
          </div>
        )}

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
      </div>
    );
  }
}

export default GroupItem;
