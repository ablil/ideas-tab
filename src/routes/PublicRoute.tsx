import firebase from "firebase";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Redirect, Route, RouteProps } from "react-router-dom";

type RestrictedRouteProps = {
  restricted?: boolean;
} & RouteProps;

export default function PublicRoute({
  restricted,
  ...routeProps
}: RestrictedRouteProps) {
  const [user] = useAuthState(firebase.auth());

  if (user && restricted) {
    return <Redirect to="/ideas" />;
  } else {
    return <Route {...routeProps} />;
  }
}
