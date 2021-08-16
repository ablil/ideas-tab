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
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          placeholder="username@example.com"
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          placeholder="****************"
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      <div>
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
          <span className="error">{errors.confirmPassword}</span>
        )}
      </div>

      <div>
        <button
          type="submit"
          className="btn w-3/4 btn-blue"
          onClick={handleSubmit}
        >
          Register
        </button>
      </div>

      <footer className="p-4 flex justify-center flex-wrap">
        <Link to="/login">already have an account</Link>
      </footer>
    </form>
  );
};

export default RegistrationForm;
