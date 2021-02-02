import React, { Component } from "react";
import "./css/ClassGroupItem.less";
import { CloseOutlined } from "@ant-design/icons";
class ClassGroupItem extends Component {
  state = {};
  delItem(value) {
    const { delItemLine } = this.props;
    delItemLine(value);
  }
  render() {
    const { itemdata } = this.props;
    return (
      <div className="ClassGroupItem">
        <span className="ClassGroupItem_title">
          {itemdata.title}({itemdata.num})
        </span>
        <CloseOutlined
          className="click_btn"
          onClick={() => {
            this.delItem(itemdata);
          }}
        />
      </div>
    );
  }
}

export default ClassGroupItem;
