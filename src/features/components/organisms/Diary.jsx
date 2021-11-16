import "./Diary.module.css";
import React from "react";
import Calendar from "../atoms/calendar/Calendar";
import SubDiary from "../molecules/SubDiary";
import DiaryModal from "../atoms/modal/DiaryModal";
import MainDiary from "../molecules/MainDiary";
import BaseNavbar from "../molecules/BaseNavbar";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Calendar from ".../";

const Diary = () => {
  return (
    <>
      <BaseNavbar />
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
export default Diary;
