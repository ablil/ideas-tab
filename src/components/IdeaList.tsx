import React, { FC } from "react";
import Idea from "../models/Idea";
import Card from "./Card";

type Props = {
  ideas: Idea[];
  displayFormat: string;
  onRemove: (id: string) => void;
  onSelect: (id: string) => void;
};

const IdeaList: FC<Props> = ({
  ideas,
  displayFormat = "grid",
  onRemove,
  onSelect,
}) => {
  return ideas.length === 0 ? (
    <div className="w-full h-full p-4 text-center">
      <div>Oops! You dont have any item</div>
      <div className="title text-2xl">Start by creating a new one</div>
    </div>
  ) : (
    <section className="flex-center flex-wrap">
      {ideas.map((p: Idea) => (
        <Card
          dispalyFormat={displayFormat}
          key={p.id}
          idea={p}
          onSelect={onSelect}
          onRemove={(_) => onRemove(p.id)}
        />
      ))}
    </section>
  );
};

export default IdeaList;
