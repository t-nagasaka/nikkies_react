import styled from "styled-components";

const CloseButton = (props) => {
  const { children, onClick, disabled } = props;
  return (
    <StyleButton disabled={disabled} onClick={onClick}>
      {children}
    </StyleButton>
  );
};

const StyleButton = styled.button`
  font-size: 100%; /*ボタンの大きさ*/
  font-weight: bold;
  border: 1px solid #999;
  color: #999;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  width: 1.5em;
  line-height: 1.3em;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background: #333;
    border-color: #333;
    color: #fff;
  }
`;

export default CloseButton;
