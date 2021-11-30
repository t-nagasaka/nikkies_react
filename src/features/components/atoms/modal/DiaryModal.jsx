import Modal from "react-modal";
import ModalTitlesub from "./ModalTitlesub";
import ModalTextsub from "./ModalTextsub";
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
    marginTop: "50px",
    border: "none",
    background: "transparent",
    color: "#000",
    maxHeight: "calc(100vh - 100px)",
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
        <ModalTitlesub onClick={clickHandle} />
        <ModalTextsub />
      </Modal>
    </div>
  );
};

export default DiaryModal;
