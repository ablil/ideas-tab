import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFound from "./components/commons/404";
import PrivateRoute from "./components/PrivateRoute";

import "./config/firebase";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login" component={AuthPage} />
          <Route exact path="/register" component={AuthPage} />
          <Route exact path="/reset" component={AuthPage} />
          <PrivateRoute path="/" component={HomePage} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
