import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';

const CalendarWidget = () => {
  const [date, setDate] = useState(new Date());

  return (
    <CalendarContainer>
      <Calendar
        onChange={setDate}
        value={date}
        tileClassName={({ date, view }) => {
          if (view === 'month') {
            if (date.toDateString() === new Date().toDateString()) {
              return 'today';
            }
          }
        }}
      />
    </CalendarContainer>
  );
};

export default CalendarWidget;

/* -------------------- STYLES -------------------- */

const CalendarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  .react-calendar {
    width: 100%;
    max-width: 350px;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
    background-color: black;
  }

  .react-calendar--doubleView {
    width: 700px;
  }

  .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  }

  .react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
    margin: 0.5em;
  }

  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }

  .react-calendar button:enabled:hover {
    cursor: pointer;
  }

  .react-calendar__navigation {
    display: flex;
    height: 44px;
    margin-bottom: 1em;
  }

  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
    font-size: 16px;
    margin-top: 8px;
    color: white;
  }

  .react-calendar__navigation button:disabled {
    background-color: rgba(155, 94, 255, 0.1);
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: rgba(155, 94, 255, 0.2);
    color: #9b5eff;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75em;
    color: white;
  }

  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
  }

  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    font-weight: bold;
    color: #aaa;
  }

  .react-calendar__month-view__days__day--weekend {
    color: #ff3cac;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: #757575;
  }

  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }

  .react-calendar__tile {
    max-width: 100%;
    padding: 10px 6px;
    background: none;
    text-align: center;
    line-height: 16px;
    font-size: 0.833em;
    color: white;
  }

  .react-calendar__tile:disabled {
    background-color: rgba(155, 94, 255, 0.1);
    color: #757575;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: rgba(155, 94, 255, 0.2);
    color: #9b5eff;
  }

  .react-calendar__tile--now {
    background: rgba(155, 94, 255, 0.3);
    color: #fff;
  }

  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: rgba(155, 94, 255, 0.4);
    color: #fff;
  }

  .react-calendar__tile--hasActive {
    background: rgba(155, 94, 255, 0.5);
  }

  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: rgba(155, 94, 255, 0.6);
  }

  .react-calendar__tile--active {
    background: linear-gradient(90deg, #9b5eff, #ff3cac);
    color: white;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: linear-gradient(90deg, #9b5eff, #ff3cac);
    color: white;
  }

  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: rgba(155, 94, 255, 0.1);
  }

  .today {
    background: rgba(155, 94, 255, 0.3) !important;
    color: #fff !important;
    border-radius: 50%;
  }
`;
