import React from "react";
import styled from "styled-components";
import BaseButton from "../atoms/button/BaseButton";
import MainTag from "../atoms/texteditor/MainTag";
import MainTextArea from "../atoms/texteditor/MainTextArea";
import { useSelector, useDispatch } from "react-redux";

import {
  selectMainId,
  selectMainTitle,
  selectMainText,
  selectCalendarDate,
  editMainDiaryTitle,
  editMainDiaryText,
  createAsyncMainDiary,
  saveAsyncMainDiary,
  fetchAsyncMainDiary,
} from "../slices/DiarySlice";

const MainDiary = () => {
  const dispatch = useDispatch();
  const initialTitle = dispatch(fetchAsyncMainDiary);
  const mainId = useSelector(selectMainId);
  const mainTitle = useSelector(selectMainTitle);
  const mainText = useSelector(selectMainText);
  const mainDate = useSelector(selectCalendarDate);
  const renderMainTitle = (data) => {
    dispatch(editMainDiaryTitle(data));
  };
  const renderMainText = (data) => {
    dispatch(editMainDiaryText(data));
  };
  const clickSaveButton = () => {
    const params = {
      id: mainId,
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
        onChange={renderMainTitle}
        textData={mainTitle}
      />
      <br />
      <br />
      <MainTag>Main</MainTag>
      <MainTextArea
        minHight={"400px"}
        textData={mainText}
        onChange={renderMainText}
        textData={mainText}
      />
      <StylePosition>
        <BaseButton onClick={clickSaveButton}>save</BaseButton>
      </StylePosition>
    </>
  );
};

const StylePosition = styled.div`
  position: relative;
  top: 10px;
  display: flex;
  justify-content: center;
`;

export default MainDiary;
