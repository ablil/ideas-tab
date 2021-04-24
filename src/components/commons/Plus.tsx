import React, { FunctionComponent } from "react";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";

const Plus: FunctionComponent<{
  onClick: (e: any) => void;
}> = ({ onClick }) => {
  return (
    <div
      className="plus w-12 h-12 bg-gray-50 border-blue-400 flex-center border rounded-full cursor-pointer"
      title="Add"
      onClick={onClick}
    >
      <PlusIcon className="text-blue-800 w-6 h-6 flex-center" />
    </div>
  );
};

export default Plus;
