import React from "react";
import styled from "styled-components";

const ModalTitlesub = () => {
  return (
    <div>
      <StyleText>
        今日のご飯名なんでしょうか？今日のご飯名なんでしょうか？
        今日のご飯名なんでしょうか？今日のご飯名なんでしょうか？
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

export default ModalTitlesub;
