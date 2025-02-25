import React, { useState, useRef, useEffect } from "react";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg"; // Ensure this icon exists
import CommonTextInput from "./CommonTextInput";

const CommonSearchDropdown = ({
  options,
  optionKey = "name", // Default key to search & display
  iconKey = "icon",
  placeholder,
  onSelect,
  selectedData,
  multiSelect = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(
    multiSelect ? (selectedData ? selectedData : []) : null
  );
  const dropdownRef = useRef(null);

  // 🔹 Filter options based on search input
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredOptions([]);
      setIsDropdownOpen(false);
    } else {
      const filtered = options.filter((option) =>
        option[optionKey]?.toLowerCase()?.includes(searchTerm.toLowerCase())
      );
      setFilteredOptions(filtered);
      setIsDropdownOpen(filtered.length > 0);
    }
  }, [searchTerm, options, optionKey]);

  // 🔹 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    if (multiSelect) {
      const alreadySelected = selectedOptions.some(
        (item) => item === option[optionKey]
      );

      const updatedSelections = alreadySelected
        ? selectedOptions.filter((item) => item !== option[optionKey])
        : [...selectedOptions, option[optionKey]];

      setSelectedOptions(updatedSelections);
      onSelect(updatedSelections);
    } else {
      setSelectedOptions(option);
      setSearchTerm(option[optionKey]);
      onSelect(option);
      setIsDropdownOpen(false);
    }
  };

  // 🔹 Remove Selected Option (Multi-Select)
  const removeSelectedOption = (option) => {
    const updatedSelections = selectedOptions.filter((item) => item !== option);
    setSelectedOptions(updatedSelections);
    onSelect(updatedSelections);
  };

  useEffect(() => {
    if (multiSelect) {
      setSelectedOptions(selectedData);
    }
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* 🔹 Input Field */}
      <CommonTextInput
        type="text"
        value={multiSelect ? searchTerm : selectedOptions || searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setIsDropdownOpen(true)}
      />
      {/* 🔹 Selected Options (Multi-Select Mode) */}
      {multiSelect && selectedOptions.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedOptions.map((option, index) => (
            <div key={index} className="selected-options-item">
              <span className="font-12-regular color-dark-black">{option}</span>
              <button onClick={() => removeSelectedOption(option)}>
                <CloseIcon height={8} width={8} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 🔹 Dropdown List */}
      {isDropdownOpen && filteredOptions.length > 0 && (
        <div className="dropdown-container">
          {filteredOptions.map((option, index) => {
            console.log("{option[iconKey]{option[iconKey]", option[iconKey]);

            return (
              <div
                key={index}
                onClick={() => handleSelect(option)}
                className={`cursor-pointer hover:bg-gray-100 font-12-regular color-dark-black p-[12px]  flex  items-center gap-[8px]
                  ${
                    multiSelect &&
                    selectedOptions.some((item) => item === option[optionKey])
                      ? "selected-item-common-bg"
                      : ""
                  } `}
              >
                {option[iconKey] && (
                  <img
                    src={option[iconKey]}
                    alt={option[optionKey]}
                    className="w-5 h-5"
                  />
                )}
                {option[optionKey]}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CommonSearchDropdown;
