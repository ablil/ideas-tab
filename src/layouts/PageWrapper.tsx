import React, { FC } from "react";
import Sidebar from "../components/Sidebar";

const PageWrapper: FC = ({ children }) => {
  return (
    <>
      <Sidebar />
      <main className="pt-16 md:pt-2 lg:pl-16">{children}</main>
    </>
  );
};

export default PageWrapper;
