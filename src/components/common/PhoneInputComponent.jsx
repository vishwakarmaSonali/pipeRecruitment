import React, { useRef, useState, useEffect } from "react";
import { MenuItem } from "@mui/material";
import { getData } from "country-list";
import {
  parsePhoneNumberFromString,
  getCountryCallingCode,
} from "libphonenumber-js";
import countries from "i18n-iso-countries";
import ReactCountryFlag from "react-country-flag";
import { ReactComponent as DropDownIcon } from "../../assets/icons/dropdown.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/searchIcon.svg";
import { getCallingCode, getCountryCode } from "../../helpers/utils";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const PhoneInputComponent = ({
  selectedPhoneNumber,
  phoneNumber,
  callingCode,
  setValid,
}) => {
  const [phoneNumberValue, setPhoneNumberValue] = useState(phoneNumber || "");
  const [selectedCountry, setSelectedCountry] = useState({
    code: getCountryCode(`${callingCode}${phoneNumber}`) || "IN",
    callingCode: callingCode ? callingCode : "+91",
  });

  console.log(
    ">>>>>>>>>>>.getCountryCode(`${callingCode}${phoneNumber}`)",
    getCountryCode(`${callingCode}${phoneNumber}`),
    phoneNumber,
    callingCode
  );
  const [isValid, setIsValid] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const dropdownRef = useRef(null);
  const countriesData = getData();

  useEffect(() => {
    if (!!phoneNumber) {
      setPhoneNumberValue(phoneNumber);
    }

    if (!!callingCode) {
      const countryCode = getCountryCode(`${callingCode}${phoneNumber}`);
      setSelectedCountry({
        code: !!countryCode ? countryCode : "IN",
        callingCode: callingCode ? callingCode : "+91",
      });
    }
  }, [phoneNumber, callingCode]);

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

  const handleCountrySelect = (countryCode) => {
    const callingCode = `+${getCountryCallingCode(countryCode)}`;
    selectedPhoneNumber({
      phoneNumber: phoneNumberValue,
      callingCode: callingCode,
    });
    setSelectedCountry({ code: countryCode, callingCode });
    setIsOpen(false);
    setPhoneNumberValue("");
    setIsValid(true);
  };

  const handleValidation = (value) => {
    if (!value) return setIsValid(true);
    try {
      const parsedNumber = parsePhoneNumberFromString(
        value,
        selectedCountry.code
      );
      setIsValid(parsedNumber ? parsedNumber.isValid() : false);
      setValid(parsedNumber ? parsedNumber.isValid() : false);
    } catch (error) {
      setIsValid(false);
      setValid(false);
    }
  };

  return (
    <>
      <div style={{ position: "relative" }} ref={dropdownRef}>
        {/* ${!isValid ? "error-border" : ""} */}
        <div className={`phone-common-input `}>
          <button
            className="display-flex align-center"
            style={{ gap: 4 }}
            onClick={() => setIsOpen(!isOpen)}
          >
            <ReactCountryFlag
              countryCode={selectedCountry.code}
              svg
              style={{ width: "22px", height: "16px" }}
            />
            <DropDownIcon
              width={12}
              height={12}
              className={`transition-transform ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
          <span className="font-12-regular color-black">
            ({selectedCountry.callingCode})
          </span>
          <input
            value={phoneNumberValue}
            placeholder={"Phone Number"}
            onChange={(e) => {
              const inputValue = e.target.value;
              if (/^\d*$/.test(inputValue)) {
                setPhoneNumberValue(inputValue);
                handleValidation(inputValue);
                selectedPhoneNumber({
                  phoneNumber: inputValue,
                  callingCode: selectedCountry?.callingCode,
                });
              }
            }}
            className={`normal-input flex-1 `}
            style={{ height: "100%" }}
          />
        </div>

        {isOpen && (
          <div
            className="dropdown-container"
            style={{ boxSizing: "border-box", overflow: "auto" }}
          >
            <div
              className="position-sticky"
              style={{ padding: 8, backgroundColor: "#fff", zIndex: 99 }}
            >
              <div className="phone-common-input">
                <SearchIcon width={16} height={16} />
                <input
                  value={searchValue}
                  placeholder={"Search"}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="normal-input flex-1"
                  style={{ height: "100%" }}
                />
              </div>
            </div>

            <div style={{ overflowY: "auto", overflowX: "hidden" }}>
              {countriesData
                .filter(
                  (option) =>
                    option.name
                      .toLowerCase()
                      .includes(searchValue.toLowerCase()) ||
                    option.code
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
                )
                .map((option, index) => (
                  <MenuItem
                    key={index}
                    sx={{
                      padding: "12px !important",
                      gap: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                      backgroundColor:
                        selectedCountry.code === option.code
                          ? "#F9F9FD !important"
                          : "#FFFFFF",
                      "&:hover": { backgroundColor: "#F0F0F0" },
                    }}
                    onClick={() => handleCountrySelect(option.code)}
                  >
                    <div
                      className="display-flex align-center flex-1"
                      style={{ gap: 10 }}
                    >
                      <ReactCountryFlag
                        countryCode={option.code}
                        svg
                        style={{ width: "22px", height: "16px" }}
                      />
                      <span className="truncate-text font-12-regular color-black flex-1">
                        {option.name}
                      </span>
                    </div>
                    <span className="font-12-regular color-grey">
                      {getCallingCode(option?.code)}
                    </span>
                  </MenuItem>
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PhoneInputComponent;
