import React from "react";
import styled from "styled-components";

const MainTag = (props) => {
  const { children } = props;
  return (
    <div>
      <StyleEditorTag>{children}</StyleEditorTag>
    </div>
  );
};

const StyleEditorTag = styled.span`
  position: relative;
  bottom: 7px;
  padding: 7px 40px;
  border: 1px solid #ddd;
  border-radius: 10px 10px 0 0;
  font-size: 16px;
  color: white;
  font-weight: bold;
  background-color: #5890ff;
`;

export default MainTag;
