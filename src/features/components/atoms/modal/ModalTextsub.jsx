import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectModalText } from "../../slices/DiarySlice";

const ModalTextsub = () => {
  const ModalText = useSelector(selectModalText);
  const textData = ModalText ? ModalText.replace(" v", "\n") : ModalText;

  return (
    <div style={{ whiteSpace: "pre-line" }}>
      <StyleText>{textData}</StyleText>
    </div>
  );
};

const StyleText = styled.div`
  background-color: #fff;
  padding: 14px 30px 30px 30px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  margin-top: -20px;
`;

export default ModalTextsub;
