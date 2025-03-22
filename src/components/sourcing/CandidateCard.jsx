import React, { useState } from "react";
import "./index.css";
import { profileImage, dummyUserImage } from "../../helpers/assets";
import { ReactComponent as UniversityIcon } from "../../assets/icons/university.svg";
import { ReactComponent as LocationIcon } from "../../assets/icons/location.svg";
import { ReactComponent as Tick } from "../../assets/icons/sourcingIcons/tick.svg";
import { icons, sourcingIcons } from "../../helpers/config";

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
  data,
  selectCandidateClick,
  onClick,
  selectedCandidateId,
}) => {
  const [skillsShowAll, setSkillsShowAll] = useState(false);
  const [validImageUrl, setValidImageUrl] = useState(true);

  return (
    <div
      key={data?._id}
      className={`sourcing-candidate-card ${
        data?._id === selectedCandidateId && "selected-candidate-card"
      }`}
      onClick={onClick}
    >
      <div className="display-column" style={{ gap: 12 }}>
        <div className="display-flex align-center" style={{ gap: 8 }}>
          <div
            className={`candidate-card-checkbox`}
            onClick={selectCandidateClick}
          >
            {selectedCandidates.includes(data?._id) && <Tick />}
          </div>
          <div className="candidate-card-profile-img">
            <img
              src={
                !!data?.photo_url && validImageUrl
                  ? data?.photo_url
                  : dummyUserImage
              }
              alt="Profile"
              className="common-img"
              onError={() => setValidImageUrl(false)}
            />
          </div>
          <div className="display-column" style={{ gap: 4 }}>
            {data?.first_name && (
              <p className="font-16-medium color-dark-black">
                {data?.first_name} {data?.last_name}
              </p>
            )}
            {data?.title && (
              <p className="font-14-regular color-dark-black truncate-text ">
                {data?.title}
              </p>
            )}
          </div>
        </div>
        <div className="candidate-card-divider-line"></div>
        {data?.location && (
          <div className="display-flex align-center" style={{ gap: 12 }}>
            <LocationIcon />
            <p className="font-16-regular color-dark-black truncate-text">
              {data?.location}
            </p>
          </div>
        )}
        {data?.qualification && (
          <div className="display-flex align-center" style={{ gap: 12 }}>
            <UniversityIcon />
            <p className="font-16-regular color-dark-black truncate-text">
              {data?.qualification}
            </p>
          </div>
        )}
        {data?.skills && (
          <div className="display-flex" style={{ gap: 6, flexWrap: "wrap" }}>
            {[...data?.skills]
              .splice(0, skillsShowAll ? data?.skills?.length : 8)
              .map((item) => {
                return <div className="skill-more-btn">{item?.name}</div>;
              })}
            {data?.skills?.length > 8 && (
              <button
                className="skill-more-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setSkillsShowAll(!skillsShowAll);
                }}
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
          {data?.social_links?.map((item, index) => {
            return (
              <a
                key={index}
                href={item?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                {sourcingIcons[item?.name]}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
