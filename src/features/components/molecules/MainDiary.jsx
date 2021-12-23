import { memo } from "react";
import styled from "styled-components";
import BaseButton from "../atoms/button/BaseButton";
import MainTag from "../atoms/texteditor/MainTag";
import MainTextArea from "../atoms/texteditor/MainTextArea";
import { useSelector, useDispatch } from "react-redux";
import {
  selectMainId,
  selectMainRandomId,
  selectMainTitle,
  selectMainText,
  selectCalendarDate,
  editMainDiaryTitle,
  editMainDiaryText,
  createAsyncMainDiary,
  saveAsyncMainDiary,
} from "../slices/DiarySlice";
import { selectProfile } from "../slices/loginSlice";

const MainDiary = memo(() => {
  const dispatch = useDispatch();
  const userId = useSelector(selectProfile);
  const mainId = useSelector(selectMainId);
  const mainRandomId = useSelector(selectMainRandomId);
  const mainTitle = useSelector(selectMainTitle);
  const mainText = useSelector(selectMainText);
  const mainDate = useSelector(selectCalendarDate);
  const renderMainTitle = async (data) => {
    await dispatch(editMainDiaryTitle(data));
  };
  const renderMainText = async (data) => {
    await dispatch(editMainDiaryText(data));
  };

  const clickSaveButton = () => {
    const params = {
      id: mainId,
      user_diary: userId.id,
      title: mainTitle,
      text: mainText,
      display_date: mainDate,
    };
    mainId
      ? dispatch(saveAsyncMainDiary(params))
      : dispatch(createAsyncMainDiary(params));
  };

  return (
    <>
      <MainTag>Title</MainTag>
      <MainTextArea
        textData={mainTitle}
        id={mainId}
        randomId={mainRandomId}
        onChange={renderMainTitle}
      />
      <br />
      <br />
      <MainTag>Main</MainTag>
      <MainTextArea
        minHight={"400px"}
        textData={mainText}
        id={mainId}
        randomId={mainRandomId}
        onChange={renderMainText}
      />
      <StylePosition>
        <BaseButton onClick={clickSaveButton}>save</BaseButton>
      </StylePosition>
    </>
  );
});

const StylePosition = styled.div`
  position: relative;
  top: 10px;
  display: flex;
  justify-content: center;
`;

export default MainDiary;
