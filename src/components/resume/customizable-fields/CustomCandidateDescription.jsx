import React, { useState } from "react";
import "./index.css";
import HtmlViewComponent from "../../common/HtmlViewComponent";
import CommonSwitch from "../../common/CommonSwitch";

const CustomCandidateDescription = ({
  setDescription,
  description,
  on,
  onToggle,
}) => {
  return (
    <div className="candidate-details-main-container">
      <div className="display-flex-justify align-center">
        <div className="display-flex align-center" style={{ gap: 12 }}>
          <h3 className="font-16-medium color-dark-black text-uppercase">
            Candidate Description
          </h3>
        </div>
        <CommonSwitch on={on} onToggle={onToggle} />
      </div>

      <div className="divider-line" />

      <div className="flex-1">
        <HtmlViewComponent
          value={description}
          onChange={setDescription}
          placeholder={"Add Description"}
        />
      </div>
    </div>
  );
};

export default CustomCandidateDescription;
