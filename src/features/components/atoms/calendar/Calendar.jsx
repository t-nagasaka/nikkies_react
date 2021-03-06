import { useState, useEffect, memo } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import CalendarPicker from "@mui/lab/CalendarPicker";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import jaLocale from "date-fns/locale/ja";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import {
  fetchAsyncMainDiary,
  editCalendarDate,
  toggleToHome,
} from "../../slices/DiarySlice";
import { fetchAsyncGetTokeState } from "../../slices/loginSlice";

const minDate = new Date("2000-01-01T00:00:00.000");
const maxDate = new Date("2040-01-01T00:00:00.000");

class JaLocalizedUtils extends DateFnsUtils {
  // カレンダーのヘッダ部分のテキストを取得するメソッド
  getCalendarHeaderText(date) {
    return format(date, "yyyy年M月", { locale: this.locale });
  }
}
const Calendar = memo(() => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());

  const replaceStrDate = async (date) => {
    await dispatch(fetchAsyncGetTokeState()).then((res) => {
      if (res.type === "verify/post/fulfilled") {
        setDate(date);
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        const strDate = `${year}-${month}-${day}`;
        dispatch(editCalendarDate(strDate));
        dispatch(fetchAsyncMainDiary(strDate));
      } else {
        dispatch(toggleToHome());
      }
    });
  };

  useEffect(() => {
    replaceStrDate(date);
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={jaLocale}>
      <MuiPickersUtilsProvider utils={JaLocalizedUtils}>
        <CalendarPicker
          date={date}
          minDate={minDate}
          maxDate={maxDate}
          onChange={replaceStrDate}
        />
      </MuiPickersUtilsProvider>
    </LocalizationProvider>
  );
});

export default Calendar;
