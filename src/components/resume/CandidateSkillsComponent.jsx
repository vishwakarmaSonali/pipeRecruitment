import React from "react";
import "./index.css";

const CandidateSkillsComponent = ({ title, data }) => {
  return (
    <div className="display-column" style={{ gap: 12 }}>
      <p className="font-14-medium" style={{ fontWeight: 700 }}>
        Skills
      </p>
      <div className="divider-line" />
      <div className="display-flex" style={{ flexWrap: "wrap", gap: 6 }}>
        {data?.map((item) => {
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

export default CandidateSkillsComponent;
