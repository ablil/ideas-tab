import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../config/firebase";
import Errors from "../components/commons/Errors";
import LoginForm from "../components/authentication/LoginForm";
import ThirdPartyAuthProviders from "../components/authentication/ThirdPartyAuthProviders";
import LoginBanner from "../components/authentication/LoginBanner";
import firebase from "firebase";

const LoginPage = () => {
  const [errors, setErrors] = useState<string[]>([]);

  const history = useHistory();

  const login = (email: string, password: string) => {
    setErrors([]);
    auth
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then((_) => firebase.auth().signInWithEmailAndPassword(email, password))
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
      <article className="h-full flex-center flex-col bg-gradient-to-r from-blue-400 to-transparent lg:w-7/12">
        <LoginBanner />
      </article>

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
