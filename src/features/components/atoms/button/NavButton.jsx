import styled from "styled-components";

const NavButton = (props) => {
  const { children, onclick } = props;
  return <StyleButton onClick={onclick}>{children}</StyleButton>;
};

const StyleButton = styled.button`
  padding: 10px 15px;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0);
  /* padding: 0; */
  position: relative;
  display: inline-block;
  border: none;
  font-weight: 100;
  cursor: pointer;
  transition: all 0.3s;
  color: #fff;
  &:hover {
    transform: translate(-5px, -5px);
    box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.8);
    &:active {
      box-shadow: none;
      position: relative;
      top: 3px;
      left: 3px;
    }
  }
`;

export default NavButton;
