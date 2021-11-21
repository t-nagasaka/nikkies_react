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
  const mainId = useSelector(selectMainId);
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
      title: mainTitle,
      text: mainText,
      display_date: mainDate,
    };
    mainId
      ? dispatch(saveAsyncMainDiary(params))
      : dispatch(createAsyncMainDiary(params));
  };
  console.log(mainId);
  console.log(mainTitle);
  console.log(mainText);
  console.log(mainDate);
  return (
    <>
      <MainTag>Title</MainTag>
      <MainTextArea
        textData={mainTitle}
        id={mainId}
        onChange={renderMainTitle}
      />
      <br />
      <br />
      <MainTag>Main</MainTag>
      <MainTextArea
        minHight={"400px"}
        textData={mainText}
        id={mainId}
        onChange={renderMainText}
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
