import React, { FunctionComponent } from "react";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";

const Plus: FunctionComponent<{
  onClick: (e: any) => void;
}> = ({ onClick }) => {
  return (
    <div
      className="plus w-12 h-12 bg-gray-50 rounded-full cursor-pointer"
      title="Add"
      onClick={onClick}
    >
      <PlusIcon className="text-blue-800" />
    </div>
  );
};

export default Plus;
