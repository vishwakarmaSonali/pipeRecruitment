import React, { useState, useRef, useEffect } from "react";
import { Menu, MenuItem, ListItemIcon, Typography } from "@mui/material";
import { css } from "@emotion/react";
import "./Sourcing.css";
import SearchIcon from "../../../assets/icons/sourcingIcons/search-normal.svg";
import MessagesIcon from "../../../assets/icons/sourcingIcons/messages.svg";
import NotificationIcon from "../../../assets/icons/sourcingIcons/notification.svg";
import LocationPin from "../../../assets/icons/sourcingIcons/locationpin.svg";
import University from "../../../assets/icons/sourcingIcons/teacher.svg";
import ProfileImage from "../../../assets/images/profileImage.svg";
import ProfileAdd from "../../../assets/icons/sourcingIcons/profile-add.svg";
import jobIcon from "../../../assets/icons/sourcingIcons/briefcase.svg";
import FolderAdd from "../../../assets/icons/sourcingIcons/folder-add.svg";
import Download from "../../../assets/icons/sourcingIcons/download.svg";
import Tick from "../../../assets/icons/sourcingIcons/tick.svg";
import FilterIcon from "../../../assets/icons/filter.svg";
import DropArrow from "../../../assets/icons/droparrow.svg";
import LeftArrow from "../../../assets/icons/leftArrow.svg";
import RightArrow from "../../../assets/icons/rightArrow.svg";
import LinkedIn from "../../../assets/icons/sourcingIcons/linkedin.svg";
import FilterModal from "../../../components/filterModal/FilterModal";
import FolderModal from "../../../components/AddToFolderModals/AddModal";
import hiddenTalent from "../../../assets/images/SourcingImages/1.png"
import refineSearch from "../../../assets/images/SourcingImages/2.png"
import talentpipelines from "../../../assets/images/SourcingImages/3.png"
import Add from "../../../assets/icons/add.svg"
const skills = [
  "UI Design",
  "Wireframing",
  "UX Design",
  "Prototyping",
  "Graphics",
  "Typography",
  "Color Theory",
  "Illustration",
  "Designing",
  "Mapping",
  "Animation",
  "3D Modeling",
];
const candidates = [
  {
    id: 1,
    name: "Joanna Chou",
    position: "Sr. UI UX Designer at TechNova Solutions",
    location: "San Francisco, CA",
    education: "Rhode Island School of Design",
  },
  {
    id: 2,
    name: "David Kim",
    position: "Frontend Developer at WebWorks",
    location: "New York, NY",
    education: "MIT",
  },
  {
    id: 3,
    name: "Emily Johnson",
    position: "Product Manager at SoftCorp",
    location: "Austin, TX",
    education: "Stanford University",
  },
  {
    id: 4,
    name: "Michael Brown",
    position: "Graphic Designer at Creative Inc.",
    location: "Los Angeles, CA",
    education: "ArtCenter College of Design",
  },
  {
    id: 5,
    name: "Jessica Lee",
    position: "Marketing Specialist at GrowthHackers",
    location: "Seattle, WA",
    education: "Harvard University",
  },
  {
    id: 6,
    name: "Mark Smith",
    position: "Backend Engineer at DevTech",
    location: "Chicago, IL",
    education: "University of Chicago",
  },
  {
    id: 7,
    name: "Sophia White",
    position: "UX Researcher at Pixel Labs",
    location: "Denver, CO",
    education: "Carnegie Mellon University",
  },
  {
    id: 8,
    name: "Robert Wilson",
    position: "Data Scientist at DataWorld",
    location: "San Diego, CA",
    education: "UC Berkeley",
  },
  {
    id: 9,
    name: "Daniel Martinez",
    position: "AI Engineer at AI Innovations",
    location: "Boston, MA",
    education: "MIT",
  },
  {
    id: 10,
    name: "Laura Adams",
    position: "Digital Marketer at Trendy Ads",
    location: "Miami, FL",
    education: "Columbia University",
  },
];

