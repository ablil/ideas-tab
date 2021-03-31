import React, { FunctionComponent, useEffect, useState } from "react";
import Project from "../../models/Project";
import InputModal from "../commons/InputModal";

// TODO: when no data is availble display N/A

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

  // is project infor modified
  const [modified, setModified] = useState(false);

  const [techModal, setTechModal] = useState(false);
  const [linkModal, setLinkModal] = useState(false);

  // error messsage
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(true);

  useEffect(() => {
    onCancel();
  }, []);

  const onChange = (updateCallback: (val: any) => void, newValue: any) => {
    setModified(true);
    updateCallback(newValue);
  };

  const onCancel = () => {
    setName(project.name);
    setDescription(project.description || "");
    setRepository(project.repository || "");
    setTechnologies(project.technologies);
    setLinks(project.links);
    setModified(false);
  };

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

  return (
    <form
      id="project-details-left"
      onSubmit={updateProject}
      className="transparent rounded-lg py-4 md:m-4 md:w-2/5 md:self-start md:sticky md:top-0"
    >
      <article className="project-details-field">
        <div className="project-details-label">name</div>
        <input
          type="text"
          minLength={6}
          maxLength={60}
          required={true}
          placeholder="N/A"
          value={name}
          onChange={(e) => onChange(setName, e.target.value)}
          className="project-details-input"
        />
      </article>
      <article className="project-details-field">
        <div className="project-details-label">
          Repository{" "}
          <a
            href={repository || "#"}
            target="_blank"
            rel="noreferrer"
            className="small-link"
          >
            visit link
          </a>
        </div>
        <input
          type="url"
          placeholder="N/A"
          value={repository}
          onChange={(e) => onChange(setRepository, e.target.value)}
          className="project-details-input"
        />
      </article>
      <article className="project-details-field">
        <div className="project-details-label">Description</div>
        <textarea
          value={description}
          placeholder="N/A"
          onChange={(e) => onChange(setDescription, e.target.value)}
          className="project-details-input"
        ></textarea>
      </article>
      <article className="project-details-field">
        <div className="project-details-label">
          Technologies{" "}
          <span onClick={(_) => setTechModal(true)} className="small-link">
            add technology
          </span>
        </div>
        <div className="flex flex-wrap">
          {technologies.map((tech) => (
            <span
              title="click to delete"
              onClick={(_) =>
                setTechnologies((old) => old.filter((t) => t !== tech))
              }
              className="badge cursor-pointer"
            >
              {tech}
            </span>
          ))}
        </div>
      </article>

      <article className="project-details-field">
        <div className="project-details-label">
          Related links{" "}
          <span onClick={(_) => setLinkModal(true)} className="small-link">
            add link
          </span>
        </div>
        <ul className="list-none">
          {links.map((link) => (
            <li className="truncate underline text-sm opacity-50 px-2">
              <a href={link} target="_blank" rel="noreferrer">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </article>

      <article className="center-with-flex flex-col flex-wrap md:flex-row p-4">
        <button type="submit" className="btn btn-blue relative w-5/6 md:w-1/4">
          {modified && (
            <span className="animate-ping absolute inline-flex h-3 w-3 -top-1 -left-1 rounded-full bg-purple-400 opacity-75"></span>
          )}
          Update
        </button>
        <button
          type="reset"
          onClick={onCancel}
          className="btn btn-red w-5/6 md:w-1/4 m-2 md:mx-auto"
        >
          Cancel
        </button>
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
        title="Add new link"
        isShown={linkModal}
        onEnter={(value) => setLinks((old) => old.concat(value))}
        onClose={() => setLinkModal(false)}
      />
      <InputModal
        title="Add new technology"
        isShown={techModal}
        onEnter={(value) => setTechnologies((old) => old.concat(value))}
        onClose={() => setTechModal(false)}
      />
    </form>
  );
};

export default DetailsLeft;
