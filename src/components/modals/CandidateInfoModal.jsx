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
  historyData,
  historyHeaderData,
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
import CandidateHistoryTabel from "../candidate/CandidateHistoryTabel";
import { ReactComponent as EnrichIcon } from "../../assets/icons/enrich.svg";
import { ReactComponent as RefreshIcon } from "../../assets/icons/refresh-2.svg";
import { ReactComponent as InfoIcon } from "../../assets/icons/info.svg";
import { ReactComponent as VerifyIcon } from "../../assets/icons/verified.svg";
import { ReactComponent as LinkedIn } from "../../assets/icons/sociallinks/linkedin.svg";
import { ReactComponent as PlusIcon } from "../../assets/icons/plusIcon.svg";
import CommonAddButton from "../common/CommonAddButton";
import AddSocialLinksModal from "./AddSocialLinksModal";
import ProfileNotMarkedModal from "./ProfileNotMarkedModal";
import NotRightProfileModal from "./NotRightProfileModal";
import VerifiedEnrichProfileUserModal from "./VerifiedEnrichProfileUserModal";

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

const enrichUserProfileData = [
  {
    id: 1,
    key: "",
    name: "LinkedIn",
    verified: true,
    percentage: "100%",
    visitLink: "www.linkedin.com",
  },
  {
    id: 2,
    key: "",
    name: "Behance",
    verified: false,
    percentage: "85%",
    visitLink: "www.behnace.com",
  },
  {
    id: 3,
    key: "",
    name: "Dribbble",
    verified: true,
    percentage: "100%",
    visitLink: "www.dribbble.com",
  },
  {
    id: 4,
    key: "",
    name: "Medium",
    verified: false,
    percentage: "85%",
    visitLink: "www.medium.com",
  },
  {
    id: 5,
    key: "",
    name: "Youtube",
    verified: false,
    percentage: "85%",
    visitLink: "www.youtube.com",
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
  const [selectedCompanyHistory, setSelectedCompanyHistory] = useState(
    comapnyListing[0]
  );
  const [enrichUserProfileVisible, setEnrichUserProfileVisible] =
    useState(false);
  const [
    enrichUserProfileSocialAddModalVisible,
    setEnrichUserProfileSocialAddModalVisible,
  ] = useState(false);
  const [
    enrichUserProfileInfoModalVisible,
    setEnrichUserProfileInfoModalVisible,
  ] = useState(false);
  const [notRightProfileModalVisible, setNotRightProfileModalVisible] =
    useState(false);
  const [
    verifiedEnrichProfileModalVisible,
    setVerifiedEnrichProfileModalVisible,
  ] = useState(false);
  const [selectedEnrichUserProfile, setSelectedEnrichUserProfile] =
    useState(null);
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
          style={{ paddingBottom: 16 }}
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

          {selectedCandidateTab === "History" && (
            <div
              className="display-flex flex-1"
              style={{
                gap: 16,
                padding: "0px 16px",
                overflow: "auto",
              }}
            >
              <div className="candidate-info-history-sidebar">
                <div className="display-column" style={{ gap: 12 }}>
                  {comapnyListing?.map((item) => {
                    return (
                      <button
                        className={`history-comapny-list-btn ${
                          selectedCompanyHistory?.id === item?.id &&
                          "selected-history-company"
                        }`}
                        key={item?.id}
                        onClick={() => setSelectedCompanyHistory(item)}
                      >
                        <div className="w-h-32">
                          <img src={item?.logo} className="common-img" />
                        </div>
                        <div
                          className="display-column"
                          style={{ gap: 4, alignItems: "flex-start" }}
                        >
                          {item?.name && (
                            <p className="font-14-medium color-dark-black">
                              {item?.name}
                            </p>
                          )}
                          {item?.position && (
                            <p className="font-10-regular color-dark-black">
                              {item?.position}
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex-1">
                <CandidateHistoryTabel
                  header={historyHeaderData}
                  data={historyData}
                />
              </div>
            </div>
          )}

          {selectedCandidateTab === "Enrich User Profile" &&
            (enrichUserProfileVisible ? (
              <div
                className="display-flex"
                style={{
                  gap: 14,
                  flexWrap: "wrap",
                  padding: "0 16px",
                  overflowY: "auto",
                }}
              >
                {enrichUserProfileData?.map((item) => {
                  return (
                    <div
                      className="enrich-user-profilte-item-div"
                      key={item?.id}
                      onClick={() => {
                        setSelectedEnrichUserProfile(item);
                        if (item?.verified) {
                          setVerifiedEnrichProfileModalVisible(true);
                        } else {
                          setEnrichUserProfileInfoModalVisible(true);
                        }
                      }}
                    >
                      <div
                        className="display-flex align-center"
                        style={{ gap: 10 }}
                      >
                        <LinkedIn width={35} height={36} />
                        <div className="disply-column" style={{ gap: 6 }}>
                          <p className="font-14-regular color-dark-black">
                            {item?.name}
                          </p>
                          <a
                            href={item?.visitLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-12-regular color-grey"
                          >
                            {item?.visitLink}
                          </a>
                        </div>
                      </div>
                      <div className="display-flex-justify align-center">
                        <button
                          className="font-14-regular color-blue"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEnrichUserProfile(item);
                            setNotRightProfileModalVisible(true);
                          }}
                        >
                          Not the right profile?
                        </button>

                        <div
                          className="common-badge-style"
                          style={{
                            backgroundColor: item?.verified
                              ? "#46A13C1A"
                              : "#D2A01D1A",
                          }}
                        >
                          {item?.verified ? <VerifyIcon /> : <InfoIcon />}
                          <span
                            className={`font-12-regular ${
                              item?.verified ? "color-success" : "color-holt"
                            }`}
                          >
                            {item?.verified
                              ? "Verified"
                              : `${item?.percentage} Match`}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <CommonAddButton
                  title={"Add More"}
                  icon={<PlusIcon stroke="#1761D8" />}
                  btnStyle={{
                    backgroundColor: "transparent",
                    border: "1px solid #1761D8",
                    color: "#1761D8",
                    alignSelf: "center",
                  }}
                  onClick={() =>
                    setEnrichUserProfileSocialAddModalVisible(true)
                  }
                />
              </div>
            ) : (
              <div
                className="display-column flex-1"
                style={{
                  padding: "0px 16px",
                  gap: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "auto",
                }}
              >
                <EnrichIcon />
                <p
                  className="font-14-regular color-dark-black text-center"
                  style={{ maxWidth: 650 }}
                >
                  Enhance candidate profiles by linking their social media
                  accounts.
                  <br /> Using key details like name, location, job title, and
                  employer, our system gathers publicly available social media
                  information to provide a more complete candidate overview.
                </p>
                <CommonAddButton
                  title={"Enrich User Profile"}
                  icon={<RefreshIcon />}
                  onClick={() => setEnrichUserProfileVisible(true)}
                />
              </div>
            ))}
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
      <AddSocialLinksModal
        visible={enrichUserProfileSocialAddModalVisible}
        onClose={() => setEnrichUserProfileSocialAddModalVisible(false)}
        showHeader={true}
      />
      <ProfileNotMarkedModal
        visible={enrichUserProfileInfoModalVisible}
        onClose={() => setEnrichUserProfileInfoModalVisible(false)}
        data={selectedEnrichUserProfile}
      />
      <NotRightProfileModal
        visible={notRightProfileModalVisible}
        onClose={() => setNotRightProfileModalVisible(false)}
      />
      <VerifiedEnrichProfileUserModal
        visible={verifiedEnrichProfileModalVisible}
        onClose={() => {
          setVerifiedEnrichProfileModalVisible(false);
        }}
      />
    </>
  );
};

export default CandidateInfoModal;
