import React, { useRef, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { auth } from "../../config/firebase";

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
  return (
    <article className="transparent shadow rounded mt-4 mx-auto text-white max-w-lg border-l-8 border-blue-400">
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
        <article className="py-4 px-12">
          <label
            className="block small-text text-gray-200"
            htmlFor="reptype-password"
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
        <div className="p-4">
          <Link
            className="underline text-gray-100 hover:text-gray-300"
            to="/login"
          >
            Already have an account ?
          </Link>
        </div>
      </form>
    </article>
  );
};

export default Register;
