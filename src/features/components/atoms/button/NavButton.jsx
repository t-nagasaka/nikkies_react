import styled from "styled-components";

const NavButton = (props) => {
  const { children } = props;
  return <StyleButton>{children}</StyleButton>;
};

const StyleButton = styled.button`
  position: relative;
  display: inline-block;
  background-color: white;
  border: none;
  font-weight: 600;
  padding: 10px 40px;
  margin: 10px auto;
  cursor: pointer;
  transition: all 0.3s;
  color: black;
  &:hover {
    color: white;
    background-color: #000000;
    transform: translate(2px, 2px);
    box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.8);
    /* box-shadow: 2px 2px 0 0 black; */
    &:active {
      box-shadow: none;
      position: relative;
      top: 3px;
      left: 3px;
    }
  }
`;

export default NavButton;
