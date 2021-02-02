import React, { Component } from "react";
import "./css/WordItem.less";
class WordItem extends Component {
  state = {};
  render() {
    const { data, index } = this.props;
    return (
      <div className="WordItem">
        <div
          className={`icon_item ${index === 0 ? "first" : ""} ${
            index === 1 ? "two" : ""
          } ${index === 2 ? "three" : ""}`}
        >
          {data.id}
        </div>
        <div className="title_item">{data.title}</div>
        <div className="num_item">{data.value}</div>
      </div>
    );
  }
}

export default WordItem;
