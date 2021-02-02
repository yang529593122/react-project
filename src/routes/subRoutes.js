import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import la from "./loadableComponent";
//const Home = () => import('views/Home');

// 自动引入childRoutes目录里的子路由
const files = require.context("./childRoutes", false, /\.js$/);
const routeList = [];
files.keys().forEach(key => {
  const child = files(key).default;
  routeList.push(...child);
});

const SubRoute = () => {
  return (
    <Switch>
      {/* <PrivateRoute exact path="/app/home" key="home" component={la(Home)} /> */}
      {routeList.map(value => {
        return (
          <PrivateRoute
            exact
            path={value.path}
            key={value.path}
            component={la(value.component)}
          />
        );
      })}
    </Switch>
  );
};

export default SubRoute;
