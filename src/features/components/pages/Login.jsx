import { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Login.module.css";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useState, useEffect, forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  editUsername,
  editPassword,
  toggleMode,
  editError,
  fetchAsyncLogin,
  fetchAsyncRegister,
  selectAuthen,
  selectError,
  selectIsLoginView,
  fetchAsyncProf,
  selectProfile,
  editLoginStatus,
  selectTokenStatus,
} from "../slices/loginSlice";
import {
  fetchAsyncSubDiary01,
  fetchAsyncSubDiary02,
  fetchAsyncSubDiary03,
  fetchAsyncSubDiaryDay01,
  fetchAsyncSubDiaryDay02,
  fetchAsyncSubDiaryDay03,
} from "../slices/DiarySlice";
import BaseButton from "../atoms/button/BaseButton";
import {
  selectOpenSnack,
  toggleSnack,
  editSnackTxt,
  selectSnackTxt,
} from "../slices/EditSlice";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = memo(() => {
  // useDispatchのインスタンス化
  const dispatch = useDispatch();
  // Sliceのstate(authen)を取得
  const authen = useSelector(selectAuthen);
  // Sliceのstate(isLoginView)を取得
  const isLoginView = useSelector(selectIsLoginView);
  const btnDisabler = authen.username === "" || authen.password === "";
  const isErrorText = useSelector(selectError);
  const isTokenStatus = useSelector(selectTokenStatus);
  const userData = useSelector(selectProfile);
  const history = useHistory();
  const fetchSnackTxt = useSelector(selectSnackTxt);

  const getPrevDate = (prevDay) => {
    let date = new Date();
    date.setDate(date.getDate() - prevDay);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const strDate = `${year}-${month}-${day}`;
    return strDate;
  };

  const isOpenSnack = useSelector(selectOpenSnack);

  const [open, setOpen] = useState(false);

  const loginUser = async () => {
    await dispatch(fetchAsyncProf());
    await dispatch(editLoginStatus(true));
    if (isTokenStatus) {
      await dispatch(fetchAsyncSubDiaryDay01(userData.id)).then(() => {
        const strDate01 = getPrevDate(localStorage.subDay01);
        dispatch(fetchAsyncSubDiary01(strDate01));
      });
      await dispatch(fetchAsyncSubDiaryDay02(userData.id)).then(() => {
        const strDate02 = getPrevDate(localStorage.subDay02);
        dispatch(fetchAsyncSubDiary02(strDate02));
      });
      await dispatch(fetchAsyncSubDiaryDay03(userData.id)).then(() => {
        const strDate03 = getPrevDate(localStorage.subDay03);
        dispatch(fetchAsyncSubDiary03(strDate03));
      });
    }
    dispatch(editError(""));
    history.push("/diaries");
    dispatch(editSnackTxt("ログインしました。"));
    dispatch(toggleSnack());
  };

  const login = async () => {
    if (isLoginView) {
      // storeのauthen情報を引数で渡してあげる
      const result = await dispatch(fetchAsyncLogin(authen));
      if (fetchAsyncLogin.fulfilled.match(result)) {
        loginUser();
      }
    } else {
      const result = await dispatch(fetchAsyncRegister(authen));
      if (fetchAsyncRegister.fulfilled.match(result)) {
        const result = await dispatch(fetchAsyncLogin(authen));
        if (fetchAsyncLogin.fulfilled.match(result)) {
          loginUser();
        }
      }
    }
  };

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
  };
  const vertical = "top";
  const horizontal = "center";

  return (
    <div className={styles.containerLogin}>
      <div className={styles.appLogin}>
        <h1 className={styles.loginTitle}>
          {isLoginView ? "Login" : "Register"}
        </h1>
        <span className={styles.loginSpan}>Username</span>
        <input
          type="text"
          className={styles.inputLog}
          name="username"
          placeholder=""
          onChange={(e) => dispatch(editUsername(e.target.value))}
          required
        />
        <span className={styles.loginSpan}>Password</span>
        <input
          type="password"
          className={styles.inputLog}
          name="password"
          placeholder=""
          onChange={(e) => dispatch(editPassword(e.target.value))}
          required
        />
        <StyleErrorText>{isErrorText}</StyleErrorText>
        <StylePosition>
          <BaseButton disabled={btnDisabler} onClick={login}>
            {isLoginView ? "Login" : "Create"}
          </BaseButton>
        </StylePosition>
        <StylePosition>
          <span className={styles.loginSpan}>
            <span
              className={styles.switchText}
              onClick={() => dispatch(toggleMode())}
            >
              {isLoginView ? "Create Account ?" : "Back to Login ?"}
            </span>
          </span>
        </StylePosition>
        <Snackbar
          zindex={1000}
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
          anchorOrigin={{ vertical, horizontal }}
          key={vertical + horizontal}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            <StyleSnackSpan>{fetchSnackTxt}</StyleSnackSpan>
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
});

const StylePosition = styled.div`
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

const StyleSnackSpan = styled.span`
  white-space: pre-wrap;
`;

export default Login;
