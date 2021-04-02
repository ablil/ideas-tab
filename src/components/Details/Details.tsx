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

  // TODO: work with project as a parameter instead of notes
  const onUpdateNotes = (notes: string[]) => {
    return updateProject({ ...project, notes } as Project);
  };

  const onFilterNotes = (project: Project, keyword: string) => {
    return keyword.length
      ? {
          ...project,
          notes: project.notes.filter((note) => note.includes(keyword)),
        }
      : project;
  };

  if (loading) return <Loading />;

  return project ? (
    <div className="fade-in mx-4 mt-4">
      <div className="w-full h-full flex flex-col md:flex-row">
        <DetailsLeft project={project} onUpdate={updateProject} />
        <DetailsRight project={project} onUpdate={onUpdateNotes} />
      </div>
    </div>
  ) : (
    // TODO: implement ui for project not found
    <div>Project not found</div>
  );
};

export default Details;
