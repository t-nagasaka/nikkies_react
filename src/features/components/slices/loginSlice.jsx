import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_DEV_API_URL;

export const fetchAsyncLogin = createAsyncThunk(
  "login/post",
  async (auth, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${apiUrl}authen/jwt/create`, auth, {
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

export const fetchAsyncRegister = createAsyncThunk(
  "login/register",
  async (auth, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${apiUrl}api/register/`, auth, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
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
      id: localStorage.id,
      username: localStorage.username,
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
    resetState(state, action) {},
  },
  // 認証成功時にトークンの返却及びindex.jsで定義したdiariesへ遷移
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
      localStorage.setItem("localJWT", action.payload.access);
      state.authen.password = "";
      state.authen.tokenState = true;
    });
    builder.addCase(fetchAsyncLogin.rejected, (state, action) => {
      console.log(apiUrl);
      state.error = "UsernameまたはPasswordが間違っています";
    });
    builder.addCase(fetchAsyncRegister.fulfilled, (state, action) => {
      localStorage.setItem("localJWT", action.payload.access);
      state.authen.password = "";
      state.authen.tokenState = true;
    });
    builder.addCase(fetchAsyncRegister.rejected, (state, action) => {
      state.error = "このusernameは既に存在します";
    });
    builder.addCase(fetchAsyncProf.fulfilled, (state, action) => {
      state.profile.id = action.payload[0].id;
      state.profile.username = action.payload[0].username;
      localStorage.setItem("id", action.payload[0].id);
      localStorage.setItem("username", action.payload[0].username);
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
  toggleSnack,
  resetState,
} = loginSlice.actions;
export const selectAuthen = (state) => state.login.authen;
export const selectIsLoginView = (state) => state.login.isLoginView;
export const selectProfile = (state) => state.login.profile;
export const selectError = (state) => state.login.error;
export const selectTokenStatus = (state) => state.login.tokenState;
export const selectOpenSnack = (state) => state.login.openSnack;

// loginSlice全体の返却(store登録用)
export default loginSlice.reducer;
