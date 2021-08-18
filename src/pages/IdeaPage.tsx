import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PageWrapper from "../layouts/PageWrapper";
import Idea from "../models/Idea";
import Errors from "../components/commons/Errors";
import GoBack from "../components/commons/GoBack";
import IdeaInfo from "../components/IdeaInfo";
import IdeaNotes from "../components/IdeaNotes";
import useFirebaseDoc from "../hooks/useFirabseDoc";
import LoadingPage from "./LoadingPage";
import NotFound from "../components/commons/404";

const IdeaPage = () => {
  const { id } = useParams<{ id: string }>();

  const {
    item: idea,
    loading,
    createOrUpdate,
    remove,
  } = useFirebaseDoc<Idea>(id);

  const [errors, setErrors] = useState<string[]>([]);

  function addNote(note: string) {
    if (idea && id) {
      const p: Idea = { ...idea, id, notes: [...idea.notes, note] };
      createOrUpdate(p).catch((err) => setErrors([err.message]));
    }
  }

  function removeNote(note: string) {
    if (idea && id) {
      const p: Idea = {
        ...idea,
        id,
        notes: idea.notes ? idea.notes.filter((i) => i !== note) : [],
      };
      createOrUpdate(p).catch((err) => setErrors([err.message]));
    }
  }

  if (loading) return <LoadingPage />;
  return (
    <PageWrapper>
      {idea ? (
        <section className="fade-in mx-4 mt-4">
          <header>
            <GoBack />
          </header>
          <Errors errors={errors} />
          <div className="w-full max-w-7xl mx-auto h-full flex flex-col md:flex-row">
            <div className="md:m-4 md:w-2/5 md:self-start md:sticky md:top-0">
              <IdeaInfo idea={idea} onSave={createOrUpdate} />
            </div>
            <div className="mt-4 md:m-4 md:w-3/5 ">
              <IdeaNotes
                notes={idea.notes}
                onSave={addNote}
                onRemove={removeNote}
              />
            </div>
          </div>
        </section>
      ) : (
        <NotFound />
      )}
    </PageWrapper>
  );
};

export default IdeaPage;
