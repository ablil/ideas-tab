import firebase from "firebase";
import React, { FC } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

type RestrictedRouteProps = {
  restricted?: boolean;
} & RouteProps;

export default function PublicRoute({
  restricted,
  ...routeProps
}: RestrictedRouteProps) {
  const user = firebase.auth().currentUser;

  if (user && restricted) {
    return <Redirect to="/dashboard" />;
  } else {
    return <Route {...routeProps} />;
  }
}
