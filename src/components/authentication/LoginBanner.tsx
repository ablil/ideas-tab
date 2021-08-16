import React from "react";
import { ReactComponent as LoginIllustration } from "../../assets/images/new-task.svg";

const LoginBanner = () => {
  return (
    <section>
      <article className="text-center">
        <h1 className="text-4xl ">Keep tracks of your ideas</h1>
        <small className="pt-2 text-gray-900 dark:text-white">
          It is time to start that side project, you bought a domain name for.
        </small>
      </article>
      <article className="flex-center">
        <LoginIllustration className="hidden lg:block w-3/4 h-auto" />
      </article>
    </section>
  );
};

export default LoginBanner;
