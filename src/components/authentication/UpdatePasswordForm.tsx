import React, { FC } from "react";
import useForm from "../../hooks/useForm";

type FormObj = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type ComponentProps = {
  updatePassword: (oldPassword: string, newPassword: string) => void;
};

const UpdatePasswordForm: FC<ComponentProps> = ({ updatePassword }) => {
  const { data, handleChange, handleSubmit, errors } = useForm<FormObj>(
    { oldPassword: "", newPassword: "", confirmPassword: "" },
    validate,
    onSubmit
  );

  function validate(obj: FormObj) {
    const errors: any = {};

    if (!obj.oldPassword || obj.oldPassword.length === 0)
      errors["oldPassword"] = "current password is required";

    if (obj.confirmPassword && obj.confirmPassword !== obj.newPassword)
      errors["confirmPassword"] = "passwords did not match";
    return errors;
  }

  function onSubmit() {
    updatePassword(data.oldPassword, data.newPassword);
  }

  return (
    <form action="" className="w-full mx-auto">
      <article className="py-1 px-12">
        <label className="title" htmlFor="password">
          Current Password
        </label>
        <input
          id="password"
          type="password"
          name="oldPassword"
          value={data.oldPassword}
          onChange={handleChange}
        />
        {errors.oldPassword && (
          <article className="error">{errors.oldPassword}</article>
        )}
      </article>

      <article className="py-1 px-12">
        <label className="title" htmlFor="password">
          New Password
        </label>
        <input
          id="password"
          type="password"
          name="newPassword"
          value={data.newPassword}
          onChange={handleChange}
        />
        {errors.newPassword && (
          <article className="error">{errors.newPassword}</article>
        )}
      </article>

      <article className="py-1 px-12">
        <label className="title" htmlFor="password">
          Retype New Password
        </label>
        <input
          id="password"
          type="password"
          name="confirmPassword"
          value={data.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <article className="error">{errors.confirmPassword}</article>
        )}
      </article>

      <article className="py-1 px-12">
        <button
          type="submit"
          className="btn w-3/4 btn-blue"
          onClick={handleSubmit}
        >
          Update Password
        </button>
      </article>
    </form>
  );
};

export default UpdatePasswordForm;
