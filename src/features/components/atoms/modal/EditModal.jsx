import Modal from "react-modal";
import BaseButton from "../button/BaseButton";
import DeleteButton from "../button/DeleteButton";
import CloseButton from "../button/CloseButton";
import styled from "styled-components";
import styles from "./EditModal.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  selectModalOpen,
  selectIsDeleteView,
  selectError,
  editCurrentPassword,
  editNewPassword,
  toggleMode,
  toggleModal,
} from "../../slices/EditSlice";

const customStyles = {
  overlay: {
    zIndex: "3000",
    backgroundColor: "rgba(0,0,0,0.8)",
    display: "flex",
  },
  content: {
    alignItems: "center",
    maxWidth: "400px",
    maxHeight: "500px",
    margin: "0 auto",
  },
};

const EditModal = () => {
  const dispatch = useDispatch();
  const isOpenModal = useSelector(selectModalOpen);
  const errorText = useSelector(selectError);
  const isDeleteView = useSelector(selectIsDeleteView);

  const clickEditPassword = () => {
    dispatch(toggleModal(false));
  };
  const clickDeleteAccount = () => {
    dispatch(toggleModal(false));
  };
  const clickHandle = () => {
    dispatch(toggleModal(false));
  };

  // if (isLoginView) {
  //   // storeのauthen情報を引数で渡してあげる
  //   const result = await dispatch(fetchAsyncLogin(authen));
  //   if (!fetchAsyncLogin.fulfilled.match(result)) {
  //     await dispatch(editError("UsernameまたはPasswordが間違っています"));
  //   } else {
  //     await dispatch(fetchAsyncProf());
  //     await dispatch(editLoginStatus(true));
  //     history.push("/diaries");
  //   }
  // } else {
  //   const result = await dispatch(fetchAsyncRegister(authen));

  //   if (fetchAsyncRegister.fulfilled.match(result)) {
  //     await dispatch(fetchAsyncLogin(authen));
  //   } else {
  //     await dispatch(fetchAsyncGetError(authen));
  //   }
  // // }
  return (
    <>
      <Modal
        isOpen={isOpenModal}
        style={customStyles}
        ariaHideApp={false}
        onRequestClose={clickHandle}
      >
        <StylePosition>
          <CloseButton onClick={clickHandle}>X</CloseButton>
        </StylePosition>
        <h1 className={styles.loginTitle}>
          {isDeleteView ? <StyleNewSpan>Delete</StyleNewSpan> : "Edit"}
        </h1>
        <span className={styles.loginSpan}>
          Current
          <br />
          Password
        </span>
        <input
          type="text"
          className={styles.inputLog}
          name="username"
          placeholder="現在のパスワード"
          onChange={(e) => dispatch(editCurrentPassword(e.target.value))}
          required
        />
        <span className={styles.loginSpan}>
          {isDeleteView ? "confirm" : <StyleNewSpan>New</StyleNewSpan>}
          <br />
          Password
        </span>
        <input
          type="password"
          className={styles.inputLog}
          name="password"
          placeholder={isDeleteView ? "パスワードの再入力" : "新しいパスワード"}
          onChange={(e) => dispatch(editNewPassword(e.target.value))}
          required
        />
        <StyleErrorText>{errorText}</StyleErrorText>
        <StyleButtonPosition>
          {isDeleteView ? (
            <DeleteButton onClick={clickDeleteAccount}>Delete</DeleteButton>
          ) : (
            <BaseButton onClick={clickEditPassword}>Edit</BaseButton>
          )}
        </StyleButtonPosition>
        <StyleProfPosition>
          <span className={styles.loginSpan}>
            <span
              className={styles.switchText}
              onClick={() => dispatch(toggleMode())}
            >
              {isDeleteView ? "Back to Edit" : "Delete Account ?"}
            </span>
          </span>
        </StyleProfPosition>
      </Modal>
    </>
  );
};

const StylePosition = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyleButtonPosition = styled.div`
  position: relative;
  text-align: center;
  margin-top: 30px;
`;

const StyleProfPosition = styled.div`
  position: relative;
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const StyleErrorText = styled.p`
  margin: 0 auto;
  text-align: center;
  color: red;
`;

const StyleNewSpan = styled.span`
  color: red;
`;

export default EditModal;
