import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Profile from "../components/Profile";
import Projects from "../components/Projects";
import NotFound from "../components/commons/404";
import ProjectsProvider from "../providers/ProjectsProvider";
import UserProvider from "../providers/UserProvider";
import Stats from "../components/statistics/Stats";
import Queue from "../components/Queue";
import TaskProvider from "../providers/TaskProviders";

const ProjectsPage = () => {
  return (
    <UserProvider>
      <ProjectsProvider>
        <TaskProvider>
          <Sidebar />
          <main className="pt-16 md:pt-2 lg:pl-16">
            <Switch>
              <Route
                exact
                path="/"
                render={(_) => <Redirect to="/projects" />}
              />
              <Route exact path="/profile" component={Profile} />
              <Route path="/projects" component={Projects} />
              <Route path="/stats" component={Stats} />
              <Route path="/queue" component={Queue} />
              <Route path="*" component={NotFound} />
            </Switch>
          </main>
        </TaskProvider>
      </ProjectsProvider>
    </UserProvider>
  );
};

export default ProjectsPage;
