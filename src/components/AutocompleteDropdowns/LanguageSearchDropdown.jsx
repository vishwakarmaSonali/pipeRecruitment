import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../components/filterModal/FilterModal.css";
import CommonTextInput from "../common/CommonTextInput";

const LanguageSearchDropdown = ({
  options,
  optionKey = "name", // Default key to search & display
  iconKey = "icon",
  placeholder,
  onSelect,
  selectedData,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(null);
  const dropdownRef = useRef(null);

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
    setIsDropdownOpen(false);
    setSelectedOptions([option]);
    setSearchTerm(option[optionKey]);
    onSelect(option);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <CommonTextInput
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsDropdownOpen(true);
        }}
        placeholder={placeholder}
      />

      {isDropdownOpen && filteredOptions.length > 0 && (
        <div
          className="dropdown-container"
          onMouseDown={(e) => e.preventDefault()}
        >
          {filteredOptions.map((option, index) => {
            return (
              <div
                key={index}
                onClick={() => handleSelect(option)}
                className={`normal-list-item-div
                  ${
                    selectedOptions?.some((item) => item === option[optionKey])
                      ? "bg-selected"
                      : ""
                  } `}
              >
                <p className="font-12-regular color-dark-black">
                  {option[optionKey]}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageSearchDropdown;
