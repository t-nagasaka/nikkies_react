import React from "react";
import Kalendaryo from "kalendaryo";
import classes from "classnames";
import { isToday, isSameMonth } from "date-fns";
import "./styles.css";

const BasicCalendar = (kalendaryo) => {
  const {
    getFormattedDate,
    getWeeksInMonth,
    getDayLabelsInWeek,
    setSelectedDate,
    selectedDate,
    setDateNextMonth,
    setDatePrevMonth,
    date,
  } = kalendaryo;

  const currentDate = getFormattedDate("YYYY　MMMM");
  const selectDay = (date) => () => setSelectedDate(date);
  const weeksInCurrentMonth = getWeeksInMonth();
  const dayLabels = getDayLabelsInWeek();

  const isSelectedDay = (date) =>
    getFormattedDate(selectedDate) === getFormattedDate(date);
  const isDisabled = (dateValue) => !isSameMonth(date, dateValue);

  return (
    <div className="my-calendar">
      <div className="my-calendar-header">
        <button onClick={setDatePrevMonth}>&larr;</button>

        <span>{currentDate}</span>

        <button onClick={setDateNextMonth}>&rarr;</button>
      </div>

      <div className="my-calendar-body">
        <div className="week day-labels">
          {dayLabels.map((label) => (
            <div className="day" key={label}>
              {label}
            </div>
          ))}
        </div>

        {weeksInCurrentMonth.map((week, i) => (
          <div className="week" key={i}>
            {week.map((day) => (
              <div
                key={day.label}
                disabled={isDisabled(day.dateValue)}
                onClick={
                  isDisabled(day.dateValue) ? null : selectDay(day.dateValue)
                }
                className={classes("day", {
                  "is-selected": isSelectedDay(day.dateValue),
                  "is-today": isToday(day.dateValue),
                })}
              >
                {day.label}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");
* {
  padding: 0;
  margin: 0;
  color: #333;
  font-family: "Source Sans Pro", sans-serif;
  box-sizing: border-box;
}

button {
  background: none;
  border: none;
  font-size: 2rem;
  color: #fff;
  cursor: pointer;
  outline: none;
}

.my-calendar {
  margin: 5% auto;
  box-shadow: 0 1px 3px #aeaeae;
  width: 350px;
}

.my-calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: crimson;
}

.my-calendar-header span {
  color: #fff;
  font-weight: bold;
}

.my-calendar-body {
  background-color: #fff;
}

.week {
  display: flex;
  flex-wrap: wrap;
}

.week:not(:first-of-type) {
  border-top: 1px solid #efefef;
}

.week.day-labels {
  background: #f8f8f8;
}

.day {
  width: calc(100% / 7);
  flex-basis: calc(100% / 7);
  padding: 1rem 0.5rem;
  text-align: center;
  cursor: default;
}

.day[disabled] {
  color: #dedede;
  cursor: not-allowed !important;
  background: inherit !important;
}

.week:not(.day-labels) .day:not(:last-of-type) {
  border-right: 1px solid #efefef;
}

.week:not(.day-labels) .day {
  cursor: pointer;
}

.week:not(.day-labels) .day.is-selected.is-selected {
  background-color: crimson;
  color: #fff;
}

.week:not(.day-labels) .day.is-today.is-today {
  font-weight: bold;
  color: crimson;
}

.week:not(.day-labels) .day.is-today.is-today.is-selected {
  color: #fff;
}

.week:not(.day-labels) .day:hover {
  background-color: #f3f3f3;
}


export default BasicCalendar;