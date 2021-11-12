import ReactCalendar from "react-calendar";
import TaskList from "../../../components/TaskList";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { Transition } from '@headlessui/react'

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
  const [calendarActive, setCalendarActive] = useState(false);

  let timeout;

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

  function mouseLeaveHandler() {
      timeout = setTimeout(() => setCalendarActive(false), 1000)
  }

  function mouseEnterHandler() {
      clearTimeout(timeout);
  }

  return (
    <>
      <TaskList date={formatDate(value)} weekday={getWeekday(value)} />
      <Transition
        onMouseEnter={() => setCalendarActive(true)}
        onClick={() => setCalendarActive(true)}
        className="flex justify-center items-center absolute z-40 bottom-16 right-24 cursor-pointer shadow-xl rounded-full bg-white w-20 h-20 text-3xl text-red-500"
        show={!calendarActive}
        enter="transition-opacity duration-100"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div><Icon icon={faCalendar} fixedWidth /></div>
      </Transition>
      <Transition
        className='absolute z-40 bottom-0 right-0 rounded-lg'
        show={calendarActive}
        enter="transition-all duration-100"
        enterFrom="opacity-0 -translate-y-20"
        enterTo="opacity-100 translate-y-0"
        leave="transition-opacity duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        >
        <div onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} >
            <ReactCalendar
                onChange={onChange}
                value={value}
                className="rounded-tl-lg shadow-2xl p-2 grayscale"
            />
        </div>
      </Transition>
    </>
  );
}

export default Calendar;
