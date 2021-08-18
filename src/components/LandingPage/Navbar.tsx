import firebase from "firebase";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";

const Navbar = () => {
  const [user, loading] = useAuthState(firebase.auth());
  const history = useHistory();

  function logout() {
    firebase
      .auth()
      .signOut()
      .finally(() => history.push("/"));
  }

  return user ? (
    <nav className="flex justify-end items-center py-4 px-8">
      <a
        className="text-gray-900 hover:text-gray-600 no-underline text-xl mx-4"
        href="/ideas"
      >
        app
      </a>
      <button
        onClick={logout}
        className="bg-blue-400 text-white no-underline rounded-3xl py-1 px-4 mx-4 text-xl hover:bg-blue-500 hover:text-white"
      >
        logout
      </button>
    </nav>
  ) : (
    <nav className="flex justify-end items-center py-4 px-8">
      <a
        className="text-gray-900 hover:text-gray-600 no-underline text-xl mx-4"
        href="/login"
      >
        Login
      </a>
      <a
        className="bg-blue-400 text-white no-underline rounded-3xl py-1 px-4 mx-4 text-xl hover:bg-blue-500 hover:text-white"
        href="/register"
      >
        register
      </a>
    </nav>
  );
};

export default Navbar;
