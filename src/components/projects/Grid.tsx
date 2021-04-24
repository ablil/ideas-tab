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
      <article className="w-5/6 mx-auto">
        <input
          type="text"
          className="bg-white dark:bg-gray-800"
          placeholder="Filter by name or technology ..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </article>
      {/* grid of project */}
      {projects.length === 0 ? (
        <NoData />
      ) : (
        <section className="flex-center flex-wrap">
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
