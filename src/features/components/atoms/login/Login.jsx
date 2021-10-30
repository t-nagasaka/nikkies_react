import React from "react";
// useSelectorでstoreの値を参照する
// useDispatchでSliceにアクションを起こして値を変更する
import { useSelector, useDispatch } from "react-redux";
import styles from "./Login.module.css";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import {
  editUsername,
  editPassword,
  toggleMode,
  editError,
  fetchAsyncLogin,
  fetchAsyncGetError,
  fetchAsyncRegister,
  selectAuthen,
  selectIsLoginView,
  selectError,
  fetchAsyncProf,
} from "./loginSlice";

import BaseButton from "../button/BaseButton";

const Login = () => {
  // useDispatchのインスタンス化
  const dispatch = useDispatch();
  // Sliceのstate(authen)を取得
  const authen = useSelector(selectAuthen);
  // Sliceのstate(isLoginView)を取得
  const isLoginView = useSelector(selectIsLoginView);
  const btnDisabler = authen.username === "" || authen.password === "";
  const isErrorText = useSelector(selectError);
  const history = useHistory();

  const login = async () => {
    if (isLoginView) {
      // storeのauthen情報を引数で渡してあげる
      const result = await dispatch(fetchAsyncLogin(authen));
      if (!fetchAsyncLogin.fulfilled.match(result)) {
        await dispatch(editError("UsernameまたはPasswordが間違っています"));
      } else {
        await dispatch(fetchAsyncProf());
        history.push("/diaries");
      }
    } else {
      const result = await dispatch(fetchAsyncRegister(authen));

      if (fetchAsyncRegister.fulfilled.match(result)) {
        await dispatch(fetchAsyncLogin(authen));
      } else {
        await dispatch(fetchAsyncGetError(authen));
      }
    }
  };

  return (
    <div className={styles.containerLogin}>
      <div className={styles.appLogin}>
        <h1>{isLoginView ? "Login" : "Register"}</h1>
        <span>Username</span>
        <input
          type="text"
          className={styles.inputLog}
          name="username"
          placeholder=""
          onChange={(e) => dispatch(editUsername(e.target.value))}
          required
        />
        <span>Password</span>
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
          <span
            className={styles.switchText}
            onClick={() => dispatch(toggleMode())}
          >
            {isLoginView ? "Create Account ?" : "Back to Login"}
          </span>
        </StylePosition>
      </div>
    </div>
  );
};

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

export default Login;
