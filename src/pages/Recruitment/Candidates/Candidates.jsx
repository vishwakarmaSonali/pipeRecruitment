import React, { useState, useEffect, useRef } from "react";
import "./Candidates.css";
import { useSelector } from "react-redux"; // Import Redux selector

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
import { ReactComponent as ExportIcon } from "../../../assets/icons/export.svg";
import { ReactComponent as ColumnIcon } from "../../../assets/icons/columns.svg";
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
import EditColumnModal from "../../../components/modals/EditColumns";
import { candidates } from "../../../helpers/dataCandidates";
import { updateFilterAsync } from "../../../store/filterSlice";
import { useDispatch } from "react-redux";
import Navbar from "../../../components/navbar/Navbar";
import ColumnSelector from "../../../components/ColumnSelector";
import CandidateFilterDrawer from "../../../components/candidate/CandidateFilterModal"
import CreateCandidatesMenu from "./CreateCandidatesMenu";
import CreateCandidateMenu from "./CreateCandidatesMenu";

const Candidates = ({ isDrawerOpen }) => {
  const dispatch = useDispatch();
  const [candidateList, setCandidateList] = useState(candidates);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Candidates");
  const selectedColumns = useSelector((state) => state.columns.selected); // Get selected columns from Redux
  const savedFilters = useSelector((state) => state.filters.filters); // Get saved filters from Redux
  const [isFilterSaved, setIsFilterSaved] = useState(false);
  const [isColumnSelectorOpen, setIsColumnSelectorOpen] = useState(false);
    const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
      const [filtersApplied, setFiltersApplied] = useState(false);
      const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [filters, setFilters] = useState({
        jobTitle: "",
        location: "",
        company: "",
        yearsOfExperience: { from: "", to: "" },
        industry: "",
        radius: "",
        skill: "",
        education: { major: "", school: "", degree: "" },
    });
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
      onClick: (event) => (
        setModalVisibility("editColumnModalVisible", true), handleClose()
      ),
    },
    {
      label: "Export",
      icon: <DownloadIcon />,
      onClick: () => console.log("Export"),
    },
  ];
  const toggleFilterDrawer = (open) => {
  
    setFilterDrawerOpen(open);
  };
  const applyFilters = (newFilters) => {
    console.log(">>>>>>>>>>>>>>>>>>>>>newFilters", newFilters);
    setFilters(newFilters);
    setFiltersApplied(true);
    toggleFilterDrawer(false);
  };

  // Function to reset filters
  const resetFilters = () => {
    setFilters({
      jobTitle: "",
      location: "",
      company: "",
      yearsOfExperience: { from: "", to: "" },
      industry: "",
      radius: "",
      education: { major: "", school: "", degree: "" },
    });
    setFiltersApplied(false);
  };
  const [anchorCreateCandidtaeEl, setAnchorCreateCandidtaeEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorCreateCandidtaeEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorCreateCandidtaeEl(null);
  };
  // Settings menu items
  const settingsMenuItems = isFilterSaved
    ? [
        {
          label: "Update filter",
          onClick: () => (updateFilter(), handleSettingsClose()),
        },
        {
          label: "Save as new filter",
          onClick: () => (
            setModalVisibility("saveFiltersModalVisible", true),
            handleSettingsClose()
          ),
        },
        {
          label: "Discard changes",
          onClick: () => (discardChanges(), handleSettingsClose()),
        },
        {
          label: "Clear all filters",
          onClick: () => (clearAllFilters(), handleSettingsClose()),
        },
      ]
    : [
        {
          label: "Save filter",
          onClick: () => (
            setModalVisibility("saveFiltersModalVisible", true),
            handleSettingsClose()
          ),
        },
        {
          label: "Clear all filters",
          onClick: () => (clearAllFilters(), handleSettingsClose()),
        },
      ];
  // 🔍 Map formatted column names to actual data keys
  const columnMapping = {
    "Candidate Name": "candidate_name",
    "Candidate First Name": "candidate_first_name",
    "Candidate Last Name": "candidate_last_name",
    "Reference Id": "reference_id",
    Location: "location",
    Gender: "gender",
    Diploma: "diploma",
    University: "university",
    "Current Company": "current_company",
    "Current Position": "current_position",
    Email: "email",
    Birthdate: "birthDate",
    "Candidate Address": "candidate_address",
    "Employment Status": "employment_status",
    "Contact Number": "phone",
    "Hired Date": "hired_date",
    "Start Date": "start_date",
    "ATS score": "ats_score",
    "Created Date": "created_at",
    "Created By": "created_by",
  };
  // 🔍 Searchable Menu Items
  const initialSearchableItems = [
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

  const [searchableMenuItems, setSearchableMenuItems] = useState(
    initialSearchableItems
  );
  const { modals, setModalVisibility } = useModal();
  const [activeTab, setActiveTab] = useState("candidates");
  const [searchQuery, setSearchQuery] = useState("");
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
  const [originalConditions, setOriginalConditions] = useState([]);
  const [conditions, setConditions] = useState([]); // Store multiple conditions

  // useEffect(() => {
  //   if (conditions.length === 0) {
  //     setSearchableMenuItems([...initialSearchableItems]); // Restore all items when no filters remain
  //   }
  // }, [conditions]);

  const applySavedFilter = (filterName) => {
    const selectedFilter = savedFilters.find(
      (filter) => filter.name === filterName
    );
    if (selectedFilter) {
      setConditions(selectedFilter.conditions);
      setOriginalConditions([...selectedFilter.conditions]);
      setIsFilterSaved(true);
      setSelectedCategory(filterName);
    }
  };

  useEffect(() => {
    if (modals?.savedFiltersModalVisible) {
      const selectedFilter = savedFilters.find((filter) => filter.isSelected);
      if (selectedFilter) {
        setConditions(selectedFilter.conditions);
        setOriginalConditions([...selectedFilter.conditions]);
        setIsFilterSaved(true);
        setSelectedCategory(selectedFilter.name);
      }
    }
  }, [modals?.savedFiltersModalVisible, savedFilters]);

  // Function to clear all filters
  const clearAllFilters = () => {
    setConditions([]);
    setIsFilterSaved(false);
    setSelectedCategory("Candidates");
  };
  // Function to update filter
  const updateFilter = () => {
    if (!isFilterSaved) return;
    dispatch(updateFilterAsync({ name: selectedCategory, conditions }));
  };
  // 🔍 Filter Candidates based on Search Query
  const filteredCandidates = candidateList.filter((candidate) =>
    candidate?.candidate_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
  const discardChanges = () => {
    setConditions([...originalConditions]);
  };
  // ✅ Handle Filter Menu Apply
  const handleFilterApply = (filterOption, inputValue) => {
    if (!inputValue || inputValue.trim() === "") {
      console.error(
        "Filter input value is missing. Please enter a valid value."
      );
      return;
    }

    const newCondition = `${selectedSearchableOption} ${filterOption} ${inputValue}`;

    setConditions((prevConditions) => {
      // Prevent duplicates
      if (
        prevConditions.some((condition) =>
          condition.startsWith(selectedSearchableOption)
        )
      ) {
        return prevConditions;
      }
      return [...prevConditions, newCondition];
    });

    // Remove the selected filter from the searchable menu
    setSearchableMenuItems((prevItems) =>
      prevItems.filter((item) => item.label !== selectedSearchableOption)
    );

    setSelectedSearchableOption("");
    setAnchorFilterMenuEl(null);
  };

  // ❌ Remove a condition and restore it to the searchable menu
  // const removeCondition = (index) => {
  //   setConditions((prevConditions) => {
  //     if (prevConditions.length === 0) return prevConditions;

  //     // Extract label from the condition being removed
  //     const removedConditionLabel = prevConditions[index].split(" ")[0];

  //     // Remove the condition from the list
  //     const updatedConditions = prevConditions.filter((_, i) => i !== index);

  //     setSearchableMenuItems((prevItems) => {
  //       // Ensure the removed condition is added back only if it’s not already present
  //       const itemToRestore = initialSearchableItems.find(
  //         (item) => item.label === removedConditionLabel
  //       );

  //       if (
  //         itemToRestore &&
  //         !prevItems.some((item) => item.label === removedConditionLabel)
  //       ) {
  //         return [...prevItems, itemToRestore];
  //       }

  //       return prevItems;
  //     });

  //     return updatedConditions;
  //   });
  // };

  // ✅ Handle Candidate Selection
  const handleCandidateSelection = (id) => {
    setSelectedCandidates((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((candidateId) => candidateId !== id)
        : [...prevSelected, id]
    );
  };

  // ✅ Select/Deselect All Candidates
  const handleSelectAll = () => {
    if (selectedCandidates.length === filteredCandidates.length) {
      setSelectedCandidates([]); // Deselect all
    } else {
      setSelectedCandidates(
        filteredCandidates.map((candidate) => candidate.id)
      ); // Select all
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

  // const getInitials = (name) => {
  //   if (!name) return "";
  //   const nameParts = name.split(" ");
  //   const initials = nameParts
  //     .map((part) => part[0].toUpperCase()) // Take the first letter of each part
  //     .join(""); // Combine them
  //   return initials.substring(0, 2); // Limit to 2 initials
  // };
  // Function to generate a random color
  const getRandomColor = () => {
    const colors = [
      "#D4C158",
      "#8282D8",
      "#9BCD6A",
      "#D458A0",
      "#CDA26A",
      "#38658E",
      "#6D58D4",
      "#CD6ABC"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      className="w-full h-screen bg-white overflow-hidden overscroll-none"
      style={{ boxSizing: "border-box" }}
    >
      <Navbar />
      <div
        className=" bg-grey-90"
        style={{ flex: 1, display: "flex", flexDirection: "column" }}
      >
        {/* <Header title={"Candidates"} onFilterSelect={applySavedFilter} /> */}

        {/* Tabs Section */}

        <div className="flex items-center justify-between p-[17px]">
          {/* <div className="flex space-x-6 border-b border-customGray">
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
          </div> */}
          <span className="font-ubuntu font-medium text-custom-large">
            Candidates
          </span>
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
                onClick={handleOpenMenu}

                // onClick={() =>
                //   setModalVisibility("createCandidateModalVisible", true)
                // }
              >
                Create Candidate
                <Plus stroke="#ffffff" />
              </button>
            )}

            {/* ✅ Dynamically Change Button */}

            <button
              className="buttons text-white bg-buttonBLue"
              onClick={() => toggleFilterDrawer(true)}
            >
              Filter <FilterIcon />
            </button>
            <button
              className="buttons border-1 border-blue-600 text-buttonBLue min-w-[40px]"
              onClick={(event) => (
                // setModalVisibility("editColumnModalVisible", true),
                setIsColumnSelectorOpen(true),
                handleClose()
              )}
            >
              Columns <ColumnIcon />
            </button>
            <button
              className="buttons border-1 border-blue-600 text-buttonBLue min-w-[40px]"
              onClick={() => setIsFilter(!isFilter)}
            >
               <ExportIcon />
            </button>

            <button className="buttons border-1 border-blue-600 text-buttonBLue  min-w-[40px] ">
              <RefreshIcon />
            </button>
            {/* <button className="text-gray-700 pl-[8px]" onClick={handleClick}>
              <ThreeDots />
            </button> */}
          </div>
        </div>
        <div className="flex-1 bg-grey-90 flex flex-col overflow-hidden">

        {isFilter && (
          <div className="flex items-center justify-between p-[10px]">
            {/* Display Applied Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* {conditions.length > 0 && (
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
              )} */}
              {/* <div onClick={handleSeacrchableMenuOpen}>
                <span className="text-buttonBLue font-ubuntu text-sm cursor-pointer">
                  + Add condition
                </span>
              </div> */}
            </div>
            <div className="flex items-center justify-center gap-[8px]">
              {/* <button
                className={`buttons border-1  text-buttonBLue cursor-pointer ${
                  conditions.length > 0
                    ? "text-buttonBLue border-buttonBLue"
                    : "text-customGray border-customGray"
                }`}
                onClick={handleApplyFilter}
                disabled={conditions.length > 0}
              >
                Apply filter
              </button> */}
              <button
                className="buttons border-1 min-w-[40px] border-buttonBLue justify-center text-buttonBLue"
                onClick={handleClickSetting}
                style={{ borderColor: "#1761D8" }} // Use your exact blue color code
              >
                <img src={SettingIcon} alt="settings" />
              </button>
            </div>
          </div>
        )}
        {/* Table Wrapper with Horizontal Scroll */}

        <div className="overflow-auto px-[10px] bg-white shadow-md flex-grow h-[calc(100vh)]">
        <table className="min-w-full divide-y divide-gray-200">
            {/* Table Header */}
            <thead className="sticky top-0 bg-white z-[50px]">
              <tr className="text-left text-gray-600 font-semibold">
                {/* Checkbox Column for Selecting All */}
                <th className="th-title sticky top-0 bg-blueBg z-[50]">
                  <div
                    className={`w-[20px] h-[20px] border-1 border-customBlue bg-white rounded-[6px] flex items-center justify-center cursor-pointer`}
                    onClick={() =>
                      setSelectedCandidates(
                        selectedCandidates.length === filteredCandidates.length
                          ? []
                          : filteredCandidates.map((c) => c.id)
                      )
                    }
                  >
                    {selectedCandidates.length === filteredCandidates.length ? (
                      <img src={Tick} alt="Selected" />
                    ) : null}
                  </div>
                </th>

                {/* ✅ Dynamically Generate Column Headers from selectedColumns */}
                {selectedColumns.map((columnName) => (
                  <th
                    key={columnName}
                    className="th-title p-0 bg-blueBg max-w-[240px] min-w-[230px]"
                  >
                    {columnName}
                  </th>
                ))}
              </tr>
            </thead>

            {/* ✅ Table Body */}
            <tbody className="divide-y overflow-auto divide-gray-200">
              {filteredCandidates.map((candidate) => (

                <tr key={candidate.id} className="hover:bg-gray-50">
                  {/* Checkbox Column for Selecting Candidates */}
                  <td className="pr-0">
                    <div
                      className={`w-[20px] h-[20px] border-1 m-0  border-customBlue bg-white rounded-[6px] flex items-center justify-center cursor-pointer`}
                      onClick={() =>
                        setSelectedCandidates((prev) =>
                          prev.includes(candidate.id)
                            ? prev.filter((id) => id !== candidate.id)
                            : [...prev, candidate.id]
                        )
                      }
                    >
                      {selectedCandidates.includes(candidate.id) ? (
                        <img src={Tick} alt="Selected" />
                      ) : null}
                    </div>
                  </td>

                  {/* ✅ Dynamically Show Data for Selected Columns */}
                  {selectedColumns.map((columnName) => {
                    const key = columnMapping[columnName]; // Get actual key from mapping
                    return (
                      <td key={key} className="td-text px-1">
                        {columnName === "Candidate Name" ? (
                          <div className="flex items-center gap-2">
                            {/* Display Initials */}
                            <div
                              className="w-[28px] h-[28px] flex items-center justify-center rounded-full bg-customBlue text-white font-bold text-sm"
                              style={{ backgroundColor: getRandomColor() }}
                            >
                              {candidate.candidate_first_name?.charAt(0)}
                              {candidate.candidate_last_name?.charAt(0)}
                            </div>
                            {/* Display Candidate Name */}
                            <span>{candidate[key] || "-"}</span>
                          </div>
                        ) : (
                          candidate[key] || "-"
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
</div>
        {/* filter div */}
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
      <EditColumnModal
        visible={modals?.editColumnModalVisible}
        onClose={() => setModalVisibility("editColumnModalVisible", false)}
      />
      <GlobalMenu
        anchorEl={anchorBulkActionEl}
        open={openBulkAction}
        onClose={handleCloseBulkAction}
        menuItems={bulkMenuItems}
      />
      {/* menu for three dots menu */}
      {/* <GlobalMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        menuItems={threeDotsMenuItems}
      /> */}
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
        menuItems={searchableMenuItems} // Pass dynamic items
      />
        <ColumnSelector 
        isOpen={isColumnSelectorOpen} 
        onClose={() => setIsColumnSelectorOpen(false)} 
        selectedColumns={selectedColumns} 
        // setSelectedColumns={setSelectedColumns} 
      />

      {/* 🔹 Filter Menu */}
      <FilterMenu
        anchorEl={anchorFilterMenuEl}
        open={Boolean(anchorFilterMenuEl)}
        onClose={() => setAnchorFilterMenuEl(null)}
        selectedOption={selectedSearchableOption}
        onApply={handleFilterApply} // Use modified handleApply
      />
        <CandidateFilterDrawer
        // onApply={applyFilters}
        // onReset={resetFilters}
        filters={filters}
        isOpen={filterDrawerOpen}
        onClose={() => toggleFilterDrawer(false)}
      />
      <CreateCandidateMenu anchorEl={anchorCreateCandidtaeEl} open={Boolean(anchorCreateCandidtaeEl)} onClose={handleCloseMenu} />
      </div>
  );
};

export default Candidates;
