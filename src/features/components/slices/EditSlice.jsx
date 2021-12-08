import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHistory } from "react-router-dom";

import axios from "axios";

const apiUrl = "http://localhost:8000/";

export const deleteAsyncUser = createAsyncThunk(
  "userDelete/delete",
  async (params, { rejectWithValue }) => {
    try {
      const myId = localStorage.id;
      const res = await axios.delete(`${apiUrl}user/users/me/`, params, {
        headers: {
          Authorization: `JWT ${localStorage.localJWT}`,
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

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
  },
  // 認証成功時にトークンの返却及びindex.jsで定義したdiariesへ遷移
  extraReducers: (builder) => {
    builder.addCase(changeAsyncPassword.fulfilled, (state, action) => {
      state.authen.currentPassword = "";
      state.authen.newPassword = "";
      state.modalOpen = false;
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
    builder.addCase(deleteAsyncUser.fulfilled, (state, action) => {
      const history = useHistory();
      localStorage.removeItem("localJWT");
      localStorage.removeItem("id");
      localStorage.removeItem("username");
      localStorage.removeItem("subDay01");
      localStorage.removeItem("subDay02");
      localStorage.removeItem("subDay03");
      history.push("/");
    });
    builder.addCase(deleteAsyncUser.rejected, (state, action) => {
      console.log(action.payload);
      //   const errorText = { ...action.payload.response.data.new_password };
      //   if (!Object.keys(errorText).length) {
      //     state.error = "現在のパスワードが正しくありません";
      //   } else {
      //     state.error = Object.values(errorText).join("\n");
      //   }
    });
  },
});

export const {
  editCurrentPassword,
  editNewPassword,
  toggleMode,
  toggleModal,
  toggleSnack,
} = editSlice.actions;
export const selectAuthen = (state) => state.edit.authen;
export const selectModalOpen = (state) => state.edit.modalOpen;
export const selectIsDeleteView = (state) => state.edit.isDeleteView;
export const selectError = (state) => state.edit.error;
export const selectOpenSnack = (state) => state.edit.openSnack;

export default editSlice.reducer;
