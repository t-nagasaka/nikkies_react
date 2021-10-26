import "./App.css";
import React from "react";
import Calendar from "./features/components/atoms/calendar/Calendar";
import SubDiary from "./features/components/molecules/SubDiary";
import DiaryModal from "./features/components/atoms/modal/DiaryModal";
import MainDiary from "./features/components/molecules/MainDiary";
import BaseNavbar from "./features/components/molecules/BaseNavbar";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Login from "./features/components/atoms/login/Login";

const App = () => {
  return (
    <>
      <BaseNavbar />
      <Login />
      <StylePosition>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} sm={6} lg={3}>
            <Calendar />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <SubDiary />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <SubDiary />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <SubDiary />
          </Grid>
        </Grid>
        <DiaryModal />
        <div style={{ margin: "20px", padding: "20px 0px" }}>
          <MainDiary />
        </div>
      </StylePosition>
    </>
  );
};

const StylePosition = styled.div`
  margin-top: 80px;
  max-width: 1280px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 1280px) {
    max-width: 660px;
  }
`;
export default App;
