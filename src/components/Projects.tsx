import React, { useState, useContext } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Details from "./Details/Details";
import Grid from "./projects/Grid";
import { ProjectsContext } from "../providers/ProjectsProvider";
import InputModal from "./commons/InputModal";
import Plus from "./commons/Plus";
import { v4 as uuidv4 } from "uuid";

const Projects = () => {
  const { projects, createProject, removeProject } =
    useContext(ProjectsContext);

  const [showmodal, setShowmodal] = useState(false);
  const histoy = useHistory();

  const viewSideProject = (id: string) => {
    histoy.push(`/projects/${id}`);
  };

  const onCreate = (name: string) => {
    const id = uuidv4();
    createProject({
      id,
      name,
      description: "",
      technologies: [],
      notes: [],
      links: [],
      repository: "",
      created: new Date(),
      lastModified: new Date(),
    })
      .then((_) => {
        console.log("Project created successfully");
        histoy.push(`/projects/${id}`);
      })
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/projects"
          render={(_) => (
            <Grid
              projects={projects || []}
              onDelete={removeProject}
              onSelect={viewSideProject}
            />
          )}
        />
        <Route exact path="/projects/:id" component={Details} />
      </Switch>
      <Plus onClick={(_) => setShowmodal(true)} />
      {/* create new project modal */}
      <InputModal
        title="Project idea"
        subtitle="Add your new project idea"
        type="text"
        isVisible={showmodal}
        onOk={onCreate}
        onCancel={() => setShowmodal(false)}
      />
    </div>
  );
};

export default Projects;
