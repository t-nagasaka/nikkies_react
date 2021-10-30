import React from "react";
import IntText from "../atoms/textarea/IntText";
import SubText from "../atoms/textarea/SubText";
import SubTitle from "../atoms/textarea/SubTitle";
import styled from "styled-components";

const SubDiary = () => {
  return (
    <>
      <StylePosition>
        <StyleDateSpan>
          <IntText />
        </StyleDateSpan>
        <StyleTitleSpan>
          <SubTitle />
        </StyleTitleSpan>
      </StylePosition>
      <StylePosition>
        <StyleDiv>
          <SubText />
        </StyleDiv>
      </StylePosition>
    </>
  );
};

const StylePosition = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;

const StyleDiv = styled.div`
  position: relative;
  bottom: 0.75px;
`;

const StyleDateSpan = styled.span`
  position: relative;
  left: 0.5px;
  top: 0.75px;
`;
const StyleTitleSpan = styled.span`
  position: relative;
  right: 0.5px;
  top: 0.75px;
`;

export default SubDiary;
