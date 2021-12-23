import { memo } from "react";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";
import { useState, useEffect, forwardRef } from "react";
import BaseButton from "../button/BaseButton";
import DeleteButton from "../button/DeleteButton";
import CloseButton from "../button/CloseButton";
import styled from "styled-components";
import styles from "./EditModal.module.css";
import { useSelector, useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  selectModalOpen,
  selectIsDeleteView,
  selectAuthen,
  selectError,
  editCurrentPassword,
  editNewPassword,
  toggleMode,
  toggleModal,
  changeAsyncPassword,
  selectOpenSnack,
  toggleSnack,
  selectSnackTxt,
  editSnackTxt,
  editError,
} from "../../slices/EditSlice";
import { resetState } from "../../slices/loginSlice";
import axios from "axios";

const customStyles = {
  overlay: {
    zIndex: "3000",
    backgroundColor: "rgba(0,0,0,0.8)",
    display: "flex",
  },
  content: {
    alignItems: "center",
    maxWidth: "450px",
    maxHeight: "500px",
    margin: "0 auto",
  },
};

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EditModal = memo(() => {
  const dispatch = useDispatch();
  const history = useHistory();

  const isOpenModal = useSelector(selectModalOpen);
  const errorText = useSelector(selectError);
  const isDeleteView = useSelector(selectIsDeleteView);
  const fetchAuthen = useSelector(selectAuthen);
  const isOpenSnack = useSelector(selectOpenSnack);
  const fetchSnackTxt = useSelector(selectSnackTxt);

  const [open, setOpen] = useState(false);
  const [firstPassword, setFirstPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");

  const clickHandle = () => {
    dispatch(toggleModal(false));
    setFirstPassword("");
    setSecondPassword("");
  };

  const clickDeleteAccount = () => {
    const apiUrl = "http://localhost:8000/";
    const fetchPassword = async () => {
      if (firstPassword === secondPassword) {
        const params = {
          username: localStorage.username,
          password: firstPassword,
        };
        await axios
          .post(`${apiUrl}authen/jwt/create`, params, {
            headers: {
              Authorization: `JWT ${localStorage.localJWT}`,
              "Content-Type": "application/json",
            },
          })
          .then(() => {
            const myId = localStorage.id;
            axios.delete(`${apiUrl}api/user/${myId}/`, {
              headers: {
                Authorization: `JWT ${localStorage.localJWT}`,
                "Content-Type": "application/json",
              },
            });
          })
          .then(() => {
            localStorage.removeItem("localJWT");
            localStorage.removeItem("id");
            localStorage.removeItem("username");
            localStorage.removeItem("subDay01");
            localStorage.removeItem("subDay02");
            localStorage.removeItem("subDay03");
            dispatch(resetState());
            dispatch(editSnackTxt("アカウントを削除しました。"));
            history.push("/");
            dispatch(toggleSnack());
          })
          .catch((e) => {
            dispatch(editError("入力されたパスワードは正しくありません。"));
          });
      } else {
        dispatch(editError("入力された2つのパスワードは同一ではありません。"));
      }
    };
    fetchPassword();
  };

  const clickEditPassword = () => {
    const params = {
      new_password: fetchAuthen.newPassword,
      re_new_password: fetchAuthen.newPassword,
      current_password: fetchAuthen.currentPassword,
    };
    dispatch(changeAsyncPassword(params));
  };

  useEffect(() => {
    if (isOpenSnack) {
      setOpen(true);
      dispatch(toggleSnack());
    }
  }, [dispatch, isOpenSnack]);

  useEffect(() => {
    if (isOpenSnack) {
      setOpen(true);
      dispatch(toggleSnack());
    }
  }, [dispatch, isOpenSnack]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setFirstPassword("");
    setSecondPassword("");
  };
  const vertical = "top";
  const horizontal = "center";

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
          type="password"
          className={styles.inputLog}
          name="firstPassword"
          placeholder="現在のパスワード"
          onChange={(e) => {
            dispatch(editCurrentPassword(e.target.value));
            setFirstPassword(e.target.value);
          }}
          value={firstPassword}
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
          name="secondPassword"
          placeholder={isDeleteView ? "パスワードの再入力" : "新しいパスワード"}
          onChange={(e) => {
            dispatch(editNewPassword(e.target.value));
            setSecondPassword(e.target.value);
          }}
          value={secondPassword}
          required
        />
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
              onClick={() => {
                dispatch(toggleMode());
                setFirstPassword("");
                setSecondPassword("");
              }}
            >
              {isDeleteView ? "Back to Edit ?" : "To Delete Account ?"}
            </span>
          </span>
        </StyleProfPosition>
        <StyleErrorText>{errorText}</StyleErrorText>
      </Modal>
      <Snackbar
        zindex={1000}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {fetchSnackTxt}
        </Alert>
      </Snackbar>
    </>
  );
});

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
  white-space: pre-wrap;
  padding-top: 20px;
  margin: 0 auto;
  text-align: center;
  color: red;
`;

const StyleNewSpan = styled.span`
  color: red;
`;

export default EditModal;
