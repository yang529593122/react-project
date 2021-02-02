import React, { Component } from "react";
import { connect } from "react-redux";
import { CONTENT_HEAD } from "../data";
import InsideHead from "../../../components/InsideHead";
import styles from "../../CommunityOperating/style.module.styl";
import { Tabs } from "antd";
import Grouping from "./grouping";
import Keywords from "./Keywords";

const { TabPane } = Tabs;
class CommunitySetUp extends Component {
  componentDidMount() {
    sessionStorage.setItem("startpagetime", new Date().valueOf());
  }
  render() {
    return (
      <div>
        <InsideHead contentHead={CONTENT_HEAD} />
        <div className={styles.tabsBox}>
          <Tabs
            tabBarStyle={{
              paddingLeft: "20px",
              background: "#fff"
            }}
            tabBarGutter={66}
            defaultActiveKey="1"
          >
            <TabPane tab="社群分组" key="1">
              <Grouping />
            </TabPane>
            <TabPane tab="关键词" key="2">
              <Keywords />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ monitor }) => ({
    ...monitor
  }),
  ({ monitor }) => ({ ...monitor })
)(CommunitySetUp);
