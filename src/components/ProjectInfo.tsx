import React, { FC, useState } from "react";
import Project from "../models/Project";
import InputModal from "./commons/InputModal";
import { ReactComponent as TrashIcon } from "../assets/icons/trash.svg";

type Props = {
  project: Project;
  onSave: (p: Project) => void;
};

const ProjectInfo: FC<Props> = ({ project, onSave }) => {
  const [projectCopy, setProjectCopy] = useState<Project>(project);
  const [isModified, setIsModified] = useState(false);

  const [techModal, setTechModal] = useState(false);
  const [linkModal, setLinkModal] = useState(false);

  function handleChange(evt: any) {
    setProjectCopy((old) => ({ ...old, [evt.target.name]: evt.target.value }));
    setIsModified(true);
  }

  function removeTechnology(technology: string) {
    setProjectCopy((old) => ({
      ...old,
      technologies: old.technologies.filter((t) => t !== technology),
    }));
    setIsModified(true);
  }

  function removeLink(link: string) {
    setProjectCopy((old) => ({
      ...old,
      links: old.links.filter((l) => l !== link),
    }));
    setIsModified(true);
  }

  function addTechnology(techonlogy: string) {
    setProjectCopy((old) => ({
      ...old,
      technologies: old.technologies.concat(techonlogy.split(",")),
    }));
    setIsModified(true);
  }

  function addLink(link: string) {
    setProjectCopy((old) => ({
      ...old,
      links: old.links.concat(link),
    }));
    setIsModified(true);
  }

  function saveModification() {
    onSave(projectCopy);
    setIsModified(false);
  }

  function cancelModification() {
    setProjectCopy(project);
    setIsModified(false);
  }

  return (
    <section
      id="project-details-left"
      className="shadow-lg rounded-lg py-4 md:m-4 md:w-2/5 md:self-start md:sticky md:top-0 ground"
    >
      <article className="input-wrapper">
        <label className="title">name</label>
        <input
          type="text"
          minLength={6}
          maxLength={60}
          required={true}
          placeholder="N/A"
          name="name"
          value={projectCopy.name}
          onChange={handleChange}
        />
      </article>

      <article className="input-wrapper">
        <label className="title">
          repository
          <a
            className="text-white underline"
            href={projectCopy.repository || "#"}
            target="_blank"
            rel="noreferrer"
          >
            visit link
          </a>
        </label>
        <input
          type="url"
          placeholder="N/A"
          name="repository"
          value={projectCopy.repository}
          onChange={handleChange}
        />
      </article>

      <article className="input-wrapper">
        <label className="title">description</label>
        <textarea
          name="description"
          value={projectCopy.description}
          placeholder="N/A"
          onChange={handleChange}
        ></textarea>
      </article>

      <article className="input-wrapper">
        <label className="title">
          Technologies{" "}
          <button
            className="text-white underline"
            onClick={(_) => setTechModal(true)}
          >
            add technology
          </button>
        </label>
        <div className="flex flex-wrap">
          {projectCopy.technologies.map((tech) => (
            <span
              key={tech}
              title="click to delete"
              onClick={(_) => removeTechnology(tech)}
              className="badge cursor-pointer hover:bg-red-400"
            >
              {tech}
            </span>
          ))}
        </div>
        <p className="hint pl-2">Click to remove</p>
      </article>

      <article className="input-wrapper">
        <label className="title">
          Related links
          <button
            className="px-1 text-white underline"
            onClick={(_) => setLinkModal(true)}
          >
            add link
          </button>
        </label>
        <ul className="list-none">
          {projectCopy.links.map((link) => (
            <li className="underline px-2 flex items-center group" key={link}>
              <TrashIcon
                className="w-5 h-5 text-red-400 opacity-0 group-hover:opacity-100 cursor-pointer duration-300"
                onClick={(_) => removeLink(link)}
              />
              <a
                className="overflow-ellipsis text-base block w-10/12"
                href={link}
                target="_blank"
                rel="noreferrer"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </article>

      <article className="flex-center flex-col flex-wrap md:flex-row p-4">
        <button
          onClick={saveModification}
          type="submit"
          className="btn btn-blue relative w-5/6 md:w-1/4"
        >
          {isModified && (
            <span className="animate-ping absolute inline-flex h-3 w-3 -top-1 -left-1 rounded-full bg-purple-400 opacity-75"></span>
          )}
          update
        </button>

        <button
          type="reset"
          onClick={cancelModification}
          className="btn btn-red w-5/6 md:w-1/4 m-2 md:mx-auto"
        >
          cancel
        </button>
      </article>

      <article>
        {/* I dont what makes the confusion between date between
        typescript and Firebase, either way, ignoring typescript check
        would make it work for the time being */}
        <hr className="w-5/6 mx-auto my-2 opacity-50" />
        <p className="text-xs px-2">
          <span className="font-bold px-2">Created</span>
          {/* @ts-ignore */}
          {project.created?.toDate().toLocaleString()}
        </p>
        <p className="text-xs px-2">
          <span className="font-bold px-2">Modified</span>
          {/* @ts-ignore */}
          {project.lastModified?.toDate().toLocaleString()}
        </p>
      </article>

      {/* modals */}
      <InputModal
        title="Related links"
        subtitle="Some useful links you may check"
        type="url"
        isVisible={linkModal}
        onOk={addLink}
        onCancel={() => setLinkModal(false)}
      />
      <InputModal
        title="Technologies"
        subtitle="Comma separated values"
        type="text"
        isVisible={techModal}
        onOk={addTechnology}
        onCancel={() => setTechModal(false)}
      />
    </section>
  );
};

export default ProjectInfo;
