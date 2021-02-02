import React, { Component } from "react";
import { connect } from "react-redux";
import { CONTENT_HEAD } from "../data";
import InsideHead from "../../../components/InsideHead";
import styles from "../../CommunityOperating/style.module.styl";
import EventSet from "./EventSet";
import { Tabs } from "antd";

const { TabPane } = Tabs;
class EventWarp extends Component {
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
            <TabPane tab="事件设置" key="1">
              <EventSet />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ eventset }) => ({ ...eventset }),
  ({ eventset }) => ({ ...eventset })
)(EventWarp);
