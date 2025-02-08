import React, { useState } from "react";
import { Drawer } from "@mui/material";
import { dummyUserImage, profileImage } from "../../helpers/assets";
import { ReactComponent as CloseIcon } from "../../assets/icons/drawerClose.svg";
import { ReactComponent as ProfileAdd } from "../../assets/icons/sourcingIcons/profile-add.svg";
import { ReactComponent as JobIcon } from "../../assets/icons/sourcingIcons/briefcase.svg";
import { ReactComponent as FolderAdd } from "../../assets/icons/sourcingIcons/folder-add.svg";
import { ReactComponent as Download } from "../../assets/icons/sourcingIcons/download.svg";
import Tooltip from "@mui/material/Tooltip";
import { skills } from "./CandidateCard";
import { educationData, experienceData, languages } from "./CandidateDetails";
import { useModal } from "../common/ModalProvider";

const CandidateDetailsDrawer = ({
  visible,
  onClose,
  data,
  onClickAddJob,
  onClickAddFolder,
}) => {
  const [validImageUrl, setValidImageUrl] = useState(true);
  const { modals, setModalVisibility } = useModal();

  const handleBackdropClick = () => {
    setModalVisibility("animatedModal", true);
    setTimeout(() => {
      setModalVisibility("animatedModal", false);
    }, 600);
  };

  return (
    <Drawer anchor="right" open={visible} onClose={handleBackdropClick}>
      <div
        role="presentation"
        onKeyDown={onClose}
        className="candidate-details-drawer scroll-width-none"
      >
        <div
          className={`candidate-details-drawer-container ${
            modals?.animatedModal && "shake-rotate"
          }`}
        >
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
                {data?.first_name && (
                  <p className="font-20-medium">
                    {data?.first_name} {data?.last_name}
                  </p>
                )}
              </div>
              <div className="display-flex" style={{ gap: 12 }}>
                <Tooltip title="Add to candidate">
                  <button>
                    <ProfileAdd />
                  </button>
                </Tooltip>
                <Tooltip
                  title="Add to Job"
                  onClick={() => {
                    onClose();
                    onClickAddJob();
                  }}
                >
                  <button>
                    <JobIcon />
                  </button>
                </Tooltip>
                <Tooltip
                  title="Add to Folder"
                  onClick={() => {
                    onClose();
                    onClickAddFolder();
                  }}
                >
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
                    <p className="font-14-medium color-dark-black flex-1">
                      Email:
                    </p>
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
            {data?.employment_history && (
              <div className="candidate-details-drawer-common-div">
                <p className="font-16-medium color-dark-black text-uppercase">
                  Experience
                </p>
                <div className="divider-line" />
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
