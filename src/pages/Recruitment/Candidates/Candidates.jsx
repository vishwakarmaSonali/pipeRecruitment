import React, { useState,useEffect,useRef } from "react";
import "./Candidates.css";
import { Menu, MenuItem, ListItemIcon, Typography } from "@mui/material";
import { css } from "@emotion/react";

import { ReactComponent as CandidatesIcon } from "../../../assets/icons/candidates/candidateFilled.svg";
import { ReactComponent as Folder } from "../../../assets/icons/candidates/folderCandidates.svg";
import { ReactComponent as SourcingIcon } from "../../../assets/icons/candidates/document-cloud.svg";
import { ReactComponent as Plus } from "../../../assets/icons/plus.svg";
import { ReactComponent as FilterIcon } from "../../../assets/icons/filter.svg";
import { ReactComponent as ThreeDots } from "../../../assets/icons/threeDots.svg";
import { ReactComponent as RefreshIcon } from "../../../assets/icons/refresh.svg";
import { ReactComponent as DropArrow } from "../../../assets/icons/droparrow.svg";
import { ReactComponent as EditIcon } from "../../../assets/icons/candidates/edit-2.svg";
import { ReactComponent as DownloadIcon } from "../../../assets/icons/sourcingIcons/download.svg";
import LeftArrow from "../../../assets/icons/leftArrow.svg";
import RightArrow from "../../../assets/icons/rightArrow.svg";
import Tick from "../../../assets/icons/sourcingIcons/tick.svg";
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
    email: "sarah.j@innovatesol.com",
    contact: "+1-647-9876",
  },
  {
    id: 3,
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
    id: 4,
    name: "Sarah Johnson",
    initials: "SJ",
    referenceId: "Z4K7M",
    location: "Toronto, Canada",
    company: "Innovate Solutions",
    position: "Project Manager",
    email: "sarah.j@innovatesol.com",
    contact: "+1-647-9876",
  },
  {
    id: 5,
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
    id: 6,
    name: "Sarah Johnson",
    initials: "SJ",
    referenceId: "Z4K7M",
    location: "Toronto, Canada",
    company: "Innovate Solutions",
    position: "Project Manager",
    email: "sarah.j@innovatesol.com",
    contact: "+1-647-9876",
  },
  {
    id: 7,
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
    id: 8,
    name: "Sarah Johnson",
    initials: "SJ",
    referenceId: "Z4K7M",
    location: "Toronto, Canada",
    company: "Innovate Solutions",
    position: "Project Manager",
    email: "sarah.j@innovatesol.com",
    contact: "+1-647-9876",
  },
  {
    id: 9,
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
    id: 10,
    name: "Sarah Johnson",
    initials: "SJ",
    referenceId: "Z4K7M",
    location: "Toronto, Canada",
    company: "Innovate Solutions",
    position: "Project Manager",
    email: "sarah.j@innovatesol.com",
    contact: "+1-647-9876",
  },
  {
    id: 11,
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
    id: 12,
    name: "Sarah Johnson",
    initials: "SJ",
    referenceId: "Z4K7M",
    location: "Toronto, Canada",
    company: "Innovate Solutions",
    position: "Project Manager",
    email: "sarah.j@innovatesol.com",
    contact: "+1-647-9876",
  },
  {
    id: 13,
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
    id: 14,
    name: "Sarah Johnson",
    initials: "SJ",
    referenceId: "Z4K7M",
    location: "Toronto, Canada",
    company: "Innovate Solutions",
    position: "Project Manager",
    email: "sarah.j@innovatesol.com",
    contact: "+1-647-9876",
  },
  {
    id: 15,
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
    id: 16,
    name: "Sarah Johnson",
    initials: "SJ",
    referenceId: "Z4K7M",
    location: "Toronto, Canada",
    company: "Innovate Solutions",
    position: "Project Manager",
    email: "sarah.j@innovatesol.com",
    contact: "+1-647-9876",
  },
  {
    id: 17,
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
    id: 18,
    name: "Sarah Johnson",
    initials: "SJ",
    referenceId: "Z4K7M",
    location: "Toronto, Canada",
    company: "Innovate Solutions",
    position: "Project Manager",
    email: "sarah.j@innovatesol.com",
    contact: "+1-647-9876",
  },
  {
    id: 19,
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
    id: 20,
    name: "Sarah Johnson",
    initials: "SJ",
    referenceId: "Z4K7M",
    location: "Toronto, Canada",
    company: "Innovate Solutions",
    position: "Project Manager",
    email: "sarah.j@innovatesol.com",
    contact: "+1-647-9876",
  },
  {
    id: 21,
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
    id: 22,
    name: "Sarah Johnson",
    initials: "SJ",
    referenceId: "Z4K7M",
    location: "Toronto, Canada",
    company: "Innovate Solutions",
    position: "Project Manager",
    email: "sarah.j@innovatesol.com",
    contact: "+1-647-9876",
  },
  {
    id: 23,
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
    id: 24,
    name: "Sarah Johnson",
    initials: "SJ",
    referenceId: "Z4K7M",
    location: "Toronto, Canada",
    company: "Innovate Solutions",
    position: "Project Manager",
    email: "sarah.j@innovatesol.com",
    contact: "+1-647-9876",
  },
  {
    id: 25,
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
    id: 26,
    name: "Sarah Johnson",
    initials: "SJ",
    referenceId: "Z4K7M",
    location: "Toronto, Canada",
    company: "Innovate Solutions",
    position: "Project Manager",
    email: "sarah.j@innovatesol.com",
    contact: "+1-647-9876",
  },
  {
    id: 27,
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
    id: 28,
    name: "Sarah Johnson",
    initials: "SJ",
    referenceId: "Z4K7M",
    location: "Toronto, Canada",
    company: "Innovate Solutions",
    position: "Project Manager",
    email: "sarah.j@innovatesol.com",
    contact: "+1-647-9876",
  },
  {
    id: 28,
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
    id: 30,
    name: "Sarah Johnson",
    initials: "SJ",
    referenceId: "Z4K7M",
    location: "Toronto, Canada",
    company: "Innovate Solutions",
    position: "Project Manager",
    email: "sarah.j@innovatesol.com",
    contact: "+1-647-9876",
  },
  {
    id: 31,
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
    id: 32,
    name: "Sarah Johnson",
    initials: "SJ",
    referenceId: "Z4K7M",
    location: "Toronto, Canada",
    company: "Innovate Solutions",
    position: "Project Manager",
    email: "sarah.j@innovatesol.com",
    contact: "+1-647-9876",
  },
  {
    id: 33,
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
    id: 34,
    name: "Sarah Johnson",
    initials: "SJ",
    referenceId: "Z4K7M",
    location: "Toronto, Canada",
    company: "Innovate Solutions",
    position: "Project Manager",
    email: "sarah.j@innovatesol.com",
    contact: "+1-647-9876",
  },
  {
    id: 35,
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
    id: 36,
    name: "Sarah Johnson",
    initials: "SJ",
    referenceId: "Z4K7M",
    location: "Toronto, Canada",
    company: "Innovate Solutions",
    position: "Project Manager",
    email: "sarah.j@innovatesol.com",
    contact: "+1-647-9876",
  },
  {
    id: 37,
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
    id: 38,
    name: "Sarah Johnson",
    initials: "SJ",
    referenceId: "Z4K7M",
    location: "Toronto, Canada",
    company: "Innovate Solutions",
    position: "Project Manager",
    email: "sarah.j@innovatesol.com",
    contact: "+1-647-9876",
  },
  {
    id: 39,
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
    id: 40,
    name: "Sarah Johnson",
    initials: "SJ",
    referenceId: "Z4K7M",
    location: "Toronto, Canada",
    company: "Innovate Solutions",
    position: "Project Manager",
    email: "sarah.j@innovatesol.com",
    contact: "+1-647-9876",
  },
];

