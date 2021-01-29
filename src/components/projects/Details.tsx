import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Project from "../../models/Project";
import Loading from "../commons/loading";
import DetailsLeft from "./DetailsLeft";
import InputModal from "../commons/InputModal";
import { ProjectsContext } from "../../providers/ProjectsProvider";
import DetailsRight from "./DetailsRight";

const Details = () => {
  const { id } = useParams<{ id: string }>();

  const { loading, findProject, updateProject } = useContext(ProjectsContext);
  const [project] = useState(findProject(id));

  const [modalTitle] = useState("");
  const [modalVisibility, setModalVisibility] = useState(false);

  const onUpdateNotes = (notes: string[]) => {
    return updateProject({ ...project, notes } as Project);
  };

  if (loading) return <Loading />;

  return project ? (
    <div className="fade-in grid grid-rows-2 grid-cols-1 gap-y-8 lg:grid-cols-2 lg:grid-rows-1 lg:gap-x-36 mx-4 mt-4">
      {/* left side */}
      <DetailsLeft project={project} onUpdate={updateProject} />

      {/* right side */}
      <DetailsRight project={project} onUpdate={onUpdateNotes} />

      <InputModal
        isShown={modalVisibility}
        onClose={() => setModalVisibility(false)}
        onEnter={(value) => console.log(value)}
        title={modalTitle}
      />
    </div>
  ) : (
    // TODO: implement ui for project not found
    <div>Project not found</div>
  );
};

export default Details;
