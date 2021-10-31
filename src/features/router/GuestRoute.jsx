import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchGetTokenStatus,
  selectTokenStatus,
} from "../components/atoms/login/loginSlice";

const dispatch = useDispatch();

export const GuestRoute = async () => {
  await dispatch(fetchGetTokenStatus());
  const verifyStatus = useSelector(selectTokenStatus);
  return verifyStatus && <Redirect to="/diaries" />;
};

export default GuestRoute;
