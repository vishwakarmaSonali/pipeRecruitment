import React, { useState, useEffect } from "react";
import { ReactComponent as DropArrow } from "../../assets/icons/droparrow.svg";
import CommonSearchBox from "./CommonSearchBox";
import getSymbolFromCurrency from "currency-map-symbol";
import axios from "axios";

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
  const [countryList, setCountryList] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  // 🔹 Fetch country and currency data dynamically
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const data = response.data.map((country) => {
          const currencyCode = country.currencies
            ? Object.keys(country.currencies)[0]
            : "N/A";

          return {
            name: country.name.common,
            code: currencyCode,
            symbol: getSymbolFromCurrency(currencyCode) || "N/A",
          };
        });

        setCountryList(data);
        setFilteredCountries(data); // Initialize filteredCountries with all countries
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchCountries();
  }, []);

  // 🔹 Update filtered list on search
  useEffect(() => {
    if (searchValue.trim() === "") {
      setFilteredCountries(countryList);
    } else {
      const filtered = countryList.filter((country) =>
        country.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredCountries(filtered);
    }
  }, [searchValue, countryList]);

  return (
    <div className="relative ">
      {/* Input Field with Currency Selector */}
      <div className="flex items-center   px-2 rounded-md cursor-pointer bg-white py-3  h-[38px]" style={{border:'1px solid #f3f4f4'}}>
      <div
          className="flex items-center cursor-pointer"
        onClick={() => setShowDropdown(!showDropdown)}
      >
          <span className="mx-1 text-sm text-customBlue font-ubuntu">
            {selectedCurrency?.symbol || "Select"}
          </span>
          <DropArrow
            width={8}
            height={8}
            fill="customBlue"
            className={`w-[14px] h-[14px] transition-transform ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
        <input
          type="text"
          className=" flex-1 outline-none border-none text-sm text-customBlue font-ubuntu ml-1  placeholder:text-customGray"
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

          {/* Country List */}
          <ul className="max-h-60 overflow-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country, index) => (
                <li
                key={index}
                className="flex items-center justify-between px-[10px] py-[10px] hover:bg-gray-100 cursor-pointer font-ubuntu text-sm"
                  onClick={() => {
                    setSelectedCurrency({
                      code: country.code,
                      name: country.name,
                      symbol: country.symbol,
                    });
                    setShowDropdown(false);
                    setSearchValue(""); // Reset search after selection
                  }}
                >
                  <span>{country.name}</span>
                  <span className="text-gray-600">{country.symbol}</span>
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-gray-500">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;
