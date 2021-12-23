import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const apiUrl = "http://localhost:8000/";

export const changeAsyncPassword = createAsyncThunk(
  "changePassword/post",
  async (params, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${apiUrl}user/users/set_password/`,
        params,
        {
          headers: {
            Authorization: `JWT ${localStorage.localJWT}`,
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const editSlice = createSlice({
  // *stateの中身-------------------------
  name: "edit",
  initialState: {
    authen: {
      currentPassword: "",
      newPassword: "",
    },
    modalOpen: false,
    isDeleteView: false,
    // ログインしているユーザーの情報をstate
    error: "",
    snackTxt: "",
    openSnack: false,
  },
  // *stateの中身-------------------------
  reducers: {
    // ユーザーが入力したname内容がactionに入りStateに反映させる
    editCurrentPassword(state, action) {
      state.authen.currentPassword = action.payload;
    },
    // ユーザーが入力したpassword内容がactionに入りStateに反映させる
    editNewPassword(state, action) {
      state.authen.newPassword = action.payload;
    },
    toggleMode(state) {
      state.isDeleteView = !state.isDeleteView;
      state.error = "";
      state.authen.currentPassword = "";
      state.authen.newPassword = "";
    },
    toggleModal(state, action) {
      state.modalOpen = action.payload;
      state.error = "";
      state.authen.currentPassword = "";
      state.authen.newPassword = "";
    },
    toggleSnack(state) {
      state.openSnack = !state.openSnack;
      state.error = "";
    },
    editSnackTxt(state, action) {
      state.snackTxt = action.payload;
    },
    editError(state, action) {
      state.error = action.payload;
    },
  },
  // 認証成功時にトークンの返却及びindex.jsで定義したdiariesへ遷移
  extraReducers: (builder) => {
    builder.addCase(changeAsyncPassword.fulfilled, (state, action) => {
      state.authen.currentPassword = "";
      state.authen.newPassword = "";
      state.modalOpen = false;
      state.snackTxt = "パスワードを変更しました。";
      state.openSnack = true;
    });
    builder.addCase(changeAsyncPassword.rejected, (state, action) => {
      const errorText = { ...action.payload.response.data.new_password };
      if (!Object.keys(errorText).length) {
        state.error = "現在のパスワードが正しくありません";
      } else {
        state.error = Object.values(errorText).join("\n");
      }
    });
  },
});

export const {
  editCurrentPassword,
  editNewPassword,
  toggleMode,
  toggleModal,
  toggleSnack,
  editSnackTxt,
  editError,
} = editSlice.actions;
export const selectAuthen = (state) => state.edit.authen;
export const selectModalOpen = (state) => state.edit.modalOpen;
export const selectIsDeleteView = (state) => state.edit.isDeleteView;
export const selectError = (state) => state.edit.error;
export const selectSnackTxt = (state) => state.edit.snackTxt;
export const selectOpenSnack = (state) => state.edit.openSnack;

export default editSlice.reducer;
