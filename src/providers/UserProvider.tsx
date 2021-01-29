import firebase from "firebase";
import React, { FunctionComponent } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
export const UserContext = React.createContext<{
  loading: boolean;
  user: any;
  reauthenticate: (
    password: string
  ) => Promise<firebase.auth.UserCredential> | undefined;
  updatePassword: (password: string) => Promise<void> | undefined;
  deleteAccount: () => Promise<void> | undefined;
  // @ts-ignore
}>({});

const UserProvider: FunctionComponent<{ children: any }> = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  const reauthenticate = (password: string) =>
    auth.currentUser?.reauthenticateWithCredential(
      firebase.auth.EmailAuthProvider.credential(user.email, password)
    );

  const updatePassword = (password: string) =>
    auth.currentUser?.updatePassword(password);

  const deleteAccount = () => auth.currentUser?.delete();

  return (
    <UserContext.Provider
      value={{
        loading,
        user,
        reauthenticate,
        updatePassword,
        deleteAccount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
