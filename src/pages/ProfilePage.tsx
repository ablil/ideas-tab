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
      <section className="max-w-md fade-in shadow pt-4 text-center mx-auto ground">
        <header className="text-xl text-bold px-2">
          You are now connected as{" "}
          <span className="text-2xl ">{user.email}</span>
        </header>
        <Errors errors={errors} />
        <UpdatePasswordForm updatePassword={onUpdatePassword} />
      </section>
    </PageWrapper>
  );
};

export default ProfilePage;
