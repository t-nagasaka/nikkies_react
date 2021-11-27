import { useState } from "react";
import Modal from "react-modal";
import BaseButton from "../button/BaseButton";
import ModalTitlesub from "./ModalTitlesub";
import ModalTextsub from "./ModalTextsub";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { selectSubModal, toggleSubDiaryModal } from "../../slices/DiarySlice";

const customStyles = {
  overlay: {
    zIndex: "3000",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    zIndex: "10000",
    position: "relative",
    margin: "0 auto",
    top: "auto",
    left: "auto",
    right: "auto",
    bottom: "auto",
    padding: "0",
    width: "80%",
    // height: "100vh",
    marginTop: "100px",
    border: "none",
    background: "transparent",
    color: "#000",
    // transform: "translate(50%)",
    maxHeight: "calc(100vh - 200px)",
    maxWidth: "720px",
  },
};

const DiaryModal = () => {
  const dispatch = useDispatch();
  const isOpenModal = useSelector(selectSubModal);

  const clickHandle = () => {
    dispatch(toggleSubDiaryModal());
  };

  return (
    <div>
      <Modal
        isOpen={isOpenModal}
        style={customStyles}
        ariaHideApp={false}
        onRequestClose={clickHandle}
      >
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

const StylePosition = styled.div`
  position: fixed;
  top: 50px;
`;

export default DiaryModal;
