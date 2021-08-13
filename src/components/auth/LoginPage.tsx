import React, { useState } from "react";
import { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../config/firebase";
import { ReactComponent as RegisterImage } from "../../assets/images/new-task.svg";
import ThirdPartyAuthProviders from "./ThirdPartyAuthProviders";
import LoginForm from "./LoginForm";
import Errors from "../commons/Errors";

const LoginPage = () => {
  const [errors, setErrors] = useState<string[]>([]);

  const history = useHistory();

  const login = (email: string, password: string) => {
    setErrors([]);
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => history.push("/projects"))
      .catch((err: Error) => {
        setErrors([err.message]);
      });
  };

  const onThirdPartyAuthenticationError = () => {
    setErrors(["Failed to authenticate, try later"]);
  };

  return (
    <section className="h-screen fade-in flex flex-col lg:flex-row lg:items-center">
      <header className="h-full flex-center flex-col bg-gradient-to-r from-blue-400 to-transparent lg:w-7/12">
        <div className="w-5/6 text-center py-12">
          <h1 className="text-4xl text-white">Keep tracks of your ideas</h1>
          <h3 className="text-sm pt-2 text-white dark:text-white">
            It is time to start that side project, you bought a domain name for.
          </h3>
        </div>
        <div className="flex-center py-4">
          <RegisterImage className="hidden lg:block w-3/4 h-auto" />
        </div>
      </header>

      <article className="lg:w-5/12 py-12 my-auto">
        <header className="px-12 text-2xl pt-8">
          <h1>Account Login</h1>
          <Errors errors={errors} />
        </header>

        <LoginForm login={login} />
        <ThirdPartyAuthProviders onError={onThirdPartyAuthenticationError} />
      </article>
    </section>
  );
};

export default LoginPage;