const SkillsList = ({ isExpanded }) => {
  const maxRows = 2; // Maximum number of rows to display
  const [visibleSkills, setVisibleSkills] = useState([]);
  const [remainingCount, setRemainingCount] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    // Calculate the visible skills based on the available space
    const calculateSkills = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const skillWidth = 110; // Approximate width of a skill item
        const itemsPerRow = Math.floor(containerWidth / skillWidth);
        const maxVisible = itemsPerRow * maxRows;

        if (skills.length > maxVisible && !isExpanded) {
          setVisibleSkills(skills.slice(0, maxVisible - 1));
          setRemainingCount(skills.length - (maxVisible - 1));
        } else {
          setVisibleSkills(skills);
          setRemainingCount(0);
        }
      }
    };

    calculateSkills();
    window.addEventListener("resize", calculateSkills);
    return () => window.removeEventListener("resize", calculateSkills);
  }, [isExpanded]);

  return (
    <div ref={containerRef} className="py-[12px] bg-white">
      <div className="flex flex-wrap gap-2">
        {visibleSkills.map((skill, index) => (
          <div key={index} className="candidate-skill">
            {skill}
          </div>
        ))}

        {/* Show "+X more" button in the 2nd row if needed */}
        {remainingCount > 0 && (
          <div
            className="candidate-skill"
            onClick={() => setVisibleSkills(skills)}
          >
            +{remainingCount} more
          </div>
        )}
      </div>
    </div>
  );
};

