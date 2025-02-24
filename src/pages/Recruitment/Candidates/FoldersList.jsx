import React, { useState, useEffect, useRef } from "react";
import "./Candidates.css";
import { useSelector } from "react-redux"; // Import Redux selector
import { ReactComponent as DeleteIcon } from "../../../assets/icons/delete.svg";
import { ReactComponent as Plus } from "../../../assets/icons/plus.svg";
import { ReactComponent as FilterIcon } from "../../../assets/icons/filter.svg";
import { ReactComponent as RefreshIcon } from "../../../assets/icons/refresh.svg";
import { ReactComponent as DropArrow } from "../../../assets/icons/droparrow.svg";
import { ReactComponent as EditIcon } from "../../../assets/icons/candidates/edit-2.svg";
import { ReactComponent as AddToJobsIcon } from "../../../assets/icons/sourcingIcons/briefcase.svg";
import { ReactComponent as AddtoFolderIcon } from "../../../assets/icons/sourcingIcons/folder-add.svg";
import { ReactComponent as EditUser } from "../../../assets/icons/user-edit.svg";
import { ReactComponent as MergeDuplicateIcon } from "../../../assets/icons/merge.svg";
import { ReactComponent as ArchiveIcon } from "../../../assets/icons/archive.svg";
import { ReactComponent as StarOutlined } from "../../../assets/icons/archive.svg";
import { ReactComponent as StarFilled } from "../../../assets/icons/archive.svg";
import Tooltip from "@mui/material/Tooltip";
import SettingIcon from "../../../assets/icons/setting-2.svg";
import LeftArrow from "../../../assets/icons/leftArrow.svg";
import RightArrow from "../../../assets/icons/rightArrow.svg";
import Tick from "../../../assets/icons/sourcingIcons/tick.svg";
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
import {
  candidates,
  foldersCandidates,
  archivedCandidates,
} from "../../../helpers/dataCandidates";
import { updateFilterAsync } from "../../../store/filterSlice";
import { useDispatch } from "react-redux";
import Navbar from "../../../components/navbar/Navbar";
import ColumnSelector from "../../../components/ColumnSelector";
import CandidateFilterDrawer from "../../../components/candidate/CandidateFilterModal";
import CreateCandidateMenu from "./CreateCandidatesMenu";
import AddToFolderDrawer from "../../../components/candidate/AddToFolderDrawer";
import ChangeOwnershipDrawer from "../../../components/candidate/ChangeOwnershipDrawer";
import AddToJobsDrawer from "../../../components/candidate/AddToJobsDrawer";
import MergeDuplicateModal from "../../../components/modals/MergeDuplicateModal";
import DeleteCandidateDrawer from "../../../components/candidate/DeleteCandidateDrawer";
import { notifySuccess } from "../../../helpers/utils";
import CommonSearchBox from "../../../components/common/CommonSearchBox";
import FavoriteFolders from "../../../components/candidate/FavoriteFolder";
import { ReactComponent as AddCandidate } from "../../../assets/icons/sourcingIcons/profile-add.svg";
import { ReactComponent as ShareFolder } from "../../../assets/icons/share.svg";
import { ReactComponent as ExportIcon } from "../../../assets/icons/export.svg";

import { useLocation, useNavigate, useParams } from "react-router-dom";

