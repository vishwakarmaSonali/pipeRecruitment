import React, { useRef, useState } from "react";
import "./Candidates.css";
import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { Avatar, Chip } from "@mui/material";
import RefreshButton from "../../../components/common/RefreshButton";
import ResumeUploadInfoTable from "../../../components/candidate/ResumeUploadInfoTable";
import { historyResumeData, resumeUploadedData } from "../../../helpers/config";
const SingleResumeHistoryPage = () => {
  const navigate = useNavigate();

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
        <div className="resume-history-header">
          <div className="display-column" style={{ gap: 8 }}>
            <p className="font-16-medium color-dark-black">
              Resume upload 01-04-2025 05:45:02
            </p>
            <p className="font-14-regular color-grey">
              3 file • January 04, 2025 • January 04, 2025
            </p>
          </div>
          <div className="display-flex align-center" style={{ gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar
                src={""}
                alt={"Grown"}
                style={{ width: 32, height: 32 }}
              />
              <span
                className="font-14-regular color-dark-black"
                style={{ marginLeft: "6px" }}
              >
                {"Grown"}
              </span>
            </div>
            <Chip
              label={"Completed"}
              style={{
                backgroundColor: "#46A13C1A",
                color: "#46A13C",
                padding: "6px 12px",
                fontSize: "12px",
                fontFamily: "Ubuntu",
                fontWeight: 400,
                borderRadius: "100px",
              }}
            />
            <RefreshButton />
          </div>
        </div>
        <div className="upload-resume-main-container">
          <ResumeUploadInfoTable data={resumeUploadedData} />
        </div>
      </div>
    </div>
  );
};

export default SingleResumeHistoryPage;
