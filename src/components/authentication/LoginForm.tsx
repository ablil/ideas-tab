import React, { FC } from "react";
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

    if (!obj.email || obj.email.length === 0)
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
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="password"
          placeholder="username@example.com"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          placeholder="************"
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      <div>
        <button
          type="submit"
          className="btn w-3/4 btn-blue"
          onClick={handleSubmit}
        >
          Login
        </button>
      </div>

      <footer className="p-4 flex justify-center flex-wrap">
        <Link to="/register">create account</Link>
        <Link to="/reset">forgot password</Link>
      </footer>
    </form>
  );
};

export default LoginForm;
