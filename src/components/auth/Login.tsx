import React, { useState } from "react";
import { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../config/firebase";

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
        console.error(err);
        setError("Failed to authenticate !!!");
        setLoading(false);
      });
  };

  return (
    <section className="transparent shadow rounded mt-4 mx-auto text-white max-w-lg min-w-lg border-r-8 border-blue-400">
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
          <label className="block small-text text-gray-200" htmlFor="password">
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
    </section>
  );
};

export default Login;
