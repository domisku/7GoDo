import ReactCalendar from "react-calendar";
import TaskList from "../../../components/TaskList";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function Calendar() {
  const [value, onChange] = useState(new Date());

  function formatDate(rawDate) {
    const date = rawDate;
    const dateYMD = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;

    return dateYMD;
  }

  function getWeekday(rawDate) {
      const date = rawDate;
      return weekday[date.getDay()];
  }

  return (
    <>
      <TaskList date={formatDate(value)} weekday={getWeekday(value)} />
      <div className="absolute z-50 bottom-0 right-0 rounded-lg">
        <ReactCalendar
          onChange={onChange}
          value={value}
          className="rounded-tl-lg shadow-2xl p-1 pr-0 grayscale opacity-60 hover:opacity-100"
        />
      </div>
    </>
  );
}

export default Calendar;
