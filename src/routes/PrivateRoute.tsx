import firebase from "firebase";
import React, { FC, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Redirect, Route, RouteProps } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";

const PrivateRoute: FC<RouteProps> = (props) => {
  const [user, loading] = useAuthState(firebase.auth());

  if (loading) return <LoadingPage />;
  else {
    return user ? <Route {...props} /> : <Redirect to="/login" />;
  }
};

export default PrivateRoute;
