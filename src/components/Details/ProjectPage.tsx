import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Project from "../../models/Project";
import Loading from "../commons/loading";
import ProjectInfo from "./ProjectInfo";
import { ProjectsContext } from "../../providers/ProjectsProvider";
import ProjectNotes from "./ProjectNotes";
import GoBack from "../commons/GoBack";
import { useFirebase } from "../../hooks/useFirebase";
import PageWrapper from "../../layouts/PageWrapper";
import Errors from "../commons/Errors";

const ProjectPage = () => {
  const { id } = useParams<{ id: string }>();

  const { items, loading, createOrUpdate, remove } = useFirebase<Project>();
  const [project, setProject] = useState<Project | undefined>();
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    setProject(items.find((p) => p.id === id));
  }, [loading]);

  function addNote(note: string) {
    // FIXEME: notes are note added
    setProject(
      (old) => ({ ...old, notes: old?.notes.concat(note) || [] } as Project)
    );
    if (project)
      createOrUpdate(project).catch((err: Error) => setErrors([err.message]));
  }

  function removeNote(note: string) {
    // FIXME: Note are not deleted
    setProject(
      (old) =>
        ({
          ...old,
          notes: old?.notes.filter((n) => n !== note),
        } as Project)
    );
    if (project)
      createOrUpdate(project).catch((err: Error) => setErrors([err.message]));
  }

  if (loading) {
    return <Loading />;
  } else {
    return (
      // TODO: create another useFirebaseDoc hooks, and use ti
      // FIXME: project not found is displayed for a split of a second
      <PageWrapper>
        {project ? (
          <section className="fade-in mx-4 mt-4">
            <header>
              <GoBack />
            </header>
            <Errors errors={errors} />
            <div className="w-full max-w-7xl mx-auto h-full flex flex-col md:flex-row">
              <ProjectInfo project={project} onSave={createOrUpdate} />
              <ProjectNotes
                notes={project.notes}
                onSave={addNote}
                onRemove={removeNote}
              />
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
