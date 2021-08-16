import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Errors from "../components/commons/Errors";
import ProjectList from "../components/ProjectList";
import ProjectSearchbar from "../components/ProjectSearchbar";
import { useFirebase } from "../hooks/useFirebase";
import PageWrapper from "../layouts/PageWrapper";
import Project from "../models/Project";
import LoadingPage from "./LoadingPage";

const ProjectListPage = () => {
  const { items, loading, remove } = useFirebase<Project>();

  const [projects, setProjects] = useState([...items]);
  const [displayFormat, setDisplayFormat] = useState("grid");
  const [errors, setErrors] = useState<string[]>([]);

  const history = useHistory();

  useEffect(() => {
    console.log("project list page is visited");
    setProjects([...items]);
  }, [items]);

  function filterProject(keyword?: string) {
    if (keyword && keyword.length !== 0) {
      setProjects(
        items.filter(
          (p) => p.name.includes(keyword) || p.technologies.includes(keyword)
        )
      );
    } else {
      setProjects([...items]);
    }
  }

  function changeDisplayFormat(format: string) {
    setDisplayFormat(format);
  }

  function removeProject(id: string) {
    remove(id)
      .then((_) => setProjects(items.filter((p) => p.id !== id)))
      .catch((err: Error) => setErrors([err.message]));
  }

  function selectProject(id: string) {
    history.push("/projects/" + id);
  }

  return loading ? (
    <LoadingPage />
  ) : (
    <PageWrapper>
      <div className="w-5/6 mx-auto">
        <ProjectSearchbar
          onFilter={filterProject}
          onChangeDisplayFormat={changeDisplayFormat}
        />
      </div>
      <Errors errors={errors} />
      <div className="fade-in">
        <ProjectList
          onRemove={removeProject}
          onSelect={selectProject}
          displayFormat={displayFormat}
          projects={projects}
        />
      </div>
    </PageWrapper>
  );
};

export default ProjectListPage;
