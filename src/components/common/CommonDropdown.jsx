import React, { useState, useEffect, useRef } from "react";
import { ReactComponent as DropArrow } from "../../assets/icons/arrowDown.svg";
import { useModal } from "./ModalProvider";
import { ReactComponent as Tick } from "../../assets/icons/sourcingIcons/tick.svg";

const CommonDropdown = ({
  options,
  placeholder,
  selectedValue,
  onChange,
  optionKey,
  type,
  handleMultiSelectHandler,
}) => {
  const dropdownRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    selectedValue ? selectedValue[optionKey] : ""
  );
  const [selectedColor, setSelectedColor] = useState(
    selectedValue?.color || ""
  ); // Track selected color
  const [selectedJobStatuses, setSelectedJobStatuses] = useState([]);

  // Ensure selectedValue is correctly displayed
  useEffect(() => {
    if (selectedValue && typeof selectedValue === "object") {
      setSelectedOption(selectedValue[optionKey] || "");
      setSelectedColor(selectedValue.color || "");
    } else {
      setSelectedOption("");
      setSelectedColor("");
    }
  }, [selectedValue, optionKey]);

  // Handle outside click to close dropdown
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

  const handleSelect = (option) => {
    if (option && optionKey in option) {
      setSelectedOption(option[optionKey]); // Update displayed text
      setSelectedColor(option.color || ""); // Update color if exists
      onChange(option); // Pass the entire object back to parent component
    } else {
    }
    setIsOpen(false);
  };

  const jobListItem = (item, index) => {
    const selectedItem = item?.value === selectedOption;
    return (
      <div
        key={index}
        className={`job-list-item-div ${selectedItem && "bg-selected"}`}
        onClick={() => handleSelect(item)}
      >
        <div className="job-company-icon-div">
          <img src="" />
        </div>
        <div className="display-column" style={{ gap: 4 }}>
          <p className="job-company-name">{item?.value}</p>
          <p className="job-company-place-name">{item?.place}</p>
        </div>
      </div>
    );
  };

  const jobStatusListItem = (item, index) => {
    return (
      <div
        key={index}
        className="jon-status-list-div"
        onClick={() => handleMultiSelectHandler(item)}
      >
        <div className="display-flex align-center" style={{ gap: 10 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              backgroundColor: item?.color,
            }}
          />
          <span className="font-12-regular color-dark-black">{item?.type}</span>
        </div>
        <div className="dropdown-checkbox">{item?.selected && <Tick />}</div>
      </div>
    );
  };

  const normalListItem = (item, index) => {
    const itemValue = item?.industryType || item?.type;
    const selectedItem = itemValue === selectedOption;
    return (
      <div
        key={index}
        className={`normal-list-item-div ${selectedItem && "bg-selected"}`}
        onClick={() => handleSelect(item)}
      >
        <p className="font-12-regular color-dark-black">{itemValue}</p>
      </div>
    );
  };

  const fieldFormatListItem = (item, index) => {
    const itemValue = item?.type;
    const selectedItem = itemValue === selectedOption;
    return (
      <div
        key={index}
        className={`normal-list-item-div display-flex align-item ${
          selectedItem && "bg-selected"
        }`}
        style={{ gap: 10 }}
        onClick={() => handleSelect(item)}
      >
        {item?.icon}
        <p className="font-12-regular color-dark-black">{itemValue}</p>
      </div>
    );
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Dropdown button */}
      <div className="common-dropdown" onClick={() => setIsOpen(!isOpen)}>
        <span
          className="common-dropdown-text"
          style={{ color: !!selectedOption ? "#151B23" : "#797979" }}
        >
          {selectedOption || placeholder}
        </span>
        <DropArrow
          width={14}
          height={14}
          fill="customBlue"
          className={`transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {isOpen && (
        <div className="dropdown-container">
          {options.map((option, index) => {
            switch (type) {
              case "job":
                return jobListItem(option, index);
              case "jobStatus":
                return jobStatusListItem(option, index);
              case "fieldFormat":
                return fieldFormatListItem(option, index);
              default:
                return normalListItem(option, index);
            }
          })}
        </div>
      )}
    </div>
  );
};

export default CommonDropdown;
