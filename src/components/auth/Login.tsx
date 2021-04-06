import React, { useState } from "react";
import firebase from "firebase/app";
import { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../config/firebase";
import { ReactComponent as RegisterImage } from "../../assets/images/new-task.svg";
import ThirdPartyAuthProviders from "./ThirdPartyAuthProviders";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const history = useHistory();

  const onLogin = (e: any) => {
    e.preventDefault();
    setError("");
    const credentials = {
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
    };
    if (credentials.email.length === 0 || credentials.password.length === 0)
      return setError("Email & Password are required !!");

    setLoading(true);
    auth
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((creds) => history.push("/projects"))
      .catch((err) => {
        setError("Failed to authenticate !!!");
        setLoading(false);
      });
  };

  const onThirdPartyAuthenticationError = (err: Error) => {
    setError("Failed to authenticate, try later");
  };

  return (
    <section className="bg-image h-full fade-in flex flex-col lg:flex-row">
      <article className="lg:w-2/4">
        <div className="text-white text-center w-3/4 mx-auto py-12">
          <h1 className="text-5xl">Keep tracks of your ideas</h1>
          <h3 className="text-md py-4">
            It is time to start that side project, you bought a domain name for.
          </h3>
        </div>
        <div className="center-with-flex py-4">
          <RegisterImage className="hidden lg:block w-3/4 h-auto" />
        </div>
      </article>
      <article className="lg:w-2/4 py-12">
        <section className="auth-wrapper">
          <header className="px-12 text-2xl pt-8">
            <h1 className="text-blue-400 ">Account Login</h1>
          </header>
          <form action="">
            <article className="py-4 px-12">
              <label htmlFor="email" className="small-text block text-gray-200">
                Email
              </label>
              <input
                id="email"
                className="form-input"
                type="email"
                ref={emailRef}
              />
            </article>
            <article className="py-4 px-12">
              <label
                className="block small-text text-gray-200"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                className="form-input"
                type="password"
                ref={passwordRef}
              />
            </article>
            {error && (
              <article className="text-red-500 text-sm  text-center">
                {error}
              </article>
            )}
            <article className="py-4 px-12">
              <button
                type="submit"
                className="btn w-3/4 btn-blue"
                disabled={loading}
                onClick={onLogin}
              >
                {loading ? "Authenticating ..." : "Login"}
              </button>
            </article>
            <article className="p-4 flex justify-center flex-wrap">
              <Link className="auth-link" to="/register">
                create account
              </Link>
              <Link className="auth-link" to="/reset">
                forgot password
              </Link>
            </article>
          </form>
          <ThirdPartyAuthProviders onError={onThirdPartyAuthenticationError} />
        </section>
      </article>
    </section>
  );
};

export default Login;
