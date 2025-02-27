import React, { useState, useEffect, useRef } from "react";
import "./Candidates.css";
import { useSelector } from "react-redux"; // Import Redux selector
import { ReactComponent as DeleteIcon } from "../../../assets/icons/delete.svg";
import { ReactComponent as Plus } from "../../../assets/icons/plus.svg";
import { ReactComponent as FilterIcon } from "../../../assets/icons/filter.svg";
import { ReactComponent as RefreshIcon } from "../../../assets/icons/refresh.svg";
import { ReactComponent as DropArrow } from "../../../assets/icons/droparrow.svg";
import { ReactComponent as EditIcon } from "../../../assets/icons/candidates/edit-2.svg";
import { ReactComponent as ThreeDots } from "../../../assets/icons/threeDots.svg";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

import { getRandomColor } from "../../../helpers/utils";
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

import CommonSearchBox from "../../../components/common/CommonSearchBox";
import FavoriteFolders from "../../../components/candidate/FavoriteFolder";
import { ReactComponent as AddCandidate } from "../../../assets/icons/sourcingIcons/profile-add.svg";
import { ReactComponent as ShareFolder } from "../../../assets/icons/share.svg";
import { ReactComponent as ExportIcon } from "../../../assets/icons/export.svg";
import { ReactComponent as StarFilled } from "../../../assets/icons/starfilledYellow.svg";
import { ReactComponent as StarOutlined } from "../../../assets/icons/starOutline.svg";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import ShareFolderModal from "../../../components/modals/ShareFolderModal";
import AddCandidatesToFolder from "../../../components/modals/AddCandidatesToFolder";
import CreateNewFolderModal from "../../../components/modals/CreateNewFolderModal";
import CommonDeleteModal from "../../../components/modals/CommonDeleteModal";
const header = ["Folder Name", "Candidate Count", "Created On", "Created By"];
const FolderAddCandidates = ({ isDrawerOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { folderId } = useParams();
  const location = useLocation();
  // const [candidateList, setCandidateList] = useState(foldersCandidates);
  // 🔹 State to store folder list
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
  ]);

  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Candidates");
  const savedFilters = useSelector((state) => state.filters.filters); // Get saved filters from Redux
  const [isFilterSaved, setIsFilterSaved] = useState(false);

  const threeDotsMenuItems = [
    {
      label: "Add candidates",
      icon: <AddCandidate />,
      onClick: () => (
        setModalVisibility("AddCandidatesToFolderVisible", true),
        handleSettingsClose()
      ),
    },
    {
      label: "Share Folder",
      icon: <ShareFolder />,
      onClick: () => (
        setModalVisibility("ShareFolderModalVisible", true),
        handleSettingsClose()
      ),
    },
    {
      label: "Export",
      icon: <ExportIcon stroke="#151B23" />,
      // onClick: () => setChangeOwnershipDrawerOpen(true),
    },

    {
      label: "Edit Folder",
      icon: <EditIcon />,
      onClick: () => (navigate("/archive-candidates"), handleSettingsClose()),
    },
    {
      label: "Delete Folder",
      icon: <DeleteIcon />,
      onClick: () => (
        setModalVisibility("categoryDeleteModalVisible", false),
        handleSettingsClose()
      ),
    },
  ];
  const bulkMenuItems = [
    {
      label: "Share Folder",
      icon: <ShareFolder />,
      onClick: () => (
        setModalVisibility("ShareFolderModalVisible", true),
        handleBulkActionClose()
      ),
    },
    {
      label: "Delete Folder",
      icon: <DeleteIcon />,
      onClick: () => (
        setModalVisibility("categoryDeleteModalVisible", false),
        handleBulkActionClose()
      ),
    },
  ];
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
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [deletingCandidates, setDeletingCandidates] = useState([]);
  const [starredFolders, setStarredFolders] = useState([1, 5]); // Example: Folder IDs with stars
  const [selectedRows, setSelectedRows] = useState([]); // Track selected rows

  // 🔹 State to store folder list (Dynamic Update)
  const [foldersCandidates, setFoldersCandidates] = useState([
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
  ]);
  const toggleStar = (id) => {
    setStarredFolders((prev) =>
      prev.includes(id)
        ? prev.filter((folderId) => folderId !== id)
        : [...prev, id]
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
  const filteredCandidates = foldersCandidates.filter((candidate) =>
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
  const handleBulkActionClose = () => {
    setAnchorBulkActionEl(null);
  };
  const handleClickSetting = (event) => {
    setAnchorSettingEl(event.currentTarget);
  };
  const handleClickBulkAction = (event) => {
    setAnchorBulkActionEl(event.currentTarget);
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
  // 🔹 Function to add a new folder dynamically
  const addFolder = (newFolder) => {
    setFoldersCandidates([
      ...foldersCandidates,
      { id: foldersCandidates.length + 1, ...newFolder },
    ]);
  };
  const deleteCategory = () => {
    setModalVisibility("categoryDeleteModalVisible", false);
  };
  // ✅ Toggle Checkbox Selection
  const toggleCheckbox = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id)
        ? prev.filter((folderId) => folderId !== id)
        : [...prev, id]
    );
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
            {/* ✅ Conditionally Render Batch Actions Button */}
            {selectedCandidates.length > 0 && (
              <button className="buttons text-white bg-buttonBLue">
                Batch Actions
                <DropArrow fill="white" />
              </button>
            )}
            <button
              className="buttons  text-white  bg-buttonBLue"
              //   onClick={handleOpenMenu}

              onClick={() =>
                setModalVisibility("createFolderModalVisible", true)
              }
            >
              Create Folder
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

          <div className="overflow-auto px-[10px] bg-white shadow-md flex-grow h-[calc(200vh-20px)]">
            <TableContainer style={{ flex: 1, overflow: "auto" }}>
              <Table
                stickyHeader
                sx={{ borderSpacing: "0 10px", borderCollapse: "separate" }}
              >
                <TableHead>
                  <TableRow
                    style={{
                      backgroundColor: "#1761D81A",
                      position: "sticky",
                      top: 0,
                      zIndex: 10,
                    }}
                  >
                    {/* Conditionally Add Checkbox & Star for "First Name" */}
                    {header?.map((item, index) => {
                      console.log("iterwerewrwer", item);

                      return (
                        <TableCell key={index} className="font-14-regular">
                          <div className="flex items-center space-x-2">
                            {/* If header item is "First Name", add checkbox and star */}
                            {item === "Folder Name" && (
                              <>
                           <div
                           style={{border:"1px solid #151B23"}}
                      className="w-[20px] h-[20px] rounded-[6px] flex items-center justify-center cursor-pointer mr-[46px]"
                      onClick={() => {
                        // Select All or Deselect All
                        if (selectedRows.length === foldersCandidates.length) {
                          setSelectedRows([]); // Deselect all
                        } else {
                          setSelectedRows(foldersCandidates.map((row) => row.id)); // Select all
                        }
                      }}
                    >
                      {selectedRows.length === foldersCandidates.length && <img src={Tick} alt="Selected" />}
                    </div>
                              </>
                            )}
                            {item} {/* Normal header text */}
                          </div>
                        </TableCell>
                      );
                    })}

                    {/* Empty Cell for Actions (Aligns with last column) */}
                    <TableCell className="justify-end flex">{""}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {foldersCandidates.map((row, index) => {
                    console.log("roeeeererwer", row === "folder_name");

                    const randomColor = getRandomColor();
                    return (
                      <>
                        <TableRow key={index}>
                          <TableCell>
                            <div className="flex items-center ">
                              {row?.folder_name && (
                                <div className="flex items-center">
                                  <div
                                  style={{border:"1px solid #151B23"}}
                                    className="w-[20px] h-[20px]  rounded-[6px] flex items-center justify-center cursor-pointer mr-[10px]"
                                    onClick={() => toggleCheckbox(row.id)}
                                  >
                                    {selectedRows.includes(row.id) && (
                                      <img src={Tick} alt="Selected" />
                                    )}
                                  </div>
                                  <div
                                    className="mr-[16px]"
                                    onClick={() => toggleStar(row.id)}
                                  >
                                    {starredFolders.includes(row.id) ? (
                                      <StarFilled className="h-[20px] w-[20px]" />
                                    ) : (
                                      <StarOutlined className="h-[20px] w-[20px]" />
                                    )}
                                  </div>
                                </div>
                              )}
                              {row?.folder_name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <span style={{ marginLeft: "6px" }}>
                                {row?.candidate_count}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell>{row?.created_on}</TableCell>
                          <TableCell>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Avatar
                                src={row?.created_by?.image}
                                alt={row?.created_by?.name}
                                style={{
                                  width: 32,
                                  height: 32,
                                  backgroundColor: randomColor,
                                }}
                              />
                              <span style={{ marginLeft: "6px" }}>
                                {row?.created_by}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <button onClick={handleClickSetting}>
                              <ThreeDots />
                            </button>
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
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
        menuItems={threeDotsMenuItems}
      />
      <GlobalMenu
        anchorEl={anchorBulkActionEl}
        open={openBulkAction}
        onClose={handleBulkActionClose}
        menuItems={bulkMenuItems}
      />
      <CreateNewFolderModal
        visible={modals?.createFolderModalVisible}
        onClose={() => setModalVisibility("createFolderModalVisible", false)}
        addFolder={addFolder}
      />
      <CommonDeleteModal
        visible={modals?.categoryDeleteModalVisible}
        title={"Delete Folder"}
        description={"Are you sure you want to delete this folder?"}
        onClose={() => {
          setModalVisibility("categoryDeleteModalVisible", false);
          setSelectedItem(null);
        }}
        onClickDelete={deleteCategory}
      />
    </div>
  );
};

export default FolderAddCandidates;
