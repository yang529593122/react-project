import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import { getStorage, setStorage } from "utils/filter";
import Routes from "@/routes/subRoutes";
import SiderCustom from "./Sider";
import HeaderCustom from "./Header";

const { Content } = Layout;

class BaseLayout extends Component {
  toggle = () => {
    const { collapsed } = this.props;
    const { updateState } = this.props;
    updateState({ collapsed: !collapsed });
    setStorage("sider_collapsed", !collapsed);
  };

  logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  componentDidUpdate() {
    let { history, updateState } = this.props;

    if (/\/app\/formCmp\//.test(history.location.pathname)) {
      updateState({ collapsed: true });
    }
  }

  render() {
    let { collapsed, history } = this.props;

    let username = getStorage("username") || "管理员";
    const headProps = {
      collapsed,
      username,
      toggle: this.toggle,
      logout: this.logout
    };

    const siderProps = {
      history,
      collapsed
    };

    return (
      <Layout className="ant-layout-has-sider" style={{ minHeight: "100%" }}>
      
           
            <SiderCustom {...siderProps} />
           
        <Layout id="content">
          <HeaderCustom {...headProps} />
          <Content style={{ margin: "0 16px" }}>
            <Routes />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const { collapsed } = state.app;
  return {
    collapsed
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateState: params => dispatch.app.updateState(params)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BaseLayout);
