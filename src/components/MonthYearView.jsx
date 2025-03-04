import React, { useState, useRef, useEffect } from "react";
import { ReactComponent as CalendarIcon } from "../assets/icons/calendar-2.svg"; // Adjust the path accordingly

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const years = Array.from(
  { length: 50 },
  (_, i) => new Date().getFullYear() - i
); // Generate years dynamically

const MonthYearPicker = ({
  label,
  isCheckedDisable,
  onSelect,
  month,
  year,
  iconVisible,
}) => {
  const [selectedMonth, setSelectedMonth] = useState(month);
  const [selectedYear, setSelectedYear] = useState(year);
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);
  const monthRef = useRef(null);
  const yearRef = useRef(null);

  // Handle clicks outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (monthRef.current && !monthRef.current.contains(event.target)) {
        setIsMonthOpen(false);
      }
      if (yearRef.current && !yearRef.current.contains(event.target)) {
        setIsYearOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setSelectedMonth(month);
    setSelectedYear(year);
  }, [month, year]);

  return (
    <div className="flex flex-col space-y-1">
      {/* Label */}
      <label className="text-customBlue font-ubuntu text-sm ">{label}</label>

      <div className="flex space-x-3">
        {/* Month Picker */}
        <div className="relative w-1/2">
          <div
            className={`common-date-select-div cursor-pointer ${
              isCheckedDisable
                ? "border-disableGrey border-1 bg-customGrey1"
                : ""
            }`}
            onClick={() =>
              isCheckedDisable
                ? setIsMonthOpen(false)
                : setIsMonthOpen(!isMonthOpen)
            }
          >
            <span
              className={`font-12-regular ${
                !!selectedMonth ? "color-dark-blak" : "color-grey"
              }`}
            >
              {!!selectedMonth ? selectedMonth : "Month"}
            </span>
            {iconVisible && <CalendarIcon />}
          </div>

          {isMonthOpen && (
            <div
              ref={monthRef}
              className="absolute left-0 mt-1 w-full bg-white shadow-lg border rounded-lg max-h-40 overflow-auto z-50 "
            >
              {months.map((month) => (
                <div
                  key={month}
                  onClick={() => {
                    setSelectedMonth(month);
                    setIsMonthOpen(false);
                    onSelect({ month, year: selectedYear });
                  }}
                  className={`px-3 py-2 hover:bg-gray-100 cursor-pointer font-12-regular color-dark-black ${
                    month === selectedMonth && "selected-item-common-bg"
                  }`}
                >
                  {month}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Year Picker */}
        <div className="relative w-1/2">
          <div
            className={`common-date-select-div cursor-pointer ${
              isCheckedDisable
                ? "border-disableGrey border-1 bg-customGrey1"
                : ""
            }`}
            onClick={() =>
              isCheckedDisable
                ? setIsYearOpen(false)
                : setIsYearOpen(!isYearOpen)
            }
          >
            <span
              className={`font-12-regular ${
                !!selectedYear ? "color-dark-blak" : "color-grey"
              }`}
            >
              {!!selectedYear ? selectedYear : "Year"}
            </span>
            {iconVisible && <CalendarIcon />}
          </div>

          {isYearOpen && (
            <div
              ref={yearRef}
              className="absolute left-0 mt-1 w-full bg-white shadow-lg border rounded-lg max-h-40 overflow-auto z-50"
            >
              {years.map((year) => (
                <div
                  key={year}
                  onClick={() => {
                    setSelectedYear(year);
                    setIsYearOpen(false);
                    onSelect({ month: selectedMonth, year });
                  }}
                  className={`px-3 py-2 hover:bg-gray-100 cursor-pointer font-12-regular color-dark-black ${
                    year == selectedYear && "selected-item-common-bg"
                  }`}
                >
                  {year}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonthYearPicker;
