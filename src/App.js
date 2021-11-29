import "./App.css";
import React from "react";
import DiaryModal from "./features/components/atoms/modal/DiaryModal";
import EditModal from "./features/components/atoms/modal/EditModal";
import MainDiary from "./features/components/pages/Diary";
import BaseNavbar from "./features/components/molecules/BaseNavbar";

const App = () => {
  return (
    <>
      <BaseNavbar />
      <DiaryModal />
      {/* <div style={{ margin: "20px", padding: "20px 0px" }}> */}
      <MainDiary />
      {/* </div> */}
      <EditModal />
    </>
  );
};

export default App;
