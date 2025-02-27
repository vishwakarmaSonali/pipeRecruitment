import React, { useState } from "react";
import "./MergeCandidates.css";

const MergeCandidates = ({ candidate1, candidate2, onSave }) => {
  const rawData1 = candidate1.candidate.raw_data;
  const rawData2 = candidate2.candidate.raw_data;

  const fieldLabels = {
    first_name: "First Name",
    last_name: "Last Name",
    email: "Email",
    phone: "Phone Number",
    country_code: "Country Code",
    date_of_birth: "Date of Birth",
    gender: "Gender",
    nationality: "Nationality",
    location: "Location",
    current_salary: "Current Salary",
    expected_salary: "Expected Salary",
    skills: "Skills",
  };

  // Initialize selected data with default values from candidate1
  const [selectedData, setSelectedData] = useState({ ...rawData1 });

  // Function to format values (handle arrays like skills)
  const formatValue = (value) => {
    if (Array.isArray(value)) {
      return value.map((item) => item.name).join(", "); // Extract skill names
    }
    return value || "-"; // Show "-" if empty
  };

  // Handle Selection
  const handleSelection = (key, value) => {
    setSelectedData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="merge-container">
      <h2>Merge Profile</h2>
      <div className="merge-content">
  {Object.keys(fieldLabels).map((key) => (
    <React.Fragment key={key}>
      {/* Labels Column */}
      <div className="label-column">{fieldLabels[key]}</div>

      {/* Candidate 1 Column */}
      <div className="field-value">
        <div className="flex-1">
        <span>{formatValue(rawData1[key])}</span>
        </div>
        <div>
        <input
          type="radio"
          name={`merge_${key}`} // Use same name for both fields
          checked={selectedData[key] === rawData1[key]}
          onChange={() => handleSelection(key, rawData1[key])}
        />
        </div>
      </div>

      {/* Candidate 2 Column */}
      <div className="field-value">
        <div className="flex-1">
        <span>{formatValue(rawData2[key])}</span>
        </div>
        <div>
        <input
          type="radio"
          name={`merge_${key}`} // Use same name for both fields
          checked={selectedData[key] === rawData2[key]}
          onChange={() => handleSelection(key, rawData2[key])}
        />
        </div>
      </div>
    </React.Fragment>
  ))}
</div>


      <button onClick={() => onSave(selectedData)} className="save-button">
        Save Merged Profile
      </button>
    </div>
  );
};

export default MergeCandidates;