const Candidates = ({ isDrawerOpen }) => {
  const [activeTab, setActiveTab] = useState("candidates");
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);


  // ✅ Toggle individual candidate selection
  const handleCandidateSelection = (id) => {
    setSelectedCandidates((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((candidateId) => candidateId !== id) // Deselect
        : [...prevSelected, id] // Select
    );
  };

  // ✅ Select/Deselect All Candidates
  const handleSelectAll = () => {
    if (selectedCandidates.length === candidates.length) {
      setSelectedCandidates([]); // Deselect all
    } else {
      setSelectedCandidates(candidates.map((candidate) => candidate.id)); // Select all
    }
  };
    // ✅ Handle Bulk Action Click (Customize as Needed)
    const handleBulkAction = () => {
      alert(`Performing bulk action on ${selectedCandidates.length} candidates!`);
    };
    const menuItemStyle = css`
    font-size: 14px;
    font-weight: 500;
   text:'ubuntu'
  fontFamily: "'Ubuntu', sans-serif",  // Apply Ubuntu font
   color: #333;
    &:hover {
      background-color: #f0f0f0;
  
    }
  `;
    // Function to handle opening the dropdown menu
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    // Function to handle closing the dropdown menu
    const handleClose = () => {
      setAnchorEl(null);
    };
    const PaginationFooter = () => {
      const [currentPage, setCurrentPage] = useState(1);
      const [resultsPerPage, setResultsPerPage] = useState(20);
      const [isDropdownOpen, setIsDropdownOpen] = useState(false);
      const totalPages = 1154;
      const dropdownRef = useRef(null);
    
      const handlePageClick = (page) => {
        setCurrentPage(page);
      };
    
      const handleResultsChange = (value) => {
        setResultsPerPage(value);
        setIsDropdownOpen(false);
        setCurrentPage(1); // Reset to first page when changing results per page
      };
    
      // ✅ Close dropdown when clicking outside
      useEffect(() => {
        function handleClickOutside(event) {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
          }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);
    

      return (
        <div className="fixed bottom-0 w-screen bg-gray-100 py-2 flex items-center justify-between px-6 shadow-md">
           <div className="w-1/4"></div>
          {/* Pagination Controls */}
          <div className="flex items-center space-x-4 justify-center w-1/2">
          {/* Previous Page Button */}
            <button
              className={`px-3 py-1 rounded-md ${
                currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-black"
              }`}
              onClick={() => handlePageClick(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <img src={LeftArrow} alt="leftArrow" />
            </button>
    
            {/* Page Numbers */}
            <div className="flex items-center space-x-2 text-gray-700">
              {[1, 2, 3, 4].map((page) => (
                <button
                  key={page}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === page
                      ? "text-blue-600 font-ubuntu font-medium text-sm"
                      : "text-gray-700 font-ubuntu font-medium text-sm"
                  }`}
                  onClick={() => handlePageClick(page)}
                >
                  {page}
                </button>
              ))}
    
              {/* Ellipsis */}
              <span className="text-gray-500">...</span>
    
              {/* Last Page Number */}
              <button
                className={`px-3 py-1 rounded-md ${
                  currentPage === totalPages
                    ? "text-blue-600 font-ubuntu font-medium text-sm"
                    : "text-gray-700 font-ubuntu font-medium text-sm"
                }`}
                onClick={() => handlePageClick(totalPages)}
              >
                {totalPages}
              </button>
            </div>
    
            {/* Next Page Button */}
            <button
              className={`px-3 py-1 rounded-md ${
                currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-black"
              }`}
              onClick={() => handlePageClick(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <img src={RightArrow} alt="leftArrow" />
            </button>
          </div>
    
          {/* Results Per Page Dropdown */}
          <div className="relative flex items-center space-x-2 justify-end w-1/4" ref={dropdownRef}>
          <span className="text-sm font-ubuntu text-customGray">Results per page</span>
            <button
              className="border border-customGray rounded-md px-2 py-1 gap-1 text-sm font-ubuntu focus:outline-none focus:ring-0 relative items-center flex"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {resultsPerPage}
              <DropArrow fill="customBlue" />
            </button>
    
            {/* Dropdown Menu (Positioned Above) */}
            {isDropdownOpen && (
              <div
                className="absolute bottom-full mb-2 right-0 w-16 text-sm font-ubuntu bg-white shadow-lg rounded-lg overflow-hidden z-50"
              >
                {[10, 20, 30, 40, 50].map((option) => (
                  <button
                    key={option}
                    className="block w-full text-center px-4 py-2 text-customBlue hover:bg-gray-100"
                    onClick={() => handleResultsChange(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    };
  return (
    <div
      className="w-full h-screen bg-gray-100 overflow-hidden overscroll-none"
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
              <Folder
                fill={activeTab === "folder" ? "customBlue" : "#797979"}
              />
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
                  activeTab === "sourcing"
                    ? "text-customBlue"
                    : "text-customGray"
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

           
               {/* ✅ Dynamically Change Button */}
               {selectedCandidates.length > 1 ? (
              <button className="buttons text-white bg-buttonBLue" onClick={handleBulkAction}>
                Bulk Action <DropArrow fill="white" />
              </button>
            ) : (
              <button className="buttons text-white bg-buttonBLue">
                Filter <FilterIcon />
              </button>
            )}
            <button className="buttons border border-buttonBLue text-buttonBLue ">
              Refresh
              <RefreshIcon />
            </button>
            <button className="text-gray-700 pl-[8px]" onClick={handleClick}>
              <ThreeDots />
            </button>
          </div>
          {/* Table Wrapper with Horizontal Scroll */}
        </div>
        <div className="overflow-x-auto px-[10px] scroll-width-none bg-white shadow-md ">
          <table className="min-w-full divide-y divide-gray-200">
    
            <thead className="bg-blueBg top-0 z-50">
              <tr className="text-left text-gray-600 font-semibold ">
                <th className="th-title  justify-center">
                  <div
                    className={`w-[20px] h-[20px] border border-customBlue bg-white  rounded-[6px]  flex items-center justify-center cursor-pointer`}
                    onClick={handleSelectAll}
                  >
                     {selectedCandidates.length === candidates.length ? <img src={Tick} alt="Selected" /> : null}
                  </div>
                </th>
                <th className="th-title max-w-60 min-w-40">Candidate Name</th>
                <th className="th-title max-w-40 min-w-40">Reference ID</th>
                <th className="th-title max-w-60 min-w-40">Location</th>
                <th className="th-title max-w-60 min-w-40">Current Company</th>
                <th className="th-title max-w-60 min-w-40">Current Position</th>
                <th className="th-title max-w-60 min-w-40">Email ID</th>
                <th className="th-title max-w-40 min-w-40">Contact</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody className="divide-y divide-gray-200 mx-4">
              {candidates.map((candidate) => (
                <tr key={candidate.id} className="hover:bg-gray-50">
                  <td className="px-2">
                    <div
                      className={`w-[20px] h-[20px] border border-customBlue bg-white rounded-[6px] flex items-center justify-center cursor-pointer`}
                      onClick={() => handleCandidateSelection(candidate.id)}
                    >
                    {selectedCandidates.includes(candidate.id) ? <img src={Tick} alt="Selected" /> : null}
                    </div>
                  </td>
                  <td className="td-text flex items-center gap-2">
                    {/* Circle with Initials */}
                    <div className="w-8 h-8 rounded-3xl p-2 bg-orange-300 flex items-center justify-center text-white font-bold">
                      {candidate.initials}
                    </div>
                    {candidate.name}
                  </td>
                  <td className="td-text max-w-[180px]">
                    {candidate.referenceId}
                  </td>
                  <td className="td-text">{candidate.location}</td>
                  <td className="td-text">{candidate.company}</td>
                  <td className="td-text">{candidate.position}</td>
                  <td className="td-text text-blue-500">{candidate.email}</td>
                  <td className="td-text">{candidate.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <PaginationFooter />
       {/* Menu for Bulk Actions */}
       <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: "12px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            width: "180px",
            padding: "5px 0",
            marginTop: "5px",
            fontFamily: "'Ubuntu', sans-serif", // Apply Ubuntu font
            fontSize: "14px",
            color: "#151B23",
          },
        }}
      >
        <MenuItem onClick={handleClose} css={menuItemStyle}>
          <ListItemIcon>
           <EditIcon />
          </ListItemIcon>
          <Typography
            sx={{ fontSize: "16px", fontFamily: "'Ubuntu', sans-serif" }}
          >
            Edit Columns
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose} css={menuItemStyle}>
          <ListItemIcon>
           <DownloadIcon />
          </ListItemIcon>
          <Typography
            sx={{ fontSize: "16px", fontFamily: "'Ubuntu', sans-serif" }}
          >
           Export
          </Typography>
        </MenuItem>
     
       
      </Menu>
    </div>
  );
};

export default Candidates;
