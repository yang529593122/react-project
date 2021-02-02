import React, { Component } from "react";
import { connect } from "react-redux";
// import { CONTENT_HEAD_DETAILS } from "./data";
import InsideHead from "../../components/InsideHead";
import styles from "./style.module.styl";
import { Tabs } from "antd";
import List from "./detailsList";
import Popconfirm from "../../components/Operating/Popconfirm";
import GroupCharts from "../../components/Operating/GroupCharts";
import { BURIED_POINT } from "../../components/Operating/components/data";
const { TabPane } = Tabs;

class CommunityOperating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDay: "",
      replyDay: "",
      CONTENT_HEAD_DETAILS: {
        title: `课程名称: ${
          JSON.parse(localStorage.getItem("itemGyoupData")).courseName
        }`,
        describe: `群号: ${
          JSON.parse(localStorage.getItem("itemGyoupData")).groupNumber
        }`,
        data: [
          {
            href: "",
            title: "运营"
          },
          {
            href: "/app/operations/community",
            title: "社群运营"
          },
          {
            href: "",
            title: "社群详情页"
          }
        ]
      }
    };
  }

  componentDidMount() {
    sessionStorage.setItem("startpagetime", new Date().valueOf());
    const {
      match: {
        params: { id }
      },
      preview,
      getChartParam
    } = this.props;
    if (id) {
      preview(id);
    }
    getChartParam();
  }
  componentWillUnmount() {
    const { pagetime } = this.props;
    pagetime.setPageTime({
      duration: new Date().valueOf() - sessionStorage.getItem("startpagetime"),
      action: 10003
    });
  }
  get listProps() {
    const {
      list,
      match: {
        params: { id }
      }
    } = this.props;

    return {
      dataSource: list,
      md5: id,
      this: this
    };
  }

  returnData = (allData, day, data, list) => {
    if ((!!allData && day === "") || day === "all") {
      return (data = allData);
    } else {
      if (!!list) {
        return (data = list[day]);
      } else {
        return (data = []);
      }
    }
  };
  onTabClick(val) {
    let item = val == 1 ? "社群详情" : "本群图表";
    const { setBuriedPoint } = this.props;
    let pointArr = BURIED_POINT.filter(it => it.name === item);
    setBuriedPoint({ action: pointArr[0].num });
  }
  render() {
    const left = {
      paddingLeft: "20px",
      background: "#fff"
    };

    const { ChartParamData } = this.props;
    const { CONTENT_HEAD_DETAILS } = this.state;
    return (
      <div>
        <InsideHead contentHead={CONTENT_HEAD_DETAILS} />
        <div className={styles.tabsBox}>
          <Tabs
            tabBarStyle={left}
            tabBarGutter={66}
            defaultActiveKey="1"
            onTabClick={this.onTabClick.bind(this)}
          >
            <TabPane tab="社群详情" key="1">
              <div className={styles.exportBox}>
                <Popconfirm {...this.listProps} />
              </div>
              <List {...this.listProps} />
            </TabPane>
            <TabPane tab="本群图表" key="2">
              <GroupCharts ChartParamData={ChartParamData} />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ operations, pagetime }) => ({ ...operations, pagetime }),
  ({ operations, pagetime }) => ({ ...operations, pagetime })
)(CommunityOperating);
