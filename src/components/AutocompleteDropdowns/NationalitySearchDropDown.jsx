import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../components/filterModal/FilterModal.css";

const NationalitySearchDropdown = ({ 
  selectedNationalities = [], 
  setSelectedNationalities, 
  placeholder, 
  multipleSelect = true 
}) => {
  const [nationalityQuery, setNationalityQuery] = useState("");
  const [nationalitySuggestions, setNationalitySuggestions] = useState([]);
  const [showNationalityDropdown, setShowNationalityDropdown] = useState(false);
console.log("selectedNationalitiesselectedNationalitiesselectedNationalities",selectedNationalities);

  // Fetch location suggestions from API
  useEffect(() => {
    if (nationalityQuery.length > 1) {
      const fetchLocations = async () => {
        try {
          const response = await axios.get(
            `http://3.110.81.44/api/candidate-profiles/suggest/location?query=${nationalityQuery}`
          );
          console.log("Location API Response:", response?.data?.suggestions);
          
          const suggestions = Array.isArray(response?.data?.suggestions)
            ? response.data.suggestions
            : [];

          setNationalitySuggestions(suggestions);
          setShowNationalityDropdown(true);
        } catch (error) {
          console.error("Error fetching locations:", error);
          setNationalitySuggestions([]);
        }
      };

      fetchLocations();
    } else {
      setNationalitySuggestions([]);
      setShowNationalityDropdown(false);
    }
  }, [nationalityQuery]);

  // Handle location selection
  const handleSelectLocation = (location) => {
    if (!Array.isArray(selectedNationalities)) {
      setSelectedNationalities([]); 
    }

    if (multipleSelect) {
      // Multiple selection enabled: add to the list
      if (!selectedNationalities.includes(location)) {
        setSelectedNationalities([...selectedNationalities, location]);
      }
    } else {
      // Single selection: replace existing value
      setSelectedNationalities([location]);
      setNationalityQuery(location);
    }

    setShowNationalityDropdown(false);
  };

  // Remove selected location (only for multiple selection)
  const removeNationality = (index) => {
    setSelectedNationalities(selectedNationalities.filter((_, i) => i !== index));
  };

  return (
    <div className="relative w-full min-h-[38px]">
      <div className="border border-customGrey1 rounded-[8px] ">
        {/* Conditionally show either input or selected value */}
        <input
          type="text"
          placeholder={placeholder}
          className="filter-input w-full"
          value={multipleSelect ? nationalityQuery : selectedNationalities[0] || nationalityQuery}
          onChange={(e) => setNationalityQuery(e.target.value)}
          onFocus={() => setShowNationalityDropdown(true)}
          readOnly={!multipleSelect} // Prevent typing if single select
        />
      </div>

      {/* Location Suggestions Dropdown */}
      {showNationalityDropdown && nationalitySuggestions.length > 0 && (
        <div className="absolute left-0  disply-flex flex-1 w-full mt-1 flex-col bg-white border border-borderGrey rounded-[8px] min-h-40 max-h-[460px] overflow-auto z-50 text-sm">
          {nationalitySuggestions.map((location, index) => (
            <div
              key={index}
              className="px-2 py-2 flex gap-2 hover:bg-customGrey1 cursor-pointer"
              onClick={() => handleSelectLocation(location)}
            >
              {location}
            </div>
          ))}
        </div>
      )}

      {/* Selected Locations List (Only for Multiple Select) */}
      {multipleSelect && Array.isArray(selectedNationalities) && selectedNationalities.length > 0 && (
        <div className="inputItemsDiv mt-2 flex flex-wrap">
          {selectedNationalities.map((location, index) => (
            <div key={index} className="inputed-item flex items-center px-2 py-1 border rounded-md">
              {location}
              <button
                className="ml-2 text-red-500 hover:text-red-700"
                onClick={() => removeNationality(index)}
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
