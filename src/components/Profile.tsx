import React, { useRef, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";
import { UserContext } from "../providers/UserProvider";

const Profile = () => {
  const {
    loading,
    user,
    reauthenticate,
    updatePassword,
    deleteAccount,
  } = useContext(UserContext);

  const history = useHistory();

  const oldRef = useRef<HTMLInputElement>(null);
  const newRef = useRef<HTMLInputElement>(null);
  const retypeRef = useRef<HTMLInputElement>(null);

  const [msg, setMsg] = useState<string>("");
  const [isError, setIsError] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const onUpdate = () => {
    setMsg("");
    if (isInputValid() && user) {
      const oldpassword = oldRef.current!.value;
      const newpassword = newRef.current!.value;

      setUpdating(true);
      reauthenticate(oldpassword)!
        .then((user) => {
          console.info({ reauthenticatedUser: user });
          return updatePassword(newpassword);
        })
        .then((user) => {
          console.info({ updatedUser: user });
          setMsg("password updated successfully");
          setIsError(false);
          setUpdating(false);
        })
        .catch((err) => {
          console.error(err);
          setMsg(
            err.code === "auth/wrong-password"
              ? "Current password is invalid"
              : "Failed to update password"
          );
          setIsError(true);
          setUpdating(false);
        });
    }
  };

  const onDelete = () => {
    // check if password is provided
    setMsg("");
    const currentPassword = oldRef.current?.value || "";
    if (currentPassword.length === 0) {
      setIsError(true);
      return setMsg(
        "Please provide your password before deleting your account"
      );
    }

    // update password
    setDeleting(true);
    reauthenticate(currentPassword)!
      .then((user) => deleteAccount())
      .then((_) => history.push("/login"))
      .catch((err) => {
        console.error(err);
        setMsg("Failed to delete your account, try later !!");
        setDeleting(false);
      });
  };

  const isInputValid = () => {
    const oldpassword = oldRef.current?.value || "";
    const newpassword = newRef.current?.value || "";
    const retypenewpassword = retypeRef.current?.value || "";

    if (oldpassword.length === 0 || newpassword.length === 0) {
      setMsg("All fields are required !!!");
      return false;
    }

    if (newpassword !== retypenewpassword) {
      setMsg("Passwords do NOT match !!!");
      return false;
    }
    return true;
  };

  return loading ? (
    <LoadingPage />
  ) : (
    <section className="fade-in shadow pt-4 md:rounded-lg text-center md:w-3/5 lg:w-2/5 mx-auto bg-white  dark:bg-gray-800">
      <article className="text-xl text-bold">
        You are now connected as <span className="text-2xl ">{user.email}</span>
      </article>
      {msg && (
        <article
          className={isError ? "text-red-400  p-2" : "p-2 text-green-400 "}
        >
          {msg}
        </article>
      )}
      <section className="w-full mx-auto ">
        <article className="py-1 px-12">
          <label
            className="text-blue-400 dark:text-yellow-400"
            htmlFor="password"
          >
            Current Password
          </label>
          <input id="password" type="password" ref={oldRef} />
        </article>
        <article className="py-1 px-12">
          <label
            className="text-blue-400 dark:text-yellow-400"
            htmlFor="password"
          >
            New Password
          </label>
          <input id="password" type="password" ref={newRef} />
        </article>
        <article className="py-1 px-12">
          <label
            className="text-blue-400 dark:text-yellow-400"
            htmlFor="password"
          >
            Retype New Password
          </label>
          <input id="password" type="password" ref={retypeRef} />
        </article>
        <article className="py-1 px-12">
          <button
            type="submit"
            className="btn w-3/4 btn-blue"
            disabled={updating}
            onClick={onUpdate}
          >
            {updating ? "Updating ..." : "Update Password"}
          </button>
        </article>
        <article className="py-4 px-12">
          <button
            className="btn w-3/4 btn-red"
            disabled={deleting}
            onClick={onDelete}
          >
            {deleting ? "Deleting ..." : "Delete My Account"}
          </button>
          <p className="text-red-400 text-sm  py-1">
            If you delete your account, you will lose all your data
          </p>
        </article>
      </section>
    </section>
  );
};

export default Profile;
