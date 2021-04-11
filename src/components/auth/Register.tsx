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
    <section className="bg-image fade-in flex flex-col-reverse lg:flex-row">
      <article className="lg:w-2/4 py-12">
        <article className="auth-wrapper">
          <header className="px-12 text-2xl pt-8">
            <h1 className="text-blue-400 ">Account Registration</h1>
          </header>
          <form action="">
            <article className="py-4 px-12">
              <label htmlFor="email" className="block small-text text-gray-200">
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
            <article className="py-4 px-12">
              <label
                className="block small-text text-gray-200"
                htmlFor="retype-password"
              >
                Retype Password
              </label>
              <input
                id="retype-password"
                className="form-input"
                type="password"
                ref={retypePasswordRef}
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
                onClick={onRegister}
              >
                {loading ? "Registering ..." : "Register"}
              </button>
            </article>
            <div className="p-4 flex justify-center flex-wrap">
              <Link className="auth-link" to="/login">
                already have an account
              </Link>
            </div>
          </form>
          <ThirdPartyAuthProviders onError={onThirdPartyAuthenticationError} />
        </article>
      </article>
      <article className="lg:w-2/4">
        <div className="text-white text-center w-3/4 mx-auto py-12">
          <h1 className="text-2xl">
            You will never know when you get that one million $$ idea
          </h1>
          <h3 className="text-md py-4">
            Create an account and keep tracks of you side projects
          </h3>
        </div>
        <div className="center-with-flex py-4">
          <LoginImage className="hidden lg:block w-3/4 h-auto" />
        </div>
      </article>
    </section>
  );
};

export default Register;
