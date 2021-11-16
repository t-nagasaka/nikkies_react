import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTokenStatus,
  fetchAsyncGetTokeState,
} from "../components/slices/loginSlice";

const PrivateRoute = ({ children }) => {
  const isLoginStatus = localStorage.localJWT;
  return isLoginStatus ? children : <Redirect to={"/"} />;
};

export default PrivateRoute;
