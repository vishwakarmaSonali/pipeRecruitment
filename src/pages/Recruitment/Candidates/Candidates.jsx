import React, { useState } from "react";
import "./Candidates.css";
import { ReactComponent as CandidatesIcon } from "../../../assets/icons/candidates/candidateFilled.svg";
import { ReactComponent as Folder } from "../../../assets/icons/candidates/folderCandidates.svg";
import { ReactComponent as SourcingIcon } from "../../../assets/icons/candidates/document-cloud.svg";
import { ReactComponent as Plus } from "../../../assets/icons/plus.svg";
import { ReactComponent as FilterIcon } from "../../../assets/icons/filter.svg";
import { ReactComponent as ThreeDots } from "../../../assets/icons/threeDots.svg";
import { ReactComponent as RefreshIcon } from "../../../assets/icons/refresh.svg";

const Candidates = ({ isDrawerOpen }) => {
  const [activeTab, setActiveTab] = useState("candidates");

  return (
    <div
      style={{
        width: "100%",
        boxSizing: "border-box",
        paddingLeft: window.innerHeight >= 1024 && "240px",
      }}
      className={`w-full bg-white p-4 transition-all duration-300 mt-[68px]`}
    >
      {/* Tabs Section */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-6 border-b border-customGray">
          <button
            className={`flex items-center space-x-2 py-2 px-3 text-sm font-medium ${
              activeTab === "candidates"
                ? "text-black border-b border-black"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("candidates")}
          >
            <CandidatesIcon
              fill={activeTab === "candidates" ? "customBlue" : "#797979"}
            />
            <span
              className={`tab-title-text ${
                activeTab === "candidates"
                  ? "text-customBlue"
                  : "text-customGray"
              }`}
            >
              Candidates
            </span>
          </button>

          <button
            className={`flex items-center space-x-2 py-2 px-3 text-sm font-medium ${
              activeTab === "folder"
                ? "text-black border-b-2 border-black"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("folder")}
          >
            <Folder fill={activeTab === "folder" ? "customBlue" : "#797979"} />
            <span
              className={`tab-title-text ${
                activeTab === "folder" ? "text-customBlue" : "text-customGray"
              }`}
            >
              Folder
            </span>
          </button>

          <button
            className={`flex items-center space-x-2 py-2 px-3 text-sm font-medium ${
              activeTab === "sourcing"
                ? "text-black border-b-2 border-black"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("sourcing")}
          >
            <SourcingIcon
              fill={activeTab === "sourcing" ? "customBlue" : "#797979"}
            />
            <span
              className={`tab-title-text ${
                activeTab === "sourcing" ? "text-customBlue" : "text-customGray"
              }`}
            >
              Sourcing
            </span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button className="buttons  text-white  bg-buttonBLue">
            Create Candidate
            <Plus />
          </button>

          <button className="buttons  text-white   bg-buttonBLue">
            Filter
            <FilterIcon />
          </button>
          <button className="buttons border border-buttonBLue text-buttonBLue "> 
          Refresh
            <RefreshIcon />
          </button>
          <button className="text-gray-700 pl-[8px]">
           
            <ThreeDots />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Candidates;
