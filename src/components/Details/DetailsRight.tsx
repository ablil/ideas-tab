import { useState, FunctionComponent, useRef } from "react";
import Project from "../../models/Project";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ReactComponent as DeleteIcon } from "../../assets/icons/trash.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";

const DetailsRight: FunctionComponent<{
  project: Project;
  onUpdate: (notes: string[]) => Promise<void>;
}> = ({ project, onUpdate }) => {
  const [notes, setNotes] = useState<string[]>(project.notes);
  const [note, setNote] = useState<string>("");
  const [keyword, setKeyword] = useState("");
  const [message, setMessage] = useState("");
  const editorRef = useRef<any>(null);

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
    setNotes((oldNotes) => oldNotes.filter((n) => n !== note));
    setNote(note);
    window.scrollTo(0, document.body.scrollHeight);
  };

  return (
    <section className="shadow-lg p-4 rounded-lg mt-4 md:m-4 md:w-3/5 bg-white dark:bg-gray-800">
      <header className="my-2">
        <span className="text-blue-400 dark:text-yellow-400">
          Keep notes for yourself
        </span>
        <article>
          <input
            className="input-with-bottom"
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
            <article
              key={note}
              style={{
                wordWrap: "break-word",
              }}
              className="group note border-l-2 flex items-center border-blue-400 dark:border-yellow-400  p-1 mx-2 my-3"
            >
              <div
                className="w-10/12"
                dangerouslySetInnerHTML={{ __html: note }}
              ></div>
              <div className="w-2/12 flex-center opacity-0 group-hover:opacity-100 duration-300">
                <DeleteIcon
                  className="w-5 h-5 text-red-400 cursor-pointer"
                  onClick={(_) => onDeleteNote(note)}
                />
                <EditIcon
                  className="w-5 h-5 text-blue-400 cursor-pointer"
                  onClick={(_) => onEditNote(note)}
                />
              </div>
            </article>
          ))}
      </article>
      <article className="text-gray-900">
        <CKEditor
          ref={editorRef}
          className="block rounded w-full p-2 outline-none"
          editor={ClassicEditor}
          data={note}
          onChange={(event: any, editor: any) => {
            setNote(editor.getData());
          }}
        />
        <button
          onClick={onUpdateNotes}
          className="btn btn-blue dark:text-white m-1 w-full md:w-2/4 mx-auto"
        >
          Add
        </button>
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
