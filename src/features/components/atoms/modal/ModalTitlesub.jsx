import React from "react";
import styled from "styled-components";
import CloseButton from "../button/CloseButton";

import { useSelector } from "react-redux";
import { selectModalTitle } from "../../slices/DiarySlice";

const ModalTitlesub = ({ onClick }) => {
  const ModalTitle = useSelector(selectModalTitle);
  return (
    <div style={{ whiteSpace: "pre-line" }}>
      <StyleText>
        <StylePosition>
          <CloseButton onClick={onClick}>X</CloseButton>
        </StylePosition>
        {ModalTitle}
      </StyleText>
    </div>
  );
};

const StyleText = styled.div`
  background-color: #eaeff9;
  border-bottom: 2px solid #a3bce2;
  height: auto;
  padding: 30px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  margin-bottom: 0;
`;

const StylePosition = styled.div`
  float: right;
`;

export default ModalTitlesub;
