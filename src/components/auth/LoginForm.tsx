import React, { ChangeEvent, FC, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";

type LoginFormProps = {
  login: (email: string, password: string) => void;
};

type FormObj = {
  email: string;
  password: string;
};

const LoginForm: FC<LoginFormProps> = ({ login }) => {
  const { data, handleChange, handleSubmit, errors } = useForm<FormObj>(
    { email: "", password: "" },
    validate,
    onSubmit
  );

  function validate(obj: FormObj) {
    const errors: any = {};

    if (!obj.email || obj.email.length == 0)
      errors["email"] = "email is required";

    if (obj.password.length < 8)
      errors["password"] = "password length must be at least 8";

    return errors;
  }

  function onSubmit() {
    login(data.email, data.password);
  }

  return (
    <form action="">
      <article className="py-4 px-12">
        <label htmlFor="email">Email</label>
        <input
          id="password"
          placeholder="username@example.com"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
        />
        {errors.email && (
          <span className="text-red-400 text-sm font-bold">{errors.email}</span>
        )}
      </article>

      <article className="py-4 px-12">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          placeholder="************"
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
        />
        {errors.password && (
          <span className="text-red-400 text-sm font-bold">
            {errors.password}
          </span>
        )}
      </article>

      <article className="py-4 px-12">
        <button
          type="submit"
          className="btn w-3/4 btn-blue"
          onClick={handleSubmit}
        >
          Login
        </button>
      </article>

      <footer className="p-4 flex justify-center flex-wrap">
        <Link to="/register">create account</Link>
        <Link to="/reset">forgot password</Link>
      </footer>
    </form>
  );
};

export default LoginForm;
