import React from "react";
import { ReactComponent as RegistrationIllustration } from "../../assets/images/dev-productivity.svg";

const RegistrationBanner = () => {
  return (
    <>
      <div className="text-center w-5/6 mx-auto py-12">
        <h1 className="text-4xl text-white">
          You will never know when you get that one million $$ idea
        </h1>
        <h3 className="text-sm pt-2 text-white dark:text-white">
          Create an account and keep tracks of you side projects
        </h3>
      </div>
      <div className="flex-center py-4">
        <RegistrationIllustration className="hidden lg:block w-3/4 h-auto" />
      </div>
    </>
  );
};

export default RegistrationBanner;
