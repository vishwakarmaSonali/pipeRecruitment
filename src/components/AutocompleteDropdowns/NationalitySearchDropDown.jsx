import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../components/filterModal/FilterModal.css";

const NationalitySearchDropdown = ({
  selectedNationalities = [],
  setSelectedNationalities,
  placeholder,
  multipleSelect = true,
}) => {
  const [nationalityQuery, setNationalityQuery] = useState("");
  const [nationalitySuggestions, setNationalitySuggestions] = useState([]);
  const [showNationalityDropdown, setShowNationalityDropdown] = useState(false);
  const debounceTimeout = useRef(null);
  const disableFetch = useRef(false); // Prevent API call on selection

  // Fetch nationality suggestions from API (debounced)
  useEffect(() => {
    if (disableFetch.current) {
      disableFetch.current = false;
      return;
    }

    if (nationalityQuery.length > 1) {
      clearTimeout(debounceTimeout.current);

      debounceTimeout.current = setTimeout(async () => {
        try {
          const response = await axios.get(
            `http://3.110.81.44/api/nationality/suggest?query=${nationalityQuery}`
          );
          console.log("Nationality API Response:", response?.data);

          const suggestions = Array.isArray(response?.data)
            ? response.data
            : [];
console.log("suggestionsssss>>>>",suggestions);

          setNationalitySuggestions(suggestions);
          setShowNationalityDropdown(true);
        } catch (error) {
          console.error("Error fetching nationalities:", error);
          setNationalitySuggestions([]);
        }
      }, 500);
    } else {
      setNationalitySuggestions([]);
      setShowNationalityDropdown(false);
    }

    return () => clearTimeout(debounceTimeout.current);
  }, [nationalityQuery]);

  // Handle nationality selection
  const handleSelectNationality = (nationality) => {
    disableFetch.current = true; // Prevent API call after selection

    if (multipleSelect) {
      if (!selectedNationalities.includes(nationality)) {
        setSelectedNationalities([...selectedNationalities, nationality]);
      }
    } else {
      setSelectedNationalities([nationality]);
      setNationalityQuery(nationality); // Ensure input updates
    }

    setShowNationalityDropdown(false);
  };

  // Handle clearing input
  const clearNationality = () => {
    setSelectedNationalities([]);
    setNationalityQuery("");
    setShowNationalityDropdown(false);
  };

  return (
    <div className="relative w-full ">
      <input
        type="text"
        placeholder={placeholder}
        className="common-input"
        value={multipleSelect ? nationalityQuery : nationalityQuery}
        onChange={(e) => setNationalityQuery(e.target.value)}
        onFocus={() => setShowNationalityDropdown(true)}
      />

      {/* Nationality Suggestions Dropdown */}
      {showNationalityDropdown && nationalitySuggestions.length > 0 && (
        <div className="dropdown-container">
          {nationalitySuggestions.map((nationality, index) => (
            <div
              key={index}
              className="normal-list-item-div"
              onClick={() => handleSelectNationality(nationality?.name)}
            >
              <p className="font-12-regular color-dark-black">{nationality?.name}</p>
            </div>
          ))}
        </div>
      )}

      {/* Selected Nationalities List (Only for Multiple Selection) */}
      {multipleSelect && selectedNationalities.length > 0 && (
        <div className="inputItemsDiv mt-2 flex flex-wrap">
          {selectedNationalities.map((nationality, index) => (
            <div
              key={index}
              className="inputed-item flex items-center px-2 py-1 border rounded-md"
            >
              {nationality?.name}
              <button
                className="ml-2 text-red-500 hover:text-red-700"
                onClick={() =>
                  setSelectedNationalities(
                    selectedNationalities.filter((_, i) => i !== index)
                  )
                }
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NationalitySearchDropdown;
