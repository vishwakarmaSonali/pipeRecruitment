import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../components/filterModal/FilterModal.css"
const SkillSearchDropdown = ({ selectedSkills = [], setSelectedSkills }) => {
  const [skillQuery, setSkillQuery] = useState("");
  const [skillSuggestions, setSkillSuggestions] = useState([]);
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);

  // Fetch skill suggestions from API
  useEffect(() => {
    if (skillQuery.length > 1) {
      const fetchSkills = async () => {
        try {
          const response = await axios.get(
            `http://3.110.81.44/api/candidate_profiles/suggest/skills?query=${skillQuery}`
          );
          console.log("Skill API Response:", response?.data?.suggestions);
          
          // Ensure the API response is an array
          const suggestions = Array.isArray(response?.data?.suggestions)
            ? response.data.suggestions
            : [];

          setSkillSuggestions(suggestions);
          setShowSkillDropdown(true);
        } catch (error) {
          console.error("Error fetching skills:", error);
          setSkillSuggestions([]);
        }
      };

      fetchSkills();
    } else {
      setSkillSuggestions([]);
      setShowSkillDropdown(false);
    }
  }, [skillQuery]);

  // Handle skill selection
  const handleSelectSkill = (skill) => {
    if (!Array.isArray(selectedSkills)) {
      setSelectedSkills([]); // Ensure it's always an array
    }

    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
    setSkillQuery("");
    setShowSkillDropdown(false);
  };

  // Remove selected skill
  const removeSkill = (index) => {
    setSelectedSkills(selectedSkills.filter((_, i) => i !== index));
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Skills"
        className="filter-input"
        value={skillQuery}
        onChange={(e) => setSkillQuery(e.target.value)}
        onFocus={() => setShowSkillDropdown(true)}
      />

      {/* Skill Suggestions Dropdown */}
      {showSkillDropdown && skillSuggestions.length > 0 && (
            <div className=" left-0 w-[405px] flex flex-col  bg-white border border-borderGrey rounded-lg shadow-lg min-h-40 max-h-[460px] overflow-auto z-50 text-sm">
          {skillSuggestions.map((skill, index) => (
            <div
              key={index}
               className="px-2 py-2 flex  gap-2 hover:bg-customGrey1 cursor-pointer"
              onClick={() => handleSelectSkill(skill)}
            >
              {skill}
            </div>
          ))}
        </div>
      )}

      {/* Selected Skills List */}
      {Array.isArray(selectedSkills) && selectedSkills.length > 0 && (
        <div className="inputItemsDiv mt-2 flex flex-wrap">
          {selectedSkills.map((skill, index) => (
            <div key={index} className="inputed-item">
              {skill}
              <button
                className="ml-2 text-customBlue"
                onClick={() => removeSkill(index)}
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

export default SkillSearchDropdown;
