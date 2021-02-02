import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "antd";
import { BURIED_POINT } from "./data";

import MultiSelect from "./MultiSelect";
import TheRadio from "./TheRadio";
import "./css/SeleFrom.less";
class SeleFrom extends Component {
  state = {
    defaultArr: [],
    timeDime: "", // 一小时
    days: "", //天数
    index: "", // 活跃人数
    dayShow: true
  };
  componentDidMount() {
    const { ChartParamData } = this.props;
    let arr = [];
    arr.push({ text: ChartParamData.memberType[0], show: true });
    this.setState({
      defaultArr: arr,
      timeDime: ChartParamData.timeDime[0], // 一小时
      days: ChartParamData.days[0], //天数
      index: ChartParamData.index[0] // 活跃人数
    });
  }
  seleOchangIndex(val) {
    const { setBuriedPoint } = this.props;
    let pointArr = BURIED_POINT.filter(item => item.name === val);
    setBuriedPoint({ action: pointArr[0].num });
    this.setState({ index: val });
  }
  seleOchangTimeDime(val) {
    const { setBuriedPoint } = this.props;
    let pointArr = BURIED_POINT.filter(item => item.name === val);
    setBuriedPoint({ action: pointArr[0].num });
    this.setState({ timeDime: val });
    if (val === "一天") {
      this.setState({ dayShow: false });
    } else {
      const { ChartParamData } = this.props;
      this.setState({
        dayShow: true,
        days: ChartParamData.days[0] //天数
      });
    }
  }
  seleOchangDays(item) {
    this.setState({ days: item });
  }
  seleOchangMemberType(item) {
    this.setState({ defaultArr: item });
  }
  subForm() {
    const { defaultArr, days, timeDime, index, dayShow } = this.state;
    const { subbtn, match } = this.props;
    let arr = defaultArr.filter(item => item.show === true);
    let newarr = [];
    arr.map(item => newarr.push(item.text));
    let obj = {};
    if (dayShow) {
      obj.days = days;
    } else {
      obj.days = null;
    }

    obj.index = index;
    obj.kgId = match.params.id;
    obj.memberType = newarr;
    obj.timeDime = timeDime;
    subbtn(obj);
  }

  render() {
    const { ChartParamData } = this.props;
    const { dayShow } = this.state;
    return (
      <div className="SeleFrom">
        {ChartParamData && ChartParamData.memberType ? (
          <MultiSelect
            title="人群"
            data={ChartParamData.memberType}
            seleOchang={this.seleOchangMemberType.bind(this)}
          />
        ) : (
          ""
        )}
        {ChartParamData && ChartParamData.index ? (
          <TheRadio
            title="指标"
            data={ChartParamData.index}
            seleOchang={this.seleOchangIndex.bind(this)}
          />
        ) : (
          ""
        )}
        {ChartParamData && ChartParamData.timeDime ? (
          <TheRadio
            title="统计维度"
            data={ChartParamData.timeDime}
            seleOchang={this.seleOchangTimeDime.bind(this)}
          />
        ) : (
          ""
        )}
        {dayShow && ChartParamData && ChartParamData.days ? (
          <TheRadio
            title="天数"
            data={ChartParamData.days}
            seleOchang={this.seleOchangDays.bind(this)}
          />
        ) : (
          ""
        )}
        <div className="SeleFrom_btn">
          <Button type="primary" onClick={this.subForm.bind(this)}>
            确认
          </Button>
        </div>
      </div>
    );
  }
}
export default connect(
  ({ operations }) => ({ ...operations }),
  ({ operations }) => ({ ...operations })
)(withRouter(SeleFrom));
