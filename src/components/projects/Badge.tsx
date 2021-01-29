import React, { FunctionComponent } from "react";

const Badge: FunctionComponent<{ value: string }> = ({ value }) => {
  return <span className="badge">{value}</span>;
};

export default Badge;
