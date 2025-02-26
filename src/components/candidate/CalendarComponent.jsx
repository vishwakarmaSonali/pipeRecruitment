import React, { useState, useRef } from "react";
import "./index.css";
import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow-left.svg";
import { ReactComponent as ArrowRight } from "../../assets/icons/arrow-right.svg";
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
  isSameMonth,
} from "date-fns";

const CalendarComponent = () => {
  const today = new Date();
  const initialMonth = today;
  const todayDate = format(today, "yyyy-MM-dd");
  const [currentMonth, setCurrentMonth] = useState(initialMonth);
  const selectedInitialDate = format(initialMonth, "yyyy-MM-dd");
  const [selectedDate, setSelectedDate] = useState(selectedInitialDate);
  const formattedCurrentMonth = format(currentMonth, "MMMM yyyy");

  const events = [
    {
      title: "Exciting UI/UX Design Opportunity – Let's Connect!",
      date: "2025-01-06",
      color: "#46A13C",
      time: "11:30 AM",
    },
    {
      title: "Re: Exciting UI/UX Design Opportunity – Let's Connect!",
      date: "2025-01-07",
      color: "#46A13C",
      time: "11:30 AM",
    },
    {
      title: "Re: Follow-Up: UI/UX Designer Opportunity",
      date: "2025-01-10",
      color: "#46A13C",
      time: "11:30 AM",
    },
    {
      title: "Re: Follow-Up: UI/UX Designer Opportunity",
      date: "2025-01-13",
      color: "#46A13C",
      time: "11:30 AM",
    },
    {
      title: "Schedule Screening",
      date: "2025-02-22",
      color: "#D2A01D",
      time: "12:00 AM",
    },
    {
      title: "Screening",
      date: "2025-01-24",
      color: "#E03636",
      time: "11:00 AM",
    },
    {
      title: "Quick Call",
      date: "2025-01-22",
      color: "#46A13C",
      time: "10:00 AM",
    },
    {
      title: "Schedule Screening",
      date: "2025-01-22",
      color: "#D2A01D",
      time: "12:00 AM",
    },
  ];

  const filteredEvents = events
    .filter((event) => isSameMonth(parseISO(event.date), currentMonth))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const groupEventsByDate = (events) => {
    return events.reduce((acc, event) => {
      if (!acc[event.date]) {
        acc[event.date] = [];
      }
      acc[event.date].push(event);
      return acc;
    }, {});
  };

  const renderDays = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return (
      <div className="candidate-calendar-days position-sticky">
        {days.map((day, index) => (
          <div
            className="flex-1 text-center font-12-regular color-dark-black"
            style={{ fontWeight: 500 }}
            key={index}
          >
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

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, "yyyy-MM-dd");
        const isDisabled = format(day, "MM") !== format(currentMonth, "MM");

        // Filter events for the current date
        const dayEvents = events.filter(
          (event) => event.date === formattedDate
        );

        days.push(
          <div className={`candidate-cell flex-1`} key={day}>
            <div
              className={`candidate-cell-date ${
                todayDate === formattedDate ? "today-date" : ""
              }`}
            >
              <span className={`${isDisabled ? "color-grey" : ""}`}>
                {format(day, "d")}
              </span>
            </div>

            {dayEvents?.length > 0 && (
              <div className="event-list">
                {dayEvents?.map((event, index) => (
                  <p
                    key={index}
                    className="truncate-text font-12-regular"
                    style={{
                      color: event.color,
                      padding: "0px 6px",
                      textWrap: "wrap",
                    }}
                  >
                    ● {event.title}
                  </p>
                ))}
              </div>
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="candidate-calendar-row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="candidate-calendar-body flex-1">{rows}</div>;
  };

  const groupedEvents = groupEventsByDate(filteredEvents);

  return (
    <div className="calendar-container flex-1">
      <div className="candidate-sidebar">
        <div className="candidate-calendar-sidebar-header">
          <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
            <ArrowRight />
          </button>
          <span
            className="font-14-regular color-dark-black text-center"
            style={{ minWidth: 120 }}
          >
            {formattedCurrentMonth}
          </span>
          <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
            <ArrowLeft />
          </button>
        </div>

        <div className="calendar-event-list">
          {Object.keys(groupedEvents).map((date, index) => (
            <div key={index} className="display-column" style={{ gap: 10 }}>
              <div className="font-14-medium color-dark-black">
                {format(parseISO(date), "MMMM dd, yyyy")}
              </div>
              <div className="display-column" style={{ gap: 6 }}>
                {groupedEvents[date]?.map((event, idx) => (
                  <div key={idx} className="calendar-event-list-item">
                    <span
                      className="truncate-text font-12-regular"
                      style={{ color: event.color }}
                    >
                      ● {event.title}
                    </span>
                    {event.time && (
                      <span
                        className="font-12-regular color-dark-black"
                        style={{
                          minWidth: 52,
                          textAlign: "right",
                        }}
                      >
                        {event.time}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="candidate-calendar">
        {renderDays()} {renderCells()}
      </div>
    </div>
  );
};

export default CalendarComponent;
