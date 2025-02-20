import React, { useState } from "react";
import { ReactComponent as DropArrow } from "../../assets/icons/droparrow.svg";

const currencyOptions = [
  { code: "USD", name: "US Dollar", symbol: "US$", flag: "🇺🇸" },
  { code: "ILS", name: "Israeli New Shekel", symbol: "₪", flag: "🇮🇱" },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "🇦🇺" },
  { code: "CNY", name: "Chinese Yuan", symbol: "CN¥", flag: "🇨🇳" },
];

const CurrencySelector = ({ label, selectedCurrency, setSelectedCurrency, salary, setSalary }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredCurrencies = currencyOptions.filter((currency) =>
    currency.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative ">
      {/* Input Field with Currency Selector */}
      <div className="flex items-center border border-gray-300 px-2 rounded-md cursor-pointer bg-white py-3 border-none h-[38px]">
        <div className="flex items-center cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
          <span className="mx-1 text-sm text-customBlue font-ubuntu">{selectedCurrency.symbol}</span>
          <DropArrow
          width={14}
          height={14}
          fill="customBlue"
          className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
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
          <div className="p-2">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="🔍 Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Currency List */}
          <ul className="max-h-60 overflow-auto">
            {filteredCurrencies.map((currency) => (
              <li
                key={currency.code}
                className="flex items-center justify-between p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelectedCurrency(currency);
                  setShowDropdown(false);
                  setSearchQuery("");
                }}
              >
                <div className="flex items-center">
                  <span className="text-lg">{currency.flag}</span>
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