const FolderAddCandidates = ({ isDrawerOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { folderId } = useParams();
  const location = useLocation();
  const [candidateList, setCandidateList] = useState(foldersCandidates);
  const [folderList, setFolderList] = useState([
    {
      id: 1,
      folder_name: "Software Engineers",
      candidate_count: 25,
      created_on: "2025-02-15",
      created_by: "John Doe",
    },
    {
      id: 2,
      folder_name: "Designers",
      candidate_count: 18,
      created_on: "2025-02-18",
      created_by: "Jane Smith",
    },
    {
      id: 3,
      folder_name: "Product Managers",
      candidate_count: 12,
      created_on: "2025-02-20",
      created_by: "Alice Johnson",
    },
  ]);
const [selectedFolder, setSelectedFolder] = useState(null);

  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Candidates");
  const selectedColumns = useSelector((state) => state.columns.selected); // Get selected columns from Redux
  const savedFilters = useSelector((state) => state.filters.filters); // Get saved filters from Redux
  const [isFilterSaved, setIsFilterSaved] = useState(false);
  const [isColumnSelectorOpen, setIsColumnSelectorOpen] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [addToFolderDrawerOpen, setAddToFolderDrawerOpen] = useState(false);
  const [addToJobsDrawerOpen, setAddToJobsDrawerOpen] = useState(false);
  const [deleteCandidateDrawerOpen, setDeleteCandidateDrawerOpen] =
    useState(false);
  const [changeOwnershipDrawerOpen, setChangeOwnershipDrawerOpen] =
    useState(false);
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

  const handleMenuOpen = (event, folderId) => {
    setAnchorEl(event.currentTarget);
    setSelectedFolder(folderId);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedFolder(null);
  };
  
  const toggleFilterDrawer = (open) => {
    setFilterDrawerOpen(open);
  };
  const toggleAddToFolderDrawer = (open) => {
    setAddToFolderDrawerOpen(open);
  };
  const toggleDeleteCandidateDrawer = (open) => {
    setDeleteCandidateDrawerOpen(open);
  };
  const toggleAddToJobsDrawer = (open) => {
    setAddToJobsDrawerOpen(open);
  };

  const [anchorCreateCandidtaeEl, setAnchorCreateCandidtaeEl] = useState(null);

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
    const bulkMenuItems = [
      {
        label: "Add candidates",
        icon: <AddCandidate />,
        // onClick: () => setAddToJobsDrawerOpen(true),
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


  const [deleteMessage, setDeleteMessage] = useState("");
  const [deletingCandidates, setDeletingCandidates] = useState([]);
  const [starredFolders, setStarredFolders] = useState([1, 5]); // Example: Folder IDs with stars

  const toggleStar = (id) => {
    setStarredFolders((prev) =>
      prev.includes(id) ? prev.filter((folderId) => folderId !== id) : [...prev, id]
    );
  };
  
  const columnMapping = {
    "Folder Name": "folder_name",
    "Candidate Count": "candidate_count",
    "Created On": "created_on",
    "Created By": "create_by",
  };
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

  const handleSettingsClose = () => {
    setAnchorSettingEl(null);
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

  const getInitials = (name) => {
    if (!name) return "";
    const nameParts = name.split(" ");
    const initials = nameParts
      .map((part) => part[0].toUpperCase()) // Take the first letter of each part
      .join(""); // Combine them
    return initials.substring(0, 2); // Limit to 2 initials
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

  const handleArchive = (id) => {
    console.log(`Archiving candidate with ID: ${id}`);
    // TODO: Implement API call or state update to archive candidate
  };

  const handleDelete = (id = null) => {
    if (id) {
      setDeleteMessage("This candidate profile");
      setDeletingCandidates([id]);
    } else {
      setDeleteMessage("Selected candidate profiles");
      setDeletingCandidates([...selectedCandidates]);
    }
    setDeleteCandidateDrawerOpen(true);
  };

  const handleConfirmDelete = () => {
    notifySuccess("Candidate(s) have been permanently deleted.");
    setCandidateList((prev) =>
      prev.filter((candidate) => !deletingCandidates.includes(candidate.id))
    );
    setSelectedCandidates([]);
    setDeleteCandidateDrawerOpen(false);
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
          <span className="font-ubuntu font-medium text-custom-large">
            Folder
          </span>
          {/* Action Buttons */}
        
            <div className="flex space-x-2">
              {/* ✅ Dynamically Change Button */}
 <button
              className="buttons text-white bg-buttonBLue"
            //   onClick={handleClickBulkAction}
            >
              Batch Actions
              <DropArrow fill="white" />
            </button>
                 <button
                              className="buttons  text-white  bg-buttonBLue"
                            //   onClick={handleOpenMenu}
              
                              // onClick={() =>
                              //   setModalVisibility("createCandidateModalVisible", true)
                              // }
                            >
                              Create Candidate
                              <Plus stroke="#ffffff" />
                            </button>
             <div className="flex-1 w-[320px]">
             <CommonSearchBox />
             </div>
              {/* <button className="text-gray-700 pl-[8px]" onClick={handleClick}>
              <ThreeDots />
            </button> */}
            </div>
        
        </div>
      <FavoriteFolders />
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
                  {Object.keys(columnMapping).map((columnName) => (
                  <th key={columnName} className="th-title bg-blueBg">
                    {columnName}
                  </th>
                ))}
            
                </tr>
              </thead>

              {/* ✅ Table Body */}
              <tbody className="divide-y overflow-auto divide-gray-200">
                {foldersCandidates.map((candidate) => (
                  <tr key={candidate.id} className="hover:bg-gray-50 font-ubuntu text-sm">
                    {/* Checkbox Column for Selecting Candidates */}
                    <td className="pr-0">
                      <div
                        className={`w-[20px] h-[20px] border-1 m-0 border-customBlue bg-white rounded-[6px] flex items-center justify-center cursor-pointer`}
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

                    {/* Dynamically Show Data for Selected Columns */}
                    {Object.entries(columnMapping).map(([columnName, key]) => (
                        
        <td key={key} className="td-text font-ubuntu text-sm ">
      
           { candidate[key] || "-"}
          
        </td>
      ))}
                    {/* <td className=" p-0 m-0">
                      <Tooltip title="More Options">
                        <button
                          className="text-gray-600 hover:text-black"
                          onClick={(event) => handleMenuOpen(event, candidate.id)}
                        >
                          ⋮
                        </button>
                      </Tooltip>
                      </td> */}
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

      <GlobalMenu
        anchorEl={anchorSettingEl}
        open={openSetting}
        onClose={handleSettingsClose}
        menuItems={bulkMenuItems}
      />
    </div>
  );
};

export default FolderAddCandidates;