const BulkActionView = ({
  toggleModal,
  isBulkAction,
  onSelectAll,
  isAllSelected,
  filters,  // Receive filters prop

}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const open = Boolean(anchorEl);

  // Function to calculate the number of applied filters
  const countAppliedFilters = () => {
    let count = 0;
    Object.values(filters).forEach((filter) => {
      if (typeof filter === "object") {
        // Count nested filters for years of experience and education
        Object.values(filter).forEach((nestedFilter) => {
          if (nestedFilter && nestedFilter.trim() !== "") count++;
        });
      } else if (filter && filter.trim() !== "") {
        count++;
      }
    });
    return count;
  };

  const filterCount = countAppliedFilters();

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
  const handleAddToFolderMenu = () => {
    handleClose();
    setModalOpen(true);
  };
  return (
    <div className="w-full bg-gray-100 p-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div
          className={`w-[20px] h-[20px] border border-customBlue rounded-[6px] flex items-center justify-center cursor-pointer`}
          onClick={onSelectAll}
        >
          {isAllSelected && <img src={Tick} alt="Selected" />}
        </div>

        <p className="text-gray-700 text-sm font-ubuntu">
          <span className="cursor-pointer text-sm font-ubuntu">1-100</span> of{" "}
          {candidates.length}
        </p>
      </div>

      <button
        className="text-white bg-buttonBLue px-[14px] py-[10px] rounded-[8px] flex items-center space-x-1 shadow-md hover:bg-opacity-80"
        onClick={isBulkAction ? handleClick : toggleModal}
      >
        <span className="font-ubuntu text-m">
          {isBulkAction ? "Bulk Action" : `Filter ${filterCount > 0 ? `(${filterCount})` : ""}`}
        </span>
        <img src={isBulkAction ? DropArrow : FilterIcon} alt="filter" />
      </button>

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
            <img src={ProfileAdd} alt="Add to candidate" />
          </ListItemIcon>
          <Typography
            sx={{ fontSize: "14px", fontFamily: "'Ubuntu', sans-serif" }}
          >
            Add to candidate
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <img src={jobIcon} alt="Add to jobs" />
          </ListItemIcon>
          <Typography
            sx={{ fontSize: "14px", fontFamily: "'Ubuntu', sans-serif" }}
          >
            Add to jobs
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleAddToFolderMenu}>
          <ListItemIcon>
            <img src={FolderAdd} alt="Add to folder" />
          </ListItemIcon>
          <Typography
            sx={{ fontSize: "14px", fontFamily: "'Ubuntu', sans-serif" }}
          >
            Add to folder
          </Typography>
        </MenuItem>
      </Menu>
      {modalOpen && (
        <FolderModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
};

const CandidateList = ({
  onSelect,
  selectedCandidateId,
  onCandidateSelect,
  selectedCandidates,
}) => {
  // const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="candidate-scroll">
      <div className="space-y-4 mb-[110px]">
        {/* Candidate Cards */}
        {candidates.map((candidate) => {
          console.log("cadidate selectssss", selectedCandidateId, candidate.id);
          return (
            <div
              key={candidate.id}
              className={`p-4 rounded-[14px]  bg-white flex flex-col cursor-pointer ${
                selectedCandidateId === candidate.id && window.innerWidth > 1024
                  ? "border-2 border-blue-500"
                  : ""
              }`}
              onClick={() => {
                onSelect(candidate);
              }}
            >
              {/* Candidate Details */}
              <div className="flex items-center space-x-2">
                {/* Checkbox */}
                <div
                  className={`w-[20px] h-[20px] border  border-customBlue bg-white  rounded-[6px]  flex items-center justify-center cursor-pointer`}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent candidate card click event
                    onCandidateSelect(candidate.id);
                  }}
                >
                  {selectedCandidates.includes(candidate.id) && (
                    <img src={Tick} alt="Selected" />
                  )}
                </div>

                {/* Profile Image */}
                <div className="candidate-profile-div">
                  <img
                    src={ProfileImage}
                    alt="Profile"
                    className="w-[46px] h-[46px] rounded-[100px]"
                  />
                </div>

                {/* Candidate Info */}
                <div className="flex flex-col ml-4">
                  <p className="candidate-name">{candidate.name}</p>
                  <p className="candidate-designation">{candidate.position}</p>
                </div>
              </div>

              {/* Dotted Line */}
              <div className="border-b border-dashed border-customGray my-[12px]"></div>

              {/* Location and University Info */}
              <div className="flex items-center space-x-[12px] pb-[12px]">
                <img
                  src={LocationPin}
                  alt="Location Icon"
                  className="w-5 h-5"
                />
                <text className="candidate-location-designation-text">
                  {candidate.location}
                </text>
              </div>
              <div className="flex items-center space-x-[12px]">
                <img
                  src={University}
                  alt="University Icon"
                  className="w-5 h-5"
                />
                <p className="candidate-location-designation-text font-ubuntu">
                  Rhode Island School of Design
                </p>
              </div>
              {/* Skills Grid */}
              <SkillsList isExpanded={false} />
              <div className="flex items-center justify-between">
                <text className="font-ubuntu text-sm text-customGray">
                  Contact information:
                </text>
                <img src={LinkedIn} alt="linkedin" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ExperienceEducation = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3 bg-white items-start">
      {/* Experience Section */}
      <div className="details-griddiv">
        <p className="details-title">EXPERIENCE</p>
        <div className="divider-border"></div>
        <div className="space-y-4">
          <div>
            <p className="main-title">
              Senior UI/UX Designer at TechNova Solutions
            </p>
            <p className="main-title location-university-text-weight">
              San Francisco, CA
            </p>
            <p className="main-title location-university-text-color">
              March 2020 - Present
            </p>
          </div>

          <div>
            <p className="main-title">UI/UX Designer at PixelBright Studios</p>
            <p className="main-title location-university-text-weight">
              Los Angeles, CA
            </p>
            <p className="main-title location-university-text-color">
              May 2016 - February 2020
            </p>
          </div>

          <div>
            <p className="main-title">
              Junior UI/UX Designer at DesignHive Creative Agency
            </p>
            <p className="main-title location-university-text-weight">
              Austin, TX
            </p>
            <p className="main-title location-university-text-color">
              June 2014 - April 2026
            </p>
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div className="details-griddiv">
        <p className="details-title">EDUCATION</p>
        <div className="divider-border"></div>
        <div className="space-y-4">
          <div>
            <p className="main-title">
              Master of Fine Arts in Interaction Design
            </p>
            <p className="main-title location-university-text-weight">
              Rhode Island School of Design
            </p>
            <p className="main-title location-university-text-color">
              August 2012 - May 2014
            </p>
          </div>

          <div>
            <p className="main-title">Bachelor of Arts in Graphic Design</p>
            <p className="main-title location-university-text-weight">
              California College of the Arts
            </p>
            <p className="main-title location-university-text-color">
              August 2008 - May 2012
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CandidateDetails = ({ selectedCandidate }) => {
  const [modalOpen, setModalOpen] = useState(false);

  if (!selectedCandidate) {
    return (
      <div className="w-3/5 flex items-center justify-center text-gray-500 text-lg">
        Select a candidate to view details
      </div>
    );
  }

  return (
    <>
      {/* detail header */}
      <div className="flex items-center justify-between ">
        {/* profile and name and actions */}
        <div className="items-center flex space-x-[10px] ">
          <img
            src={ProfileImage}
            alt="profileImage"
            className="h-[52px] w-[52px] rounded-[100px]"
          />
          <text className="detail-profile-name">{selectedCandidate.name}</text>
        </div>
        {/* profile actions */}
        <div className="flex items-center justify-between space-x-[12px]">
          <div className="relative group">
            <img
              src={ProfileAdd}
              alt="Profile Add"
              className="proifle-action-icon"
            />
            <span className="dilogbox">Add to candidate</span>
          </div>

          <div className="relative group">
            <img
              src={jobIcon}
              alt="jobIcon Add"
              className="proifle-action-icon"
            />
            <span className="dilogbox">Add to Job</span>
          </div>

          <div className="relative group" onClick={() => setModalOpen(true)}>
            <img
              src={FolderAdd}
              alt="Folder Add"
              className="proifle-action-icon"
            />
            <span className="dilogbox">Add to Folder</span>
          </div>

          <div className="relative group">
            <img
              src={Download}
              alt="Download"
              className="proifle-action-icon"
            />
            <span className="dilogbox">Download resume</span>
          </div>
        </div>
      </div>

      {/* skills div */}
      <div className="details-specific-div">
        <text className="details-title">SKILLS</text>
        <SkillsList isExpanded={true} />
      </div>
      <div className="details-specific-div">
        <text className="details-title">PERSONAL DETAILS</text>
        <div className="divider-border"></div>
        {/* personal details grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-[8px]">
            <p className="grid-title">Location:</p>
            <p className="grid-title">Email:</p>
            <p className="grid-title">Phone Number:</p>
            <p className="grid-title">Linked In:</p>
            <p className="grid-title">Languages:</p>
          </div>

          <div className="space-y-2">
            <p className="grid-desc">San Francisco, CA</p>
            <p className="grid-desc">joanna.chou@example.com</p>
            <p className="grid-desc">+1-415-123-4567</p>
            <p className="grid-desc">linkedin.com/in/joannachou</p>
            <div className="flex space-x-2">
              <span className="language">English</span>
              <span className="language">Mandarin</span>
              <span className="language">Spanish</span>
            </div>
          </div>
        </div>
      </div>
      <ExperienceEducation />
      {modalOpen && (
        <FolderModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
};

const PaginationFooter = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 1154;

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="fixed bottom-0 w-screen bg-gray-100 py-2 flex items-center justify-center shadow-md">
      <div className="flex items-center space-x-4">
        {/* Previous Page Button */}
        <button
          className={`px-3 py-1 rounded-md ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-black"
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
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-black"
          }`}
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <img src={RightArrow} alt="leftArrow" />
        </button>
      </div>
    </div>
  );
};
const NoFiltersScreen = ({ onStartSearching }) => {
  return (
    <div className="flex flex-col overfloy-hidden bg-white items-center justify-center h-screen text-center ">
     
      <div className=" max-w-[680px] text-center " >
        <h2 className="font-ubuntu text-3xl text-customBlue  text-center font-medium z-50 w-25">
          Expand Your Talent Search with Our Sourcing Hub
        </h2>
        <ul className="flex justify-between items-center gap-6  p-0 mt-6" >
          <li>
            <img className="w-40 h-40 mx-auto" src={hiddenTalent} alt="find hidden talent" />
            <div className="flex flex-col  mt-2 space-y-1">
          <span className="font-ubuntu font-medium text-m text-customBlue ">Find Hidden Talent</span>
          <span className="font-ubuntu font-normal text-m text-customGray ">Discover qualified professionals who may not be actively job hunting</span>
        </div>
          </li>
          <li>
            <img className="w-40 h-40 mx-auto" src={refineSearch} alt="refien your search" />
         <div className="flex flex-col  mt-2 space-y-1">
         <span className="font-ubuntu font-medium text-m text-customBlue">Refine Your Search</span>
         <span className="font-ubuntu font-normal text-m text-customGray ">Use advance filters to find the perfect candidates.</span>
         </div>
          </li>
          <li>
            <img className="w-40 h-40 mx-auto" src={talentpipelines} alt="talent pipelines" />
         <div className="flex flex-col  mt-2 space-y-1">
         <span className="font-ubuntu font-medium text-m text-customBlue">Create Robust Talent Pipelines</span>
         <span className="font-ubuntu font-normal text-m text-customGray ">Track and organize candidates to maintain a steady flow of top talent.</span>
         </div>
          </li>
        </ul>
        <button
          className="text-white text-ubuntu text-m bg-buttonBLue px-[14px] py-[10px] rounded-[8px] mt-[60px] space-x-1 shadow-md hover:bg-opacity-80"
          onClick={onStartSearching}
        >
          {" Start Searching +"}
        </button>
        <div className="flex place-items-center  max-h-sm mt-[90px]">
          <span className="font-ubuntu text-xs text-customBlue ">Our platform uses trusted third-party data to offer a separate external candidate database, keeping your internal data secure and private.  <span className="buttonBLue  cursor-pointer">Learn more about data usage.</span></span>
         
        </div>
      </div>
    </div>
  );
};
const Sourcing = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(candidates[0]);
  const [selectedCandidates, setSelectedCandidates] = useState([]); // Store selected candidates
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [filters, setFilters] = useState({
    jobTitle: "",
    location: "",
    company: "",
    yearsOfExperience: { from: "", to: "" },
    industry: "",
    education: { major: "", school: "", degree: "" },
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage filter modal state
  const [isCandidateModalVisible, setIsCandidateModalVisible] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // const [addToFolderModalVisible, setAddToFolderModalVisible] = useState(false);
  // Function to toggle modal visibility
  const toggleModal = () => {
    console.log("Modal toggle triggered");
    setIsModalOpen((prev) => !prev);
  };
  // Function to toggle the filter modal
  const toggleCandidateModal = () => {
    setIsCandidateModalVisible(!isCandidateModalVisible);
  };
  // Function to handle applying filters
  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    setFiltersApplied(true);
    setIsModalOpen(false);
  };

  // Function to reset filters
  const resetFilters = () => {
    setFilters({
      jobTitle: "",
      location: "",
      company: "",
      yearsOfExperience: { from: "", to: "" },
      industry: "",
      education: { major: "", school: "", degree: "" },
    });
    setFiltersApplied(false);
  };
  // Function to select/deselect all candidates
  const handleSelectAll = () => {
    if (selectedCandidates.length === candidates.length) {
      setSelectedCandidates([]); // Deselect all
    } else {
      setSelectedCandidates(candidates.map((candidate) => candidate.id)); // Select all
    }
  };
  // Handle individual candidate selection
  const handleCandidateSelect = (candidateId) => {
    setSelectedCandidates((prevSelected) =>
      prevSelected.includes(candidateId)
        ? prevSelected.filter((id) => id !== candidateId)
        : [...prevSelected, candidateId]
    );
  };
  const handleCandidateSelectContainer = (candidateId) => {
    setSelectedCandidate(candidateId);
    if (window.innerWidth >= 768 && window.innerWidth < 1024) {
      console.log("called");
      setIsCandidateModalVisible(true);
    }
  };
  // Handle search expansion
  const handleSearchExpand = () => {
    setIsSearchExpanded(true);
  };

  // Handle search cancel
  const handleSearchCancel = () => {
    setIsSearchExpanded(false);
    setSearchQuery("");
  };
  return (
    <div className="w-full h-screen bg-gray-100 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-between bg-white shadow-sm w-full h-auto lg:h-16  px-2 py-2 header-container">
       
      {isSearchExpanded ? (
          <div className="flex items-center justify-between w-full px-4">
            <div className="relative w-full md:flex  font-ubuntu font-normal  px-10 h-[40px] text-sm text-gray-700 bg-gray-100 rounded-[8px] focus:outline-none focus:ring-1  transition-all duration-300 ease-in-out flex items-center">
            <img src={SearchIcon} alt="Search" className="search-icon" onClick={handleSearchExpand} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-100 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            </div>
            <button
              onClick={handleSearchCancel}
              className="ml-4 text-buttonBLue font-ubuntu font-medium cursor-pointer MD:FLEX"
            >
              Cancel
            </button>
          </div>
        ) :(<>
       <h1 className="header-title">Sourcing Hub</h1>
        {/* Icons Section */}
        <div className="flex items-center header-icons-container space-x-2">
          {/* Search Input */}
          <div className="relative hidden md:hidden lg:flex ">
            <img src={SearchIcon} alt="Search" className="search-icon" onClick={handleSearchExpand} />
            <input
              type="text"
              placeholder=""
              className="search-input focus:outline-none focus:ring-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="header-icons search xl:hidden" onClick={handleSearchExpand}>
            <img src={SearchIcon} alt="Search" />
          </button>
          <div className="header-icons">
            <img src={Add} alt="MessagesIcon" />
          </div>
          <div className="header-icons">
            <img src={MessagesIcon} alt="MessagesIcon" />
          </div>
          <div className="header-icons">
            <img src={NotificationIcon} alt="MessagesIcon" />
          </div>
          <div className="profile-div">
            <img src={ProfileImage} alt="MessagesIcon" />
          </div>
        </div></>)}
      </div>
      {/* Count and Filter Section */}

      {/* Count and Filter Section */}
      {/* Add filters or actions here if needed */}
      <div className="overflow-auto h-screen mb-[90px] scroll-width-none">
        {!filtersApplied ? (
          <div className=" items-center justify-center min-h-screen overflow-auto scroll-width-none">
            <NoFiltersScreen onStartSearching={toggleModal} />
          </div>
        ) : (
          <div className="overflow-hidden scroll-width-none">
            {/* ScrollView */}
            <BulkActionView
              toggleModal={toggleModal}
              isBulkAction={selectedCandidates.length > 1}
              onSelectAll={handleSelectAll}
              isAllSelected={selectedCandidates.length === candidates.length}
              filters={filters}  // Pass filters as a prop
            />
            <div className="w-full scroll-width-none h-screen overflow-hidden flex">
              {/* Candidate List Section */}
              <div className="candidate-list w-full lg:w-[40%] px-4">
                <CandidateList
                  onSelect={handleCandidateSelectContainer}
                  selectedCandidateId={selectedCandidate?.id}
                  onCandidateSelect={handleCandidateSelect}
                  selectedCandidates={selectedCandidates}
                />
              </div>

              {/* Candidate Details Section */}
              <div className="candidate-details hidden lg:block p-4 h-auto">
                <CandidateDetails selectedCandidate={selectedCandidate} />
              </div>
            </div>
            <PaginationFooter />
          </div>
        )}
      </div>
      {/* Filter Modal */}
      {isCandidateModalVisible && (
        <div>
          <div
            className="fixed top-0 right-0 h-full w-full bg-black bg-opacity-50 z-40"
            onClick={toggleCandidateModal}
          ></div>

          <div className="fixed top-0 right-0 h-full w-[80%] bg-white shadow-lg transform transition-transform duration-300 z-50">
            <div className="p-[20px] flex flex-col h-full">
              <div className="flex justify-between items-center pb-[32px]">
                <h2 className="text-xxl font-ubuntu font-medium text-gray-800">
                  Candidate Details
                </h2>
                <button
                  onClick={toggleCandidateModal}
                  className="text-customBlue hover:text-gray-900"
                >
                  ✕
                </button>
              </div>
              <div className="flex-1 overflow-autoscroll-width-none">
                <CandidateDetails selectedCandidate={selectedCandidate} />
              </div>
            </div>
          </div>
        </div>
      )}
      <FilterModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        onApply={applyFilters}
        onReset={resetFilters}
        filters={filters}
      />
    </div>
  );
};

export default Sourcing;
