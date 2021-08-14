import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Projects from "../components/Projects";
import NotFound from "../components/commons/404";
import ProjectsProvider from "../providers/ProjectsProvider";
import Stats from "../components/statistics/Stats";

const ProjectsPage = () => {
  return (
    <ProjectsProvider>
      <Sidebar />
      <main className="pt-16 md:pt-2 lg:pl-16">
        <Switch>
          <Route exact path="/" render={(_) => <Redirect to="/projects" />} />
          <Route path="/projects" component={Projects} />
          <Route path="/stats" component={Stats} />
          <Route path="*" component={NotFound} />
        </Switch>
      </main>
    </ProjectsProvider>
  );
};

export default ProjectsPage;
