import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../hooks/useFirebase";
import PageWrapper from "../layouts/PageWrapper";
import Idea from "../models/Idea";
import Errors from "../components/commons/Errors";
import GoBack from "../components/commons/GoBack";
import Loading from "../components/commons/loading";
import IdeaInfo from "../components/IdeaInfo";
import IdeaNotes from "../components/IdeaNotes";

const IdeaPage = () => {
  const { id } = useParams<{ id: string }>();

  const { items, loading, createOrUpdate } = useFirebase<Idea>();
  const [idea, setIdea] = useState<Idea>();
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    setIdea(items.find((p) => p.id === id));
  }, [loading, id, items]);

  function addNote(note: string) {
    if (idea && id) {
      const p: Idea = { ...idea, id, notes: [...idea.notes, note] };
      createOrUpdate(p)
        .then((_) => setIdea(p))
        .catch((err) => setErrors([err.message]));
    }
  }

  function removeNote(note: string) {
    if (idea && id) {
      const p: Idea = {
        ...idea,
        id,
        notes: idea.notes ? idea.notes.filter((i) => i !== note) : [],
      };
      createOrUpdate(p)
        .then((_) => setIdea(p))
        .catch((err) => setErrors([err.message]));
    }
  }

  if (loading) {
    return <Loading />;
  } else {
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
          // TODO: implement ui for idea not found
          <div>Idea not found</div>
        )}
      </PageWrapper>
    );
  }
};

export default IdeaPage;
