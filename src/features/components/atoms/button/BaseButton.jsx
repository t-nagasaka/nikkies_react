import styled from "styled-components";

const BaseButton = (props) => {
  const { children, onClick } = props;
  return <StyleButton onClick={onClick}>{children}</StyleButton>;
};

const StyleButton = styled.button`
  position: relative;
  display: inline-block;
  background-color: white;
  border: 1px solid #ddd;
  font-weight: 600;
  padding: 10px 40px;
  cursor: pointer;
  transition: all 0.3s;
  color: #666;
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.4);
  border-radius: 7px;
  &:hover {
    transform: translate(1px, 1px);
    box-shadow: 1.5px 1.5px 2px 0px rgba(0, 0, 0, 0.8);
    &:active {
      box-shadow: none;
      position: relative;
      transition: all 0.3s;
      top: 3px;
      left: 3px;
    }
  }
`;

export default BaseButton;
