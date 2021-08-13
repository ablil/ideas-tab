import React, { FC } from "react";
import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";

type FormObj = {
  email: string;
  password: string;
  confirmPassword: string;
};

type ComponentProps = {
  register: (email: string, password: string) => void;
};

const RegistrationForm: FC<ComponentProps> = ({ register }) => {
  const { data, handleChange, handleSubmit, errors } = useForm<FormObj>(
    { email: "", password: "", confirmPassword: "" },
    validate,
    onSubmit
  );

  function validate(obj: FormObj) {
    const errors: any = {};

    if (!obj.email) errors["email"] = "email is required";
    if (!obj.password || obj.password.length < 8)
      errors["password"] = "password is required";
    if (obj.password !== obj.confirmPassword)
      errors["confirmPassword"] = "passwords did not match";

    return errors;
  }

  function onSubmit() {
    register(data.email, data.password);
  }

  return (
    <form action="">
      <article className="px-12">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          placeholder="username@example.com"
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
        {errors.email && <article className="error">{errors.email}</article>}
      </article>

      <article className="px-12">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          placeholder="****************"
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
        />
        {errors.password && (
          <article className="error">{errors.password}</article>
        )}
      </article>

      <article className="px-12">
        <label htmlFor="confirmPassword">Retype Password</label>
        <input
          id="confirmPassword"
          placeholder="****************"
          type="password"
          name="confirmPassword"
          value={data.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <article className="error">{errors.confirmPassword}</article>
        )}
      </article>

      <article className="py-4 px-12">
        <button
          type="submit"
          className="btn w-3/4 btn-blue"
          onClick={handleSubmit}
        >
          Register
        </button>
      </article>

      <footer className="p-4 flex justify-center flex-wrap">
        <Link to="/login">already have an account</Link>
      </footer>
    </form>
  );
};

export default RegistrationForm;
