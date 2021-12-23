import { useEffect, useState, memo } from "react";
import { useHistory } from "react-router-dom";
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
  selectSub01Day,
  selectSub02Day,
  selectSub03Day,
  selectSub01Title,
  selectSub02Title,
  selectSub03Title,
  selectSub01Text,
  selectSub02Text,
  selectSub03Text,
  fetchAsyncSubDiaryDay01,
  fetchAsyncSubDiaryDay02,
  fetchAsyncSubDiaryDay03,
  editSubDiary01date,
  editSubDiary02date,
  editSubDiary03date,
  editModalTitle,
  editModalText,
  toggleSubDiaryModal,
  toggleToHome,
  selectToHome,
} from "../slices/DiarySlice";
import {
  selectProfile,
  editLoginStatus,
  resetState,
  fetchAsyncGetTokeState,
} from "../slices/loginSlice";
import { editSnackTxt, toggleSnack } from "../slices/EditSlice";

const Diary = memo(() => {
  const dispatch = useDispatch();
  const history = useHistory();

  const subTitle01 = useSelector(selectSub01Title);
  const subText01 = useSelector(selectSub01Text);
  const subTitle02 = useSelector(selectSub02Title);
  const subText02 = useSelector(selectSub02Text);
  const subTitle03 = useSelector(selectSub03Title);
  const subText03 = useSelector(selectSub03Text);
  const userData = useSelector(selectProfile);

  const fetchSelectSub01Day = useSelector(selectSub01Day);
  const fetchSelectSub02Day = useSelector(selectSub02Day);
  const fetchSelectSub03Day = useSelector(selectSub03Day);
  const fetchToHome = useSelector(selectToHome);

  const getPrevDate = (prevDay) => {
    let date = new Date();
    date.setDate(date.getDate() - prevDay);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const strDate = `${year}-${month}-${day}`;
    return strDate;
  };

  const [d1, setD1] = useState(localStorage.subDay01);
  const [d2, setD2] = useState(localStorage.subDay02);
  const [d3, setD3] = useState(localStorage.subDay03);

  useEffect(() => {
    const fetchSubDiaries = async () => {
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
    };
    fetchSubDiaries();
    dispatch(editLoginStatus(true));
  }, []);

  useEffect(() => {
    if (
      fetchSelectSub01Day !== 0 &&
      fetchSelectSub01Day !== localStorage.subDay01
    ) {
      setD1(fetchSelectSub01Day);
    }
  }, [fetchSelectSub01Day]);

  useEffect(() => {
    if (
      fetchSelectSub02Day !== 0 &&
      fetchSelectSub02Day !== localStorage.subDay02
    ) {
      setD2(fetchSelectSub02Day);
    }
  }, [fetchSelectSub02Day]);

  useEffect(() => {
    if (
      fetchSelectSub03Day !== 0 &&
      fetchSelectSub03Day !== localStorage.subDay03
    ) {
      setD3(fetchSelectSub03Day);
    }
  }, [fetchSelectSub03Day]);

  useEffect(() => {
    if (fetchToHome) {
      localStorage.removeItem("localJWT");
      localStorage.removeItem("id");
      localStorage.removeItem("username");
      localStorage.removeItem("subDay01");
      localStorage.removeItem("subDay02");
      localStorage.removeItem("subDay03");
      dispatch(resetState());
      dispatch(
        editSnackTxt("認証有効期限が切れました。\n再度ログインをしてください。")
      );
      history.push("/");
      dispatch(toggleSnack());
    }
  }, [dispatch, history, fetchToHome]);

  const changePrevDay01 = async (prevDay) => {
    await dispatch(fetchAsyncGetTokeState()).then((res) => {
      if (res.type === "verify/post/fulfilled") {
        localStorage.setItem("subDay01", prevDay);
        const strDate = getPrevDate(prevDay);
        const params = {
          user_page: userData.id,
          history01_display_date: Number(prevDay),
        };
        dispatch(editSubDiary01date(prevDay));
        dispatch(saveAsyncSubDiary01(params));
        dispatch(fetchAsyncSubDiary01(strDate));
      } else {
        dispatch(toggleToHome());
      }
    });
  };

  const changePrevDay02 = async (prevDay) => {
    await dispatch(fetchAsyncGetTokeState()).then((res) => {
      if (res.type === "verify/post/fulfilled") {
        localStorage.setItem("subDay02", prevDay);
        const strDate = getPrevDate(prevDay);
        const params = {
          user_page: userData.id,
          history02_display_date: Number(prevDay),
        };
        dispatch(editSubDiary02date(prevDay));
        dispatch(saveAsyncSubDiary02(params));
        dispatch(fetchAsyncSubDiary02(strDate));
      } else {
        dispatch(toggleToHome());
      }
    });
  };

  const changePrevDay03 = async (prevDay) => {
    await dispatch(fetchAsyncGetTokeState()).then((res) => {
      if (res.type === "verify/post/fulfilled") {
        localStorage.setItem("subDay03", prevDay);
        const strDate = getPrevDate(prevDay);
        const params = {
          user_page: userData.id,
          history03_display_date: Number(prevDay),
        };
        dispatch(editSubDiary03date(prevDay));
        dispatch(saveAsyncSubDiary03(params));
        dispatch(fetchAsyncSubDiary03(strDate));
      } else {
        dispatch(toggleToHome());
      }
    });
  };

  const clickHandle01 = () => {
    dispatch(editModalTitle(subTitle01));
    dispatch(editModalText(subText01));
    dispatch(toggleSubDiaryModal());
  };

  const clickHandle02 = () => {
    dispatch(editModalTitle(subTitle02));
    dispatch(editModalText(subText02));
    dispatch(toggleSubDiaryModal());
  };

  const clickHandle03 = () => {
    dispatch(editModalTitle(subTitle03));
    dispatch(editModalText(subText03));
    dispatch(toggleSubDiaryModal());
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
              value={d1}
              clickHandle={clickHandle01}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <SubDiary
              onChange={changePrevDay02}
              title={subTitle02}
              text={subText02}
              value={d2}
              clickHandle={clickHandle02}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <SubDiary
              onChange={changePrevDay03}
              title={subTitle03}
              text={subText03}
              value={d3}
              clickHandle={clickHandle03}
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
});

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
