import * as React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import CalendarPicker from "@mui/lab/CalendarPicker";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import jaLocale from "date-fns/locale/ja";
import { format } from "date-fns";

const minDate = new Date("2000-01-01T00:00:00.000");
const maxDate = new Date("2040-01-01T00:00:00.000");

class JaLocalizedUtils extends DateFnsUtils {
  // カレンダーのヘッダ部分のテキストを取得するメソッド
  getCalendarHeaderText(date) {
    return format(date, "yyyy年M月", { locale: this.locale });
  }
}
const Calendar = () => {
  const [date, setDate] = React.useState(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={jaLocale}>
      <MuiPickersUtilsProvider utils={JaLocalizedUtils}>
        <CalendarPicker
          date={date}
          minDate={minDate}
          maxDate={maxDate}
          onChange={(newDate) => {
            setDate(newDate);
            console.log(newDate);
          }}
        />
      </MuiPickersUtilsProvider>
    </LocalizationProvider>
  );
};

export default Calendar;
