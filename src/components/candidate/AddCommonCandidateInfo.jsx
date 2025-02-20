import React, { useState } from "react";
import "./index.css";
import { ReactComponent as ArrowIcon } from "../../assets/icons/arrowDown.svg";

const AddCommonCandidateInfo = ({ label }) => {
  const [collapse, setCollapse] = useState(true);
  return (
    <div className="candidate-details-main-container">
      <div className="display-flex align-center" style={{ gap: 12 }}>
        <h3 className="font-16-medium color-dark-black text-uppercase">
          {label}
        </h3>
        <button
          className={`${
            collapse ? "arrow-icon-btn-collpase" : "arrow-icon-btn"
          }`}
          onClick={() => setCollapse(!collapse)}
        >
          <ArrowIcon />
        </button>
      </div>
      {collapse && (
        <>
          <div className="divider-line" />
          <div className="details-container">
            <button className="add-details-btn">+ Add</button>
          </div>
        </>
      )}
    </div>
  );
};

export default AddCommonCandidateInfo;
