import React, { useState, useEffect, useRef } from "react";
import "./Candidates.css";

import { ReactComponent as CandidatesIcon } from "../../../assets/icons/candidates/candidateFilled.svg";
import { ReactComponent as Folder } from "../../../assets/icons/candidates/folderCandidates.svg";
import { ReactComponent as SourcingIcon } from "../../../assets/icons/candidates/document-cloud.svg";
import { ReactComponent as Plus } from "../../../assets/icons/plus.svg";
import { ReactComponent as FilterIcon } from "../../../assets/icons/filter.svg";
import { ReactComponent as ThreeDots } from "../../../assets/icons/threeDots.svg";
import { ReactComponent as RefreshIcon } from "../../../assets/icons/refresh.svg";
import { ReactComponent as DropArrow } from "../../../assets/icons/droparrow.svg";
import { ReactComponent as EditIcon } from "../../../assets/icons/candidates/edit-2.svg";
import { ReactComponent as AddToJobsIcon } from "../../../assets/icons/sourcingIcons/briefcase.svg";
import { ReactComponent as AddtoFolderIcon } from "../../../assets/icons/sourcingIcons/folder-add.svg";
import { ReactComponent as EditUser } from "../../../assets/icons/user-edit.svg";
import { ReactComponent as MergeDuplicateIcon } from "../../../assets/icons/merge.svg";
import { ReactComponent as ArchiveIcon } from "../../../assets/icons/archive.svg";
import { ReactComponent as DownloadIcon } from "../../../assets/icons/sourcingIcons/download.svg";
import { ReactComponent as DocumentSign } from "../../../assets/icons/candidates/edit-2.svg";
import close from "../../../assets/icons/close.svg";
import SettingIcon from "../../../assets/icons/setting-2.svg";
import LeftArrow from "../../../assets/icons/leftArrow.svg";
import RightArrow from "../../../assets/icons/rightArrow.svg";
import Tick from "../../../assets/icons/sourcingIcons/tick.svg";
import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/Header/Header";
import CreateCandidateModal from "../../../components/modals/CreateCandidateModal";
import { useModal } from "../../../components/common/ModalProvider";
import CreateCandidateFormModal from "../../../components/modals/CreateCandidateFormModal";
import SmartGenerateModal from "../../../components/modals/SmartGenerateModal";
import UploadResumeCandidateModal from "../../../components/modals/UploadResumeCandidateModal";
import GlobalMenu from "../../../components/GlobalMenu/GlobalMenu";
import SearchableMenu from "../../../components/SearchableMenu/SearchableMenu";
import FilterMenu from "../../../components/FilterMenu/FilterMenu";
import SaveFiltersModal from "../../../components/modals/SaveFiltersModal";

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
  const { modals, setModalVisibility } = useModal();
  const [activeTab, setActiveTab] = useState("candidates");
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [anchorBulkActionEl, setAnchorBulkActionEl] = useState(null);
  const openBulkAction = Boolean(anchorBulkActionEl);
  const [anchorSettingEl, setAnchorSettingEl] = useState(null);
  const openSetting = Boolean(anchorSettingEl);
  const [anchorAddConditionEl, setAnchorAddConditionEl] = useState(null);
  const openAddCondition = Boolean(anchorAddConditionEl);
  const [anchorFilterMenuEl, setAnchorFilterMenuEl] = useState(null);
  const openFilterMenu = Boolean(anchorFilterMenuEl);
  const [isFilter, setIsFilter] = useState(false);
  const [selectedSearchableOption, setSelectedSearchableOption] = useState("");
  const [filterSelection, setFilterSelection] = useState("");
  const [filterInput, setFilterInput] = useState("");
  const [conditions, setConditions] = useState([]); // Store multiple conditions

  const [finalCondition, setFinalCondition] = useState(""); // Stores the final string

  const bulkMenuItems = [
    {
      label: "Add to jobs",
      icon: <AddToJobsIcon />,
      onClick: () => console.log("Add to jobs"),
    },
    {
      label: "Add to folder",
      icon: <AddtoFolderIcon />,
      onClick: () => console.log("Add to folder"),
    },
    {
      label: "Edit Owner",
      icon: <EditUser />,
      onClick: () => console.log("Edit Owner"),
    },
    ...(selectedCandidates.length > 1
      ? [
          {
            label: "Merge Duplicate",
            icon: <MergeDuplicateIcon />,
            onClick: () => console.log("Merge Duplicate"),
          },
        ]
      : []),
    {
      label: "Document Signing",
      icon: <DocumentSign />,
      onClick: () => console.log("Document Signing"),
    },
    {
      label: "Archive",
      icon: <ArchiveIcon />,
      onClick: () => console.log("Archive"),
    },
  ];
  const threeDotsMenuItems = [
    {
      label: "Edit Columns",
      icon: <EditIcon />,
      onClick: () => console.log("Edit Columns"),
    },
    {
      label: "Export",
      icon: <DownloadIcon />,
      onClick: () => console.log("Export"),
    },
  ];
  const settingsMenuItems = [
    {
      label: "Save filter",

      onClick: (event) => (
        setModalVisibility("saveFiltersModalVisible", true),
        handleSettingsClose()
      ),
    },
    {
      label: "Clear all filters",

      onClick: (event) => handleSettingsClose(),
    },
  ];

  // 🔍 Searchable Menu Items
  const searchableMenuItems = [
    {
      label: "Candidate Name",
      onClick: (event) => handleSearchableSelect("Candidate Name", event),
    },
    {
      label: "Email Id",
      onClick: (event) => handleSearchableSelect("Email Id", event),
    },
    {
      label: "Contact Number",
      onClick: (event) => handleSearchableSelect("Contact Number", event),
    },
    {
      label: "Location",
      onClick: (event) => handleSearchableSelect("Location", event),
    },
    {
      label: "Nationality",
      onClick: (event) => handleSearchableSelect("Nationality", event),
    },
    {
      label: "Language",
      onClick: (event) => handleSearchableSelect("Language", event),
    },
    {
      label: "ATS Score",
      onClick: (event) => handleSearchableSelect("ATS Score", event),
    },
    {
      label: "Created By",
      onClick: (event) => handleSearchableSelect("Created By", event),
    },
  ];
  const handleSeacrchableMenuOpen = (event) => {
    setAnchorAddConditionEl(event.currentTarget);
  };

  const handleSearchableMenuClose = () => {
    setAnchorAddConditionEl(null);
  };
  // ✅ Handle Selection from Searchable Menu
  const handleSearchableSelect = (selected, event) => {
    setSelectedSearchableOption(selected);
    handleSearchableMenuClose(); // Close searchable menu
    setAnchorFilterMenuEl(event.currentTarget); // Set position for filter menu
  };

  // ✅ Handle Filter Menu Apply
  const handleFilterApply = (filterOption, inputValue) => {
    const newCondition = `${selectedSearchableOption} ${filterOption} ${inputValue}`;
    setConditions([...conditions, newCondition]); // Add condition to array
    setAnchorFilterMenuEl(null);
  };

  // ❌ Remove a condition
  const removeCondition = (index) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  // ✅ Toggle individual candidate selection
  const handleCandidateSelection = (id) => {
    setSelectedCandidates(
      (prevSelected) =>
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

  // Function to handle opening the dropdown menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickBulkAction = (event) => {
    setAnchorBulkActionEl(event.currentTarget);
  };
  const handleClickSetting = (event) => {
    setAnchorSettingEl(event.currentTarget);
  };

  // Function to handle closing the dropdown menu
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSettingsClose = () => {
    setAnchorSettingEl(null);
  };
  const handleCloseBulkAction = () => {
    setAnchorBulkActionEl(null);
  };
  const handleFilterMenuOpen = (event) => {
    setAnchorFilterMenuEl(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setAnchorFilterMenuEl(null);
  };
  // ✅ Handle Bulk Action Click (Customize as Needed)
  const handleBulkAction = () => {
    alert(`Performing bulk action on ${selectedCandidates.length} candidates!`);
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
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
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

        {/* Results Per Page Dropdown */}
        <div
          className="relative flex items-center space-x-2 justify-end w-1/4"
          ref={dropdownRef}
        >
          <span className="text-sm font-ubuntu text-customGray">
            Results per page
          </span>
          <button
            className="border border-customGray rounded-md px-2 py-1 gap-1 text-sm font-ubuntu focus:outline-none focus:ring-0 relative items-center flex"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {resultsPerPage}
            <DropArrow fill="customBlue" />
          </button>

          {/* Dropdown Menu (Positioned Above) */}
          {isDropdownOpen && (
            <div className="absolute bottom-full mb-2 right-0 w-16 text-sm font-ubuntu bg-white shadow-lg rounded-lg overflow-hidden z-50">
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
  const handleApplyFilter = () => {
    console.log("Applied Filters:", conditions);
  };
  return (
    <div
      className="w-full h-screen bg-white overflow-hidden overscroll-none"
      style={{ boxSizing: "border-box", display: "flex" }}
    >
      <Sidebar />
      <div
        className="overflow-auto scroll-width-none bg-grey-90"
        style={{ flex: 1, display: "flex", flexDirection: "column" }}
      >
        <Header title={"Candidates"} />

        {/* Tabs Section */}

        <div className="flex items-center justify-between p-[17px]">
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
            {/* ✅ Dynamically Change Button */}
            {selectedCandidates.length > 1 ? (
              <button
                className="buttons text-white bg-buttonBLue"
                onClick={handleBulkAction}
              >
                Bulk Action <DropArrow fill="white" />
              </button>
            ) : (
              <button
                className="buttons  text-white  bg-buttonBLue"
                onClick={() =>
                  setModalVisibility("createCandidateModalVisible", true)
                }
              >
                Create Candidate
                <Plus />
              </button>
            )}

            {/* ✅ Dynamically Change Button */}

            <button
              className="buttons text-white bg-buttonBLue"
              onClick={() => setIsFilter(!isFilter)}
            >
              Filter <FilterIcon />
            </button>

            <button className="buttons border border-blue-600 text-buttonBLue ">
              Refresh
              <RefreshIcon />
            </button>
            <button className="text-gray-700 pl-[8px]" onClick={handleClick}>
              <ThreeDots />
            </button>
          </div>
        </div>

        {/* filter div */}
        {isFilter && (
          <div className="flex items-center justify-between p-[10px]">
            {/* Display Applied Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              {conditions.length > 0 && (
                <div className=" flex flex-wrap gap-2">
                  {conditions.map((condition, index) => (
                    <span
                      key={index}
                      className="border border-customGray text-customBlue px-3 py-1 rounded-lg text-sm flex items-center"
                    >
                      {condition}
                      <button
                        className="ml-2 text-red-500 hover:text-red-700"
                        onClick={() => removeCondition(index)}
                      >
                        <img src={close} height={8} width={8} alt="close" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <div onClick={handleSeacrchableMenuOpen}>
                <span className="text-buttonBLue font-ubuntu text-sm cursor-pointer">
                  + Add condition
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-[8px]">
              <button
                className={`buttons border border-blue-600 text-buttonBLue cursor-pointer ${
                  conditions.length > 0 ? "text-buttonBLue" : "text-customGray"
                }`}
                onClick={handleApplyFilter}
                disabled={conditions.length > 0}
              >
                Apply filter
              </button>
              <button
                className="buttons border border-blue-600 justify-center text-buttonBLue min-w-[120px]"
                onClick={handleClickSetting}
              >
                <img src={SettingIcon} alt="settings" />
              </button>
            </div>
          </div>
        )}
        {/* Table Wrapper with Horizontal Scroll */}

        <div className="overflow-x-auto px-[10px] scroll-width-none bg-white shadow-md ">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="sticky top-0 bg-white z-[50] ">
              <tr className="text-left text-gray-600 font-semibold">
                <th className="th-title sticky top-0 bg-blueBg z-[50]">
                  <div
                    className={`w-[20px] h-[20px] border border-customBlue bg-white  rounded-[6px]  flex items-center justify-center cursor-pointer`}
                    onClick={handleSelectAll}
                  >
                    {selectedCandidates.length === candidates.length ? (
                      <img src={Tick} alt="Selected" />
                    ) : null}
                  </div>
                </th>
                <th className="th-title bg-blueBg max-w-60 min-w-60">
                  Candidate Name
                </th>
                <th className="th-title bg-blueBg max-w-40 min-w-40">
                  Reference ID
                </th>
                <th className="th-title bg-blueBg max-w-60 min-w-40">
                  Location
                </th>
                <th className="th-title bg-blueBg max-w-60 min-w-40">
                  Current Company
                </th>
                <th className="th-title bg-blueBg max-w-60 min-w-40">
                  Current Position
                </th>
                <th className="th-title bg-blueBg max-w-60 min-w-40">
                  Email ID
                </th>
                <th className="th-title bg-blueBg max-w-40 min-w-40">
                  Contact
                </th>
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
                      {selectedCandidates.includes(candidate.id) ? (
                        <img src={Tick} alt="Selected" />
                      ) : null}
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

      <CreateCandidateModal
        visible={modals?.createCandidateModalVisible}
        onClose={() => setModalVisibility("createCandidateModalVisible", false)}
      />
      <CreateCandidateFormModal
        visible={modals?.createCandidateFormModalVisible}
        onClose={() =>
          setModalVisibility("createCandidateFormModalVisible", false)
        }
      />
      <SaveFiltersModal
        visible={modals?.saveFiltersModalVisible}
        onClose={() => setModalVisibility("saveFiltersModalVisible", false)}
        selectedConditions={conditions} // Pass selected conditions
      />
      <SmartGenerateModal
        visible={modals?.smartGenerateModalVisible}
        onClose={() => setModalVisibility("smartGenerateModalVisible", false)}
      />
      <UploadResumeCandidateModal
        visible={modals?.uploadResumeCandidateModalVisible}
        onClose={() =>
          setModalVisibility("uploadResumeCandidateModalVisible", false)
        }
      />
      <GlobalMenu
        anchorEl={anchorBulkActionEl}
        open={openBulkAction}
        onClose={handleCloseBulkAction}
        menuItems={bulkMenuItems}
      />
      {/* menu for three dots menu */}
      <GlobalMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        menuItems={threeDotsMenuItems}
      />
      <GlobalMenu
        anchorEl={anchorSettingEl}
        open={openSetting}
        onClose={handleSettingsClose}
        menuItems={settingsMenuItems}
      />
      {/* 🔍 Searchable Menu */}
      <SearchableMenu
        anchorEl={anchorAddConditionEl}
        open={Boolean(anchorAddConditionEl)}
        onClose={handleSearchableMenuClose}
        menuItems={searchableMenuItems}
      />

      {/* 🔹 Filter Menu (Opens after selection from Searchable Menu) */}
      <FilterMenu
        anchorEl={anchorFilterMenuEl}
        open={Boolean(anchorFilterMenuEl)}
        onClose={() => setAnchorFilterMenuEl(null)}
        selectedOption={selectedSearchableOption}
        onApply={handleFilterApply}
      />
    </div>
  );
};

export default Candidates;
