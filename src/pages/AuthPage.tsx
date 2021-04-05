import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import ForgetPassword from "../components/auth/ForgetPassword";

const AuthPage = () => {
  let location = useLocation();

  return (
    <Switch location={location}>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
      <Route exact path="/reset">
        <ForgetPassword />
      </Route>
    </Switch>
  );
};

export default AuthPage;
