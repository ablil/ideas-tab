import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Project from "../../models/Project";
import Loading from "../commons/loading";
import DetailsLeft from "./DetailsLeft";
import { ProjectsContext } from "../../providers/ProjectsProvider";
import DetailsRight from "./DetailsRight";

const Details = () => {
  const { id } = useParams<{ id: string }>();

  const { loading, findProject, updateProject } = useContext(ProjectsContext);
  const [project] = useState(findProject(id));

  const onUpdateNotes = (notes: string[]) => {
    return updateProject({ ...project, notes } as Project);
  };

  if (loading) return <Loading />;

  return project ? (
    <div className="fade-in flex flex-col md:flex-row mx-4 mt-4">
      <DetailsLeft project={project} onUpdate={updateProject} />
      <DetailsRight project={project} onUpdate={onUpdateNotes} />
    </div>
  ) : (
    // TODO: implement ui for project not found
    <div>Project not found</div>
  );
};

export default Details;
