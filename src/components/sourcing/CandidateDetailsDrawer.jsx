import React from "react";
import { Drawer } from "@mui/material";
import { profileImage } from "../../helpers/assets";
import { ReactComponent as CloseIcon } from "../../assets/icons/drawerClose.svg";
import { ReactComponent as ProfileAdd } from "../../assets/icons/sourcingIcons/profile-add.svg";
import { ReactComponent as JobIcon } from "../../assets/icons/sourcingIcons/briefcase.svg";
import { ReactComponent as FolderAdd } from "../../assets/icons/sourcingIcons/folder-add.svg";
import { ReactComponent as Download } from "../../assets/icons/sourcingIcons/download.svg";
import Tooltip from "@mui/material/Tooltip";
import { skills } from "./CandidateCard";
import { educationData, experienceData, languages } from "./CandidateDetails";

const CandidateDetailsDrawer = ({ visible, onClose, data }) => {
  return (
    <Drawer anchor="right" open={visible} onClose={onClose}>
      <div
        role="presentation"
        onKeyDown={onClose}
        className="candidate-details-drawer"
      >
        <div className="candidate-details-drawer-container">
          <div className="display-flex-justify align-center position-sticy-drawer-header">
            <p className="font-24-medium color-dark-black">Candidate Details</p>
            <button onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
          <div className="candidate-details-inner-section-drawer">
            <div className="display-flex-justify align-center">
              <div className="display-flex align-center" style={{ gap: 8 }}>
                <div className="candidate-details-drawer-profile">
                  <img src={profileImage} className="common-img" />
                </div>
                <p className="font-20-medium">Joanna Chou</p>
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
            <div className="candidate-details-drawer-common-div">
              <p className="font-16-medium color-dark-black text-uppercase">
                Skills
              </p>
              <div
                className="display-flex"
                style={{ gap: 6, flexWrap: "wrap" }}
              >
                {skills?.map((item, index) => {
                  return (
                    <div key={index} className="skill-more-btn">
                      {item}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="candidate-details-drawer-common-div">
              <p className="font-16-medium color-dark-black text-uppercase">
                Personal Details
              </p>
              <div className="divider-line" />
              <div className="display-column" style={{ gap: 8 }}>
                <div className="display-flex">
                  <p className="font-14-medium color-dark-black flex-1">
                    Location:
                  </p>
                  <p className="font-14-regular color-dark-black flex-1">
                    San Francisco, CA
                  </p>
                </div>
                <div className="display-flex">
                  <p className="font-14-medium color-dark-black flex-1">
                    Email:
                  </p>
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
                  <p className="font-14-medium color-dark-black flex-1">
                    Linked In:
                  </p>
                  <a
                    href="#"
                    className="font-14-regular color-dark-black flex-1"
                  >
                    linkedin.com/in/joannachou
                  </a>
                </div>
                <div className="display-flex">
                  <p className="font-14-medium color-dark-black flex-1">
                    Languages:
                  </p>
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
            <div className="candidate-details-drawer-common-div">
              <p className="font-16-medium color-dark-black text-uppercase">
                Experience
              </p>
              <div className="divider-line" />
              <div className="display-column" style={{ gap: 16 }}>
                {experienceData?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="display-column"
                      style={{ gap: 8 }}
                    >
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
            <div className="candidate-details-drawer-common-div">
              <p className="font-16-medium color-dark-black text-uppercase">
                Education
              </p>
              <div className="divider-line" />
              <div className="display-column" style={{ gap: 16 }}>
                {educationData?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="display-column"
                      style={{ gap: 8 }}
                    >
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
      </div>
    </Drawer>
  );
};

export default CandidateDetailsDrawer;
