import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/components/slices/loginSlice";
import diaryReducer from "../features/components/slices/DiarySlice";
import editReducer from "../features/components/slices/EditSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    diary: diaryReducer,
    edit: editReducer,
  },
});
