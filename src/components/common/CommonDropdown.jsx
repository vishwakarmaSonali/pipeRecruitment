import { useState, useEffect } from "react";
import { ReactComponent as DropArrow } from "../../assets/icons/arrowDown.svg";

const CommonDropdown = ({
  options,
  placeholder,
  selectedValue,
  onChange,
  optionKey,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    selectedValue ? selectedValue[optionKey] : ""
  );
  const [selectedColor, setSelectedColor] = useState(
    selectedValue?.color || ""
  ); // Track selected color

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

  const handleSelect = (option) => {
    if (option && optionKey in option) {
      setSelectedOption(option[optionKey]); // Update displayed text
      setSelectedColor(option.color || ""); // Update color if exists
      onChange(option); // Pass the entire object back to parent component
    } else {
    }
    setIsOpen(false);
  };

  const jobListItem = (item) => {
    const selectedItem = item?.value === selectedOption;
    return (
      <div
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

  return (
    <div className="relative w-full">
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
            return jobListItem(option);
          })}
        </div>
      )}
    </div>
  );
};

export default CommonDropdown;
