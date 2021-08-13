import firebase from "firebase";
import React, { FC } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

const PrivateRoute: FC<RouteProps> = (props) => {
  const user = firebase.auth().currentUser;
  return user ? <Route {...props} /> : <Redirect to="/login" />;
};

export default PrivateRoute;
