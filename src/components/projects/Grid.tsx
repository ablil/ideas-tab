import React, { FunctionComponent, useState } from "react";
import Project from "../../models/Project";
import NoData from "../commons/NoData";
import Card from "./Card";

const Grid: FunctionComponent<{
  projects: Project[];
  onDelete: (id: string) => Promise<void>;
  onSelect: (id: string) => void;
}> = ({ projects, onDelete, onSelect }) => {
  const [sideprojects, setSideprojects] = useState<Project[]>(projects || []);
  const [keyword, setKeyword] = useState("");

  const filterSideprojects = () => {
    if (!keyword) return sideprojects || [];

    return sideprojects
      ? sideprojects.filter(
          (p) => p.name.includes(keyword) || p.technologies.includes(keyword)
        )
      : [];
  };

  const onRemove = (id: string) => {
    onDelete(id)
      .then((_) => setSideprojects(sideprojects.filter((p) => p.id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <section className="fade-in">
      {/* search bar */}
      <article className="rounded mx-auto my-2 transparent w-5/6 md:h-12 flex flex-col md:flex-row">
        <div className="bg-blue-800 h-full w-full md:w-2/6 rounded-l text-gray-50  text-center center-with-flex text-2xl">
          {projects.length} <span className="pl-1 text-sm">Projects Ideas</span>
        </div>
        <div className="md:h-full w-full md:w-4/5">
          <input
            type="text"
            className="h-full w-full text-gray-50 bg-transparent  outline-none p-2 md:pl-4  placeholder-opacity-25 placeholder-gray-500"
            placeholder="Filter by name or technology ..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </article>
      {/* grid of project */}
      {projects.length === 0 ? (
        <NoData />
      ) : (
        <section className="center-with-flex flex-wrap">
          {filterSideprojects().map((p: Project) => (
            <Card
              key={p.id}
              project={p}
              onSelect={onSelect}
              onRemove={onRemove}
            />
          ))}
        </section>
      )}
    </section>
  );
};

export default Grid;
