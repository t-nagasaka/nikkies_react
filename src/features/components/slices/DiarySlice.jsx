import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "http://localhost:8000/api/diary/";
const token = localStorage.localJWT;

export const fetchAsyncMainDiary = createAsyncThunk(
  "mainDiary/get",
  async (date) => {
    const params = {
      display_date: date,
    };
    const res = await axios.get(`${apiUrl}`, {
      params,
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }
);

export const createAsyncMainDiary = createAsyncThunk(
  "mainDiary/post",
  async (params) => {
    const res = await axios.post(apiUrl, params, {
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }
);

export const saveAsyncMainDiary = createAsyncThunk(
  "mainDiary/put",
  async (diary) => {
    const res = await axios.put(apiUrl, diary, {
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }
);

export const fetchAsyncSubDiary = createAsyncThunk(
  "subDiary/get",
  async (date) => {
    const res = await axios.get(apiUrl, {
      params: {
        display_date: date,
      },
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }
);

export const saveAsyncSubDiary = createAsyncThunk(
  "subDiary/put",
  async (date) => {
    const params = {
      display_date: date,
    };
    const res = await axios.put(apiUrl, params, {
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }
);

const diarySlice = createSlice({
  // *stateの中身-------------------------
  name: "diary",
  initialState: {
    mainDiary: {
      id: "",
      title: "",
      text: "",
    },
    subDiary01: {
      day: 0,
      title: "",
      text: "",
      openModal: false,
    },
    subDiary02: {
      day: 0,
      title: "",
      text: "",
      openModal: false,
    },
    subDiary03: {
      day: 0,
      title: "",
      text: "",
      openModal: false,
    },
    calendarDate: "",
    // *stateの中身-------------------------
  },
  reducers: {
    // ユーザーが入力したtitle内容がactionに入りStateに反映させる
    editMainDiaryTitle(state, action) {
      state.mainDiary.title = action.payload;
    },
    // ユーザーが入力したtext内容がactionに入りStateに反映させる
    editMainDiaryText(state, action) {
      state.mainDiary.text = action.payload;
      console.log(action.payload);
    },
    // subDiaryの振り返り日数の変更
    editSubDiary01date(state, action) {
      state.subDiary01.day = action.payload;
    },
    // subDiaryのモーダル表示切り替え
    toggleSubDiary01Modal(state, action) {
      state.subDiary01.openModal = !state.subDiary01.openModal;
    },
    // subDiaryの振り返り日数の変更
    editSubDiary02date(state, action) {
      state.subDiary02.day = action.payload;
    },
    // subDiaryのモーダル表示切り替え
    toggleSubDiary02Modal(state, action) {
      state.subDiary02.openModal = !state.subDiary02.openModal;
    },
    // subDiaryの振り返り日数の変更
    editSubDiary03date(state, action) {
      state.subDiary03.day = action.payload;
    },
    // subDiaryのモーダル表示切り替え
    toggleSubDiary03Modal(state, action) {
      state.subDiary03.openModal = !state.subDiary03.openModal;
    },
    // カレンダーの選択日
    editCalendarDate(state, action) {
      state.calendarDate = action.payload;
    },
  },
  // 認証成功時にトークンの返却及びindex.jsで定義したdiariesへ遷移
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncMainDiary.fulfilled, (state, action) => {
      console.log(action.payload);
      if (action.payload[0]) {
        state.mainDiary.id = action.payload[0]["id"];
        state.mainDiary.title = action.payload[0]["title"];
        state.mainDiary.text = action.payload[0]["text"];
      } else {
        state.mainDiary.id = "";
        state.mainDiary.title = "";
        state.mainDiary.text = "";
      }
      console.log(action.payload);
    });
    builder.addCase(createAsyncMainDiary.fulfilled, (state, action) => {
      // !作成中
      state.mainDiary.title = action.payload;
      console.log(action);
    });
    builder.addCase(saveAsyncMainDiary.fulfilled, (state, action) => {
      // !作成中
      state.mainDiary.title = action.payload;
      console.log(action);
    });
    builder.addCase(fetchAsyncSubDiary.fulfilled, (state, action) => {
      // !3つ作る？
      state.subDiary.title = action.payload.title;
      state.subDiary.text = action.payload.text;
    });
    builder.addCase(saveAsyncSubDiary.fulfilled, (state, action) => {
      // !作成中
      console.log("保存完了しました");
    });
  },
});

export const {
  editMainDiaryTitle,
  editMainDiaryText,
  editSubDiary01date,
  toggleSubDiary01Modal,
  editSubDiary02date,
  toggleSubDiary02Modal,
  editSubDiary03date,
  toggleSubDiary03Modal,
  editCalendarDate,
} = diarySlice.actions;
export const selectMainId = (state) => state.diary.mainDiary.id;
export const selectMainTitle = (state) => state.diary.mainDiary.title;
export const selectMainText = (state) => state.diary.mainDiary.text;
export const selectSub01Day = (state) => state.diary.subDiary01.day;
export const selectSub01Title = (state) => state.diary.subDiary01.title;
export const selectSub01Text = (state) => state.diary.subDiary01.text;
export const selectSub01Modal = (state) => state.diary.subDiary01.openModal;
export const selectSub02Day = (state) => state.diary.subDiary02.day;
export const selectSub02Title = (state) => state.diary.subDiary02.title;
export const selectSub02Text = (state) => state.diary.subDiary02.text;
export const selectSub02Modal = (state) => state.diary.subDiary02.openModal;
export const selectSub03Day = (state) => state.diary.subDiary03.day;
export const selectSub03Title = (state) => state.diary.subDiary03.title;
export const selectSub03Text = (state) => state.diary.subDiary03.text;
export const selectSub03Modal = (state) => state.diary.subDiary03.openModal;
export const selectCalendarDate = (state) => state.diary.calendarDate;

// loginSlice全体の返却(store登録用)
export default diarySlice.reducer;
