import { configureStore, combineReducers } from "@reduxjs/toolkit";
import loginReducer from "../features/components/slices/loginSlice";
import diaryReducer from "../features/components/slices/DiarySlice";
import editReducer from "../features/components/slices/EditSlice";

const combinedReducer = combineReducers({
  login: loginReducer,
  diary: diaryReducer,
  edit: editReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "login/resetState") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});
