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
import { ReactComponent as EditIcon } from "../../pages/Recruitment/Candidates/assets/edit.svg";
import { ReactComponent as DeleteIcon } from "../../pages/Recruitment/Candidates/assets/delete.svg";
import {
  attachmentListData,
  attachmentsHeaderData,
  candidateJobData,
  comapnyListing,
  commonStyle,
  educationData,
  experienceData,
  jobData,
  jobsTableHeaderData,
} from "../../helpers/config";
import CandidateDetails from "../candidate/CandidateDetails";
import CandidateInfoSkills from "../candidate/CandidateInfoSkills";
import CompanyDropdown from "../common/CompanyDropdown";
import CandidateLog from "../candidate/CandidateLog";
import AddCommonCandidateInfo from "../candidate/AddCommonCandidateInfo";
import CandidateInfoJobs from "../candidate/CandidateInfoJobs";
import CandidateInfoExperience from "../candidate/CandidateInfoExperience";
import CandidateDescription from "../candidate/CandidateDescription";
import ProfessionalDetails from "../candidate/ProfessionalDetails";
import CommonDeleteModal from "./CommonDeleteModal";
import AddNoteModal from "./AddNoteModal";
import CanidateJobListTable from "../candidate/CanidateJobListTable";
import AttachmentsListTable from "../candidate/AttachmentsListTable";

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

