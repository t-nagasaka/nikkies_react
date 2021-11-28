import React from "react";
import IntText from "../atoms/textarea/IntText";
import SubText from "../atoms/textarea/SubText";
import SubTitle from "../atoms/textarea/SubTitle";
import styled from "styled-components";

const SubDiary = ({ onChange, title, text, defaultValue, clickHandle }) => {
  return (
    <>
      <StylePosition>
        <StyleDateSpan>
          <IntText onChange={onChange} defaultValue={defaultValue} />
        </StyleDateSpan>
        <StyleTitleSpan>
          <SubTitle title={title} clickHandle={clickHandle} />
        </StyleTitleSpan>
      </StylePosition>
      <StylePosition>
        <StyleDiv>
          <SubText text={text} clickHandle={clickHandle} />
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
  bottom: 0.5px;
`;

const StyleDateSpan = styled.span`
  position: relative;
  left: 0.5px;
  top: 0.5px;
`;
const StyleTitleSpan = styled.span`
  position: relative;
  right: 0.5px;
  top: 0.5px;
`;

export default SubDiary;
