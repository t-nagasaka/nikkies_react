import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/components/slices/loginSlice";
import diaryReducer from "../features/components/slices/DiarySlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    diary: diaryReducer,
  },
});
