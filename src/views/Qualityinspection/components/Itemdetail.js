import React, { Component } from "react";
import { CONTENT_HEAD_DETAIL } from "../data";
import InsideHead from "../../../components/InsideHead";
import styles from "../../CommunityOperating/style.module.styl";
import { Tabs } from "antd";
import Details from "./Details";
import Keynodes from "./Keynodes";
const { TabPane } = Tabs;
class Itemdetail extends Component {
  render() {
    return (
      <div>
        <InsideHead contentHead={CONTENT_HEAD_DETAIL} />
        <div className={styles.tabsBox}>
          <Tabs
            tabBarStyle={{
              paddingLeft: "20px",
              background: "#fff"
            }}
            tabBarGutter={66}
            defaultActiveKey="1"
          >
            <TabPane tab="社群详情" key="1">
              <Details />
            </TabPane>
            <TabPane tab="关键节点" key="2">
              <Keynodes />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Itemdetail;
