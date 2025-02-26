import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./Candidates.css";

import { ReactComponent as ResumeIcon } from "./assets/resume.svg";
import { ReactComponent as JobIcon } from "./assets/jobs.svg";
import { ReactComponent as InboxIcon } from "./assets/inbox.svg";
import { ReactComponent as CalendarIcon } from "./assets/calendar.svg";
import { ReactComponent as PenIcon } from "./assets/pen.svg";
import { ReactComponent as NoteIcon } from "./assets/note.svg";
import { ReactComponent as AttachmentIcon } from "./assets/attachment.svg";
import { ReactComponent as LabelIcon } from "./assets/label.svg";
import { ReactComponent as AddIcon } from "./assets/add.svg";
import { ReactComponent as MoreIcon } from "./assets/more.svg";
import { ReactComponent as SettingIcon } from "./assets/setting.svg";
import { ReactComponent as AddJobIcon } from "./assets/addJob.svg";
import { ReactComponent as AddFolderIcon } from "./assets/addFolder.svg";
import { ReactComponent as MarkProfileIcon } from "./assets/profile-tick.svg";
import { ReactComponent as DownloadIcon } from "./assets/download.svg";
import { ReactComponent as ArchiveIcon } from "./assets/archive.svg";
import { Avatar } from "@mui/material";
import { getRandomColor } from "../../../helpers/utils";
import { Menu } from "@mui/material";
import Navbar from "../../../components/navbar/Navbar";
import { commonStyle } from "../../../helpers/config";
import CandidateDetails from "../../../components/candidate/CandidateDetails";
import CandidateLog from "../../../components/candidate/CandidateLog";
import AddCommonCandidateInfo from "../../../components/candidate/AddCommonCandidateInfo";
import CandidateInfoSkills from "../../../components/candidate/CandidateInfoSkills";
import CandidateInfoExperience from "../../../components/candidate/CandidateInfoExperience";
import CandidateInfoJobs from "../../../components/candidate/CandidateInfoJobs";
import CandidateInfoHistory from "../../../components/candidate/CandidateInfoHistory";
import CandidateInfoModal from "../../../components/modals/CandidateInfoModal";
import { useModal } from "../../../components/common/ModalProvider";
import { ReactComponent as OriginalResumeIcon } from "../../../assets/images/resume/original.svg";
import { ReactComponent as CvIcon } from "../../../assets/images/resume/cv.svg";
import { ReactComponent as ReportIcon } from "../../../assets/images/resume/report.svg";

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

