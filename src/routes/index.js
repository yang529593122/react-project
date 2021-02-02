import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import la from "./loadableComponent";
const BaseLayout = () => import("components/Layout/BaseLayout");
const View = () => import("views/CommunityOperating/view");
const Login = () => import("../views/Login");
export default () => (
  <Switch>
    <Route path="/" render={() => <Redirect to="/login" />} exact key="first" />
    <Route path="/login" component={la(Login)} key="login" exact />
    <Route path="/app" component={la(BaseLayout)} key="app" />
    <Route path="/operations/community/view" component={la(View)} key="view" />
  </Switch>
);
