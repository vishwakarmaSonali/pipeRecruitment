import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./Candidates.css";
import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/Header/Header";
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
import { Avatar } from "@mui/material";
import { getRandomColor } from "../../../helpers/utils";
import { update } from "lodash";

const candidateInfoTabs = [
  {
    id: 1,
    name: "Summary",
    icon: <ResumeIcon />,
    selected: true,
  },
  {
    id: 2,
    name: "Resume",
    icon: <ResumeIcon />,
    selected: false,
  },
  {
    id: 3,
    name: "Jobs",
    icon: <JobIcon />,
    count: "04",
    selected: false,
  },
  {
    id: 4,
    name: "Inbox",
    icon: <InboxIcon />,
    selected: false,
  },
  {
    id: 5,
    name: "Calendar",
    icon: <CalendarIcon />,
    selected: false,
  },
  {
    id: 6,
    name: "Enrich User Profile",
    icon: <PenIcon />,
    selected: false,
  },
  {
    id: 7,
    name: "Notes",
    icon: <NoteIcon />,
    count: "02",
    selected: false,
  },
  {
    id: 8,
    name: "Attachments",
    icon: <AttachmentIcon />,
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
    <div
      className="w-full h-screen overflow-hidden overscroll-none"
      style={{ boxSizing: "border-box", display: "flex" }}
    >
      <Sidebar />
      <div
        className="overflow-auto scroll-width-none "
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fff",
        }}
      >
        <Header />
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
                    {React.cloneElement(
                      item?.icon,
                      item?.name !== "Attachments"
                        ? {
                            fill: item?.selected ? "#151B23" : "#797979",
                          }
                        : {
                            stroke: item?.selected ? "#151B23" : "#797979",
                          }
                    )}
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
            <button>
              <MoreIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateInfo;
