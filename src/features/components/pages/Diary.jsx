import "./Diary.module.css";
import { useEffect } from "react";
import Calendar from "../atoms/calendar/Calendar";
import SubDiary from "../organisms/SubDiary";
import DiaryModal from "../atoms/modal/DiaryModal";
import MainDiary from "../molecules/MainDiary";
import BaseNavbar from "../molecules/BaseNavbar";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncSubDiary01,
  fetchAsyncSubDiary02,
  fetchAsyncSubDiary03,
  saveAsyncSubDiary01,
  saveAsyncSubDiary02,
  saveAsyncSubDiary03,
  editSubDiary01date,
  selectSub01Day,
  selectSub01Title,
  selectSub01Text,
  fetchAsyncSubDiaryDay01,
  fetchAsyncSubDiaryDay02,
  fetchAsyncSubDiaryDay03,
  editSubDiary02date,
  selectSub02Day,
  selectSub02Title,
  selectSub02Text,
  editSubDiary03date,
  selectSub03Day,
  selectSub03Title,
  selectSub03Text,
} from "../slices/DiarySlice";
import { selectProfile } from "../slices/loginSlice";

const Diary = () => {
  const dispatch = useDispatch();
  const subDay01 = useSelector(selectSub01Day);
  const subTitle01 = useSelector(selectSub01Title);
  const subText01 = useSelector(selectSub01Text);
  const subDay02 = useSelector(selectSub02Day);
  const subTitle02 = useSelector(selectSub02Title);
  const subText02 = useSelector(selectSub02Text);
  const subDay03 = useSelector(selectSub03Day);
  const subTitle03 = useSelector(selectSub03Title);
  const subText03 = useSelector(selectSub03Text);
  const userData = useSelector(selectProfile);
  // dispatch(fetchAsyncSubDiaryDay01());
  // dispatch(fetchAsyncSubDiaryDay02());
  // dispatch(fetchAsyncSubDiaryDay03());

  // useEffect(() => {
  //   dispatch(fetchAsyncSubDiaryDay01());
  // }, [subDay01]);

  const getPrevDate = (prevDay) => {
    let date = new Date();
    date.setDate(date.getDate() - prevDay);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const strDate = `${year}-${month}-${day}`;
    return strDate;
  };

  useEffect(async () => {
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
  }, []);

  const changePrevDay01 = async (prevDay) => {
    const strDate = getPrevDate(prevDay);
    const params = {
      user_page: userData.id,
      history01_display_date: Number(prevDay),
    };
    await dispatch(editSubDiary01date(prevDay));
    await dispatch(saveAsyncSubDiary01(params));
    await dispatch(fetchAsyncSubDiary01(strDate));
  };

  const changePrevDay02 = async (prevDay) => {
    const strDate = getPrevDate(prevDay);
    const params = {
      user_page: userData.id,
      history02_display_date: Number(prevDay),
    };
    await dispatch(editSubDiary02date(prevDay));
    await dispatch(saveAsyncSubDiary02(params));
    await dispatch(fetchAsyncSubDiary02(strDate));
  };

  const changePrevDay03 = async (prevDay) => {
    const strDate = getPrevDate(prevDay);
    const params = {
      user_page: userData.id,
      history03_display_date: Number(prevDay),
    };
    await dispatch(editSubDiary03date(prevDay));
    await dispatch(saveAsyncSubDiary03(params));
    await dispatch(fetchAsyncSubDiary03(strDate));
  };
  return (
    <>
      <BaseNavbar />
      <StylePosition>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} sm={6} lg={3}>
            <Calendar />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <SubDiary
              onChange={changePrevDay01}
              title={subTitle01}
              text={subText01}
              // defaultValue={subDay01}
              defaultValue={localStorage.subDay01}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <SubDiary
              onChange={changePrevDay02}
              title={subTitle02}
              text={subText02}
              defaultValue={localStorage.subDay02}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <SubDiary
              onChange={changePrevDay03}
              title={subTitle03}
              text={subText03}
              defaultValue={localStorage.subDay03}
            />
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
