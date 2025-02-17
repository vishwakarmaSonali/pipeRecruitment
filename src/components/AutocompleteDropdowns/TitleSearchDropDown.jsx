import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../components/filterModal/FilterModal.css"

const TitleSearchDropdown = ({ selectedTitles = [], setSelectedTitles }) => {
  const [titleQuery, setTitleQuery] = useState("");
  const [titleSuggestions, setTitleSuggestions] = useState([]);
  const [showTitleDropdown, setShowTitleDropdown] = useState(false);

  // Fetch title suggestions from API
  useEffect(() => {
    if (titleQuery.length > 1) {
      const fetchTitles = async () => {
        try {
          const response = await axios.get(
            `http://3.110.81.44/api/candidate_profiles/suggest/title?query=${titleQuery}`
          );
          console.log("Title API Response:", response?.data?.suggestions);

          // Ensure response is an array
          const suggestions = Array.isArray(response?.data?.suggestions)
            ? response.data.suggestions
            : [];

          setTitleSuggestions(suggestions);
          setShowTitleDropdown(true);
        } catch (error) {
          console.error("Error fetching titles:", error);
          setTitleSuggestions([]);
        }
      };

      fetchTitles();
    } else {
      setTitleSuggestions([]);
      setShowTitleDropdown(false);
    }
  }, [titleQuery]);

  // Handle title selection
  const handleSelectTitle = (title) => {
    if (!Array.isArray(selectedTitles)) {
      setSelectedTitles([]); // Ensure it's always an array
    }

    if (!selectedTitles.includes(title)) {
      setSelectedTitles([...selectedTitles, title]);
    }
    setTitleQuery("");
    setShowTitleDropdown(false);
  };

  // Remove selected title
  const removeTitle = (index) => {
    setSelectedTitles(selectedTitles.filter((_, i) => i !== index));
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Job Title"
        className="filter-input"
        value={titleQuery}
        onChange={(e) => setTitleQuery(e.target.value)}
        onFocus={() => setShowTitleDropdown(true)}
      />

      {/* Title Suggestions Dropdown */}
      {showTitleDropdown && titleSuggestions.length > 0 && (
            <div className=" left-0 w-[405px] flex flex-col  bg-white border border-borderGrey rounded-lg shadow-lg min-h-40 max-h-[460px] overflow-auto z-50 text-sm">
          {titleSuggestions.map((title, index) => (
            <div
              key={index}
              className="px-2 py-2 flex  gap-2 hover:bg-customGrey1 cursor-pointer"
              onClick={() => handleSelectTitle(title)}
            >
              {title}
            </div>
          ))}
        </div>
      )}

      {/* Selected Titles List */}
      {Array.isArray(selectedTitles) && selectedTitles.length > 0 && (
        <div className="inputItemsDiv mt-2 flex flex-wrap">
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
