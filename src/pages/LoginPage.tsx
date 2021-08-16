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
      .then(() => history.push("/ideas"))
      .catch((err: Error) => {
        setErrors([err.message]);
      });
  };

  const onThirdPartyAuthenticationError = () => {
    setErrors(["Failed to authenticate, try later"]);
  };

  return (
    <section className="h-screen fade-in flex flex-col lg:flex-row lg:items-center">
      <div className="h-full flex-center flex-col bg-gradient-to-r from-blue-400 to-transparent w-5/6 py-12 lg:w-7/12">
        <LoginBanner />
      </div>

      <article className="lg:w-5/12 py-12 my-auto">
        <header className="px-12 text-2xl pt-8 text-center">
          <h1>Account Login</h1>
          <Errors errors={errors} />
        </header>

        <div className="max-w-md mx-auto px-8">
          <LoginForm login={login} />
        </div>
        <ThirdPartyAuthProviders onError={onThirdPartyAuthenticationError} />
      </article>
    </section>
  );
};

export default LoginPage;
