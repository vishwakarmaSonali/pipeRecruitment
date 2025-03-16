import React, { useEffect, useState } from "react";
import { useModal } from "../common/ModalProvider";
import Modal from "react-bootstrap/Modal";
import { formatTwoDigits, getRandomColor } from "../../helpers/utils";
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
  candidateDetailsData,
  candidateJobData,
  comapnyListing,
  commonStyle,
  contactDetails,
  educationData,
  experienceData,
  historyData,
  historyHeaderData,
  jobData,
  jobsTableHeaderData,
  professionalDetails,
} from "../../helpers/config";
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
import UploadDocumentModal from "./UploadDocumentModal";
import { ReactComponent as AttachementIcon } from "../../assets/images/attachment.svg";
import { ReactComponent as JobIcon } from "../../assets/images/jobs.svg";
import AddToJobsModal from "./AddToJobsModal";
import { ReactComponent as CloseIcon } from "../../assets/icons/closeModal.svg";
import { useNavigate } from "react-router-dom";
import AddToFolderModal from "./AddToFolderModal";
import { uptech, userImage } from "../../helpers/assets";
import { ReactComponent as OriginalResumeIcon } from "../../assets/images/resume/original.svg";
import { ReactComponent as CvIcon } from "../../assets/images/resume/cv.svg";
import { ReactComponent as ReportIcon } from "../../assets/images/resume/report.svg";
import CalendarComponent from "../candidate/CalendarComponent";
import CommonButton from "../common/CommonButton";
import CancelButton from "../common/CancelButton";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  fetchCandidateDetails,
  updateCandidateLabel,
} from "../../actions/candidateActions";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  fetchAllDomains,
  fetchAllLabels,
} from "../../actions/customizationActions";

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
    selected: false,
  },
  {
    id: 8,
    name: "History",
    selected: false,
  },
];

const resumeTabs = [
  {
    id: 1,
    name: "Original",
    desc: "View candidate’s original resume",
    icon: <OriginalResumeIcon />,
    navigate: "/candidate/original-resume",
  },
  {
    id: 2,
    name: "Custom CV",
    desc: "Create and modify candidate’s custom CV",
    icon: <CvIcon />,
  },
  {
    id: 3,
    name: "Report",
    desc: "Create and modify candidate’s report",
    icon: <ReportIcon />,
  },
];

