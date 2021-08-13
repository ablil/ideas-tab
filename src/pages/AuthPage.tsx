import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import RegistrationPage from "./RegistrationPage";
import LoginPage from "./LoginPage";
import ForgetPassword from "../components/authentication/ForgetPassword";

const AuthPage = () => {
  let location = useLocation();

  return (
    <Switch location={location}>
      <Route exact path="/login">
        <LoginPage />
      </Route>
      <Route exact path="/register">
        <RegistrationPage />
      </Route>
      <Route exact path="/reset">
        <ForgetPassword />
      </Route>
    </Switch>
  );
};

export default AuthPage;
