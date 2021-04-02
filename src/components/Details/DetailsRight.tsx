import { useState, FunctionComponent, useRef } from "react";
import Project from "../../models/Project";

const DetailsRight: FunctionComponent<{
  project: Project;
  onUpdate: (notes: string[]) => Promise<void>;
}> = ({ project, onUpdate }) => {
  const [notes, setNotes] = useState<string[]>(project.notes);
  const [note, setNote] = useState<string>("");
  const [keyword, setKeyword] = useState("");
  const [message, setMessage] = useState("");
  const textareaRef = useRef<any>(null);

  const onUpdateNotes = () => {
    if (note) {
      onUpdate([...notes, note])
        .then((_) => {
          setNotes([...notes, note]);
          setNote("");
        })
        .catch((err) => {
          console.error(err);
          setMessage("Failed to add note, try again !!!");
        });
    }
  };

  const onDeleteNote = (note: string) => {
    onUpdate(notes.filter((n) => n !== note))
      .then((_) => {
        setNotes(notes.filter((n) => n !== note));
        setNote("");
      })
      .catch((err) => {
        console.error(err);
        setMessage("Failed to delete note, try again !!!");
      });
  };

  const onEditNote = (note: string) => {
    setNotes((oldNotes) => oldNotes.filter((n) => n != note));
    setNote(note);
    window.scrollTo(0, document.body.scrollHeight);
    textareaRef.current.focus();
  };

  return (
    <section className="transparent p-4 rounded-lg mt-4 md:m-4 md:w-3/5">
      <header>
        <article className="project-details-label">
          Keep notes for yourself
        </article>
        <article>
          <input
            className="form-input"
            type="text"
            placeholder="Filter notes ..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </article>
      </header>
      <article>
        {notes
          .filter((note) => note.includes(keyword))
          .map((note) => (
            <div
              style={{
                wordWrap: "break-word",
              }}
              className="note border-l-2 border-blue-400 rounded p-1 mx-2 my-3"
            >
              {note}
              <span
                className="px-1 text-red-400 text-xs cursor-pointer  underline"
                onClick={(_) => onDeleteNote(note)}
              >
                Delete
              </span>
              <span
                onClick={(_) => onEditNote(note)}
                className="px-1 text-blue-400 text-xs cursor-pointer underline"
              >
                Edit
              </span>
            </div>
          ))}
      </article>
      <article>
        <textarea
          ref={textareaRef}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Type a note"
          className="block bg-gray-900 rounded w-full p-2 outline-none"
        ></textarea>
        <span
          onClick={onUpdateNotes}
          className="text-blue-400 text-sm underline  m-2 float-right cursor-pointer"
        >
          Add
        </span>
      </article>
      {message && (
        <article className="text-sm py-2 text-red-400  text-center">
          {message}
        </article>
      )}
    </section>
  );
};

export default DetailsRight;
