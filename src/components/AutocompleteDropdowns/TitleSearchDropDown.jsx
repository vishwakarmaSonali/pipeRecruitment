import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../components/filterModal/FilterModal.css";
import { ReactComponent as DropArrow } from "../../assets/icons/arrowDown.svg";
import { BASE_URL, sourceTitleDropdown } from "../../helpers/apiConfig";
import { useSelector } from "react-redux";

const TitleSearchDropdown = ({
  selectedTitles = [],
  setSelectedTitles,
  allowMultiple = true, // Single or Multiple selection
  showIcon = false,
}) => {
  const [titleQuery, setTitleQuery] = useState("");
  const [titleSuggestions, setTitleSuggestions] = useState([]);
  const [showTitleDropdown, setShowTitleDropdown] = useState(false);
  // Fetch title suggestions from API when the user types
  const { token,refreshToken } = useSelector((state) => state?.auth);

  useEffect(() => {
    // ✅ Retrieve token properly
    console.log("Retrieved Token:", token);
  
    if (!token) {
      console.error("❌ Token is missing! API call will not be made.");
      return; // Stop execution if no token
    }
  
    if (titleQuery.length > 1) {
      const fetchTitles = async () => {
        try {
          // ✅ Ensure token is a valid string
          const authToken = token?.trim();
         const  token1 = `Bearer ${authToken}`

          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
              "x-refresh-token": refreshToken || "",
          
            },
          };
  
          console.log("Fetching titles with token:", `Bearer ${authToken}`);
  
          const response = await axios.get(
            `${BASE_URL}${sourceTitleDropdown}?query=${encodeURIComponent(titleQuery)}`,
            config
          );
  
          console.log("Title API Response:", response?.data?.suggestions);
  
          // ✅ Ensure response is an array
          const suggestions = Array.isArray(response?.data?.suggestions)
            ? response.data.suggestions
            : [];
  
          setTitleSuggestions(suggestions);
          setShowTitleDropdown(true);
        } catch (error) {
          console.error("❌ Error fetching titles:", error.response?.data || error.message);
          setTitleSuggestions([]);
        }
      };
  
      fetchTitles();
    } else {
      setTitleSuggestions([]);
      setShowTitleDropdown(false);
    }
  }, [titleQuery]); // ✅ Removed unnecessary dependencies to prevent unwanted re-renders
  

  // Handle title selection
  const handleSelectTitle = (title) => {
    if (!allowMultiple) {
      // Single Selection Mode
      setSelectedTitles([title]);
      setTitleQuery(title); // Display the selected title in the input
    } else {
      // Multiple Selection Mode
      if (!selectedTitles.includes(title)) {
        setSelectedTitles([...selectedTitles, title]);
      }
      setTitleQuery(""); // Clear input for the next selection
    }

    setShowTitleDropdown(false);
  };

  // Remove selected title (only in multiple selection mode)
  const removeTitle = (index) => {
    setSelectedTitles(selectedTitles.filter((_, i) => i !== index));
  };

  return (
    <div className="relative  ">
      <div className="filter-input " style={{ border: "1px solid #f3f4f4" }}>
        <input
          type="text"
          placeholder="Job Title"
          className="border-none outline-none px-2 "
          value={
            !allowMultiple && selectedTitles.length > 0
              ? selectedTitles[0]
              : titleQuery
          }
          onChange={(e) => {
            setTitleQuery(e.target.value);
            if (!allowMultiple) setSelectedTitles([]); // Allow retyping in single mode
          }}
          onFocus={() => setShowTitleDropdown(true)}
        />
        {showIcon && <DropArrow />}
      </div>
      {/* Title Suggestions Dropdown */}
      {showTitleDropdown && titleSuggestions.length > 0 && (
        <div className="flex flex-col  bg-white border border-customGrey1 rounded-lg shadow-sm max-h-[460px] overflow-auto z-50 text-sm">
          {titleSuggestions.map((title, index) => (
            <div
              key={index}
              className="px-2 py-2 flex  gap-2 hover:bg-blueBg cursor-pointer"
              onClick={() => handleSelectTitle(title)}
            >
              {title}
            </div>
          ))}
        </div>
      )}

      {/* Selected Titles List (Only for Multiple Selection Mode) */}
      {allowMultiple && selectedTitles.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2 max-h-40">
          {selectedTitles.map((title, index) => (
            <div key={index} className="inputed-item">
              {title}
              <button
                className="ml-2 text-customBlue"
                onClick={() => removeTitle(index)}
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

export default TitleSearchDropdown;
