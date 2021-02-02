import React, { Component } from "react";
import { currentEnv } from "../../consts/env";
class Login extends Component {
  state = {};
  componentDidMount() {
    localStorage.clear();
    sessionStorage.clear();
    if (currentEnv === "dev") {
      window.location.href =
        "https://testmps.kaikeba.cn/passport/#/login?scope=dd&redirect=https%3A%2F%2Ftestmarvel.kaikeba.cn%2Fapp&appid=dingoapez3nn8xrih9mb7c";
    } else {
      window.location.href =
        "https://mps.kaikeba.cn/passport#/login?scope=dd&redirect=https://marvel.kaikeba.cn/app&appid=dingoapez3nn8xrih9mb7c";
    }
  }
  render() {
    return <div></div>;
  }
}

export default Login;