const resumeTabs = [
  {
    id: 1,
    name: "Original",
    desc: "View candidate’s original resume",
    icon: <OriginalResumeIcon />,
    navigate: "#",
  },
  {
    id: 2,
    name: "Custom CV",
    desc: "Create and modify candidate’s custom CV",
    icon: <CvIcon />,
    navigate: "#",
  },
  {
    id: 3,
    name: "Report",
    desc: "Create and modify candidate’s report",
    icon: <ReportIcon />,
    navigate: "#",
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
  "Candidate Name": "Priya Sharma",
  "Candidate First Name": "Priya",
  "Candidate Last Name": "Sharma",
  "Candidate Reference": "P5L9B",
  Gender: "Female",
  Diploma: "",
  University: "National Institute of Design (NID), Ahmedabad",
  "Current Company": "DesignScape Studios",
  "Current Position": "UI/UX Designer",
  "Candidate Location": "Mumbai, India",
  "Date of Birth": "September 14, 1990",
  "Candidate Address": "Mumbai, India",
  "Candidate Email Id": "priya.s@designscape.com",
  "Candidate Phone": "+91-98765-43210",
  Skype: "",
  "Other Contact": "",
};

const placementDetailsData = {
  "Employment Status": "",
  "Hired Date": "",
  "Start Date": "",
  "Probation End Date": "",
  "Left Date": "",
  "Placement Job": "",
  "Placement Client": "",
};

const aditionalInfoData = {
  "Candidate Department": "Design",
  "Candidate Domain": "Design & Technology",
  "Years of Experience": "1-2 years",
  "Graduation Date": "2019",
  "Current Salary": "12 LPA",
  "Current Benefits": "",
  "Notice Period": "1-month",
  "Expected Salary": "",
  "Expected Benefits:": "",
  Nationalities: "Indian",
  Languages: "English, Hindi",
  "Candidate Reference Name": "",
  "GDPR Consent": "",
  "GDPR Consent Date": "",
  "Candidate Description": "",
  "Email Consent": "",
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

const experienceData = [
  {
    id: 1,
    position: "UI/UX Designer",
    company: "DesignScape Studios",
    location: "Mumbai, India",
    startDate: "March 2021",
    endDate: "Present",
  },
  {
    id: 2,
    position: "Junior UI/UX Designer",
    company: "PixelCraft Solutions",
    location: "Bangalore, India",
    startDate: "July 2019",
    endDate: "February 2021",
  },
];

const educationData = [
  {
    id: 1,
    degree: "Bachelor of Design (B.Des)",
    course: "Visual Communication",
    collage: "National Institute of Design (NID), Ahmedabad",
    startDate: "2015",
    endDate: "2019",
  },
];

const jobData = [
  {
    id: 1,
    jobName: "DesignScape Studios",
    type: "Client Interview",
  },
  {
    id: 2,
    jobName: "UpTech",
    type: "New Candidate",
  },
  {
    id: 3,
    jobName: "NordSoft Solutions",
    type: "New Candidate",
  },
  {
    id: 4,
    jobName: "Even Solutions",
    type: "New Candidate",
  },
  {
    id: 5,
    jobName: "Passion Infotech",
    type: "Client Interview",
  },
  {
    id: 6,
    jobName: "BlueDesign Studio",
    type: "Assignment",
  },
  {
    id: 7,
    jobName: "TechWave",
    type: "New Candidate",
  },
];

const historyData = [
  {
    id: 1,
    name: "Priya Sharma",
    content: "3 months ago (December 28, 2024)",
  },
];

const CandidateInfo = () => {
  const { modals, setModalVisibility } = useModal();
  const [candidateTabs, setCandidateTabs] = useState(candidateInfoTabs);
  const [selectedCandidateTab, setSelectedCandidateTab] = useState("Summary");
  const [anchorEl, setAnchorEl] = useState(null);
  const [randomColor, setRandomColor] = useState([]);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const random = getRandomColor();
    setRandomColor(random);
  }, []);

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
  return (
    <div className="candidate-info-main-container">
      <Navbar />
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
                  {/* {React.cloneElement(
                      item?.icon,
                      item?.name !== "Attachments"
                        ? {
                            fill: item?.selected ? "#151B23" : "#797979",
                          }
                        : {
                            stroke: item?.selected ? "#151B23" : "#797979",
                          }
                    )} */}
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
            <button
              className="customize-btn"
              onClick={() =>
                setModalVisibility("candidateInfoModalVisible", true)
              }
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
      {/* <div className="candidate-info-inner-container">
        {selectedCandidateTab === "Summary" && (
          <div className="candidate-info-summary-container">
            <div className="min-width-45 flex-1">
              <CandidateDetails
                details={candidateDetailsData}
                label={"Candidate Details"}
              />
            </div>
            <div className="min-width-45 flex-1 ">
              <CandidateDetails
                details={placementDetailsData}
                label={"Placement Details"}
              />
            </div>
            <div className="min-width-45 flex-1 ">
              <CandidateLog />
            </div>
            <div className="min-width-45 flex-1 ">
              <CandidateInfoHistory data={historyData} />
            </div>
            <div className="min-width-45 flex-1 ">
              <AddCommonCandidateInfo label={"Recent Notes"} />
            </div>
            <div className="min-width-45 flex-1 ">
              <AddCommonCandidateInfo label={"Addresses"} />
            </div>
            <div className="min-width-45 flex-1 ">
              <AddCommonCandidateInfo label={"Department"} />
            </div>
            <div className="min-width-45 flex-1 ">
              <AddCommonCandidateInfo label={"Emergency Contacts"} />
            </div>
            <div className="min-width-45 flex-1 ">
              <CandidateInfoSkills skillData={skillData} />
            </div>
            <div className="min-width-45 flex-1 ">
              <CandidateDetails
                details={aditionalInfoData}
                label={"Additional Information"}
              />
            </div>
            <div className="min-width-45 flex-1 ">
              <CandidateInfoExperience
                label={"Experience"}
                data={experienceData}
              />
            </div>
            <div className="min-width-45 flex-1 ">
              <CandidateInfoExperience
                label={"Education"}
                data={educationData}
              />
            </div>
            <div className="min-width-45 flex-1 ">
              <CandidateInfoJobs data={jobData} />
            </div>
            <div className="min-width-45 flex-1 ">
              <AddCommonCandidateInfo label={"Folders"} />
            </div>
          </div>
        )}
      </div> */}
      <CandidateInfoModal
        visible={modals?.candidateInfoModalVisible}
        onClose={() => setModalVisibility("candidateInfoModalVisible", false)}
      />
    </div>
  );
};

export default CandidateInfo;
