import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/components/atoms/login/loginSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});
