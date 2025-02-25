import { useEffect, useState } from "react";
import { ReactComponent as ArrowIcon } from "../../assets/icons/arrowDown.svg";

const DropdownWithInput = ({
  selectedTitle,
  setSelectedTitle,
  firstName,
  setFirstName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = ["None", "Mr.", "Ms.", "Mrs."];

  return (
    <div className="relative w-[100%]">
      <div className="common-input-div">
        <button
          className="display-flex align-center"
          onClick={() => setIsOpen(!isOpen)}
          style={{ gap: 2 }}
        >
          <span className="font-12-regular">{selectedTitle}</span>
          <button
            className={`${
              isOpen ? "arrow-icon-btn-collpase" : "arrow-icon-btn"
            }`}
          >
            <ArrowIcon />
          </button>
        </button>

        <input
          type="text"
          placeholder="First Name"
          className="flex-1 normal-input"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      {isOpen && (
        <div className="dropdown-container">
          {options.map((option) => (
            <div
              key={option}
              className={`normal-list-item-div ${
                selectedTitle === option && "bg-selected"
              }`}
              onClick={() => {
                setSelectedTitle(option);
                setIsOpen(false);
              }}
            >
              <p className="font-12-regular color-dark-black"> {option} </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownWithInput;
