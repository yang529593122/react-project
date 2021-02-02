import React, { Component } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import EditMessage from "./compontents/EditMessage";
import EditEvenInfo from "./compontents/EditEvenInfo";
import "./css/AddModel.less";
class EditorItem extends Component {
  state = {
    arr: ["通用事件", "事件一"],
    defaultIndex: 0
  };
  selectWarp(item, index) {
    this.setState({
      defaultIndex: index
    });
    if (index > 0) {
      localStorage.setItem("setgrounp", true);
    } else {
      localStorage.removeItem("setgrounp");
    }
  }

  addEventNavItem() {
    let oldarr = this.state.arr;
    let newarr = [];
    newarr.push(`事件一`);
    this.setState({
      arr: oldarr.concat(newarr),
      defaultIndex: 1
    });
    localStorage.setItem("setgrounp", true);
  }
  delenevtone() {
    this.setState({
      arr: ["通用事件"],
      defaultIndex: 0
    });
    localStorage.removeItem("setgrounp");
  }
  render() {
    const { arr, defaultIndex } = this.state;
    return (
      <div className="AddModel">
        <div className="AddModel-btn-list">
          {arr.map((item, index) => {
            return (
              <div
                key={index}
                className={index === defaultIndex ? "span-actived-color" : null}
              >
                <span
                  onClick={() => {
                    this.selectWarp(item, index);
                  }}
                >
                  {item}
                </span>
                {item === "事件一" ? (
                  <CloseOutlined onClick={this.delenevtone.bind(this)} />
                ) : null}
              </div>
            );
          })}
          {arr.length === 1 ? (
            <div onClick={this.addEventNavItem.bind(this)}>新增</div>
          ) : null}
        </div>
        <div className="AddModel-form-warp">
          <div className="AddModel-message">
            <EditMessage defaultIndex={defaultIndex} />
            <EditEvenInfo defaultIndex={defaultIndex} />
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
  ({ eventset }) => ({ ...eventset }),
  ({ eventset }) => ({ ...eventset })
)(EditorItem);
