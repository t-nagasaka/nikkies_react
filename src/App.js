import "./App.css";
import NavButton from "./features/components/atoms/button/NavButton";
import TitleButton from "./features/components/atoms/button/TitleButton";
import { Button } from "@mui/material";
import React from "react";
import BaseButton from "./features/components/atoms/button/BaseButton";
import Calendar from "./features/components/atoms/calendar/Calendar";
import SubTitle from "./features/components/atoms/textarea/SubTitle";
import SubText from "./features/components/atoms/textarea/SubText";
import IntText from "./features/components/atoms/textarea/IntText";
import SubDiary from "./features/components/molecules/SubDiary";
import DiaryModal from "./features/components/atoms/modal/DiaryModal";
import Rich from "./features/components/atoms/texteditor/Rich";
import Tweet from "./features/components/atoms/texteditor/Tweet";
import MainDiary from "./features/components/molecules/MainDiary";

const App = () => {
  return (
    <>
      <TitleButton>タイトル</TitleButton>
      <NavButton>ログイン</NavButton>
      <NavButton>登録</NavButton>
      <NavButton>機能</NavButton>
      <br />
      <DiaryModal />

      {/* <Rich /> */}
      {/* <Tweet /> */}
      <br />
      <br />
      <div style={{ padding: "20px" }}></div>
      <MainDiary />
    </>
  );
};

export default App;
