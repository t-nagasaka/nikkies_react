import { memo } from "react";
import styled from "styled-components";

const TitleButton = memo((props) => {
  const { children } = props;
  return <StyleButton>{children}</StyleButton>;
});

const StyleButton = styled.button`
  position: relative;
  display: inline-block;
  background-color: white;
  border: 1px solid white;
  font-weight: 600;
  padding: 10px 40px;
  margin: 10px auto;
  cursor: pointer;
  transition: all 0.3s;
  color: black;
  &:hover {
    background-color: black;
    border: 1px solid black;
    color: white;
    transition: all 0.3s;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
    &:after {
      content: "";
      /*絶対配置で波紋位置を決める*/
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      /*波紋の形状*/
      background: radial-gradient(circle, #fff 10%, transparent 10%) no-repeat
        50%;
      transform: scale(10, 10);
      /*はじめは透過0に*/
      opacity: 0;
      /*アニメーションの設定*/
      transition: transform 0.3s, opacity 1s;
      /* クリックされたあとの形状の設定 */
    }
    &:active::after {
      transform: scale(0, 0);
      transition: 0s;
      opacity: 0.3;
    }
  }
`;

export default TitleButton;
