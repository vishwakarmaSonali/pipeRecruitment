import React, { useState } from "react";
import "./Candidates.css";
import { ReactComponent as CandidatesIcon } from "../../../assets/icons/candidates/candidateFilled.svg";
import { ReactComponent as Folder } from "../../../assets/icons/candidates/folderCandidates.svg";
import { ReactComponent as SourcingIcon } from "../../../assets/icons/candidates/document-cloud.svg";
import { ReactComponent as Plus } from "../../../assets/icons/plus.svg";
import { ReactComponent as FilterIcon } from "../../../assets/icons/filter.svg";
import { ReactComponent as ThreeDots } from "../../../assets/icons/threeDots.svg";
import { ReactComponent as RefreshIcon } from "../../../assets/icons/refresh.svg";
import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/Header/Header";

  const candidates = [
    {
      id: 1,
      name: "Michael Bennett",
      initials: "MB",
      referenceId: "B1X3A",
      location: "New York, USA",
      company: "TechSavvy Inc.",
      position: "Software Engineer",
      email: "michael.b@techsavvy.com",
      contact: "+1-555-1234",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      initials: "SJ",
      referenceId: "Z4K7M",
      location: "Toronto, Canada",
      company: "Innovate Solutions",
      position: "Project Manager",
      email: "sarah.j@innovate.com",
      contact: "+1-647-9876",
    },
    {
      id: 3,
      name: "Priya Sharma",
      initials: "PS",
      referenceId: "PSL9B",
      location: "Mumbai, India",
      company: "DesignScape Studios",
      position: "UI/UX Designer",
      email: "priya.s@designscape.com",
      contact: "+91-9876543210",
    },
    {
      id: 4,
      name: "Ahmed Khan",
      initials: "AK",
      referenceId: "A8C2Z",
      location: "Dubai, UAE",
      company: "GulfTech Ltd.",
      position: "Systems Analyst",
      email: "ahmed.k@gulftech.ae",
      contact: "+971-501234567",
    },
    {
      id: 5,
      name: "Emily Zhang",
      initials: "EZ",
      referenceId: "E6T7N",
      location: "Shanghai, China",
      company: "DragonSoft Co.",
      position: "Data Scientist",
      email: "emily.z@dragonsoft.cn",
      contact: "+86-2156789012",
    },
    {
      id: 6,
      name: "John Carter",
      initials: "JC",
      referenceId: "J2V5L",
      location: "Sydney, Australia",
      company: "WebWave Solutions",
      position: "Web Developer",
      email: "john.c@webwave.com.au",
      contact: "+61-2456789123",
    },
    {
      id: 7,
      name: "Maria Gonzalez",
      initials: "MG",
      referenceId: "M4R7X",
      location: "Madrid, Spain",
      company: "FutureNet Systems",
      position: "Network Administrator",
      email: "maria.g@futurenet.es",
      contact: "+34-914567890",
    },
    {
      id: 8,
      name: "Hiroshi Tanaka",
      initials: "HT",
      referenceId: "H8Y5W",
      location: "Tokyo, Japan",
      company: "Nippon Innovations",
      position: "AI Specialist",
      email: "hiroshi.t@nipponinno.jp",
      contact: "+81-3567890123",
    },
    {
      id: 9,
      name: "Julia Brown",
      initials: "JB",
      referenceId: "J1Q7P",
      location: "London, UK",
      company: "BrightSide Corp.",
      position: "Marketing Manager",
      email: "julia.b@brightside.co.uk",
      contact: "+44-2081234567",
    },
    {
      id: 10,
      name: "William Davis",
      initials: "WD",
      referenceId: "W5K2F",
      location: "Chicago, USA",
      company: "Skyline Ventures",
      position: "Financial Analyst",
      email: "william.d@skylinevc.com",
      contact: "+1-312-567890",
    },
  ];

const Candidates = ({ isDrawerOpen }) => {
  const [activeTab, setActiveTab] = useState("candidates");

  return (
    <div
    className="w-screen  bg-gray-100 overflow-hidden"
    style={{ boxSizing: "border-box", display: "flex" }}
  >
    <Sidebar />
    <div
        className="overflow-auto scroll-width-none bg-grey-90" 
        style={{ flex: 1, display: "flex", flexDirection: "column" }}
      >
        <Header title={"Candidates"} />
       
      {/* Tabs Section */}

      <div className="flex items-center justify-between p-4">
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
                ? "text-black border-b border-black"
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
                ? "text-black border-b border-black"
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
           {/* Table Wrapper with Horizontal Scroll */}
      </div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table Header */}
          <thead className="bg-blueBg top-0 z-50">
            <tr className="text-left text-gray-600 font-semibold">
              <th className="px-4 py-3">
                <input type="checkbox" className="cursor-pointer" />
              </th>
              <th className="px-4 py-3">Candidate Name</th>
              <th className="px-4 py-3">Reference ID</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Current Company</th>
              <th className="px-4 py-3">Current Position</th>
              <th className="px-4 py-3">Email ID</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Current Company</th>
              <th className="px-4 py-3">Current Position</th>
              <th className="px-4 py-3">Email ID</th>
              <th className="px-4 py-3">Contact</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-200">
            {candidates.map((candidate) => (
              <tr key={candidate.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <input type="checkbox" className="cursor-pointer" />
                </td>
                <td className="px-4 py-3 flex items-center gap-2">
                  {/* Circle with Initials */}
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
                    {candidate.initials}
                  </div>
                  {candidate.name}
                </td>
                <td className="px-4 py-3">{candidate.referenceId}</td>
                <td className="px-4 py-3">{candidate.location}</td>
                <td className="px-4 py-3">{candidate.company}</td>
                <td className="px-4 py-3">{candidate.position}</td>
                <td className="px-4 py-3 text-blue-500">{candidate.email}</td>
                <td className="px-4 py-3">{candidate.contact}</td>
                <td className="px-4 py-3">{candidate.company}</td>
                <td className="px-4 py-3">{candidate.position}</td>
                <td className="px-4 py-3 text-blue-500">{candidate.email}</td>
                <td className="px-4 py-3">{candidate.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default Candidates;
