import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Layout, Menu, Avatar, Select } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import styles from "./Header.module.styl";
const { Option } = Select;
const { Header } = Layout;
const { SubMenu } = Menu;

class HeaderCustom extends Component {
  // 退出登录
  logout = () => {
    const { logout } = this.props;
    logout();
  };
  componentDidMount() {
    const { dashboard } = this.props;
    if (!localStorage.getItem("username")) {
      dashboard.getUser().then(user => {
        localStorage.setItem("username", user.sysUser.name);
      });
    }
  }
  setBusinessValue(value) {
    localStorage.setItem("businessId", value);
    const {
      dashboard,
      history,
      operations,
      monitor,
      keywords,
      qualityinspection,
      eventset,
      user
    } = this.props;
    dashboard.setBusinessValueEvent(value);
    let pathurl = history.location.pathname;
    switch (pathurl) {
      case "/app/dashboard/analysis":
        dashboard.getConversationCount();
        dashboard.getCommunityCount();
        dashboard.getCommunityCourse();
        break;
      case "/app/operations/community":
        operations.productline();
        operations.getcommunityList();
        operations.getcommunitystatus();
        break;
      case "/app/monitor/set_up":
        monitor.getAllCourse();
        monitor.getOpDis();
        monitor.getOpgroup();
        keywords.getKeyWordData({ pageNum: 1, pageSize: 20 });
        break;
      case "/app/Qualityinspection":
        qualityinspection.getcommunityList({
          daysSort: null,
          endTime: null,
          groupNumber: null,
          productLine: "", // 产品线
          sellerCamp: "", // 营
          sellerGroup: "", // 组
          startTime: null,
          startTimeSort: "DESC",
          status: null
        });
        qualityinspection.getcommunityStatus();
        break;
      case "/app/monitor/quality":
        eventset.getEventList();
        eventset.getDropdownbox();
        eventset.getGroupNumber();
        break;
      case "/app/community/user":
        user.submitUserListForm();
        user.submitUserList();
        break;

      default:
        console.log(22);
    }
  }
  render() {
    const { BusinessData, defaultBusinessValue, history } = this.props;
    return (
      <Header className={styles.header}>
        {/* {collapsed ? (
          <MenuUnfoldOutlined className={styles.trigger}  />
        ) : (
          <MenuFoldOutlined className={styles.trigger}  />
        )} */}
        <div></div>

        <div className={styles.selBusLine}>
          {history.location.pathname === "/app/dashboard/analysis" ||
          history.location.pathname === "/app/operations/community" ||
          history.location.pathname === "/app/community/user" ||
          history.location.pathname === "/app/Qualityinspection" ||
          history.location.pathname === "/app/monitor/set_up" ||
          history.location.pathname === "/app/monitor/quality" ? (
            <div>
              <Select
                showSearch
                style={{ width: 100 }}
                value={defaultBusinessValue}
                onChange={this.setBusinessValue.bind(this)}
              >
                {BusinessData &&
                  BusinessData.map(item => {
                    return (
                      <Option key={item.businessId} value={item.businessId}>
                        {item.businessName}
                      </Option>
                    );
                  })}
              </Select>
            </div>
          ) : null}
           {
           !window.__POWERED_BY_QIANKUN__ ? (
            <Menu mode="horizontal" className={styles.menu}>
            <SubMenu
              title={
                <div>
                  <span>
                    <Avatar
                      className={styles.avatar}
                      src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                    />
                    {localStorage.getItem("username")}
                  </span>
                  {/* <span className={styles.logout} onClick={this.logout}>退出登陆</span>  */}
                </div>
              }
            >
              <Menu.Item key="logout" style={{ textAlign: "center" }}>
                <span className={styles.logout} onClick={this.logout}>
                  退出登录
                </span>
              </Menu.Item>
            </SubMenu>
          </Menu>
           ) : ''   
        }
          
        </div>
      </Header>
    );
  }
}
export default connect(
  ({ dashboard }) => ({ ...dashboard }),
  ({
    dashboard,
    operations,
    monitor,
    keywords,
    qualityinspection,
    eventset,
    user
  }) => ({
    dashboard,
    operations,
    monitor,
    keywords,
    qualityinspection,
    eventset,
    user
  })
)(withRouter(HeaderCustom));
