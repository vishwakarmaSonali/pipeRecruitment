import React from "react";
import "./index.css";
import { profileImage } from "../../helpers/assets";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { ReactComponent as ProfileAdd } from "../../assets/icons/sourcingIcons/profile-add.svg";
import { ReactComponent as JobIcon } from "../../assets/icons/sourcingIcons/briefcase.svg";
import { ReactComponent as FolderAdd } from "../../assets/icons/sourcingIcons/folder-add.svg";
import { ReactComponent as Download } from "../../assets/icons/sourcingIcons/download.svg";
import { skills } from "./CandidateCard";

const languages = ["English", "Mandarin", "Spanish"];

const experienceData = [
  {
    ended: "2023-12-01T00:00:00+0000",
    company: "Bible Society",
    started: "2023-09-01T00:00:00+0000",
    summary: "Identified and resolved issues with a previous data migration.",
    website: "http://biblesociety.org.uk",
    industry: "Nonprofit Organization Management",
    location: "Swindon, England, United Kingdom",
    position: "SQL Developer",
    companyUrl: "https://www.linkedin.com/company/bible-society",
    staffCount: 535,
    companySize: "100-200",
  },
  {
    ended: "2022-09-01T00:00:00+0000",
    company: "Horning Advisory",
    started: "2019-05-01T00:00:00+0000",
    location: "London, England, United Kingdom",
    position: "Information Technology Consultant",
  },
  {
    ended: "2019-05-01T00:00:00+0000",
    company: "ENGINE UK",
    started: "2019-01-01T00:00:00+0000",
    website: "http://www.enginegroup.com",
    industry: "Marketing and Advertising",
    location: "London, United Kingdom",
    position: "Operations Development",
    companyUrl: "https://www.linkedin.com/company/engine-uk",
    staffCount: 403,
    companySize: "1000-5000",
  },
];
const educationData = [
  {
    url: "https://www.linkedin.com/school/university-of-leicester/",
    degree: "Bsc",
    faculty: "Physics with Astrophysics",
    endedYear: 1995,
    university: "University of Leicester",
    startedYear: 1992,
  },
];

const CandidateDetails = ({ data }) => {
  return (
    <div className="candidate-details-card">
      <div className="display-flex-justify align-center">
        <div className="display-flex align-center" style={{ gap: 8 }}>
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
        <div className="display-flex" style={{ gap: 12 }}>
          <Tooltip title="Add to candidate">
            <button>
              <ProfileAdd />
            </button>
          </Tooltip>
          <Tooltip title="Add to Job">
            <button>
              <JobIcon />
            </button>
          </Tooltip>
          <Tooltip title="Add to Folder">
            <button>
              <FolderAdd />
            </button>
          </Tooltip>
          <Tooltip title="Download resume">
            <button>
              <Download />
            </button>
          </Tooltip>
        </div>
      </div>
      <div className="display-column" style={{ gap: 10 }}>
        <p className="font-16-medium color-dark-black text-uppercase ">
          SKILLS
        </p>
        <div className="display-flex" style={{ gap: 6, flexWrap: "wrap" }}>
          {skills?.map((item, index) => {
            return (
              <div key={index} className="skill-more-btn">
                {item}
              </div>
            );
          })}
        </div>
      </div>
      <div className="divider-line" />
      <div className="display-column" style={{ gap: 10 }}>
        <p className="font-16-medium color-dark-black text-uppercase ">
          Personal Details
        </p>
        <div className="display-column" style={{ gap: 8 }}>
          <div className="display-flex">
            <p className="font-14-medium color-dark-black flex-1">Location:</p>
            <p className="font-14-regular color-dark-black flex-1">
              San Francisco, CA
            </p>
          </div>
          <div className="display-flex">
            <p className="font-14-medium color-dark-black flex-1">Email:</p>
            <p className="font-14-regular color-dark-black flex-1">
              joanna.chou@example.com
            </p>
          </div>
          <div className="display-flex">
            <p className="font-14-medium color-dark-black flex-1">
              Phone Number:
            </p>
            <p className="font-14-regular color-dark-black flex-1">
              +1-415-123-4567
            </p>
          </div>
          <div className="display-flex">
            <p className="font-14-medium color-dark-black flex-1">Linked In:</p>
            <a href="#" className="font-14-regular color-dark-black flex-1">
              linkedin.com/in/joannachou
            </a>
          </div>
          <div className="display-flex">
            <p className="font-14-medium color-dark-black flex-1">Languages:</p>
            <div
              className="flex-1 display-flex"
              style={{ flexWrap: "wrap", gap: 6 }}
            >
              {languages?.map((item, index) => {
                return (
                  <div key={index} className="skill-more-btn">
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="divider-line" />
      <div className="display-flex" style={{ gap: 12 }}>
        <div className="display-column flex-1" style={{ gap: 10 }}>
          <p className="font-16-medium color-dark-black text-uppercase ">
            Experience
          </p>
          <div className="display-column" style={{ gap: 16 }}>
            {experienceData?.map((item, index) => {
              return (
                <div key={index} className="display-column" style={{ gap: 8 }}>
                  <p className="font-14-medium color-dark-black">
                    {item?.position} at {item?.company}
                  </p>
                  {item?.location && (
                    <p className="font-14-regular color-dark-black">
                      {item?.location}
                    </p>
                  )}
                  <p className="font-14-regular color-grey">
                    {item?.started} - {item?.ended}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="display-column flex-1" style={{ gap: 10 }}>
          <p className="font-16-medium color-dark-black text-uppercase">
            Education
          </p>
          <div className="display-column" style={{ gap: 16 }}>
            {educationData?.map((item, index) => {
              return (
                <div key={index} className="display-column" style={{ gap: 8 }}>
                  <p className="font-14-medium color-dark-black">
                    {item?.degree} in {item?.faculty}
                  </p>
                  {item?.university && (
                    <p className="font-14-regular color-dark-black">
                      {item?.university}
                    </p>
                  )}
                  <p className="font-14-regular color-grey">
                    {item?.startedYear} - {item?.endedYear}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetails;
