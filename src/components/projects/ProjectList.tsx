import React, { FC, FunctionComponent, useState } from "react";
import Project from "../../models/Project";
import Card from "./Card";

type Props = {
  projects: Project[];
  displayFormat: string;
  onRemove: (id: string) => void;
  onSelect: (id: string) => void;
};

const ProjectList: FC<Props> = ({
  projects,
  displayFormat = "grid",
  onRemove,
  onSelect,
}) => {
  return projects.length === 0 ? (
    <div className="w-full h-full p-4 text-center">
      <div>Oops! You dont have any item</div>
      <div className="title text-2xl">Start by creating a new one</div>
    </div>
  ) : (
    <section className="flex-center flex-wrap">
      {projects.map((p: Project) => (
        <Card
          dispalyFormat={displayFormat}
          key={p.id}
          project={p}
          onSelect={onSelect}
          onRemove={(_) => onRemove(p.id)}
        />
      ))}
    </section>
  );
};

export default ProjectList;
