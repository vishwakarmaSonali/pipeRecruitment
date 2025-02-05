import { useState, useEffect, useRef } from "react";
import { ReactComponent as DropArrow } from "../../assets/icons/droparrow.svg";

const CustomDropdown = ({ options, placeholder, selectedValue, onChange, optionKey }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(placeholder);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  const dropdownRef = useRef(null);

  useEffect(() => {
    if (selectedValue && typeof selectedValue === "object") {
      setSelectedOption(selectedValue[optionKey] || placeholder);
      setSelectedColor(selectedValue.color || "");
    } else {
      setSelectedOption(placeholder);
      setSelectedColor("");
    }
  }, [selectedValue, optionKey, placeholder]);

  const handleSelect = (option) => {
    if (option && optionKey in option) {
      setSelectedOption(option[optionKey]); // Update displayed text
      setSelectedColor(option.color || ""); // Update color if exists
      onChange(option); // Pass the entire object back to parent component
    } else {
      console.error("Invalid option selected:", option);
    }
    setIsOpen(false);
  };

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
  
  const toggleStatus = (status) => {
    setSelectedStatuses((prev) =>
      prev.some((s) => s.id === status.id)
        ? prev.filter((s) => s.id !== status.id) // Remove if already selected
        : [...prev, status] // Add if not selected
    );
  };


  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Dropdown button */}
      <div
        className="w-full px-[12px] py-[12px] border flex justify-between items-center cursor-pointer bg-white max-h-[38px] leading-[14px] border-customGrey1 rounded-[8px] text-sm font-ubuntu text-customBlue placeholder:text-borderGrey"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          {selectedColor && (
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: selectedColor }}></div>
          )}
          <span className="text-gray-700">{selectedOption}</span>
        </div>
        <DropArrow
          width={14}
          height={14}
          fill="customBlue"
          className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </div>

      {/* Dropdown options */}
      {isOpen && (
        <ul
          className="absolute left-0 w-full bg-white border border-borderGrey rounded-lg shadow-lg mt-2 max-h-40 overflow-auto z-50 text-sm font-ubuntu text-customBlue"
          style={{ zIndex: 9999 }}
        >
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 flex items-center gap-2 hover:bg-customGrey1 cursor-pointer"
            >
              {option?.color && (
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: option.color }}></div>
              )}
              <span>{option[optionKey] || option}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
