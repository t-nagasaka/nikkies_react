import React from "react";
import { Redirect } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isLoginStatus = localStorage.localJWT;
  return isLoginStatus ? children : <Redirect to={"/"} />;
};

export default PrivateRoute;
