import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import LoadingPage from "../pages/LoadingPage";

const PrivateRoute = ({ component, ...rest }: any) => {
  const [user, loading] = useAuthState(auth);

  return loading ? (
    <LoadingPage />
  ) : (
    <Route
      {...rest}
      render={(props) => {
        if (!user) return <Redirect to="/login" />;
        return React.createElement(component, props);
      }}
    />
  );
};

export default PrivateRoute;