const candidateInfoTabs = [
  {
    id: 1,
    name: "Summary",
    selected: true,
  },
  {
    id: 2,
    name: "Resume",
    selected: false,
  },
  {
    id: 3,
    name: "Jobs",
    count: "04",
    selected: false,
  },
  {
    id: 4,
    name: "Inbox",
    selected: false,
  },
  {
    id: 5,
    name: "Calendar",
    selected: false,
  },
  {
    id: 6,
    name: "Enrich User Profile",
    selected: false,
  },
  {
    id: 7,
    name: "Attachments",
    count: "06",
    selected: false,
  },
  {
    id: 8,
    name: "History",
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
  "First Name": "Priya",
  "Last Name": "Sharma",
  "Candidate Reference": "P5L9B",
  Gender: "Female",
  "Date of Birth": "September 14, 1990",
  Location: "Mumbai, India",
  Nationality: "Indian",
  Languages: ["English", "Hindi"],
};

const placementDetails = {
  "Employment Status": "Hired",
  "Hired Date": "January 10, 2025 • 1:56 PM",
  "Start Date": "March 1, 2025",
  "Probation End Date": "May 1, 2025",
  "Left Date": "April 21, 2025",
};

const contactDetails = {
  "Phone Number": "(+91) 98765-43210",
  "Email Id": "priya.s@designscape.com",
  "Social Links": {
    linkedin_url: "http://www.linkedin.com/in/himanshu-singh-861209b8",
    twitter_url: null,
    github_url: null,
    facebook_url: null,
  },
};

const professionalDetails = {
  Skills: skillData,
  Domain: "Technology & IT",
  "Years of Experience": "2 years",
  "Highest Qualification": "Bachelor of Design (B.Des)",
  "Current Job Title": "UI/UX Designer",
  "Current Employer": "DesignScape Studios",
  "Current Salary": "₹ 50,0000",
  "Expected Salary": "₹ 64,0000",
  "Notice Period": null,
  "GDPR Consent": false,
  "Email Consent": false,
};

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
  const [deleteNoteModalVisible, setDeleteNoteModalVisible] = useState(false);
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);
  const feedBackMenuOpen = Boolean(anchorE2);
  const open = Boolean(anchorEl);

  const handleFeedbackMenuClick = (event) => {
    setAnchorE2(event.currentTarget);
  };

  const handleFeedbackMenuClose = () => {
    setAnchorE2(null);
  };

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
            <div className="display-flex align-center">
              <p className="font-14-regular color-dark-black">{item?.date}</p>
              <button
                className="edit-details-btn"
                aria-controls={feedBackMenuOpen ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={feedBackMenuOpen ? "true" : undefined}
                onClick={handleFeedbackMenuClick}
              >
                <MoreIcon width={18} height={18} />
              </button>
              <Menu
                anchorEl={anchorE2}
                open={feedBackMenuOpen}
                onClose={handleFeedbackMenuClose}
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
                  <button
                    className="common-menu-item-btn"
                    onClick={() => {
                      setSelectedNote(item);
                      handleFeedbackMenuClose();
                      setNoteModalVisible(true);
                    }}
                  >
                    <EditIcon stroke="#151B23" />
                    Edit
                  </button>
                  <button
                    className="common-menu-item-btn"
                    onClick={() => {
                      setSelectedNote(item);
                      handleFeedbackMenuClose();
                      setDeleteNoteModalVisible(true);
                    }}
                  >
                    <DeleteIcon stroke="#151B23" />
                    Delete
                  </button>
                </div>
              </Menu>
            </div>
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
    <>
      <Modal
        show={visible}
        onHide={handleBackdropClick}
        dialogClassName={`candidate-info-common-modal`}
        contentClassName="modal-content"
        backdropClassName="custom-backdrop"
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
                  style={{
                    width: 60,
                    height: 60,
                    backgroundColor: randomColor,
                  }}
                />
                <div className="display-column" style={{ gap: 8 }}>
                  <p className="font-16-medium color-dark-black">
                    Priya Sharma
                  </p>
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
          {selectedCandidateTab === "Summary" && (
            <div
              className="display-flex"
              style={{ gap: 12, padding: "0px 16px", overflow: "auto" }}
            >
              <div
                className="flex-1 display-column"
                style={{ gap: 12, overflowY: "auto", marginBottom: "10px" }}
              >
                <ProfessionalDetails
                  details={candidateDetailsData}
                  label={"Candidate Details"}
                />
                <ProfessionalDetails
                  label={"Contact Details"}
                  details={contactDetails}
                />
                <CandidateDescription label={"Candidate Description"} />
                <ProfessionalDetails
                  label={"Professional Details"}
                  details={professionalDetails}
                />
                <CandidateDetails
                  label={"Placement Details"}
                  details={placementDetails}
                />
                <CandidateInfoExperience
                  label={"Experience Details"}
                  data={experienceData}
                />
                <CandidateInfoExperience
                  label={"Education Details"}
                  data={educationData}
                />
                <CandidateInfoJobs label={"Jobs"} data={jobData} />
                <AddCommonCandidateInfo label={"Folders"} />
                <CandidateLog />
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
                  <CompanyDropdown options={comapnyListing} />
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
          )}

          {selectedCandidateTab === "Jobs" && (
            <div
              style={{
                gap: 12,
                padding: "0px 16px",
                overflow: "auto",
                position: "relative",
              }}
            >
              <CanidateJobListTable
                header={jobsTableHeaderData}
                data={candidateJobData}
              />
            </div>
          )}

          {selectedCandidateTab === "Attachments" && (
            <div
              style={{
                gap: 12,
                padding: "0px 16px",
                overflow: "auto",
                position: "relative",
              }}
            >
              <AttachmentsListTable
                header={attachmentsHeaderData}
                data={attachmentListData}
              />
            </div>
          )}
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
      <CommonDeleteModal
        visible={deleteNoteModalVisible}
        title={"Delete Note"}
        description={"Are you sure you want to delete this note?"}
        onClose={() => {
          setDeleteNoteModalVisible(false);
          setSelectedNote(null);
        }}
        onClickDelete={() => {
          setDeleteNoteModalVisible(false);
          setSelectedNote(null);
        }}
      />
      <AddNoteModal
        visible={noteModalVisible}
        onClose={() => setNoteModalVisible(false)}
        selectedNote={selectedNote}
      />
    </>
  );
};

export default CandidateInfoModal;
