import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { EditorState, convertToRaw } from "draft-js";

const apiUrl = `${process.env.REACT_APP_DEV_API_URL}api/`;

export const fetchAsyncMainDiary = createAsyncThunk(
  "mainDiary/get",
  async (date, { rejectWithValue }) => {
    try {
      const params = {
        display_date: date,
      };
      const res = await axios.get(`${apiUrl}diary/`, {
        params,
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

export const createAsyncMainDiary = createAsyncThunk(
  "mainDiary/post",
  async (params, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${apiUrl}diary/`, params, {
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

export const saveAsyncMainDiary = createAsyncThunk(
  "mainDiary/put",
  async (params, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${`${apiUrl}diary/`}${params.id}/`, params, {
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

export const fetchAsyncSubDiaryDay01 = createAsyncThunk(
  "subDiaryDay01/get",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${apiUrl}page/${id}/`, {
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

export const fetchAsyncSubDiaryDay02 = createAsyncThunk(
  "subDiaryDay02/get",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${apiUrl}page/${id}/`, {
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

export const fetchAsyncSubDiaryDay03 = createAsyncThunk(
  "subDiaryDay03/get",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${apiUrl}page/${id}/`, {
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

export const fetchAsyncSubDiary01 = createAsyncThunk(
  "subDiary01/get",
  async (date, { rejectWithValue }) => {
    try {
      const params = {
        display_date: date,
      };
      const res = await axios.get(`${apiUrl}diary/`, {
        params,
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

export const fetchAsyncSubDiary02 = createAsyncThunk(
  "subDiary02/get",
  async (date, { rejectWithValue }) => {
    const params = {
      display_date: date,
    };
    try {
      const res = await axios.get(`${apiUrl}diary/`, {
        params,
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

export const fetchAsyncSubDiary03 = createAsyncThunk(
  "subDiary03/get",
  async (date, { rejectWithValue }) => {
    const params = {
      display_date: date,
    };
    try {
      const res = await axios.get(`${apiUrl}diary/`, {
        params,
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

export const saveAsyncSubDiary01 = createAsyncThunk(
  "subDiaryDay01/post",
  async (params, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${apiUrl}page/${params.user_page}/`,
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

export const saveAsyncSubDiary02 = createAsyncThunk(
  "subDiaryDay02/post",
  async (params, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${apiUrl}page/${params.user_page}/`,
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

export const saveAsyncSubDiary03 = createAsyncThunk(
  "subDiaryDay03/post",
  async (params, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${apiUrl}page/${params.user_page}/`,
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

const rejectedList = [
  createAsyncMainDiary,
  saveAsyncMainDiary,
  fetchAsyncSubDiaryDay01,
  fetchAsyncSubDiaryDay02,
  fetchAsyncSubDiaryDay03,
  fetchAsyncSubDiary01,
  fetchAsyncSubDiary02,
  fetchAsyncSubDiary03,
  saveAsyncSubDiary01,
  saveAsyncSubDiary02,
  saveAsyncSubDiary03,
];

const diarySlice = createSlice({
  // *stateの中身-------------------------
  name: "diary",
  initialState: {
    mainDiary: {
      id: "",
      randomId: 0,
      title: JSON.stringify(
        convertToRaw(EditorState.createEmpty().getCurrentContent())
      ),
      text: JSON.stringify(
        convertToRaw(EditorState.createEmpty().getCurrentContent())
      ),
    },
    subDiary01: {
      day: 0,
      title: "",
      text: "",
    },
    subDiary02: {
      day: 0,
      title: "",
      text: "",
    },
    subDiary03: {
      day: 0,
      title: "",
      text: "",
    },
    openModal: false,
    modalTitle: "",
    modalText: "",
    calendarDate: "",
    toHome: false,
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
    },
    // subDiaryの振り返り日数の変更
    editSubDiary01date(state, action) {
      state.subDiary01.day = action.payload;
    },
    // subDiaryの振り返り日数の変更
    editSubDiary02date(state, action) {
      state.subDiary02.day = action.payload;
    },
    // subDiaryの振り返り日数の変更
    editSubDiary03date(state, action) {
      state.subDiary03.day = action.payload;
    },
    // subDiaryのモーダル表示切り替え
    toggleSubDiaryModal(state, action) {
      state.openModal = !state.openModal;
    },
    // カレンダーの選択日
    editCalendarDate(state, action) {
      state.calendarDate = action.payload;
    },
    // モーダルのタイトル
    editModalTitle(state, action) {
      state.modalTitle = action.payload;
    },
    // モーダルの本文
    editModalText(state, action) {
      state.modalText = action.payload;
    },
    toggleToHome(state) {
      state.toHome = !state.toHome;
    },
  },
  // 認証成功時にトークンの返却及びindex.jsで定義したdiariesへ遷移
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncMainDiary.fulfilled, (state, action) => {
      if (action.payload[0]) {
        state.mainDiary.id = action.payload[0]["id"];
        state.mainDiary.randomId = Math.floor(Math.random() * 1000000);
        state.mainDiary.title = action.payload[0]["title"];
        state.mainDiary.text = action.payload[0]["text"];
        state.calendarDate = action.payload[0]["display_date"];
      } else {
        state.mainDiary.id = "";
        state.mainDiary.randomId = Math.floor(Math.random() * 1000000);
        state.mainDiary.text = JSON.stringify(
          convertToRaw(EditorState.createEmpty().getCurrentContent())
        );
        state.mainDiary.title = JSON.stringify(
          convertToRaw(EditorState.createEmpty().getCurrentContent())
        );
      }
    });
    builder.addCase(createAsyncMainDiary.fulfilled, (state, action) => {
      state.mainDiary.id = action.payload.id;
    });
    builder.addCase(fetchAsyncSubDiary01.fulfilled, (state, action) => {
      if (action.payload[0]) {
        const titles = JSON.parse(action.payload[0]["title"]).blocks;
        const titleList = titles.map((title) => title.text);
        const titleData = titleList.join("\n");
        const texts = JSON.parse(action.payload[0]["text"]).blocks;
        const textList = texts.map((text) => text.text);
        const textData = textList.join("\n");
        state.subDiary01.title = titleData;
        state.subDiary01.text = textData;
      } else {
        state.subDiary01.title = "";
        state.subDiary01.text = "";
      }
    });
    builder.addCase(fetchAsyncSubDiary02.fulfilled, (state, action) => {
      if (action.payload[0]) {
        const titles = JSON.parse(action.payload[0]["title"]).blocks;
        const titleList = titles.map((title) => title.text);
        const titleData = titleList.join("\n");
        const texts = JSON.parse(action.payload[0]["text"]).blocks;
        const textList = texts.map((text) => text.text);
        const textData = textList.join("\n");
        state.subDiary02.title = titleData;
        state.subDiary02.text = textData;
      } else {
        state.subDiary02.title = "";
        state.subDiary02.text = "";
      }
    });
    builder.addCase(fetchAsyncSubDiary03.fulfilled, (state, action) => {
      if (action.payload[0]) {
        const titles = JSON.parse(action.payload[0]["title"]).blocks;
        const titleList = titles.map((title) => title.text);
        const titleData = titleList.join("\n");
        const texts = JSON.parse(action.payload[0]["text"]).blocks;
        const textList = texts.map((text) => text.text);
        const textData = textList.join("\n");
        state.subDiary03.title = titleData;
        state.subDiary03.text = textData;
      } else {
        state.subDiary03.title = "";
        state.subDiary03.text = "";
      }
    });
    builder.addCase(fetchAsyncSubDiaryDay01.fulfilled, (state, action) => {
      const day = action.payload.history01_display_date;
      localStorage.setItem("subDay01", day);
      state.subDiary01.day = day;
    });
    builder.addCase(fetchAsyncSubDiaryDay02.fulfilled, (state, action) => {
      const day = action.payload.history02_display_date;
      localStorage.setItem("subDay02", day);
      state.subDiary02.day = day;
    });
    builder.addCase(fetchAsyncSubDiaryDay03.fulfilled, (state, action) => {
      const day = action.payload.history03_display_date;
      localStorage.setItem("subDay03", day);
      state.subDiary03.day = day;
    });
    rejectedList.map((rej) =>
      builder.addCase(rej.rejected, (state, action) => {
        const resStatus = action.payload.response.status;
        state.toHome = resStatus === 401 ? true : false;
      })
    );
  },
});

export const {
  editMainDiaryTitle,
  editMainDiaryText,
  editSubDiary01date,
  editSubDiary02date,
  editSubDiary03date,
  toggleSubDiaryModal,
  editCalendarDate,
  editModalTitle,
  editModalText,
  toggleToHome,
} = diarySlice.actions;
export const selectMainId = (state) => state.diary.mainDiary.id;
export const selectMainRandomId = (state) => state.diary.mainDiary.randomId;
export const selectMainTitle = (state) => state.diary.mainDiary.title;
export const selectMainText = (state) => state.diary.mainDiary.text;
export const selectSub01Day = (state) => state.diary.subDiary01.day;
export const selectSub01Title = (state) => state.diary.subDiary01.title;
export const selectSub01Text = (state) => state.diary.subDiary01.text;
export const selectSub02Day = (state) => state.diary.subDiary02.day;
export const selectSub02Title = (state) => state.diary.subDiary02.title;
export const selectSub02Text = (state) => state.diary.subDiary02.text;
export const selectSub03Day = (state) => state.diary.subDiary03.day;
export const selectSub03Title = (state) => state.diary.subDiary03.title;
export const selectSub03Text = (state) => state.diary.subDiary03.text;
export const selectSubModal = (state) => state.diary.openModal;
export const selectCalendarDate = (state) => state.diary.calendarDate;
export const selectModalTitle = (state) => state.diary.modalTitle;
export const selectModalText = (state) => state.diary.modalText;
export const selectToHome = (state) => state.diary.toHome;

// loginSlice全体の返却(store登録用)
export default diarySlice.reducer;
