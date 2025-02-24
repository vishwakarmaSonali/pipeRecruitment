import React, { useState, useEffect, useRef } from "react";
import "./Candidates.css";
import { useSelector } from "react-redux"; // Import Redux selector

import { ReactComponent as DropArrow } from "../../../assets/icons/droparrow.svg";
import { ReactComponent as StarFilled } from "../../../assets/icons/starfilled.svg";
import { ReactComponent as StarOutlined } from "../../../assets/icons/star.svg";
import { ReactComponent as FolderIcon } from "../../../assets/icons/folderBlue.svg";
import { ReactComponent as ThreeDots } from "../../../assets/icons/threeDots.svg";
import { ReactComponent as ExportIcon } from "../../../assets/icons/export.svg";
import { ReactComponent as AddCandidate } from "../../../assets/icons/sourcingIcons/profile-add.svg";
import { ReactComponent as EditIcon } from "../../../assets/icons/edit.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/icons/delete.svg";
import { ReactComponent as ShareFolder } from "../../../assets/icons/share.svg";
import LeftArrow from "../../../assets/icons/leftArrow.svg";
import RightArrow from "../../../assets/icons/rightArrow.svg";
import Tick from "../../../assets/icons/sourcingIcons/tick.svg";
import { useModal } from "../../../components/common/ModalProvider";
import { candidates } from "../../../helpers/dataCandidates";
import { updateFilterAsync } from "../../../store/filterSlice";
import { useDispatch } from "react-redux";
import Navbar from "../../../components/navbar/Navbar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import GlobalMenu from "../../../components/GlobalMenu/GlobalMenu";
import AddSkillModal from "../../../components/modals/AddSkillsModal";
import AddCandidatesToFolder from "../../../components/modals/AddCandidatesToFolder";

const IndividualFilterCandidateListPage = ({ isDrawerOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { folderId } = useParams();
  const location = useLocation();
  const [candidateList, setCandidateList] = useState(candidates);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Candidates");
  const selectedColumns = useSelector((state) => state.columns.selected); // Get selected columns from Redux
  const savedFilters = useSelector((state) => state.filters.filters); // Get saved filters from Redux
  const [isFilterSaved, setIsFilterSaved] = useState(false);

  const [hoveredCandidate, setHoveredCandidate] = useState(null);
  const [isStarred, setIsStarred] = useState(false);
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
  const handleSettingsClose = () => {
    setAnchorSettingEl(null);
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
    const bulkMenuItems = [
      {
        label: "Add candidates",
        icon: <AddCandidate />,
        onClick: () => setModalVisibility("AddCandidatesToFolderVisible",true),
      },
      {
        label: "Share Folder",
        icon: <ShareFolder/>,
        // onClick: () => setAddToFolderDrawerOpen(true),
      },
      {
        label: "Export",
        icon: <ExportIcon  stroke="#151B23" />,
        // onClick: () => setChangeOwnershipDrawerOpen(true),
      },
     
      {
        label: "Edit Folder",
        icon: <EditIcon />,
        onClick: () => navigate("/archive-candidates"),
      },
      {
        label: "Delete Folder",
        icon: <DeleteIcon />,
        onClick: () => navigate("/archive-candidates"),
      },
    ];




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
      "#CD6ABC",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  const handleClickSetting = (event) => {
    setAnchorSettingEl(event.currentTarget);
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
          
               
                <div className="flex items-center space-x-4">
        <FolderIcon className="w-[36px] h-[36px] text-blue-500" />
        <div>
        <span className="font-ubuntu font-medium text-l">{location.state?.name || "Unknown"}</span>
          <p className="text-sm text-gray-600">{"Sort listed candidates for CodeHive Technologies, Mumbai"}</p>
        </div>
      </div>

      {/* Right Section - Star & Menu */}
      <div className="flex items-center space-x-4">
        <button onClick={() => setIsStarred(!isStarred)}>
          {isStarred ? (
            <StarFilled className="w-5 h-5 text-yellow-500" />
          ) : (
            <StarOutlined className="w-5 h-5 text-gray-400" />
          )}
        </button>
        <button className="text-gray-500 hover:text-black" onClick={handleClickSetting}>
          <ThreeDots className="w-4 h-4" />
        </button>
      
    </div>
        </div>
        <div className="flex-1 bg-grey-90 flex flex-col overflow-hidden">
       
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
                          selectedCandidates.length ===
                            filteredCandidates.length
                            ? []
                            : filteredCandidates.map((c) => c.id)
                        )
                      }
                    >
                      {selectedCandidates.length ===
                      filteredCandidates.length ? (
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
                        <td key={key} className="td-text px-1 justify-between">
                          {columnName === "Candidate Name" ? (
                            <div
                              className="flex items-center gap-2 relative"
                              onMouseEnter={() =>
                                setHoveredCandidate(candidate.id)
                              }
                              onMouseLeave={() => setHoveredCandidate(null)}
                            >
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

                              {/* ✅ Show Eye Icon on Hover */}
                              {hoveredCandidate === candidate.id && (
                                <p>eye</p>
                                // <EyeIcon
                                //   className="absolute right-[-20px] cursor-pointer"
                                //   onClick={() =>
                                //     console.log(
                                //       `Viewing candidate ${candidate.id}`
                                //     )
                                //   }
                                // />
                              )}
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
      <GlobalMenu
        anchorEl={anchorSettingEl}
        open={openSetting}
        onClose={handleSettingsClose}
        menuItems={bulkMenuItems}
      />
         <AddCandidatesToFolder
        visible={modals?.AddCandidatesToFolderVisible}
        onClose={() => setModalVisibility("AddCandidatesToFolderVisible", false)}
       
      />
      {/* Menu for Bulk Actions */}

    </div>
  );
};

export default IndividualFilterCandidateListPage;
