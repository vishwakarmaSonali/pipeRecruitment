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

const CandidateInfo = () => {
  const randomColor = getRandomColor();
  const [candidateTabs, setCandidateTabs] = useState(candidateInfoTabs);
  const [selectedCandidateTab, setSelectedCandidateTab] = useState("Summary");
  const [anchorEl, setAnchorEl] = useState(null);
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
  return (
    <div className="sourcing-main-container">
      <Navbar />
      <div
        className="overflow-auto scroll-width-none "
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fff",
        }}
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
              <button className="customize-btn">
                Customize
                <SettingIcon />
              </button>
              <button onClick={handleMenuClick}>
                <MoreIcon />
              </button>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: commonStyle.sx,
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
      </div>
    </div>
  );
};

export default CandidateInfo;
