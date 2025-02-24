import React, { useState,useEffect } from "react";
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
} from "date-fns";
import "./CustomDatePicker.css";
import { ReactComponent as LeftArrow } from "../../assets/icons/left-arrow.svg"
import { ReactComponent as RightArrow } from "../../assets/icons/right-arrow.svg";

const CustomCalendar = ({ onDateSelect ,initialDate}) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);
  const [selectedDate, setSelectedDate] = useState(null);
  const todayDate = format(today, "yyyy-MM-dd");
  useEffect(() => {
    if (initialDate) {
      setSelectedDate(new Date(initialDate));
    }
  }, [initialDate]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(date); // Pass selected date to parent component
    }
  };

  const renderHeader = () => {
    return (
      <div className="calendar-header">
        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
          <LeftArrow width={20} height={20} />
        </button>
        <span>
          {/* {format(currentMonth, "MMMM")} {currentMonth?.getFullYear()} */}
          {format(currentMonth, "MMMM yyyy")}
        </span>
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

        // Disable dates before today and the 17th of any month
        // const isDisabled = isBefore(day, today) && !isSameDay(day, today);

        const consultantDisableDate = format(day, "d") === "17";

        days.push(
          <div
            className={`cell ${
              format(day, "MM") !== format(currentMonth, "MM") && "disabled"
            } 
                        ${
                          selectedDate === format(day, "yyyy-MM-dd") &&
                          "selected"
                        } 
                        ${
                          todayDate === format(day, "yyyy-MM-dd") &&
                          "today-date"
                        }
                        `}
            key={day}
            onClick={() =>
             
              !consultantDisableDate &&
              handleDateClick(format(cloneDay, "yyyy-MM-dd"))
            } // Prevent clicking on disabled dates
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

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default CustomCalendar;
