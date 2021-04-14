import React, { useState } from "react";
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
      .then(() => history.push("/projects"))
      .catch(() => {
        setError("Failed to authenticate !!!");
        setLoading(false);
      });
  };

  const onThirdPartyAuthenticationError = () => {
    setError("Failed to authenticate, try later");
  };

  return (
    <section className="h-full fade-in flex flex-col lg:flex-row">
      <article className="bg-gradient-to-r from-blue-400 to-transparent lg:w-7/12">
        <div className="w-5/6 mx-auto py-12">
          <h1 className="text-4xl text-white">Keep tracks of your ideas</h1>
          <h3 className="text-sm pt-2 text-white dark:text-white">
            It is time to start that side project, you bought a domain name for.
          </h3>
        </div>
        <div className="flex-center py-4">
          <RegisterImage className="hidden lg:block w-3/4 h-auto" />
        </div>
      </article>
      <article className="lg:w-5/12 py-12">
        <header className="px-12 text-2xl pt-8">
          <h1>Account Login</h1>
        </header>
        <form action="">
          <article className="py-4 px-12">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              placeholder="username@example.com"
              type="email"
              ref={emailRef}
            />
          </article>
          <article className="py-4 px-12">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              placeholder="************"
              type="password"
              ref={passwordRef}
            />
          </article>
          {error && (
            <article className="text-red-400 text-sm font-semibold  text-center">
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
            <Link to="/register">create account</Link>
            <Link to="/reset">forgot password</Link>
          </article>
        </form>
        <ThirdPartyAuthProviders onError={onThirdPartyAuthenticationError} />
      </article>
    </section>
  );
};

export default Login;
