import { useState, useEffect, useRef } from "react";
import { ReactComponent as DropArrow } from "../../assets/icons/droparrow.svg";
import Tick from "../../assets/icons/sourcingIcons/tick.svg";

const CustomDropdown = ({
  options,
  placeholder,
  selectedValues,
  onChange,
  optionKey,
  multiSelect = false,
  showCheckbox = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const dropdownRef = useRef(null);
  console.log(options, "options<<<<<<<<<<<<<<<<<");

  useEffect(() => {
    if (!multiSelect && selectedValues) {
      setInputValue(
        typeof selectedValues === "object" && selectedValues !== null
          ? selectedValues[optionKey] || ""
          : selectedValues
      );
    } else {
      setInputValue("");
    }
  }, [selectedValues, multiSelect, optionKey]);
  const handleSelect = (option) => {
    if (Array.isArray(selectedValues)) { // Multi-select mode
      const exists = selectedValues.some((item) => item.id === option.id);
      
      const updatedSelection = exists
        ? selectedValues.filter((item) => item.id !== option.id) // Remove if exists
        : [...selectedValues, option]; // Add if not exists
  
      onChange(updatedSelection);
    } else { // Single-select mode
      if (selectedValues?.id === option.id) {
        return; // Prevent selecting the same value again
      }
      
      onChange({ ...option }); // Force new object reference
      setInputValue(option[optionKey] || "");
      setIsOpen(false);
    }
  };
  

  console.log("selectedValues:", selectedValues);
  console.log("Type of selectedValues:", typeof selectedValues);
  console.log("Is Array:", Array.isArray(selectedValues));
  
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

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setIsOpen(true);
    setFilteredOptions(
      options.filter((option) =>
        option[optionKey]?.toLowerCase()?.includes(value?.toLowerCase())
      )
    );
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="w-full px-2  min-h-[38px] flex justify-between items-center bg-white border-1 border-customGrey1 rounded-[8px] text-sm text-customBlue placeholder:text-customGray">
        <input
          type="text"
          className="flex-1 outline-none border-none bg-transparent  text-sm text-customBlue placeholder:text-customGray"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          onFocus={() => setIsOpen(true)}
          // onBlur={() => setIsOpen(false)}
          readOnly={!multiSelect}
        />
        <DropArrow
          width={14}
          height={14}
          fill="customBlue"
          className={` transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
      {selectedValues?.length > 0 && multiSelect && (
        <div className="flex flex-wrap gap-2 bg-white rounded-md mt-[10px] max-h-40"  onClick={(e) => {
          e.stopPropagation();
         setIsOpen(false)
        }}>
          {selectedValues.map((val) => (
            <div key={val.id} className="inputed-item">
              {val[optionKey]}
              <button
                className="ml-2 text-customBlue"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(selectedValues.filter((item) => item.id !== val.id));
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

{isOpen && (
  <ul className="absolute left-0 w-full bg-white border border-borderGrey rounded-lg shadow-lg mt-1 max-h-40 overflow-auto z-50 text-sm">
    {filteredOptions.length > 0 ? (
      filteredOptions.map((option, index) => {
        const isSelected = Array.isArray(selectedValues)
        ? selectedValues.some((item) => item?.id === option?.id) // Multi-select
        : typeof selectedValues === "object" && selectedValues !== null
        ? selectedValues?.id === option?.id // Single-select (object)
        : selectedValues === option[optionKey]; // If `selectedValues` is a string/number
      
        return (
          <li
            key={index}
            onClick={() => handleSelect(option)}
            className={`px-[12px] py-2 flex items-center gap-2 cursor-pointer transition 
            ${isSelected ? "bg-blueBg" : "hover:bg-blueBg"}`}
          >
            {showCheckbox && multiSelect && (
              <div
                className={`w-[20px] h-[20px] border border-customBlue bg-white rounded-[6px] flex items-center justify-center cursor-pointer`}
                onClick={() => handleSelect(option)}
              >
                {isSelected ? <img src={Tick} alt="Selected" /> : null}
              </div>
            )}
            <span>
              {typeof option[optionKey] === "string"
                ? option[optionKey]
                : JSON.stringify(option[optionKey])}
            </span>
          </li>
        );
      })
    ) : (
      <li className="px-4 py-2 text-center text-customGray font-ubuntu">
        No results found
      </li>
    )}
  </ul>
)}

    </div>
  );
};

export default CustomDropdown;
