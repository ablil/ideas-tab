import React, { FC, useState } from "react";
import { ReactComponent as GridIcon } from "../assets/icons/grid.svg";
import { ReactComponent as ListIcon } from "../assets/icons/list.svg";

type Props = {
  onFilter: (keyword?: string) => void;
  onChangeDisplayFormat: (format: string) => void;
};

const ProjectSearchbar: FC<Props> = ({ onFilter, onChangeDisplayFormat }) => {
  const [keyword, setKeyword] = useState("");

  function handleChange(evt: any) {
    setKeyword(evt.target.value);
    onFilter(evt.target.value);
  }

  return (
    <article className="flex">
      <input
        type="text"
        className="ground"
        placeholder="Filter by name or technology ..."
        value={keyword}
        onChange={handleChange}
      />
      <div className="hidden md:flex justify-center items-center">
        <GridIcon
          onClick={(_) => onChangeDisplayFormat("grid")}
          className="w-6 h-6 cursor-pointer fill-current dark:text-white  hover:text-blue-400 dark:hover:text-yellow-400"
        />
        <ListIcon
          onClick={(_) => onChangeDisplayFormat("list")}
          className="w-6 h-6 cursor-pointer fill-current dark:text-white hover:text-blue-400 dark:hover:text-yellow-400"
        />
      </div>
    </article>
  );
};

export default ProjectSearchbar;
