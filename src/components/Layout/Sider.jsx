import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, Menu } from "antd";
import {
  PushpinOutlined,
  EditOutlined,
  UserOutlined,
  BookOutlined,
  HomeOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import styles from "./Sider.module.styl";
//import menus from "../../consts/menus";

const { Sider } = Layout;
const { SubMenu } = Menu;

class SiderCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [],
      firstHide: true, // 第一次先隐藏暴露的子菜单
      selectedKey: "", // 选择的路径
      openKey: "" // 打开的路径（选择的上一层）
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.onCollapse(nextProps.collapsed);
  }
  componentDidMount() {
    const {
      history: {
        location: { pathname }
      }
    } = this.props;
    const { dashboard, operations } = this.props;
    if (localStorage.getItem("businessId")) {
      dashboard.getBusinessId();
      dashboard.getRouteMeau(localStorage.getItem("uid")).then(menus => {
        this.setState({
          menus: menus
        });
        const menu =
          menus &&
          menus.find(
            item =>
              item.children.findIndex(child => child.url === pathname) > -1
          );
        if (menu) {
          this.setState({
            openKey: menu.url,
            selectedKey: pathname,
            firstHide: false
          });
        }
      });
    } else {
      dashboard.getUser().then(user => {
        operations.setBuriedPoint({ action: 30001, phone: user.sysUser.phone });
        localStorage.setItem("phone", user.sysUser.phone);
        localStorage.setItem("uid", user.sysUser.uid);
        localStorage.setItem("username", user.sysUser.name);
        dashboard.getBusinessId();
        dashboard.getRouteMeau(user.sysUser.uid).then(menus => {
          this.setState({
            menus: menus
          });
          const menu =
            menus &&
            menus.find(
              item =>
                item.children.findIndex(child => child.url === pathname) > -1
            );
          if (menu) {
            this.setState({
              openKey: menu.url,
              selectedKey: pathname,
              firstHide: false
            });
          }
        });
      });
    }
  }

  renderIcon = icon => {
    return {
      PushpinOutlined: <PushpinOutlined />,
      EditOutlined: <EditOutlined />,
      UserOutlined: <UserOutlined />,
      BookOutlined: <BookOutlined />,
      HomeOutlined: <HomeOutlined />,
      SettingOutlined: <SettingOutlined />
    }[icon];
  };

  menuClick = e => {
    this.setState({
      selectedKey: e.key
    });
  };

  openMenu = v => {
    this.setState({
      openKey: v[v.length - 1],
      firstHide: false
    });
  };

  onCollapse = collapsed => {
    this.setState({
      collapsed,
      firstHide: collapsed
    });
  };

  render() {
    const { openKey, selectedKey, firstHide, menus } = this.state;
    const { collapsed } = this.props;

    return (   
      <>
        {
           !window.__POWERED_BY_QIANKUN__ ? (
            <Sider
        trigger={null}
        collapsed={collapsed}
        className={styles.sider}
        collapsible
      >
        <div className={styles.logo}>
          <div className={collapsed ? styles.collapsed : styles.spread}></div>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={this.menuClick}
          onOpenChange={this.openMenu}
          openKeys={firstHide ? null : [openKey]}
        >
          {menus &&
            menus.map(value => {
              return (
                <SubMenu
                  key={value.url}
                  title={
                    <span>
                      {this.renderIcon(value.icon)}
                      <span>{value.name}</span>
                    </span>
                  }
                >
                  {value.children
                    ? value.children.map(val => {
                        return (
                          <Menu.Item key={val.url}>
                            <Link to={val.url}>
                              <span>{val.name}</span>
                            </Link>
                          </Menu.Item>
                        );
                      })
                    : null}
                </SubMenu>
              );
            })}
        </Menu>
      </Sider>
           ) : ''   
        }
      </>
      
    );
  }
}
export default connect(
  ({ dashboard, operations }) => ({ dashboard, operations }),
  ({ dashboard, operations }) => ({ dashboard, operations })
)(SiderCustom);
