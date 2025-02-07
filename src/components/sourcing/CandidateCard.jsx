import React, { useState } from "react";
import "./index.css";
import { profileImage } from "../../helpers/assets";
import { ReactComponent as UniversityIcon } from "../../assets/icons/university.svg";
import { ReactComponent as LocationIcon } from "../../assets/icons/location.svg";
import { ReactComponent as LinkedIn } from "../../assets/icons/linkedin.svg";
import { ReactComponent as EmailIcon } from "../../assets/icons/email.svg";
import { ReactComponent as WhatappIcon } from "../../assets/icons/whatsapp.svg";
import { ReactComponent as CallIcon } from "../../assets/icons/call.svg";
import { ReactComponent as Tick } from "../../assets/icons/sourcingIcons/tick.svg";

export const skills = [
  "Access",
  "Business Analysis",
  "Business Intelligence",
  "Business Intelligence Reporting",
  "Business Objects",
  "Business Requirements",
  "Crystal Reports",
  "Data Analysis",
  "Data Architecture",
  "Database Design",
  "Databases",
  "Data Cleaning",
  "Data Migration",
];

const CandidateCard = ({
  selectedCandidates,
  candidateData,
  selectCandidateClick,
  onClick,
  selectedCandidateId,
}) => {
  const [skillsShowAll, setSkillsShowAll] = useState(false);
  return (
    <div
      key={candidateData?.id}
      className={`sourcing-candidate-card ${
        candidateData?.id === selectedCandidateId && "selected-candidate-card"
      }`}
      onClick={onClick}
    >
      <div className="display-column" style={{ gap: 12 }}>
        <div className="display-flex align-center" style={{ gap: 8 }}>
          <div
            className={`candidate-card-checkbox`}
            onClick={selectCandidateClick}
          >
            {selectedCandidates.includes(candidateData?.id) && <Tick />}
          </div>
          <div className="candidate-card-profile-img">
            <img src={profileImage} alt="Profile" className="common-img" />
          </div>
          <div className="display-column" style={{ gap: 4 }}>
            <p className="font-16-medium color-dark-black">Anna Junglas</p>
            <p className="font-14-regular color-dark-black">
              Sr. UI UX Designer at Google Inc.
            </p>
          </div>
        </div>
        <div className="candidate-card-divider-line"></div>
        <div className="display-flex align-center" style={{ gap: 12 }}>
          <LocationIcon />
          <p className="font-16-regular color-dark-black">San Fransisco, CA</p>
        </div>
        <div className="display-flex align-center" style={{ gap: 12 }}>
          <UniversityIcon />
          <p className="font-16-regular color-dark-black">
            Rhode Island School of Design
          </p>
        </div>
        {skills && (
          <div className="display-flex" style={{ gap: 6, flexWrap: "wrap" }}>
            {[...skills]
              .splice(0, skillsShowAll ? skills?.length : 8)
              .map((item) => {
                return <div className="skill-more-btn">{item}</div>;
              })}
            {skills?.length > 8 && (
              <button
                className="skill-more-btn"
                onClick={() => setSkillsShowAll(!skillsShowAll)}
              >
                {skillsShowAll ? "Show less" : `+${skills?.length - 8} more`}
              </button>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <text className="font-12-regular color-grey">Contact information:</text>
        <div className="display-flex align-center" style={{ gap: 12 }}>
          <a href="#" className="social-link">
            <LinkedIn />
          </a>
          <a href="#" className="social-link">
            <EmailIcon />
          </a>
          <a href="#" className="social-link">
            <WhatappIcon />
          </a>
          <a href="#" className="social-link">
            <CallIcon />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
