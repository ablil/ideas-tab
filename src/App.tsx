import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFound from "./components/commons/404";
import Helmet from "react-helmet";

import "./config/firebase";
import LoginPage from "./pages/LoginPage";
import PublicRoute from "./routes/PublicRoute";
import RegistrationPage from "./pages/RegistrationPage";
import ForgetPassword from "./components/authentication/ForgetPassword";
import ProfilePage from "./pages/ProfilePage";
import TaskPage from "./pages/TaskPage";
import ProjectListPage from "./pages/ProjectListPage";
import PrivateRoute from "./routes/PrivateRoute";
import ProjectPage from "./pages/ProjectPage";

function App() {
  return (
    <div className="App">
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="description" content="keep track of your projects ideas" />
        <meta
          name="keywords"
          content="project, idea, dev, tab, web, software, app"
        />
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
      </Helmet>

      <Router>
        <Switch>
          <PublicRoute path="/login" component={LoginPage} restricted={true} />
          <PublicRoute
            path="/register"
            component={RegistrationPage}
            restricted={true}
          />
          <PublicRoute
            path="/reset"
            component={ForgetPassword}
            restricted={true}
          />
          <PrivateRoute path="/projects" component={ProjectListPage} exact />
          <PrivateRoute path="/projects/:id" component={ProjectPage} />
          <PrivateRoute path="/profile" component={ProfilePage} />
          <PrivateRoute path="/queue" component={TaskPage} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
