import React, { Component } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Routes from "./routes";
import { ConfigProvider } from "antd";
import moment from "moment";
import "moment/locale/zh-cn";
import zhCN from "antd/es/locale/zh_CN";
import "antd/dist/antd.css";
import store from "./store";
import "./utils/webPageTime";
moment.locale("en");
class App extends Component {
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Provider store={store}>
          <BrowserRouter basename="/marvel">
            <Routes />
          </BrowserRouter>
        </Provider>
      </ConfigProvider>
    );
  }
}
export default App;
