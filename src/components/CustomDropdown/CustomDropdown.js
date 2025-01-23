import { useState } from "react";
import DropArrow from "../../assets/icons/droparrow.svg"
const CustomDropdown = ({ options, placeholder, selectedValue, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(selectedValue || placeholder);
  
    const handleSelect = (option) => {
      setSelectedOption(option);
      setIsOpen(false);
      onChange(option);
    };
 
//   const options = ["Kilometer", "Mile"];

  return (
    <div className="relative w-full">
      {/* Dropdown button */}
      <div
        className="w-full mt-1 px-[12px] py-[12px]  border flex justify-between items-center cursor-pointer bg-white max-h-[38px] leading-[14px] border-customGrey1 rounded-[8px] text-sm font-ubuntu text-customBlue placeholder:text-borderGrey"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-gray-700">{selectedOption || placeholder}</span>
        <img
          src={DropArrow}
          alt="Dropdown"
          className={`w-5 h-5 transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {/* Dropdown options */}
      {isOpen && (
        <ul className="absolute left-0 w-full bg-white border border-borderGrey rounded-lg shadow-lg mt-2 max-h-40 overflow-auto z-50 text-sm font-ubuntu text-customBlue">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 hover:bg-customGrey1 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