const placementDetails = {
  "Employment Status": "Hired",
  "Hired Date": "2025-01-26T08:14:00+05:30",
  "Start Date": "2025-03-01T08:14:00+05:30",
  "Probation End Date": "2025-05-01T08:14:00+05:30",
  "Left Date": "2025-04-21T08:14:00+05:30",
  Job: {
    image: uptech,
    name: "UpTech",
    position: "UI Designer",
  },
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

const CandidateInfoModal = ({
  visible,
  onClose,
  candidateId,
  prevButtonClick,
  nextButtonClick,
}) => {
  const dispatch = useDispatch();
  const { candidateInfo, candidateDetailsLoading } = useSelector(
    (state) => state.candidates
  );
  const navigate = useNavigate();
  const { labelData } = useSelector((state) => state?.customization);
  const [labelsData, setLabelsData] = useState(labelData);
  const { modals, setModalVisibility } = useModal();
  const [candidateTabs, setCandidateTabs] = useState(candidateInfoTabs);
  const [summaryStructuredData, setSummaryStructuredData] = useState(
    candidateInfo?.structuredCandidate || {}
  );

  const [selectedCandidateTab, setSelectedCandidateTab] = useState("Summary");
  const [anchorEl, setAnchorEl] = useState(null);
  const [randomColor, setRandomColor] = useState([]);
  const [writeText, setWriteText] = useState("");
  const [selectedLabelData, setSelectedLabelData] = useState(
    candidateInfo?.raw_data?.labels || []
  );
  const [candidateRawData, setCandidateRawData] = useState(
    candidateInfo?.raw_data || {}
  );
  const [deleteNoteModalVisible, setDeleteNoteModalVisible] = useState(false);
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [folders, setFolders] = useState([]);
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

  const [attachementUploadModalVisible, setAttachmentUploadModalVisible] =
    useState(false);
  const [attachmentData, setAttachmentData] = useState([]);

  const attachmentDeleteHandler = (id) => {
    const updatedData = attachmentData?.filter((item) => item?.id !== id);
    setAttachmentData(updatedData);
  };

  const [addToJobsModalVisible, setAddToJobsModalVisible] = useState(false);

  const [addToFolderModalVisible, setAddToFolderModalVisible] = useState(false);

  const [anchorE2, setAnchorE2] = useState(null);
  const [labelAnchor, setLabelAnchor] = useState(null);
  const labelMenuOpen = Boolean(labelAnchor);
  const feedBackMenuOpen = Boolean(anchorE2);
  const open = Boolean(anchorEl);
  const [selectedResumeTab, setSelectedResumeTab] = useState(1);

  useEffect(() => {
    dispatch(fetchAllLabels());
    dispatch(fetchAllDomains());
  }, [dispatch]);

  useEffect(() => {
    setCandidateRawData(candidateInfo?.raw_data);
  }, [candidateInfo]);

  const handleLabelMenuClick = (event) => {
    setLabelAnchor(event.currentTarget);
  };

  const handleLabelMenuClose = () => {
    setLabelAnchor(null);
  };

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

  const labelHandler = (id) => {
    const updatedData = labelsData?.map((item) => {
      if (item?._id === id) {
        return { ...item, selected: !item?.selected };
      } else {
        return { ...item };
      }
    });
    const filterLableData = updatedData?.filter((item) => item?.selected);
    const selectedLabelId = filterLableData?.map((item) => item?._id);
    const httpBody = {
      candidateIds: [candidateId],
      updateData: {
        labels: [...selectedLabelId],
      },
    };
    dispatch(updateCandidateLabel(httpBody)).then((response) => {
      if (response?.success) {
        setSelectedLabelData([...filterLableData]);
        setLabelsData(updatedData);
      }
    });
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

  useEffect(() => {
    setSummaryStructuredData(candidateInfo?.structuredCandidate || {});
  }, [candidateInfo]);

  const handleBackdropClick = () => {
    setModalVisibility("animatedModal", true);
    setTimeout(() => {
      setModalVisibility("animatedModal", false);
    }, 600);
  };

  const resumeBackHandler = () => {
    setSelectedResumeTab(1);
  };

  const renderCustomCVHeaderComponent = () => {
    return (
      <div className="resume-header-div position-sticky">
        <p className="font-22-medium color-dark-black">All Custom CV</p>
        <div className="display-flex" style={{ gap: 8 }}>
          <CancelButton title={"Back"} onClick={resumeBackHandler} />
          <CommonButton
            title={"Create Custom CV"}
            onClick={() => navigate("/candidate/custom-cv")}
          />
        </div>
      </div>
    );
  };

  const renderReportHeaderComponent = () => {
    return (
      <div className="resume-header-div position-sticky">
        <p className="font-22-medium color-dark-black">All Reports</p>
        <div className="display-flex" style={{ gap: 8 }}>
          <CancelButton title={"Back"} onClick={resumeBackHandler} />
          <CommonButton
            title={"Create Report"}
            onClick={() => navigate("/candidate/report")}
          />
        </div>
      </div>
    );
  };

  const renderEmptyCustomCVComponent = () => {
    return (
      <div
        className="display-column justify-center align-center"
        style={{ gap: 4, maxWidth: 400 }}
      >
        <CvIcon />
        <div className="display-column" style={{ gap: 8 }}>
          <p className="font-14-medium color-dark-black text-center">
            No Custom CV
          </p>
          <p className="font-14-regular color-grey text-center">
            Start building CV of your choice.
          </p>
        </div>
      </div>
    );
  };

  const renderEmptyReportComponent = () => {
    return (
      <div
        className="display-column justify-center align-center"
        style={{ gap: 4, maxWidth: 400 }}
      >
        <ReportIcon />
        <div className="display-column" style={{ gap: 8 }}>
          <p className="font-14-medium color-dark-black text-center">
            No Reports
          </p>
          <p className="font-14-regular color-grey text-center">
            Start building reports of your choice.
          </p>
        </div>
      </div>
    );
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
          {candidateDetailsLoading ? (
            <div className="candidate-info-header">
              <div className="display-flex-justify align-center">
                <div className="display-flex" style={{ gap: 10 }}>
                  <div className="w-h-60">
                    <Skeleton circle width={"100%"} height={"100%"} />
                  </div>
                  <div className="display-column">
                    <Skeleton width={150} height={16} />
                    <Skeleton width={50} height={12} />
                  </div>
                </div>
                <div className="display-flex" style={{ gap: 10 }}>
                  <div className="profile-progress-div-1">
                    <Skeleton circle width={"100%"} height={"100%"} />
                  </div>
                  <div className="profile-progress-div-2">
                    <Skeleton circle width={"100%"} height={"100%"} />
                  </div>
                </div>
              </div>
              <div className="display-flex-justify align-center">
                <div
                  className="candidate-info-tab-main"
                  style={{ borderBottom: "none" }}
                >
                  <Skeleton width={600} height={26} />
                </div>
                <div className="display-flex align-center" style={{ gap: 10 }}>
                  <Skeleton width={100} height={26} />
                  <Skeleton width={20} height={20} />
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="candidate-info-header">
                <div className="display-flex-justify align-center">
                  <div className="display-flex" style={{ gap: 10 }}>
                    <Avatar
                      src={
                        candidateInfo?.raw_data?.profile_photo
                          ? candidateInfo?.raw_data?.profile_photo
                          : userImage
                      }
                      alt={"Priya Sharma"}
                      style={{
                        width: 60,
                        height: 60,
                        backgroundColor: "grey",
                      }}
                    />
                    <div className="display-column" style={{ gap: 8 }}>
                      <p className="font-16-medium color-dark-black">
                        {candidateInfo?.raw_data?.first_name}{" "}
                        {candidateInfo?.raw_data?.last_name}
                      </p>
                      <div
                        className="display-flex align-center"
                        style={{ gap: 8, flexWrap: "wrap" }}
                      >
                        {selectedLabelData?.map((item) => {
                          return (
                            <div
                              key={item?._id}
                              className="candidate-info-label"
                            >
                              <LabelIcon fill={item?.color} /> {item?.name}
                            </div>
                          );
                        })}
                        <button
                          className="add-label-btn-candidate-info"
                          aria-controls={
                            labelMenuOpen ? "basic-menu" : undefined
                          }
                          aria-haspopup="true"
                          aria-expanded={labelMenuOpen ? "true" : undefined}
                          onClick={handleLabelMenuClick}
                        >
                          <AddIcon /> Label
                        </button>
                        <Menu
                          anchorEl={labelAnchor}
                          open={labelMenuOpen}
                          onClose={handleLabelMenuClose}
                          PaperProps={{
                            sx: commonStyle.sx,
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                        >
                          <div className="display-column">
                            {labelsData?.map((item) => {
                              return (
                                <button
                                  className="label-item"
                                  onClick={() => labelHandler(item?._id)}
                                >
                                  <LabelIcon fill={item?.color} />
                                  <span
                                    className="font-12-regular color-dark-black flex-1"
                                    style={{ textAlign: "left" }}
                                  >
                                    {item?.name}
                                  </span>
                                  {item?.selected && (
                                    <button>
                                      <CloseIcon width={14} height={14} />
                                    </button>
                                  )}
                                </button>
                              );
                            })}
                            <div className="divider-line" />
                            <button
                              className="label-item"
                              onClick={() =>
                                navigate("/candidate-customization")
                              }
                            >
                              <LabelIcon fill={"#151B23"} />
                              <span
                                className="font-12-regular color-dark-black flex-1"
                                style={{ textAlign: "left" }}
                              >
                                Manage Labels
                              </span>
                            </button>
                          </div>
                        </Menu>
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
                          {item?.name}
                          {item?.name === "Attachments" &&
                            attachmentData?.length > 0 && (
                              <span className="candidate-info-tab-count">
                                {formatTwoDigits(attachmentData?.length)}
                              </span>
                            )}
                          {item?.name === "Jobs" &&
                            candidateJobData?.length > 0 && (
                              <span className="candidate-info-tab-count">
                                {formatTwoDigits(candidateJobData?.length)}
                              </span>
                            )}
                        </button>
                      );
                    })}
                  </div>
                  <div
                    className="display-flex align-center"
                    style={{ gap: 18 }}
                  >
                    <button
                      className="customize-btn"
                      onClick={() => navigate("/candidate-customization")}
                    >
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
            </>
          )}
          {selectedCandidateTab === "Summary" && (
            <div
              className="display-flex"
              style={{ gap: 12, padding: "0px 16px", overflow: "auto" }}
            >
              <div
                className="flex-1 display-column "
                style={{ gap: 12, overflowY: "auto", marginBottom: "10px" }}
              >
                {Object.entries(summaryStructuredData)
                  .sort((a, b) => (a[1]?.order || 0) - (b[1]?.order || 0))
                  .map(([key, value]) => {
                    const mappedCandidateDetailsFields = value?.fields?.reduce(
                      (acc, field) => {
                        acc[field.label] = {
                          name: field.name,
                          value: field.value,
                          type: field.type,
                          options: field.options,
                          order: field.order,
                          default: field.default,
                          fe_input_type: field.fe_input_type,
                          hide: field.hide,
                        };
                        return acc;
                      },
                      {}
                    );
                    if (key === "candidate_description") {
                      return (
                        <CandidateDescription
                          label={value?.label}
                          editable={true}
                          data={value?.fields[0]?.value || ""}
                          isLoading={candidateDetailsLoading}
                        />
                      );
                    } else if (key === "employment_history") {
                      return (
                        <CandidateInfoExperience
                          key={key}
                          label={"Experience Details"}
                          data={value?.data || []}
                          editable={true}
                          isLoading={candidateDetailsLoading}
                        />
                      );
                    } else if (key === "education") {
                      return (
                        <CandidateInfoExperience
                          key={key}
                          label={"Education Details"}
                          data={value?.data || []}
                          editable={true}
                          isLoading={candidateDetailsLoading}
                        />
                      );
                    } else if (key === "jobs") {
                      return (
                        <CandidateInfoJobs
                          label={value?.label}
                          data={jobData}
                          onAdd={() => setAddToJobsModalVisible(true)}
                          isLoading={candidateDetailsLoading}
                        />
                      );
                    } else if (key === "folder") {
                      return (
                        <AddCommonCandidateInfo
                          label={value?.label}
                          onAdd={() => setAddToFolderModalVisible(true)}
                          data={folders}
                          isLoading={candidateDetailsLoading}
                        />
                      );
                    } else if (key === "folders") {
                      return;
                    } else {
                      return (
                        <ProfessionalDetails
                          details={
                            key === "skills"
                              ? value
                              : mappedCandidateDetailsFields
                          }
                          label={value?.label}
                          editable={true}
                          isLoading={candidateDetailsLoading}
                          rawData={candidateRawData}
                        />
                      );
                    }
                  })}

                {/* <CandidateLog isLoading={candidateDetailsLoading} /> */}
              </div>
              {candidateDetailsLoading ? (
                <div
                  className="candidate-info-modal-section-2 flex-1 "
                  style={{
                    maxWidth: 500,
                    maxHeight: "max-content",
                    overflowY: "auto",
                  }}
                >
                  <div className="candidate-info-modal-inner-section-1">
                    <Skeleton containerClassName="flex-1" height={30} />
                    <Skeleton containerClassName="flex-1" height={20} />
                  </div>
                  <div className="divider-line" />
                  <div className="candidate-info-modal-inner-section-1">
                    <Skeleton
                      containerClassName="flex-1"
                      height={50}
                      count={2}
                    />
                  </div>
                </div>
              ) : (
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
              )}
            </div>
          )}

          {selectedCandidateTab === "Jobs" &&
            (candidateJobData?.length > 0 ? (
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
                <div
                  className="display-column"
                  style={{ gap: 14, alignItems: "center" }}
                >
                  <JobIcon />
                  <div className="display-column" style={{ gap: 8 }}>
                    <p className="font-14-medium color-dark-black text-center">
                      No Jobs
                    </p>
                    <p className="font-14-regular color-grey text-center">
                      No jobs have been added to this candidate yet.
                    </p>
                  </div>
                </div>
              </div>
            ))}

          {selectedCandidateTab === "Attachments" &&
            (attachmentData?.length > 0 ? (
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
                  data={attachmentData}
                  onUpload={() => {
                    setAttachmentUploadModalVisible(true);
                  }}
                  onDelete={attachmentDeleteHandler}
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
                <div
                  className="display-column"
                  style={{ gap: 14, alignItems: "center" }}
                >
                  <AttachementIcon />
                  <div className="display-column" style={{ gap: 8 }}>
                    <p className="font-14-medium color-dark-black text-center">
                      No Attachments
                    </p>
                    <p className="font-14-regular color-grey text-center">
                      There are no attachments available for this candidate.
                    </p>
                  </div>
                </div>
                <CommonAddButton
                  title={"Upload"}
                  icon={<PlusIcon stroke="#FFFFFF" />}
                  btnStyle={{
                    alignSelf: "center",
                  }}
                  onClick={() => setAttachmentUploadModalVisible(true)}
                />
              </div>
            ))}

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

          {selectedCandidateTab === "Resume" && (
            <div className="display-flex flex-1">
              {selectedResumeTab === 1 && (
                <div
                  className="display-flex justify-center flex-1"
                  style={{
                    gap: 20,
                    padding: 16,
                    alignItems: "flex-start",
                  }}
                >
                  {resumeTabs?.map((item) => {
                    return (
                      <button
                        className="resume-tab-item"
                        onClick={() => {
                          if (item?.id === 1) {
                            navigate(item?.navigate);
                          } else {
                            setSelectedResumeTab(item?.id);
                          }
                        }}
                        key={item?.id}
                      >
                        <div>{item?.icon}</div>
                        <div
                          className="display-column"
                          style={{
                            gap: 6,

                            alignItems: "flex-start",
                          }}
                        >
                          <p className="font-14-regular color-dark-black">
                            {item?.name}
                          </p>
                          <p className="font-12-regular color-grey">
                            {item?.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
              {selectedResumeTab === 2 && (
                <div className="flex-1 display-column">
                  {renderCustomCVHeaderComponent()}
                  <div className="flex-1 display-flex align-center justify-center">
                    {renderEmptyCustomCVComponent()}
                  </div>
                </div>
              )}
              {selectedResumeTab === 3 && (
                <div className="flex-1 display-column">
                  {renderReportHeaderComponent()}
                  <div className="flex-1 display-flex align-center justify-center">
                    {renderEmptyReportComponent()}
                  </div>
                </div>
              )}
            </div>
          )}

          {selectedCandidateTab === "Calendar" && (
            <div
              className="flex-1 display-column"
              style={{
                padding: "10px 16px",
                overflow: "hidden",
              }}
            >
              <CalendarComponent />
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
          <button className="modal-next-btn" onClick={nextButtonClick}>
            <ModalNext />
          </button>
          <button className="modal-previous-btn" onClick={prevButtonClick}>
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
      <UploadDocumentModal
        visible={attachementUploadModalVisible}
        onClose={() => setAttachmentUploadModalVisible(false)}
        uploadedFiles={setAttachmentData}
        attachmentData={attachmentData}
      />
      <AddToJobsModal
        visible={addToJobsModalVisible}
        onClose={() => {
          setAddToJobsModalVisible(false);
        }}
      />
      <AddToFolderModal
        visible={addToFolderModalVisible}
        onClose={() => setAddToFolderModalVisible(false)}
        folders={setFolders}
      />
    </>
  );
};

export default CandidateInfoModal;
