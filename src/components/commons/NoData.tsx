import React from "react";
import { ReactComponent as EmptyImage } from "../../assets/images/empty.svg";

const NoData = () => {
  return (
    <div className="w-full h-full p-4">
      <div className="text-3xl uppercase text-gray-50 opacity-70 text-center">
        no data is available
      </div>
      <div>
        <EmptyImage className="w-1/4 mx-auto block" />
      </div>
    </div>
  );
};

export default NoData;
