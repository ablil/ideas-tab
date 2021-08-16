import { useState, useRef, FC } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ReactComponent as DeleteIcon } from "../assets/icons/trash.svg";
import { ReactComponent as EditIcon } from "../assets/icons/edit.svg";

type Props = {
  notes: string[];
  onSave: (note: string) => void;
  onRemove: (note: string) => void;
};

const ProjectNotes: FC<Props> = ({ notes, onSave, onRemove }) => {
  const [note, setNote] = useState<string>("");
  const [keyword, setKeyword] = useState("");

  const editorRef = useRef<any>(null);

  function onEditNote(note: string) {
    onRemove(note);
    setNote(note);
  }

  function saveNote(note: string) {
    onSave(note);
    setNote("");
  }
  return (
    <section className="shadow-lg p-4 rounded-lg mt-4 md:m-4 md:w-3/5 ground">
      <header className="my-2">
        <span className="title">Keep notes for yourself</span>
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
          .filter((note) => (keyword ? note.includes(keyword) : true))
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
                  onClick={(_) => onRemove(note)}
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
          onClick={(_) => saveNote(note)}
          className="btn btn-blue dark:text-white m-1 w-full md:w-2/4 mx-auto"
        >
          Add
        </button>
      </article>
    </section>
  );
};

export default ProjectNotes;
