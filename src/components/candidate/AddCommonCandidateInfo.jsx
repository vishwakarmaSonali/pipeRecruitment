import React from "react";
import "./index.css";

const AddCommonCandidateInfo = ({ label }) => {
  return (
    <div className="candidate-details-main-container">
      <h3 className="font-16-medium color-dark-black text-uppercase">
        {label}
      </h3>
      <div className="divider-line" />
      <div className="details-container">
        <button className="add-details-btn">+ Add</button>
      </div>
    </div>
  );
};

export default AddCommonCandidateInfo;
