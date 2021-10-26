import { stepLabelClasses } from "@mui/material";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "http://localhost:8000/";
const token = localStorage.localJWT;

// コンポーネントからユーザーの入力した情報(auth)を受け取り引数として渡す
export const fetchAsyncLogin = createAsyncThunk("login/post", async (auth) => {
  const res = await axios.post(`${apiUrl}authen/jwt/create`, auth, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  // resのaccessに認証tokenが格納される
  return res.data;
});

export const fetchAsyncRegister = createAsyncThunk(
  "login/register",
  async (auth) => {
    const res = await axios.post(`${apiUrl}api/register`, auth, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }
);

export const fetchAsyncProf = createAsyncThunk("login/get", async () => {
  const res = await axios.get(`${apiUrl}api/user`, {
    headers: {
      Authorization: `JWT ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
});

const loginSlice = createSlice({
  // *stateの中身-------------------------
  name: "login",
  initialState: {
    authne: {
      username: "",
      password: "",
    },
    isLoginView: true,
    // ログインしているユーザーの情報をstate
    profile: {
      id: 0,
      username: "",
    },
    // *stateの中身-------------------------
  },
  reducers: {
    // ユーザーが入力したname内容をStateに反映させる
    editUsername(state, action) {
      state.authen.username = action.payload;
    },
    // ユーザーが入力したpassword内容をStateに反映させる
    editPassword(state, action) {
      state.authen.password = action.payload;
    },
    toggleMode(state) {
      stepLabelClasses.isLoginView = !state.isLoginView;
    },
  },
  // 認証成功時にトークンの返却及びindex.jsで定義したdiariesへ遷移
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
      localStorage.setItem("localJWT", action.payload.access);
      action.payload.access && (window.location.href = "/diaries");
    });
    builder.addCase(fetchAsyncProf.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});

export const { editUsername, editPassword, toggleMode } = loginSlice.actions;
export const selectAuthen = (state) => state.login.authne;
export const selectIsLoginView = (state) => state.login.isLoginView;
export const selectProfile = (state) => state.login.profile;

// loginSlice全体の返却
export default loginSlice.reducer;
