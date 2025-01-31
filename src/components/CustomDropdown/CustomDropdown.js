import { useState ,useEffect} from "react";
import { ReactComponent as DropArrow } from "../../assets/icons/droparrow.svg";

const CustomDropdown = ({ options, placeholder, selectedValue, onChange, optionKey }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    selectedValue ? selectedValue[optionKey] || placeholder : placeholder
  );  
  const [selectedColor, setSelectedColor] = useState(selectedValue?.color || ""); // Track selected color

 // Ensure selectedValue is correctly displayed
 useEffect(() => {
  if (selectedValue && typeof selectedValue === "object") {
    setSelectedOption(selectedValue[optionKey] || placeholder);
    setSelectedColor(selectedValue.color || ""); // Update color
  } else {
    setSelectedOption(placeholder);
    setSelectedColor("");
  }
}, [selectedValue, optionKey, placeholder]);

const handleSelect = (option) => {
  console.log("handleSelect option >>>>>>", option);

  if (option && optionKey in option) {
    setSelectedOption(option[optionKey]); // Update displayed text
    setSelectedColor(option.color || ""); // Update color if exists
    onChange(option); // Pass the entire object back to parent component
  } else {
    console.error("Invalid option selected:", option);
  }
  setIsOpen(false);
};
 
//   const options = ["Kilometer", "Mile"];

  return (
    <div className="relative w-full">
      {/* Dropdown button */}
      <div
        className="w-full mt-1 px-[12px] py-[12px]  border flex justify-between items-center cursor-pointer bg-white max-h-[38px] leading-[14px] border-customGrey1 rounded-[8px] text-sm font-ubuntu text-customBlue placeholder:text-borderGrey"
        onClick={() => setIsOpen(!isOpen)}
      >
              <div className="flex items-center gap-2">
              {selectedColor && <div className="w-4 h-4 rounded-full" style={{ backgroundColor: selectedColor }}>
                    </div>}
        <span className="text-gray-700">{selectedOption || placeholder}</span>
              </div>
       <DropArrow
          fill="customBlue"
          className={`w-5 h-5 transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {/* Dropdown options */}
      {isOpen && (
        <ul className="absolute left-0 w-full bg-white border border-borderGrey rounded-lg shadow-lg mt-2 max-h-40 overflow-auto z-50 text-sm font-ubuntu text-customBlue">
          {options.map((option, index) => {
            console.log("option>>>>>>>>item",option);
            
            return(
            <li
              key={index}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 flex items-center gap-2 hover:bg-customGrey1 cursor-pointer"
            >
              {option?.color?<div className={` rounded-lg p-2 `} style={{ backgroundColor: option.color }} ></div>:null}
              <span>{option[optionKey] || option}</span>
            </li>
          )})}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
