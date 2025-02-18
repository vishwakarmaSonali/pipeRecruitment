import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../components/filterModal/FilterModal.css"

const LocationSearchDropdown = ({ selectedLocations = [], setSelectedLocations , placeholder}) => {
  const [locationQuery, setLocationQuery] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  // Fetch location suggestions from API
  useEffect(() => {
    if (locationQuery.length > 1) {
      const fetchLocations = async () => {
        try {
          const response = await axios.get(
            `http://3.110.81.44/api/candidate_profiles/suggest/location?query=${locationQuery}`
          );
          console.log("Location API Response:", response?.data?.suggestions);
          
          // Ensure response is an array
          const suggestions = Array.isArray(response?.data?.suggestions)
            ? response.data.suggestions
            : [];

          setLocationSuggestions(suggestions);
          setShowLocationDropdown(true);
        } catch (error) {
          console.error("Error fetching locations:", error);
          setLocationSuggestions([]);
        }
      };

      fetchLocations();
    } else {
      setLocationSuggestions([]);
      setShowLocationDropdown(false);
    }
  }, [locationQuery]);

  // Handle location selection
  const handleSelectLocation = (location) => {
    if (!Array.isArray(selectedLocations)) {
      setSelectedLocations([]); // Ensure it's always an array
    }

    if (!selectedLocations.includes(location)) {
      setSelectedLocations([...selectedLocations, location]);
    }
    setLocationQuery("");
    setShowLocationDropdown(false);
  };

  // Remove selected location
  const removeLocation = (index) => {
    setSelectedLocations(selectedLocations.filter((_, i) => i !== index));
  };

  return (
    <div className="relative w-full min-h-[38px]">
     <div className="border-1 rounded-[8px]">
     <input
        type="text"
        placeholder={placeholder}
        className="filter-input"
        value={locationQuery}
        onChange={(e) => setLocationQuery(e.target.value)}
        onFocus={() => setShowLocationDropdown(true)}
      />

     </div>
      {/* Location Suggestions Dropdown */}
      {showLocationDropdown && locationSuggestions.length > 0 && (
            <div className="absolute left-0 z-50 flex flex-col  bg-white border border-borderGrey rounded-lg shadow-lg min-h-40 flex-1 w-full overflow-auto text-sm">
          {locationSuggestions.map((location, index) => (
            <div
              key={index}
              className="px-2 py-2 flex  gap-2 hover:bg-customGrey1 cursor-pointer"
              onClick={() => handleSelectLocation(location)}
            >
              {location}
            </div>
          ))}
        </div>
      )}

      {/* Selected Locations List */}
      {Array.isArray(selectedLocations) && selectedLocations.length > 0 && (
        <div className="inputItemsDiv mt-2 flex flex-wrap">
          {selectedLocations.map((location, index) => (
            <div key={index} className="inputed-item">
              {location}
              <button
                className="ml-2 text-customBlue"
                onClick={() => removeLocation(index)}
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

export default LocationSearchDropdown;
