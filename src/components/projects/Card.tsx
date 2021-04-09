import React, { FunctionComponent } from "react";
import { ReactComponent as TrashIcon } from "../../assets/icons/trash.svg";
import { ReactComponent as ComputerIcon } from "../../assets/icons/computer.svg";
import Project from "../../models/Project";
import Badge from "./Badge";

const Card: FunctionComponent<{
  project: Project;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
}> = ({ project, onSelect, onRemove }) => {
  return (
    <section
      className="w-80 h-32 m-4 mb-8 cursor-pointer"
      onClick={(_) => onSelect(project.id)}
    >
      <section className="card group hover:bg-blue-800">
        <section className="flex">
          {/* computer icon */}
          <article className="w-1/4">
            <ComputerIcon className="w-3/4 text-blue-400 group-hover:text-gray-50" />
          </article>
          {/* project name and description */}
          <article className="w-3/4">
            <h1 className="truncate  text-gray-50">{project.name}</h1>
            <p
              title={project.description ? project.description : "n/a"}
              className="truncate text-gray-200 text-xs opacity-50 group-hover:opacity-70 text-md"
            >
              {project.description ? project.description : "No Description"}
            </p>
            {project.repository ? (
              <a
                href={project.repository}
                target="_blank"
                rel="noreferrer"
                className="small-link"
                title="click to visit"
                onClick={(e) => e.stopPropagation()}
              >
                Repository link
              </a>
            ) : (
              <span className="text-gray-50 text-xs opcity-50">
                No Repository Link
              </span>
            )}
          </article>
        </section>
        <section className="mt-2 flex">
          {/* technologies */}
          <article className="w-3/4">
            {project.technologies.length !== 0 ? (
              project.technologies
                .slice(0, 3)
                .map((tech) => <Badge value={tech} />)
            ) : (
              <span className="text-gray-50 opacity-50 text-sm">
                No technology is specified
              </span>
            )}
          </article>
          {/* delete project */}
          <article className="w-1/4 ml-auto" title="Delete project idea">
            <TrashIcon
              onClick={(e) => {
                e.stopPropagation();
                onRemove(project.id);
              }}
              className="w-2/6 text-red-400 hover:text-gray-200 hover:bg-red-400 border-2 border-red-400  rounded float-right transition-colors duration-300"
            />
          </article>
        </section>
      </section>
      {/* card footer */}
      <div className="mx-auto w-72 h-2 rounded-b bg-gray-600 shadow"></div>
      <div className="mx-auto w-64 h-2 rounded-b bg-gray-500 shadow"></div>
    </section>
  );
};

export default Card;
