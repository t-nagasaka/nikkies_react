import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTokenStatus,
  fetchAsyncGetTokeState,
} from "../components/slices/loginSlice";
import App from "../../App";

const PrivateRoute = ({ children }) => {
  // const dispatch = useDispatch();
  const isLoginStatus = localStorage.localJWT;

  // dispatch(fetchAsyncGetTokeState())
  //   .then(() => {
  //     return <App />;
  //   })
  //   .catch(() => {
  //     return <Redirect to={"/"} />;
  //   });

  return isLoginStatus ? children : <Redirect to={"/"} />;
};

export default PrivateRoute;
