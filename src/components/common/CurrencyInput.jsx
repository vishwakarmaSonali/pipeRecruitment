import React, { useState } from "react";
import { ReactComponent as DropArrow } from "../../assets/icons/droparrow.svg";
import CommonSearchBox from "./CommonSearchBox";
import getSymbolFromCurrency from "currency-map-symbol";


const currencyList = [
  { code: "USD", name: "United States Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "INR", name: "Indian Rupee" },
  { code: "GBP", name: "British Pound" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "CAD", name: "Canadian Dollar" },
];
// Format the country list with currency symbols
// const countryList = countries.map((country) => ({
//   code: country.cca2, // 2-letter country code (e.g., US, IN)
//   name: country.name.common, // Country name
//   currency: country.currencies
//     ? Object.keys(country.currencies)[0]
//     : "N/A", // Currency Code
//   symbol: country.currencies
//     ? Object.values(country.currencies)[0].symbol || "N/A"
//     : "N/A", // Currency Symbol
// }));

const CurrencySelector = ({
  label,
  selectedCurrency,
  setSelectedCurrency,
  salary,
  setSalary,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const formattedCurrencies = currencyList.map((currency) => ({
    ...currency,
    symbol: getSymbolFromCurrency(currency.code) || "N/A",
  }));
  console.log("formattedCurrenciesformattedCurrenciesformattedCurrencies",formattedCurrencies);
  

  return (
    <div className="relative ">
      {/* Input Field with Currency Selector */}
      <div className="flex items-center border border-gray-300 px-2 rounded-md cursor-pointer bg-white py-3 border-none h-[38px]">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span className="mx-1 text-sm text-customBlue font-ubuntu">
            {selectedCurrency.symbol}
          </span>
          <DropArrow
            width={14}
            height={14}
            fill="customBlue"
            className={`w-5 h-5 transition-transform ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
        <input
          type="text"
          className=" flex-1 outline-none border-none text-sm text-customBlue font-ubuntu ml-1"
          placeholder={label}
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-md rounded-md mt-1 z-50">
          {/* Search Input */}
          <div className="flex-1 p-2">
            <CommonSearchBox
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>

          {/* Currency List */}
          <ul className="max-h-60 overflow-auto">
            {formattedCurrencies.map((currency) => (
              <li
                key={currency.code}
                className="flex items-center justify-between px-[10px] py-[10px] hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelectedCurrency({
                    code: currency.code,
                    name: currency.name,
                    symbol: currency.symbol,
                  });
                  setShowDropdown(false);
                }}
              >
                <div className="flex items-center">
                  {/* <span className="text-lg">{currency.flag}</span> */}
                  <span className="ml-3">{currency.name}</span>
                </div>
                <span className="text-gray-600">{currency.symbol}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;
