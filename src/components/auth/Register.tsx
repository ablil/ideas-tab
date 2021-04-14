import React, { useRef, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { auth } from "../../config/firebase";
import { ReactComponent as LoginImage } from "../../assets/images/dev-productivity.svg";
import ThirdPartyAuthProviders from "./ThirdPartyAuthProviders";

const Register = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const retypePasswordRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const history = useHistory();

  const onRegister = (e: any) => {
    e.preventDefault();
    setError("");
    const credentials = {
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
      retypePassword: retypePasswordRef.current?.value || "",
    };

    if (credentials.email.length === 0 || credentials.password.length === 0)
      return setError("All fields are required");

    if (credentials.password !== credentials.retypePassword)
      return setError("Passwords do NOT match !!!");

    setLoading(true);
    auth
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then((_) => history.push("/"))
      .catch((err) => {
        console.error(err);
        setError("Failed to create register, try later");
        setLoading(false);
      });
  };

  const onThirdPartyAuthenticationError = () => {
    setError("Failed to authenticate, try later");
  };
  return (
    <section className="fade-in flex flex-col-reverse lg:flex-row">
      <article className="lg:w-5/12 py-12">
        <header className="px-12 text-2xl pt-8">
          <h1>Account Registration</h1>
        </header>
        <form action="">
          <article className="px-12">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              placeholder="username@example.com"
              type="email"
              ref={emailRef}
            />
          </article>
          <article className="px-12">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              placeholder="****************"
              type="password"
              ref={passwordRef}
            />
          </article>
          <article className="px-12">
            <label htmlFor="retype-password">Retype Password</label>
            <input
              id="retype-password"
              placeholder="****************"
              type="password"
              ref={retypePasswordRef}
            />
          </article>
          {error && (
            <article className="text-red-400 text-sm text-semibold text-center">
              {error}
            </article>
          )}
          <article className="py-4 px-12">
            <button
              type="submit"
              className="btn w-3/4 btn-blue"
              disabled={loading}
              onClick={onRegister}
            >
              {loading ? "Registering ..." : "Register"}
            </button>
          </article>
          <div className="p-4 flex justify-center flex-wrap">
            <Link to="/login">already have an account</Link>
          </div>
        </form>
        <ThirdPartyAuthProviders onError={onThirdPartyAuthenticationError} />
      </article>
      <article className="bg-gradient-to-b lg:bg-gradient-to-l from-blue-400 to-transparent lg:w-7/12">
        <div className="text-center w-5/6 mx-auto py-12">
          <h1 className="text-4xl text-white">
            You will never know when you get that one million $$ idea
          </h1>
          <h3 className="text-sm pt-2 text-white dark:text-white">
            Create an account and keep tracks of you side projects
          </h3>
        </div>
        <div className="flex-center py-4">
          <LoginImage className="hidden lg:block w-3/4 h-auto" />
        </div>
      </article>
    </section>
  );
};

export default Register;
