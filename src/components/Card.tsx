import React, { FunctionComponent } from "react";
import { ReactComponent as TrashIcon } from "../assets/icons/trash.svg";
import Idea from "../models/Idea";

const Card: FunctionComponent<{
  dispalyFormat?: string;
  idea: Idea;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
}> = ({ dispalyFormat: displayFormat, idea, onSelect, onRemove }) => {
  return (
    <section
      className={`w-96 h-32 m-4 mb-8 cursor-pointer ${
        displayFormat === "list" ? "w-full" : "w-80"
      }`}
      onClick={(_) => onSelect(idea.id)}
    >
      <section className="card group ">
        <section className="">
          <h1 className="truncate title">{idea.name}</h1>
          <p
            title={idea.description ? idea.description : "n/a"}
            className="truncate text-xs opacity-50 group-hover:opacity-70 text-md"
          >
            {idea.description ? idea.description : "No Description"}
          </p>
          {idea.repository ? (
            <a
              href={idea.repository}
              target="_blank"
              rel="noreferrer"
              title="click to visit"
              onClick={(e) => e.stopPropagation()}
            >
              Repository
            </a>
          ) : (
            <span className="text-xs opcity-50">No Repository</span>
          )}
        </section>
        <footer className="mt-2 flex">
          {/* technologies */}
          <article className="w-3/4 overflow-hidden">
            {idea.technologies.length !== 0 ? (
              idea.technologies
                .slice(0, 3)
                .map((tech) => <span className="badge">{tech}</span>)
            ) : (
              <small className="opacity-50">No technology is specified</small>
            )}
          </article>
          {/* delete idea */}
          <article
            className="w-1/4 ml-auto duration-300 opacity-0 group-hover:opacity-100"
            title="Delete idea idea"
          >
            <TrashIcon
              onClick={(e) => {
                e.stopPropagation();
                onRemove(idea.id);
              }}
              className="w-2/6 border-2 text-red-400 border-red-400 hover:bg-red-400 hover:text-white rounded float-right transition-colors duration-300"
            />
          </article>
        </footer>
      </section>
      {/* card footer */}
      {displayFormat === "grid" && (
        <div>
          <div className="mx-auto w-11/12 h-2 rounded-b bg-gray-100 dark:bg-gray-500 shadow"></div>
          <div className="mx-auto w-10/12 h-2 rounded-b bg-gray-300 dark:bg-gray-700 shadow"></div>
        </div>
      )}
    </section>
  );
};

export default Card;
