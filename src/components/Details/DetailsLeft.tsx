import React, { FunctionComponent, useEffect, useState } from "react";
import Project from "../../models/Project";
import InputModal from "../commons/InputModal";
import { ReactComponent as TrashIcon } from "../../assets/icons/trash.svg";

const DetailsLeft: FunctionComponent<{
  project: Project;
  onUpdate: (newProject: Project) => Promise<void>;
}> = ({ project, onUpdate }) => {
  // properties from project passed as prop
  const [name, setName] = useState("");
  const [description, setDescription] = useState<string>("");
  const [repository, setRepository] = useState<string>("");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [links, setLinks] = useState<string[]>([]);

  // is project info modified
  const [modified, setModified] = useState(false);

  const [techModal, setTechModal] = useState(false);
  const [linkModal, setLinkModal] = useState(false);

  // error message
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(true);

  useEffect(() => {
    onCancel();
  }, []);

  const onChange = (updateCallback: (val: any) => void, newValue: any) => {
    setModified(true);
    updateCallback(newValue);
  };

  /**
   * Reset project state to original values
   */
  const onCancel = () => {
    setName(project.name);
    setDescription(project.description || "");
    setRepository(project.repository || "");
    setTechnologies(project.technologies);
    setLinks(project.links);
    setModified(false);
  };

  /**
   * Update the project state by calling the remote api
   * @param e event
   */
  const updateProject = (e: any) => {
    e.preventDefault();
    setMessage("");
    onUpdate({
      id: project.id,
      name,
      description,
      repository,
      technologies,
      links,
      notes: project.notes,
      created: project.created || new Date(),
      lastModified: new Date(),
    })
      .then((_) => {
        setMessage("Updated Successfully");
        setIsError(false);
        setModified(false);
      })
      .catch((err) => {
        setMessage("Failed to update, try again");
        setIsError(true);
        console.error(err);
      });
  };

  /**
   * remove deleted link from list, and set state to modified
   * @param link link
   */
  const onDeleteLink = (link: string) => {
    setLinks((oldLinks) => oldLinks.filter((l) => link !== l));
    setModified(true);
  };

  /**
   * add link to list of links
   * @param link link
   */
  const onAddLink = (link: string) => {
    setLinks((oldLinks) => oldLinks.concat(link));
    setModified(true);
  };

  /**
   * Add technologies to list of technologies
   * @param technologies string of technologies joined with ,
   */
  const onAddTechnology = (technologies: string) => {
    setTechnologies((old) => old.concat(technologies.split(",")));
    setModified(true);
  };

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
          value={name}
          onChange={(e) => onChange(setName, e.target.value)}
          accessKey="n"
        />
      </article>
      <article className="input-wrapper">
        <label className="title">
          repository
          <a href={repository || "#"} target="_blank" rel="noreferrer">
            visit link
          </a>
        </label>
        <input
          type="url"
          placeholder="N/A"
          value={repository}
          onChange={(e) => onChange(setRepository, e.target.value)}
          accessKey="r"
        />
      </article>
      <article className="input-wrapper">
        <label className="title">description</label>
        <textarea
          value={description}
          placeholder="N/A"
          onChange={(e) => onChange(setDescription, e.target.value)}
          accessKey="d"
        ></textarea>
      </article>
      <article className="input-wrapper">
        <label className="title">
          Technologies <a onClick={(_) => setTechModal(true)}>add technology</a>
        </label>
        <div className="flex flex-wrap">
          {technologies.map((tech) => (
            <span
              key={tech}
              title="click to delete"
              onClick={(_) => {
                setTechnologies((old) => old.filter((t) => t !== tech));
                setModified(true);
              }}
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
          Related links{" "}
          <a className="cursor-pointer" onClick={(_) => setLinkModal(true)}>
            add link
          </a>
        </label>
        <ul className="list-none">
          {links.map((link) => (
            <li className="underline px-2 flex items-center group" key={link}>
              <TrashIcon
                className="w-5 h-5 text-red-400 opacity-0 group-hover:opacity-100 cursor-pointer duration-300"
                onClick={(_) => onDeleteLink(link)}
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
          onClick={updateProject}
          type="submit"
          className="btn btn-blue relative w-5/6 md:w-1/4"
          accessKey="u"
        >
          {modified && (
            <span className="animate-ping absolute inline-flex h-3 w-3 -top-1 -left-1 rounded-full bg-purple-400 opacity-75"></span>
          )}
          <u>U</u>pdate
        </button>
        <button
          type="reset"
          onClick={onCancel}
          className="btn btn-red w-5/6 md:w-1/4 m-2 md:mx-auto"
          accessKey="c"
        >
          <u>C</u>ancel
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
      {/* message to display for the user */}
      {message && (
        <article className="py-2 text-center">
          <p className={isError ? "text-red-400" : "text-green-400"}>
            {message}
          </p>
        </article>
      )}

      {/* modals */}
      <InputModal
        title="Related links"
        subtitle="Some useful links you may check"
        type="url"
        isVisible={linkModal}
        onOk={onAddLink}
        onCancel={() => setLinkModal(false)}
      />
      <InputModal
        title="Technologies"
        subtitle="Comma separated values"
        type="text"
        isVisible={techModal}
        onOk={onAddTechnology}
        onCancel={() => setTechModal(false)}
      />
    </section>
  );
};

export default DetailsLeft;
