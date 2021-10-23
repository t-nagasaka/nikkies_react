import React from "react";
import styled from "styled-components";

const ModalTitle = () => {
  return (
    <div>
      <StyleText>
        <StyleTitle>title</StyleTitle>
        今日のご飯名なんでしょうか？
      </StyleText>
    </div>
  );
};

const StyleText = styled.div`
  position: relative;
  margin: 1em auto;
  padding: 1.2em;
  width: 90%;
  color: #555555;
  background-color: #fff;
  border: 2px solid #0568c5;
  box-shadow: 2px 2px 1px #ccc;
  border-radius: 40px 40px 10px 10px;
`;
const StyleTitle = styled.div`
  position: absolute;
  padding: 0 0.5em;
  left: 20px;
  top: -15px;
  font-weight: bold;
  background-color: #fff;
  color: #0568c5;
`;
export default ModalTitle;
