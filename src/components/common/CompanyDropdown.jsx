import React, { useState, useEffect, useRef } from "react";
import { ReactComponent as DropArrow } from "../../assets/icons/arrowDown.svg";
import { ReactComponent as Tick } from "../../assets/icons/selected-icon.svg";

const CompanyDropdown = ({ options }) => {
  const dropdownRef = useRef(null);
  const [companyData, setCompanyData] = useState(options);
  const [selectedCompanyData, setSelectedCompanyData] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const selectCompanyHandler = (id) => {
    const filterData = companyData?.filter((item) => item?.id === id);
    setSelectedCompanyData(filterData[0]);
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

  const normalListItem = (item, index) => {
    return (
      <div
        className="company-list-item-div"
        onClick={() => selectCompanyHandler(item?.id)}
      >
        <div className="display-flex align-center" style={{ gap: 6 }}>
          <div className="w-h-32">
            <img src={item?.logo ? item?.logo : ""} className="common-img" />
          </div>
          <div className="display-column" style={{ gap: 4 }}>
            {item?.name && (
              <p className="font-14-medium color-dark-black">{item?.name}</p>
            )}
            {item?.position && (
              <p className="font-10-regular color-dark-black">
                {item?.position}
              </p>
            )}
          </div>
        </div>
        {item?.id === selectedCompanyData?.id && <Tick />}
      </div>
    );
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Dropdown button */}
      <div
        className="company-dropdown"
        style={{ cursor: "pointer" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="display-flex align-center" style={{ gap: 6 }}>
          <div className="w-h-32">
            <img
              src={selectedCompanyData?.logo ? selectedCompanyData?.logo : ""}
              className="common-img"
            />
          </div>
          <div className="display-column" style={{ gap: 4 }}>
            {selectedCompanyData?.name && (
              <p className="font-14-medium color-dark-black">
                {selectedCompanyData?.name}
              </p>
            )}
            {selectedCompanyData?.position && (
              <p className="font-10-regular color-dark-black">
                {selectedCompanyData?.position}
              </p>
            )}
          </div>
        </div>
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
            return normalListItem(option, index);
          })}
        </div>
      )}
    </div>
  );
};

export default CompanyDropdown;
