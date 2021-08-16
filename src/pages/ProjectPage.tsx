import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../hooks/useFirebase";
import PageWrapper from "../layouts/PageWrapper";
import Project from "../models/Project";
import Errors from "../components/commons/Errors";
import GoBack from "../components/commons/GoBack";
import Loading from "../components/commons/loading";
import ProjectInfo from "../components/ProjectInfo";
import ProjectNotes from "../components/ProjectNotes";

const ProjectPage = () => {
  const { id } = useParams<{ id: string }>();

  const { items, loading, createOrUpdate } = useFirebase<Project>();
  const [project, setProject] = useState<Project>();
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    setProject(items.find((p) => p.id === id));
  }, [loading, id, items]);

  function addNote(note: string) {
    if (project && id) {
      const p: Project = { ...project, id, notes: [...project.notes, note] };
      createOrUpdate(p)
        .then((_) => setProject(p))
        .catch((err) => setErrors([err.message]));
    }
  }

  function removeNote(note: string) {
    if (project && id) {
      const p: Project = {
        ...project,
        id,
        notes: project.notes ? project.notes.filter((i) => i !== note) : [],
      };
      createOrUpdate(p)
        .then((_) => setProject(p))
        .catch((err) => setErrors([err.message]));
    }
  }

  if (loading) {
    return <Loading />;
  } else {
    return (
      <PageWrapper>
        {project ? (
          <section className="fade-in mx-4 mt-4">
            <header>
              <GoBack />
            </header>
            <Errors errors={errors} />
            <div className="w-full max-w-7xl mx-auto h-full flex flex-col md:flex-row">
              <div className="md:m-4 md:w-2/5 md:self-start md:sticky md:top-0">
                <ProjectInfo project={project} onSave={createOrUpdate} />
              </div>
              <div className="mt-4 md:m-4 md:w-3/5 ">
                <ProjectNotes
                  notes={project.notes}
                  onSave={addNote}
                  onRemove={removeNote}
                />
              </div>
            </div>
          </section>
        ) : (
          // TODO: implement ui for project not found
          <div>Project not found</div>
        )}
      </PageWrapper>
    );
  }
};

export default ProjectPage;
