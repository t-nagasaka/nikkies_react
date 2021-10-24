import React from "react";
import styled from "styled-components";
import BaseButton from "../atoms/button/BaseButton";
import MainTag from "../atoms/texteditor/MainTag";
import MainTextArea from "../atoms/texteditor/MainTextArea";

const MainDiary = () => {
  return (
    <>
      <MainTag>Title</MainTag>
      <MainTextArea />
      <br />
      <br />
      <MainTag>Main</MainTag>
      <MainTextArea minHight={"400px"} />
      <StylePosition>
        <BaseButton>save</BaseButton>
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
