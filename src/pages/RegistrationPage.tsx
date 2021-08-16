import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../config/firebase";
import ThirdPartyAuthProviders from "../components/authentication/ThirdPartyAuthProviders";

import firebase from "firebase";
import RegistrationForm from "../components/authentication/RegistrationForm";
import Errors from "../components/commons/Errors";
import RegistrationBanner from "../components/authentication/RegistrationBanner";
import { createExampleProject } from "../service/projects";

const RegistrationPage = () => {
  const [errors, setErrors] = useState<string[]>([]);

  const history = useHistory();

  function register(email: string, password: string) {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((creds: firebase.auth.UserCredential) => {
        createExampleProject(creds.user?.uid!);
        history.push("/");
      })
      .catch((err: Error) => setErrors([err.message]));
  }

  return (
    <section className="h-screen fade-in flex flex-col-reverse lg:flex-row lg:items-center">
      <article className="lg:w-5/12 py-12 my-auto">
        <header className="px-12 text-2xl pt-8 text-center">
          <h1>Account Registration</h1>
          <Errors errors={errors} />
        </header>

        <div className="max-w-md mx-auto px-8">
          <RegistrationForm register={register} />
        </div>
        <ThirdPartyAuthProviders
          onError={() => setErrors(["failed to authenticate"])}
        />
      </article>

      <article className="h-full flex-center flex-col bg-gradient-to-b lg:bg-gradient-to-l from-blue-400 to-transparent lg:w-7/12">
        <RegistrationBanner />
      </article>
    </section>
  );
};

export default RegistrationPage;
