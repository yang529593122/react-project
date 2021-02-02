import React from "react";
import { Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  return <Route {...rest} render={props => <Component {...props} />} />;
};
export default PrivateRoute;
