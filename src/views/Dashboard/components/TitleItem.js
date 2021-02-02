import React, { Component } from "react";
import "./css/TitleItem.less";
class TitleItem extends Component {
  state = {};
  componentDidMount() {}
  render() {
    const { title } = this.props;
    return <div className="TitleItem">{title}</div>;
  }
}

export default TitleItem;
