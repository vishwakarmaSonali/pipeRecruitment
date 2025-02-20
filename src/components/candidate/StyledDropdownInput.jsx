import { useState } from "react";

const DropdownWithInput = () => {
  const [selected, setSelected] = useState("None");
  const [isOpen, setIsOpen] = useState(false);
  const options = ["None", "Mr.", "Ms.", "Mrs."];

  return (
    <div className="relative w-[100%]">
      <div className="flex items-center border h-[38px] border-gray-300 rounded-lg px-2  box-border bg-white font-ubuntu text-sm text-customBlue">
        {/* Dropdown Section */}
        <div 
          className="relative cursor-pointer flex items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="mr-2">{selected}</span>
          <svg
            className="w-4 h-4 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Text Input */}
        <input
          type="text"
          placeholder="First Name"
          className="ml-2 flex-1 outline-none border-none font-ubuntu text-sm text-customBlue"
        />
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute z-50 left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg ">
          {options.map((option) => (
            <div
              key={option}
              className="p-2 hover:bg-gray-100 cursor-pointer font-ubuntu text-sm text-customBlue"
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownWithInput;
