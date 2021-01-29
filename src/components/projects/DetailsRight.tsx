import { useState, FunctionComponent } from "react";
import Project from "../../models/Project";

const DetailsRight: FunctionComponent<{
  project: Project;
  onUpdate: (notes: string[]) => Promise<void>;
}> = ({ project, onUpdate }) => {
  const [notes, setNotes] = useState<string[]>(project.notes);
  const [note, setNote] = useState<string>("");

  const [message, setMessage] = useState("");

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

  return (
    <section className="transparent p-4 rounded-lg">
      <article className="capitalize text-2xl text-gray-50 opacity-70">
        Keep notes
      </article>
      <article>
        {notes.map((note) => (
          <div
            style={{
              wordWrap: "break-word",
            }}
            className="note border-l-2 border-blue-400 rounded p-1 mx-2 my-3"
          >
            {note}{" "}
            <span
              className="text-red-400 text-xs cursor-pointer  underline"
              onClick={(_) => onDeleteNote(note)}
            >
              Delete
            </span>
          </div>
        ))}
      </article>
      <article>
        <textarea
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
