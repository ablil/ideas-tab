import firebase from "firebase";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import PageWrapper from "../layouts/PageWrapper";
import LoadingPage from "./LoadingPage";
import Errors from "../components/commons/Errors";
import UpdatePasswordForm from "../components/authentication/UpdatePasswordForm";

const ProfilePage = () => {
  const [user, loading] = useAuthState(auth);

  const [errors, setErrors] = useState<string[]>([]);

  function onUpdatePassword(oldPassword: string, newPassword: string) {
    firebase
      .auth()
      .currentUser?.reauthenticateWithCredential(
        firebase.auth.EmailAuthProvider.credential(user.email, oldPassword)
      )
      .then((user) => firebase.auth().currentUser?.updatePassword(newPassword))
      .catch((err: Error) => setErrors([err.message]));
  }

  return loading ? (
    <LoadingPage />
  ) : (
    <PageWrapper>
      <section className="w-96 fade-in shadow pt-4 md:rounded-lg text-center md:w-3/5 lg:w-2/5 mx-auto ground">
        <article className="text-xl text-bold px-2">
          You are now connected as{" "}
          <span className="text-2xl ">{user.email}</span>
        </article>
        <Errors errors={errors} />
        <UpdatePasswordForm updatePassword={onUpdatePassword} />
      </section>
    </PageWrapper>
  );
};

export default ProfilePage;
