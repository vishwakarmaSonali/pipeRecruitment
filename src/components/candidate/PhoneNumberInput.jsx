import React, { useState, useRef, useEffect } from "react";
import { ReactComponent as DropArrow } from "../../assets/icons/arrowDown.svg";

const countryList = [
  { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
  { code: "IN", name: "India", dialCode: "+91", flag: "🇮🇳" },
  { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { code: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦" },
];

const PhoneNumberInput = () => {
  const [selectedCountry, setSelectedCountry] = useState(countryList[0]); // Default: USA
  const [showDropdown, setShowDropdown] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const dropdownRef = useRef(null);

  // Handle outside clicks to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle country selection
  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="flex items-center border border-gray-300 rounded-lg px-3  bg-white w-full">
        {/* Country Dropdown Trigger */}
        <div
          className="relative cursor-pointer flex items-center"
          onClick={() => setShowDropdown(!showDropdown)}
          ref={dropdownRef}
        >
          <span className="mr-2  text-customBlue font-ubuntu">{selectedCountry.flag}</span>
       <DropArrow />
        </div>

        {/* Dial Code */}
        <span className="ml-2 text-sm text-customBlue font-ubuntu">{`(${selectedCountry.dialCode})`}</span>

        {/* Phone Number Input */}
        <input
          type="tel"
          placeholder="Phone Number"
          className="ml-2 w-full outline-none border-none text-sm text-customBlue font-ubuntu"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>

      {/* Dropdown List (Positioned Absolute) */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg  z-50 text-sm"
        >
          {countryList.map((country) => (
            <div
              key={country.code}
              className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectCountry(country)}
            >
              <span>{country.flag}</span> {country.name} ({country.dialCode})
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhoneNumberInput;
