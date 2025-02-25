import React, { useState, useRef, useEffect } from "react";
import "./common.css";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameDay,
  isBefore,
  parseISO,
} from "date-fns";
import { ReactComponent as LeftArrow } from "../../assets/icons/left-arrow.svg";
import { ReactComponent as RightArrow } from "../../assets/icons/right-arrow.svg";
import { ReactComponent as Arrowup } from "../../assets/icons/arrow-up.svg";
import { ReactComponent as CalendarIcon } from "../../assets/icons/calendar-2.svg";
import { convertToISO, formatDate } from "../../helpers/utils";

const DateTimePicker = ({ onDateSelect, initialDate, showTime }) => {
  const dropdownRef = useRef(null);
  const today = new Date();
  const initialMonth = initialDate ? new Date(initialDate) : today;
  const todayDate = format(today, "yyyy-MM-dd");
  const [currentMonth, setCurrentMonth] = useState(initialMonth);
  const selectedInitialDate = format(initialMonth, "yyyy-MM-dd");
  const [selectedDate, setSelectedDate] = useState(selectedInitialDate);
  const [isOpen, setIsOpen] = useState(false);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(
        convertToISO(
          `${formatDate(date)} • ${formatTime(hours)}:${formatTime(
            minutes
          )} ${ampm}`
        )
      ); // Pass selected date to parent component
    }
  };

  const parsedDate = initialDate ? parseISO(initialDate) : null;

  const formattedHours =
    parsedDate && !isNaN(parsedDate) ? format(parsedDate, "hh") : "12";
  const formattedMinutes =
    parsedDate && !isNaN(parsedDate) ? format(parsedDate, "mm") : "00";
  const formattedAmPm =
    parsedDate && !isNaN(parsedDate) ? format(parsedDate, "a") : "AM";

  const [hours, setHours] = useState(Number(formattedHours));
  const [minutes, setMinutes] = useState(Number(formattedMinutes));
  const [ampm, setAmPm] = useState(formattedAmPm);

  const formatTime = (num) => (num < 10 ? `0${num}` : num);

  const handleHourChange = (inc) => {
    let newHour = hours + inc;
    if (newHour > 12) newHour = 1;
    if (newHour < 1) newHour = 12;
    setHours(newHour);
    onDateSelect(
      convertToISO(
        `${formatDate(selectedDate)} • ${formatTime(newHour)}:${formatTime(
          minutes
        )} ${ampm}`
      )
    );
  };

  const handleMinuteChange = (inc) => {
    let newMinute = minutes + inc;
    if (newMinute >= 60) newMinute = 0;
    if (newMinute < 0) newMinute = 59;
    setMinutes(newMinute);
    onDateSelect(
      convertToISO(
        `${formatDate(selectedDate)} • ${formatTime(hours)}:${formatTime(
          newMinute
        )} ${ampm}`
      )
    );
  };

  const toggleAmPm = () => {
    setAmPm(ampm === "AM" ? "PM" : "AM");
    onDateSelect(
      convertToISO(
        `${formatDate(selectedDate)} • ${formatTime(hours)}:${formatTime(
          minutes
        )} ${ampm === "AM" ? "PM" : "AM"}`
      )
    );
  };

  const renderHeader = () => {
    return (
      <div className="calendar-header">
        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
          <LeftArrow width={20} height={20} />
        </button>
        <span>{format(currentMonth, "MMMM yyyy")}</span>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
          <RightArrow width={20} height={20} />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    return (
      <div className="calendar-days">
        {days.map((day, index) => (
          <div className="day" key={index}>
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = day;

        days.push(
          <div
            className={`cell ${
              selectedDate === format(day, "yyyy-MM-dd") && "selected"
            } ${todayDate === format(day, "yyyy-MM-dd") && "today-date"}`}
            key={day}
            onClick={() => handleDateClick(format(cloneDay, "yyyy-MM-dd"))}
          >
            <span>{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="calendar-row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="calendar-body">{rows}</div>;
  };

  const combineDateTime =
    selectedDate && showTime
      ? `${formatDate(selectedDate)} • ${formatTime(hours)}:${formatTime(
          minutes
        )} ${ampm}`
      : formatDate(selectedDate);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        readOnly
        className="common-input"
        value={combineDateTime ? combineDateTime : ""}
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: "pointer" }}
      />
      {isOpen && (
        <div ref={dropdownRef} className="datepicker-dropdown-container">
          <div className="date-picker-calendar">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
          </div>
          {showTime && (
            <>
              <div className="divider-line" />
              <div className="time-picker-div">
                <p
                  className="font-16-regular color-blue"
                  style={{ fontWeight: 700 }}
                >
                  Time
                </p>
                <div
                  className="display-flex-justify align-center"
                  style={{ width: 178 }}
                >
                  <div
                    className="display-flex align-center"
                    style={{ gap: 14 }}
                  >
                    <div className="display-column" style={{ gap: 2 }}>
                      <button onClick={() => handleHourChange(1)}>
                        <Arrowup />
                      </button>
                      <p className="font-14-regular color-blue">
                        {formatTime(hours)}
                      </p>
                      <button
                        onClick={() => handleHourChange(-1)}
                        style={{ rotate: "180deg" }}
                      >
                        <Arrowup />
                      </button>
                    </div>

                    <p className="font-14-regular color-blue">:</p>

                    <div className="display-column" style={{ gap: 2 }}>
                      <button onClick={() => handleMinuteChange(1)}>
                        <Arrowup />
                      </button>
                      <p className="font-14-regular color-blue">
                        {formatTime(minutes)}
                      </p>
                      <button
                        onClick={() => handleMinuteChange(-1)}
                        style={{ rotate: "180deg" }}
                      >
                        <Arrowup />
                      </button>
                    </div>
                  </div>

                  <div className="display-column" style={{ gap: 2 }}>
                    <button onClick={toggleAmPm}>
                      <Arrowup />
                    </button>
                    <p className="font-14-regular color-blue">{ampm}</p>
                    <button onClick={toggleAmPm} style={{ rotate: "180deg" }}>
                      <Arrowup onClick={toggleAmPm} />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DateTimePicker;
