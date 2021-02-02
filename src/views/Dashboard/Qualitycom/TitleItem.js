import React, { Component } from "react";
import "./index.less";
class TitleItem extends Component {
  render() {
    const { title } = this.props;
    return <div className="TitleItem">{title}</div>;
  }
}

export default TitleItem;
