import React, { useEffect, useState } from "react";
import { useModal } from "../common/ModalProvider";
import Modal from "react-bootstrap/Modal";
import { getRandomColor } from "../../helpers/utils";
import { Avatar, Menu } from "@mui/material";
import { ReactComponent as LabelIcon } from "../../pages/Recruitment/Candidates/assets/label.svg";
import { ReactComponent as AddIcon } from "../../pages/Recruitment/Candidates/assets/add.svg";
import { ReactComponent as MoreIcon } from "../../pages/Recruitment/Candidates/assets/more.svg";
import { ReactComponent as SettingIcon } from "../../pages/Recruitment/Candidates/assets/setting.svg";
import { ReactComponent as AddJobIcon } from "../../pages/Recruitment/Candidates/assets/addJob.svg";
import { ReactComponent as AddFolderIcon } from "../../pages/Recruitment/Candidates/assets/addFolder.svg";
import { ReactComponent as MarkProfileIcon } from "../../pages/Recruitment/Candidates/assets/profile-tick.svg";
import { ReactComponent as DownloadIcon } from "../../pages/Recruitment/Candidates/assets/download.svg";
import { ReactComponent as ArchiveIcon } from "../../pages/Recruitment/Candidates/assets/archive.svg";
import { ReactComponent as ModalClose } from "../../pages/Recruitment/Candidates/assets/modalClose.svg";
import { ReactComponent as ModalPrevious } from "../../pages/Recruitment/Candidates/assets/modalPrevious.svg";
import { ReactComponent as ModalNext } from "../../pages/Recruitment/Candidates/assets/modalNext.svg";
import { commonStyle } from "../../helpers/config";
import CandidateDetails from "../candidate/CandidateDetails";
import CandidateInfoSkills from "../candidate/CandidateInfoSkills";

const candidateInfoTabs = [
  {
    id: 1,
    name: "Summary",
    // icon: <ResumeIcon />,
    selected: true,
  },
  {
    id: 2,
    name: "Resume",
    // icon: <ResumeIcon />,
    selected: false,
  },
  {
    id: 3,
    name: "Jobs",
    // icon: <JobIcon />,
    count: "04",
    selected: false,
  },
  {
    id: 4,
    name: "Inbox",
    // icon: <InboxIcon />,
    selected: false,
  },
  {
    id: 5,
    name: "Calendar",
    // icon: <CalendarIcon />,
    selected: false,
  },
  {
    id: 6,
    name: "Enrich User Profile",
    // icon: <PenIcon />,
    selected: false,
  },
  {
    id: 7,
    name: "Attachments",
    // icon: <AttachmentIcon />,
    count: "06",
    selected: false,
  },
];

const labelData = [
  {
    id: 1,
    name: "High Priority",
  },
  {
    id: 2,
    name: "Important",
  },
];

const candidateDetailsData = {
  "Candidate Reference": "P5L9B",
  Gender: "Female",
  "Candidate Location": "Mumbai, India",
  "Date of Birth": "September 14, 1990",
  "Candidate Address": "Mumbai, India",
  "Candidate Email Id": "priya.s@designscape.com",
  "Candidate Phone": "+91-98765-43210",
};

const aditionalInfoData = {
  Languages: "English, Hindi",
  "Candidate Department": "Design",
  "Candidate Domain": "Design & Technology",
  "Years of Experience": "1-2 years",
  "Graduation Date": "2019",
  "Current Salary": "12 LPA",
  "Notice Period": "1-month",
  Nationalities: "Indian",
};

const skillData = [
  {
    id: 1,
    name: "UI Design",
    rating: "08",
  },
  {
    id: 2,
    name: "UX Design",
    rating: "09",
  },
  {
    id: 3,
    name: "Figma",
    rating: "09",
  },
  {
    id: 4,
    name: "Sketch",
    rating: "05",
  },
  {
    id: 5,
    name: "InVision",
    rating: "06",
  },
  {
    id: 6,
    name: "Wireframe",
    rating: "08",
  },
  {
    id: 7,
    name: "Prototype",
    rating: "07",
  },
  {
    id: 8,
    name: "Web Design",
    rating: "09",
  },
  {
    id: 9,
    name: "Mobile Design",
    rating: "08",
  },
  {
    id: 10,
    name: "Responsive Design",
    rating: "10",
  },
];

const feedBackData = [
  {
    id: 1,
    image: "",
    name: "Mark Scott",
    date: "January 13, 2024 • 05:30 PM",
    feedback:
      "Received Priya Sharma’s updated resume and portfolio. Shared the documents with the client for review. Follow-up scheduled after the client’s feedback.",
  },
  {
    id: 2,
    image: "",
    name: "Mark Scott",
    date: "January 24, 2025 • 1:56 PM",
    feedback:
      "Priya completed the initial interview with DesignScape Studios. Feedback from HR was positive. Next step: schedule technical round. Priya is available next week.",
  },
];

