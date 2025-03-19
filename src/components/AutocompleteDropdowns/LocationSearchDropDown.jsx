import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../components/filterModal/FilterModal.css";
import { BASE_URL,locationAutoCompleteSourceEndpoint} from "../../helpers/apiConfig";
import { useSelector } from "react-redux";
import axiosInstance from "../../actions/axiosInstance";
const LocationSearchDropdown = ({
  selectedLocations = [],
  setSelectedLocations,
  placeholder,
  multipleSelect = false,
}) => {
  const dropdownRef = useRef(null);
  const [locationQuery, setLocationQuery] = useState(
    selectedLocations?.length > 0 && !multipleSelect ? selectedLocations : ""
  );
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const debounceTimeout = useRef(null);
  const isFetching = useRef(false); // Prevents duplicate API calls
  const disableFetch = useRef(false); // Prevents API calls after selection
const {token,refreshToken} = useSelector((state)=>state?.auth)
  // Fetch location suggestions from API (debounced)
  useEffect(() => {
    if (disableFetch.current) {
      disableFetch.current = false; // Reset flag after skipping one update
      return;
    }

    if (locationQuery.length > 1) {
      clearTimeout(debounceTimeout.current);
      debounceTimeout.current = setTimeout(async () => {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
           "x-refresh-token": refreshToken || "",
          },
         
        };
        isFetching.current = true; // Mark as fetching to prevent duplicate calls
        try {
          const response = await axiosInstance.get(
            `${BASE_URL}${locationAutoCompleteSourceEndpoint}?query=${locationQuery}`,
           config
          );
          console.log("Location API Response:", response?.data?.suggestions);

          const suggestions = Array.isArray(response?.data?.suggestions)
            ? response.data.suggestions
            : [];

          setLocationSuggestions(suggestions);
          setShowLocationDropdown(true);
        } catch (error) {
          console.error("Error fetching locations:", error);
          setLocationSuggestions([]);
        } finally {
          isFetching.current = false; // Reset flag
        }
      }, 500); // Debounce delay
    } else {
      setLocationSuggestions([]);
      setShowLocationDropdown(false);
    }

    return () => clearTimeout(debounceTimeout.current); // Cleanup timeout
  }, [locationQuery]); // Only trigger when user types

  // Handle location selection
  const handleSelectLocation = (location) => {
    disableFetch.current = true; // Prevent API call after selection
    setLocationQuery(""); // Clear input
    if (multipleSelect) {
      if (!selectedLocations.includes(location)) {
        setSelectedLocations([...selectedLocations, location]);
      }
    } else {
      setSelectedLocations([location]); // Store as a single selection
      setLocationQuery(location); // Show selected item in input
    }

    setShowLocationDropdown(false); // Close dropdown after selection
  };

  // Handle clearing input
  const clearLocation = () => {
    setSelectedLocations([]); // Clear state
    setLocationQuery(""); // Clear input
    setShowLocationDropdown(false); // Close dropdown
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLocationDropdown(false);
      }
    };

    if (showLocationDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLocationDropdown]);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <input
        type="text"
        placeholder={placeholder}
        className="common-input"
        value={multipleSelect ? locationQuery : locationQuery}
        onChange={(e) => setLocationQuery(e.target.value)}
        onFocus={() => setShowLocationDropdown(true)}
      />

      {showLocationDropdown && locationSuggestions.length > 0 && (
        <div
          className="dropdown-container"
          onMouseDown={(e) => e.preventDefault()} // Prevent input blur when clicking dropdown
        >
          {locationSuggestions.map((location, index) => (
            <div
              key={index}
              className="normal-list-item-div"
              onClick={() => handleSelectLocation(location)}
            >
              <p className="font-12-regular color-dark-black">{location}</p>
            </div>
          ))}
        </div>
      )}

      {multipleSelect && selectedLocations.length > 0 && (
        <div className="inputItemsDiv mt-2 flex flex-wrap">
          {selectedLocations.map((location, index) => (
            <div key={index} className="inputed-item">
              {location}
              <button
                className="ml-2 text-customBlue"
                onClick={() =>
                  setSelectedLocations(
                    selectedLocations.filter((_, i) => i !== index)
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

export default LocationSearchDropdown;
