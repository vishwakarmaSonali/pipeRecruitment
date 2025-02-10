import React, { useState } from "react";

const CandidateDetails = ({ details, label }) => {
  const [fields, setFields] = useState(details);
  const [editField, setEditField] = useState(null);
  const [tempValue, setTempValue] = useState("");

  const handleEdit = (key, value) => {
    setEditField(key);
    setTempValue(value);
  };

  const handleSave = (key) => {
    setFields({ ...fields, [key]: tempValue });
    setEditField(null);
  };

  return (
    <div className="candidate-details-main-container">
      <h3 className="font-16-medium color-dark-black text-uppercase">
        {label}
      </h3>
      <div className="divider-line" />
      <div className="details-container">
        {Object.entries(fields).map(([key, value]) => (
          <div key={key} className="detail-row">
            <p className="font-14-medium color-dark-black flex-1">{key}:</p>
            {editField === key ? (
              <div className="display-flex align-center flex-1">
                <input
                  type="text"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="edit-input"
                />
                <button onClick={() => handleSave(key)}>Save</button>
              </div>
            ) : (
              <div className="flex-1 display-flex-justify align-center">
                {!!value ? (
                  <div className="flex-1 display-flex-justify align-center">
                    <span className="font-14-regular color-dark-blak ">
                      {value}
                    </span>
                    <button
                      className="edit-details-btn"
                      onClick={() => handleEdit(key, value)}
                    >
                      Edit
                    </button>
                  </div>
                ) : (
                  <button
                    className="add-details-btn"
                    onClick={() => handleEdit(key, "")}
                  >
                    + Add
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateDetails;
