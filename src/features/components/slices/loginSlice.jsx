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
    const res = await axios.post(`${apiUrl}api/register/`, auth, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }
);

export const fetchAsyncGetError = createAsyncThunk(
  "login/error",
  async (auth) => {
    try {
      const res = await axios.post(`${apiUrl}api/register/`, auth, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const fetchAsyncProf = createAsyncThunk("login/get", async () => {
  const res = await axios.get(`${apiUrl}api/myprofile/`, {
    headers: {
      Authorization: `JWT ${localStorage.localJWT}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
});

export const fetchAsyncGetTokeState = createAsyncThunk(
  "verify/post",
  async () => {
    const res = await axios.post(
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

const loginSlice = createSlice({
  // *stateの中身-------------------------
  name: "login",
  initialState: {
    authen: {
      username: "",
      password: "",
    },
    tokenState: false,
    isLoginView: true,
    // ログインしているユーザーの情報をstate
    profile: {
      id: "",
      username: "",
    },
    error: "",
    // *stateの中身-------------------------
  },
  reducers: {
    // ユーザーが入力したname内容がactionに入りStateに反映させる
    editUsername(state, action) {
      state.authen.username = action.payload;
    },
    // ユーザーが入力したpassword内容がactionに入りStateに反映させる
    editPassword(state, action) {
      state.authen.password = action.payload;
    },
    toggleMode(state) {
      state.isLoginView = !state.isLoginView;
    },
    editError(state, action) {
      state.error = action.payload;
    },
    editLoginStatus(state, action) {
      state.tokenState = action.payload;
    },
  },
  // 認証成功時にトークンの返却及びindex.jsで定義したdiariesへ遷移
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
      localStorage.setItem("localJWT", action.payload.access);
      state.authen.tokenState = true;
    });
    builder.addCase(fetchAsyncLogin.rejected, (state, action) => {
      state.authen.tokenState = false;
    });
    builder.addCase(fetchAsyncGetError.fulfilled, (state, action) => {
      if (
        action.payload.username[0] ===
        "この username を持った user が既に存在します。"
      ) {
        state.error = "このusernameは既に存在します";
      }
    });
    builder.addCase(fetchAsyncProf.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
    builder.addCase(fetchAsyncGetTokeState.fulfilled, (state, action) => {
      state.tokenState = true;
    });
    builder.addCase(fetchAsyncGetTokeState.rejected, (state, action) => {
      state.tokenState = false;
    });
  },
});

export const {
  editUsername,
  editPassword,
  toggleMode,
  editError,
  editLoginStatus,
} = loginSlice.actions;
export const selectAuthen = (state) => state.login.authen;
export const selectIsLoginView = (state) => state.login.isLoginView;
export const selectProfile = (state) => state.login.profile;
export const selectError = (state) => state.login.error;
export const selectTokenStatus = (state) => state.login.tokenState;

// loginSlice全体の返却(store登録用)
export default loginSlice.reducer;
