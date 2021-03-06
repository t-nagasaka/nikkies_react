import { memo } from "react";
import styled from "styled-components";
import NavButton from "../atoms/button/NavButton";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleModal, editSnackTxt, toggleSnack } from "../slices/EditSlice";
import { resetState } from "../slices/loginSlice";

const BaseNavbar = memo(() => {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <>
      <div style={{ marginBottom: "10px" }}>
        <StyleBar>
          <StylePosition>
            <NavButton
              onClick={() => {
                window.scroll({ top: 0, behavior: "smooth" });
              }}
            >
              Nikkies
            </NavButton>
            <NavButton
              onClick={() => {
                dispatch(toggleModal(true));
              }}
            >
              Edit
            </NavButton>
            <NavButton
              onClick={() => {
                localStorage.removeItem("localJWT");
                localStorage.removeItem("id");
                localStorage.removeItem("username");
                localStorage.removeItem("subDay01");
                localStorage.removeItem("subDay02");
                localStorage.removeItem("subDay03");
                dispatch(resetState());
                dispatch(editSnackTxt("ログアウトしました。"));
                history.push("/");
                dispatch(toggleSnack());
              }}
            >
              Logout
            </NavButton>
          </StylePosition>
        </StyleBar>
      </div>
    </>
  );
});

const StyleBar = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  background: linear-gradient(-45deg, #c3e7ff, #5890ff, #23e0e6, #0505ff);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  width: 100%;
  height: 60px;
  box-shadow: 0px 10px 20px 0px rgba(60, 142, 250, 0.4);
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const StylePosition = styled.div`
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  top: 15%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export default BaseNavbar;
