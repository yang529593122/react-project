import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SeleFrom from "./components/SeleFrom";
import LineChart from "../common/LineChart";

import "./index.css";

class GroupCharts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showcishu: false
    };
  }
  componentDidMount() {
    sessionStorage.setItem("startpagetime", new Date().valueOf());
    const { operationschart, match } = this.props;

    operationschart({
      days: "day1",
      index: "活跃度",
      kgId: match.params.id,
      memberType: ["学员"],
      timeDime: "一小时"
    });
  }
  componentWillUnmount() {
    const { pagetime } = this.props;
    pagetime.setPageTime({
      duration: new Date().valueOf() - sessionStorage.getItem("startpagetime"),
      action: 10004
    });
  }
  subbtn(data) {
    const { operationschart } = this.props;
    if (
      data.index === "说话次数" ||
      (data.index === "说话次数" && data.days === "全部")
    ) {
      this.setState({
        showcishu: true
      });
    } else {
      this.setState({
        showcishu: false
      });
    }
    operationschart(data);
  }
  render() {
    const { ChartParamData, mapData, showDayType } = this.props;
    const { showcishu } = this.state;

    return (
      <div className="group-charts-wrapper">
        <SeleFrom
          ChartParamData={ChartParamData}
          subbtn={this.subbtn.bind(this)}
        />
        {showDayType === 1 ? (
          <>
            {mapData && mapData.length ? (
              <LineChart id="quabbu" mapData={mapData} cishu={showcishu} />
            ) : null}
          </>
        ) : null}
        {showDayType === 2 ? (
          <>
            {mapData && mapData.length ? (
              <LineChart id="dayitem" mapData={mapData} cishu={showcishu} />
            ) : null}
          </>
        ) : null}
        {showDayType === 3 ? (
          <>
            {mapData && mapData.length ? (
              <LineChart id="zhengc" mapData={mapData} cishu={showcishu} />
            ) : null}
          </>
        ) : null}
      </div>
    );
  }
}
export default connect(
  ({ operations, pagetime }) => ({ ...operations, pagetime }),
  ({ operations, pagetime }) => ({ ...operations, pagetime })
)(withRouter(GroupCharts));
