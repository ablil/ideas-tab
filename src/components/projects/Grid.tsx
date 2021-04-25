import React, { FunctionComponent, useState } from "react";
import Project from "../../models/Project";
import Card from "./Card";
import { ReactComponent as GridIcon } from "../../assets/icons/grid.svg";
import { ReactComponent as ListIcon } from "../../assets/icons/list.svg";

const Grid: FunctionComponent<{
  projects: Project[];
  onDelete: (id: string) => Promise<void>;
  onSelect: (id: string) => void;
}> = ({ projects, onDelete, onSelect }) => {
  const [sideprojects, setSideprojects] = useState<Project[]>(projects || []);
  const [keyword, setKeyword] = useState("");
  const [displayFormat, setDisplayFormat] = useState("gird");

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
      <article className="w-5/6 mx-auto flex">
        <input
          type="text"
          className="bg-white dark:bg-gray-800"
          placeholder="Filter by name or technology ..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div className="flex-center">
          <GridIcon
            onClick={(_) => setDisplayFormat("short")}
            className="w-6 h-6 cursor-pointer fill-current dark:text-white  hover:text-blue-400 dark:hover:text-yellow-400"
          />
          <ListIcon
            onClick={(_) => setDisplayFormat("long")}
            className="w-6 h-6 cursor-pointer fill-current dark:text-white hover:text-blue-400 dark:hover:text-yellow-400"
          />
        </div>
      </article>
      {/* grid of project */}
      {projects.length === 0 ? (
        <div className="w-full h-full p-4 text-center">
          <div>Oops! You dont have any item</div>
          <div className="text-blue-400 dark:text-yellow-400 text-2xl">
            Start by creating a new one
          </div>
        </div>
      ) : (
        <section className="flex-center flex-wrap">
          {filterSideprojects().map((p: Project) => (
            <Card
              dispalyFormat={displayFormat}
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
