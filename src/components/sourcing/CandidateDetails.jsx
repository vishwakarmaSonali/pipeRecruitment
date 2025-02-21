import React, { useState } from "react";
import "./index.css";
import { profileImage, dummyUserImage } from "../../helpers/assets";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { ReactComponent as ProfileAdd } from "../../assets/icons/sourcingIcons/profile-add.svg";
import { ReactComponent as JobIcon } from "../../assets/icons/sourcingIcons/briefcase.svg";
import { ReactComponent as FolderAdd } from "../../assets/icons/sourcingIcons/folder-add.svg";
import { ReactComponent as Download } from "../../assets/icons/sourcingIcons/download.svg";
import { skills } from "./CandidateCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const languages = ["English", "Mandarin", "Spanish"];

export const experienceData = [
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
export const educationData = [
  {
    url: "https://www.linkedin.com/school/university-of-leicester/",
    degree: "Bsc",
    faculty: "Physics with Astrophysics",
    endedYear: 1995,
    university: "University of Leicester",
    startedYear: 1992,
  },
];

const CandidateDetails = ({
  data,
  loading,
  onClickAddJob,
  onClickAddFolder,
}) => {
  const [validImageUrl, setValidImageUrl] = useState(true);

  if (loading) {
    return (
      <div className="candidate-details-card">
        <div className="display-flex-justify align-center">
          <div className="display-flex align-center" style={{ gap: 8 }}>
            <div className="candidate-card-profile-img">
              <Skeleton circle width={"100%"} height={"100%"} />
            </div>
            <div className="display-column" style={{ gap: 4 }}>
              <Skeleton width={100} height={16} />
              <Skeleton width={300} height={14} />
            </div>
          </div>
          <div className="display-flex" style={{ gap: 12 }}>
            <Skeleton width={20} height={20} />
            <Skeleton width={20} height={20} />
            <Skeleton width={20} height={20} />
            <Skeleton width={20} height={20} />
          </div>
        </div>
        <div className="display-column" style={{ gap: 10 }}>
          <Skeleton width={100} height={16} />
          <Skeleton width={"100%"} height={50} />
        </div>
        <div className="divider-line" />
        <div className="display-column" style={{ gap: 10 }}>
          <Skeleton width={100} height={16} />
          <Skeleton width={"100%"} height={100} />
        </div>
        <div className="divider-line" />
        <div className="display-flex" style={{ gap: 12 }}>
          <div className="display-column flex-1" style={{ gap: 10 }}>
            <Skeleton width={100} height={16} />
            <Skeleton width={"100%"} height={200} />
          </div>

          <div className="display-column flex-1" style={{ gap: 10 }}>
            <Skeleton width={100} height={16} />
            <Skeleton width={"100%"} height={200} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="candidate-details-card">
      <div className="display-flex-justify align-center">
        <div className="display-flex align-center" style={{ gap: 8 }}>
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
              <p className="font-14-regular color-dark-black">{data?.title}</p>
            )}
          </div>
        </div>
        <div className="display-flex" style={{ gap: 12 }}>
          <Tooltip title="Add to candidate">
            <button>
              <ProfileAdd />
            </button>
          </Tooltip>
          <Tooltip title="Add to Job">
            <button onClick={onClickAddJob}>
              <JobIcon />
            </button>
          </Tooltip>
          <Tooltip title="Add to Folder" onClick={onClickAddFolder}>
            <button>
              <FolderAdd stroke="#151B23"/>
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
          {data?.location && (
            <div className="display-flex">
              <p className="font-14-medium color-dark-black flex-1">
                Location:
              </p>
              <p className="font-14-regular color-dark-black flex-1">
                {data?.location}
              </p>
            </div>
          )}
          {data?.email && (
            <div className="display-flex">
              <p className="font-14-medium color-dark-black flex-1">Email:</p>
              <a
                href={`mailto:${data?.email}`}
                className="font-14-regular color-dark-black flex-1"
                target="_blank"
              >
                {data?.email}
              </a>
            </div>
          )}
          {data?.phone && (
            <div className="display-flex">
              <p className="font-14-medium color-dark-black flex-1">
                Phone Number:
              </p>
              <p className="font-14-regular color-dark-black flex-1">
                {data?.phone}
              </p>
            </div>
          )}
          {data?.linkedin_url && (
            <div className="display-flex">
              <p className="font-14-medium color-dark-black flex-1">
                Linked In:
              </p>
              <a
                href={data?.linkedin_url}
                className="font-14-regular color-dark-black flex-1"
                target="_blank"
              >
                {data?.linkedin_url}
              </a>
            </div>
          )}
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
        {data?.employment_history && (
          <div className="display-column flex-1" style={{ gap: 10 }}>
            <p className="font-16-medium color-dark-black text-uppercase ">
              Experience
            </p>
            <div className="display-column" style={{ gap: 16 }}>
              {data?.employment_history?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="display-column"
                    style={{ gap: 8 }}
                  >
                    {item?.title && (
                      <p className="font-14-medium color-dark-black">
                        {item?.title} at {item?.organization_name}
                      </p>
                    )}
                    {item?.location && (
                      <p className="font-14-regular color-dark-black">
                        {item?.location}
                      </p>
                    )}
                    <p className="font-14-regular color-grey">
                      {item?.start_date} -{" "}
                      {item?.end_date ? item?.end_date : "Present"}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
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
