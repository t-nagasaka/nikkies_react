import { useState, useEffect } from "react";
import Modal from "react-modal";
import BaseButton from "../button/BaseButton";
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
    //   zIndex: "10000",
    //   position: "relative",
    margin: "0 auto",

    //   // top: "auto",
    //   // left: "auto",
    //   // right: "auto",
    //   // bottom: "auto",
    //   padding: "0",
    //   width: "90%",
    //   // height: "100vh",
    //   // marginTop: "100px",
    //   border: "none",
    //   // background: "transparent",
    //   color: "#000",
    //   // transform: "translate(50%)",
    //   // maxHeight: "calc(100vh - 200px)",
    //   maxWidth: "720px",
  },
};

const EditModal = () => {
  const dispatch = useDispatch();
  const isOpenModal = useSelector(selectModalOpen);

  const [modalOpen, setModalOpen] = useState(false);

  const clickHandle = () => {
    dispatch(toggleModal(false));
    setModalOpen(false);
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
        {/* <div className={styles.containerLogin}> */}
        <div className={styles.appLogin}>
          <h1 className={styles.loginTitle}>Edit</h1>
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
            // onChange={(e) => dispatch(editUsername(e.target.value))}
            required
          />
          <span className={styles.loginSpan}>
            <StyleNewSpan>New</StyleNewSpan>
            <br />
            Password
          </span>
          <input
            type="password"
            className={styles.inputLog}
            name="password"
            placeholder="新しいパスワード"
            // onChange={(e) => dispatch(editPassword(e.target.value))}
            required
          />
          <StyleErrorText>'エラー'</StyleErrorText>
          <StyleButtonPosition>
            {/* <BaseButton disabled={btnDisabler} onClick={login}>
                {isLoginView ? "Login" : "Create"}
              </BaseButton> */}
          </StyleButtonPosition>
          {/* <StyleProfPosition>
              <span className={styles.loginSpan}>
                <span
                  className={styles.switchText}
                  onClick={() => dispatch(toggleMode())}
                >
                  {isLoginView ? "Create Account ?" : "Back to Login"}
                </span>
              </span>
            </StyleProfPosition> */}
          <StyleButtonPosition>
            <BaseButton onClick={clickHandle}>Submit</BaseButton>
          </StyleButtonPosition>
          <StyleButtonPosition>
            "Delete Account ?" : "Back to Edit"
          </StyleButtonPosition>
        </div>
        {/* </div> */}
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