const CandidateInfoModal = ({ visible, onClose }) => {
  const { modals, setModalVisibility } = useModal();
  const [candidateTabs, setCandidateTabs] = useState(candidateInfoTabs);
  const [selectedCandidateTab, setSelectedCandidateTab] = useState("Summary");
  const [anchorEl, setAnchorEl] = useState(null);
  const [randomColor, setRandomColor] = useState([]);
  const [writeText, setWriteText] = useState("");
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const selectedTabHandler = (id) => {
    const updatedData = candidateTabs?.map((item) => {
      if (item?.id === id) {
        return { ...item, selected: true };
      } else {
        return { ...item, selected: false };
      }
    });

    const filterTab = updatedData?.filter((item) => item?.selected);
    setSelectedCandidateTab(filterTab[0]?.name);
    setCandidateTabs(updatedData);
  };

  const renderFeedback = (item) => {
    return (
      <div key={item?.id} className="candidate-info-feedback-container">
        <Avatar
          src={item?.image || ""}
          alt={item?.name}
          style={{
            width: 26,
            height: 26,
            backgroundColor: randomColor,
            fontSize: 10,
          }}
        >
          {!item?.image && item?.name?.slice(0, 2)}
        </Avatar>
        <div className="flex-1 display-column" style={{ gap: 10 }}>
          <div className="display-flex-justify align-center">
            <p className="font-14-medium color-dark-black">{item?.name}</p>
            <p className="font-14-regular color-dark-black">{item?.date}</p>
          </div>
          <p className="font-14-regular color-dark-black">{item?.feedback}</p>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const random = getRandomColor();
    setRandomColor(random);
  }, []);

  const handleBackdropClick = () => {
    setModalVisibility("animatedModal", true);
    setTimeout(() => {
      setModalVisibility("animatedModal", false);
    }, 600);
  };
  return (
    <Modal
      show={visible}
      onHide={handleBackdropClick}
      dialogClassName={`candidate-info-common-modal`}
      contentClassName="modal-content"
      backdropClassName="custom-backdrop"
      centered
    >
      <div
        className={`candidate-info-modal-container ${
          modals?.animatedModal && "shake"
        }`}
      >
        <div className="candidate-info-header">
          <div className="display-flex-justify align-center">
            <div className="display-flex" style={{ gap: 10 }}>
              <Avatar
                src={""}
                alt={"Priya Sharma"}
                style={{ width: 60, height: 60, backgroundColor: randomColor }}
              />
              <div className="display-column" style={{ gap: 8 }}>
                <p className="font-16-medium color-dark-black">Priya Sharma</p>
                <div
                  className="display-flex align-center"
                  style={{ gap: 8, flexWrap: "wrap" }}
                >
                  {labelData?.map((item) => {
                    const color = getRandomColor();
                    return (
                      <div key={item?.id} className="candidate-info-label">
                        <LabelIcon fill={color} /> {item?.name}
                      </div>
                    );
                  })}
                  <button className="add-label-btn-candidate-info">
                    <AddIcon /> Label
                  </button>
                </div>
              </div>
            </div>
            <div className="display-flex" style={{ gap: 10 }}>
              <div className="profile-progress-div-1">56%</div>
              <div className="profile-progress-div-2">62</div>
            </div>
          </div>
          <div className="display-flex-justify align-center">
            <div className="candidate-info-tab-main">
              {candidateTabs?.map((item) => {
                return (
                  <button
                    key={item?.id}
                    className={`candidate-info-tab-btn ${
                      item?.selected && "active-info-tab"
                    }`}
                    onClick={() => selectedTabHandler(item?.id)}
                  >
                    {item?.name}{" "}
                    {item?.count && (
                      <span className="candidate-info-tab-count">
                        {item?.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="display-flex align-center" style={{ gap: 18 }}>
              <button className="customize-btn">
                Customize
                <SettingIcon />
              </button>
              <button
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleMenuClick}
              >
                <MoreIcon />
              </button>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: commonStyle.sx,
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
              >
                <div className="display-column">
                  <button className="common-menu-item-btn">
                    <AddJobIcon /> Add to Jobs
                  </button>
                  <button className="common-menu-item-btn">
                    <AddFolderIcon /> Add to Folder
                  </button>
                  <button className="common-menu-item-btn">
                    <MarkProfileIcon /> Mark as Employee
                  </button>
                  <button className="common-menu-item-btn">
                    <DownloadIcon /> Download Resume
                  </button>
                  <button className="common-menu-item-btn">
                    <ArchiveIcon /> Archive
                  </button>
                </div>
              </Menu>
            </div>
          </div>
        </div>
        <div
          className="display-flex"
          style={{ gap: 12, padding: "0px 16px", overflow: "auto" }}
        >
          <div
            className="flex-1 display-column"
            style={{ gap: 12, overflowY: "auto", marginBottom: "10px" }}
          >
            <CandidateDetails
              details={candidateDetailsData}
              label={"Candidate Details"}
            />
            <CandidateInfoSkills skillData={skillData} />
            <CandidateDetails
              details={aditionalInfoData}
              label={"Additional Information"}
            />
          </div>
          <div
            className="candidate-info-modal-section-2 flex-1 "
            style={{
              maxWidth: 500,
              maxHeight: "max-content",
              overflowY: "auto",
            }}
          >
            <div className="candidate-info-modal-inner-section-1">
              <input
                type="text"
                placeholder="Write a note"
                value={writeText}
                onChange={(e) => setWriteText(e.target?.value)}
                className="common-input"
              />
            </div>
            <div className="divider-line" />
            <div className="display-column" style={{ gap: 16 }}>
              {feedBackData?.map((item) => {
                return renderFeedback(item);
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="close-previous-next-btn-wrapper">
        <button className="modal-close-btn" onClick={onClose}>
          <ModalClose />
        </button>
        <button className="modal-next-btn">
          <ModalNext />
        </button>
        <button className="modal-previous-btn">
          <ModalPrevious />
        </button>
      </div>
    </Modal>
  );
};

export default CandidateInfoModal;
