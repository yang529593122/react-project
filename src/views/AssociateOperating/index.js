import React, { Component } from "react";
import InsideHead from "../../components/InsideHead";
import Selectitem from "./Selectitem";
import { CONTENT_HEAD } from "./data";
import "./index.less";
class AssociateOperating extends Component {
  state = {};
  componentDidMount() {
    sessionStorage.setItem("startpagetime", new Date().valueOf());
  }
  render() {
    return (
      <div className="AssociateOperating">
        <InsideHead contentHead={CONTENT_HEAD} />
        <div className="AssociateOperating-table">
          <Selectitem />
        </div>
      </div>
    );
  }
}

export default AssociateOperating;
