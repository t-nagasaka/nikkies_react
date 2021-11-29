import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "http://localhost:8000/";

// コンポーネントからユーザーの入力した情報(auth)を受け取り引数として渡す

export const deleteAsyncUser = createAsyncThunk(
  "userDelete/delete",
  async (auth) => {
    const res = await axios.post(`${apiUrl}api/register/`, auth, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }
);

export const changeAsyncPassword = createAsyncThunk(
  "changePassword/put",
  async () => {
    const res = await axios.put(
      `${apiUrl}authen/jwt/verify`,
      { token: localStorage.localJWT },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
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
  },
  error: "",
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
    toggleMode(state, action) {
      state.isDeleteView = action.payload;
    },
    toggleModal(state, action) {
      state.modalOpen = action.payload;
    },
  },
  // 認証成功時にトークンの返却及びindex.jsで定義したdiariesへ遷移
  extraReducers: (builder) => {
    builder.addCase(changeAsyncPassword.fulfilled, (state, action) => {
      console.log("パスワードの変更に成功しました");
      console.log(action.ayload);
      state.authen.currentPassword = "";
      state.authen.newPassword = "";
    });
    builder.addCase(changeAsyncPassword.rejected, (state, action) => {
      console.log("パスワードの変更に失敗しました");
      console.log(action.ayload);
    });
    builder.addCase(deleteAsyncUser.fulfilled, (state, action) => {
      console.log("アカウントを消去しました");
      console.log(action.payload);
    });
  },
});

export const { editCurrentPassword, editNewPassword, toggleMode, toggleModal } =
  editSlice.actions;
export const selectAuthen = (state) => state.edit.authen;
export const selectModalOpen = (state) => state.edit.modalOpen;
export const selectIsDeleteView = (state) => state.edit.isDeleteView;
export const selectError = (state) => state.edit.error;

export default editSlice.reducer;
