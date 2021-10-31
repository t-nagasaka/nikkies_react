import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTokenStatus } from "../components/atoms/login/loginSlice";

const PrivateRoute = ({ children }) => {
  const isLoginStatus = useSelector(selectTokenStatus);
  return isLoginStatus ? children : <Redirect to={"/"} />;
};

export default PrivateRoute;
