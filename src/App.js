import "./App.css";
import useEffect from "react";
import DiaryModal from "./features/components/atoms/modal/DiaryModal";
import EditModal from "./features/components/atoms/modal/EditModal";
import MainDiary from "./features/components/pages/Diary";
import BaseNavbar from "./features/components/molecules/BaseNavbar";

const App = () => {
  return (
    <>
      <BaseNavbar />
      <DiaryModal />
      <MainDiary />
      <EditModal />
    </>
  );
};

export default App;
