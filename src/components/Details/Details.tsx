import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Project from "../../models/Project";
import Loading from "../commons/loading";
import DetailsLeft from "./DetailsLeft";
import { ProjectsContext } from "../../providers/ProjectsProvider";
import DetailsRight from "./DetailsRight";
import GoBack from "../commons/GoBack";

const Details = () => {
  const { id } = useParams<{ id: string }>();

  const { loading, findProject, updateProject } = useContext(ProjectsContext);
  const [project] = useState(findProject(id));

  const onUpdateNotes = (notes: string[]) => {
    return updateProject({ ...project, notes } as Project);
  };

  if (loading) return <Loading />;

  return project ? (
    <section className="fade-in mx-4 mt-4">
      <header>
        <GoBack />
      </header>
      <div className="w-full max-w-7xl mx-auto h-full flex flex-col md:flex-row">
        <DetailsLeft project={project} onUpdate={updateProject} />
        <DetailsRight project={project} onUpdate={onUpdateNotes} />
      </div>
    </section>
  ) : (
    // TODO: implement ui for project not found
    <div>Project not found</div>
  );
};

export default Details;
