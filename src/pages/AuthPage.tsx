import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { ReactComponent as LoginImage } from "../assets/images/dev-productivity.svg";
import { ReactComponent as RegisterImage } from "../assets/images/new-task.svg";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";

const AuthPage = () => {
  let location = useLocation();

  return (
    <Switch location={location}>
      <Route exact path="/login">
        <section className="bg-image h-full fade-in flex flex-col lg:flex-row">
          <article className="lg:w-2/4">
            <div className="text-white text-center w-3/4 mx-auto py-12">
              <h1 className="text-5xl">Keep tracks of your ideas</h1>
              <h3 className="text-md py-4">
                It is time to start that side project, you bought a domain name
                for.
              </h3>
            </div>
            <div className="center-with-flex py-4">
              <RegisterImage className="hidden lg:block w-3/4 h-auto" />
            </div>
          </article>
          <article className="lg:w-2/4 py-12">
            <Login />
          </article>
        </section>
      </Route>
      <Route exact path="/register">
        <section className="bg-image fade-in flex flex-col-reverse lg:flex-row">
          <article className="lg:w-2/4 py-12">
            <Register />
          </article>
          <article className="lg:w-2/4">
            <div className="text-white text-center w-3/4 mx-auto py-12">
              <h1 className="text-2xl">
                You will never know when you get that one million $$ idea
              </h1>
              <h3 className="text-md py-4">
                Create an account and keep tracks of you side projects
              </h3>
            </div>
            <div className="center-with-flex py-4">
              <LoginImage className="hidden lg:block w-3/4 h-auto" />
            </div>
          </article>
        </section>
      </Route>
    </Switch>
  );
};

export default AuthPage;
