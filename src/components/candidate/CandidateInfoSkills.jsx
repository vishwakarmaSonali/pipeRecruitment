import React from "react";
import "./index.css";

const CandidateInfoSkills = ({ skillData }) => {
  return (
    <div className="candidate-details-main-container">
      <div className="display-flex-justify align-center">
        <h3 className="font-16-medium color-dark-black text-uppercase">
          skills
        </h3>
        <button className="add-details-btn">+ Add</button>
      </div>
      <div className="divider-line" />
      <div className="display-flex" style={{ flexWrap: "wrap", gap: 6 }}>
        {skillData?.map((item) => {
          return (
            <div className="candidate-info-skill-item">
              {item?.name}{" "}
              <span style={{ color: "#1761D8" }}>{item?.rating}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CandidateInfoSkills;
