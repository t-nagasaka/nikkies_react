import styled from "styled-components";

const BaseButton = (props) => {
  const { children, onClick, disabled } = props;
  return (
    <StyleButton disabled={disabled} onClick={onClick}>
      {children}
    </StyleButton>
  );
};

const StyleButton = styled.button`
  position: relative;
  display: inline-block;
  background-color: #5890ff;
  border: none;
  font-weight: 600;
  padding: 10px 40px;
  cursor: pointer;
  transition: all 0.3s;
  color: white;
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.4);
  border-radius: 7px;
  &:disabled {
    color: #7c7c7c;
    background-color: #3a3a3a;
  }
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
