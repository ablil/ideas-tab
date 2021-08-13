import React from "react";
import { ReactComponent as LoginIllustration } from "../../assets/images/new-task.svg";

const LoginBanner = () => {
  return (
    <>
      <div className="w-5/6 text-center py-12">
        <h1 className="text-4xl text-white">Keep tracks of your ideas</h1>
        <h3 className="text-sm pt-2 text-white dark:text-white">
          It is time to start that side project, you bought a domain name for.
        </h3>
      </div>
      <div className="flex-center py-4">
        <LoginIllustration className="hidden lg:block w-3/4 h-auto" />
      </div>
    </>
  );
};

export default LoginBanner;
