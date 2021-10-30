import { useState } from "react";
import Modal from "react-modal";
import BaseButton from "../button/BaseButton";
import ModalTitlesub from "./ModalTitlesub";
import ModalTextsub from "./ModalTextsub";
import styled from "styled-components";

const customStyles = {
  overlay: {
    zIndex: "3000",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    // top: "50%",
    // left: "50%",
    // right: "50%",
    // marginRight: "-50%",
    // padding: "0",
    // width: "50%",
    // height: "50%",
    // padding: "10%",
    // transform: "translate(-50%, -50%)",
    // borderRadius: "10px",
    // maxWidth: "720px",
    zIndex: "10000",
    position: "relative",
    margin: "0 auto",
    top: "auto",
    left: "auto",
    right: "auto",
    bottom: "auto",
    padding: "0",
    width: "80%",
    height: "100vh",
    top: "100px",
    border: "none",
    background: "transparent",
    color: "#000",
    // transform: "translate(50%)",
    maxHeight: "calc(100vh - 200px)",
    maxWidth: "720px",
  },
};

const StylePosition = styled.div`
  position: fixed;
  top: 50px;
`;

const DiaryModal = () => {
  const [show, setShow] = useState(true);

  const clickHandle = () => {
    setShow(!show);
  };

  return (
    <div>
      <Modal isOpen={show} style={customStyles}>
        <StylePosition>
          <BaseButton onClick={clickHandle}>Close</BaseButton>
        </StylePosition>
        <ModalTitlesub></ModalTitlesub>
        <br />
        <ModalTextsub />
        <br />
      </Modal>
    </div>
  );
};

export default DiaryModal;
