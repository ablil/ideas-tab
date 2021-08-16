import React from "react";
import { ReactComponent as RegistrationIllustration } from "../../assets/images/dev-productivity.svg";

const RegistrationBanner = () => {
  return (
    <>
      <article className="text-center">
        <h1 className="text-4xl">
          You will never know when you get that one million $$ idea
        </h1>
        <h3 className="text-sm pt-2 text-gray-900 dark:text-white">
          Create an account and keep tracks of you side projects
        </h3>
      </article>
      <article className="flex-center">
        <RegistrationIllustration className="hidden lg:block w-3/4 h-auto" />
      </article>
    </>
  );
};

export default RegistrationBanner;
