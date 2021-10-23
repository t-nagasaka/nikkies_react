import React from "react";
import IntText from "../atoms/textarea/IntText";
import SubText from "../atoms/textarea/SubText";
import SubTitle from "../atoms/textarea/SubTitle";
import styled from "styled-components";

const SubDiary = () => {
  return (
    <>
      <IntText />
      <StyledSpan>
        <SubTitle />
      </StyledSpan>
      <br />
      <StyledDiv>
        <SubText />
      </StyledDiv>
    </>
  );
};

const StyledDiv = styled.div`
  position: relative;
  bottom: 1px;
`;

const StyledSpan = styled.span`
  position: relative;
  right: 1px;
`;

export default SubDiary;
