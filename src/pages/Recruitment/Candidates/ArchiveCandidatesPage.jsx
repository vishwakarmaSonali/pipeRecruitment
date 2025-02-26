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
import CandidateTable from "../../../components/candidate/CandidateTable";
import {
  archivedCandidateHeader,
  candidateTableHeader,
} from "../../../helpers/config";
import CandidateTable1 from "../../../components/candidate/ArchivedCandidateTable";
import ArchiveCandidateTable from "../../../components/candidate/ArchivedCandidateTable";
const ArchiveCandidates = ({ isDrawerOpen }) => {
  const dispatch = useDispatch();
  const [candidateList, setCandidateList] = useState(archivedCandidates);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
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
  const bulkMenuItems = [
    {
      label: "Add to jobs",
      icon: <AddToJobsIcon />,
      onClick: () => setAddToJobsDrawerOpen(true),
    },
    {
      label: "Add to folder",
      icon: <AddtoFolderIcon stroke="#151B23" />,
      onClick: () => setAddToFolderDrawerOpen(true),
    },
    {
      label: "Change Ownership",
      icon: <EditUser />,
      onClick: () => setChangeOwnershipDrawerOpen(true),
    },
    ...(selectedCandidates.length > 1
      ? [
          {
            label: "Merge Duplicate",
            icon: <MergeDuplicateIcon />,
            onClick: () =>
              setModalVisibility("mergeDuplicateModalVisible", true),
          },
        ]
      : []),
    // {
    //   label: "Document Signing",
    //   icon: <DocumentSign />,
    //   onClick: () => console.log("Document Signing"),
    // },
    {
      label: "Archive",
      icon: <ArchiveIcon />,
      onClick: () => console.log("Archive"),
    },
  ];

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
  // 🔍 Map formatted column names to actual data keys
  const columnMapping = {
    "Candidate Name": "candidate_name",
    Owner: "owner",
    "Archive Date": "archived_date",
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
  const [deleteMessage, setDeleteMessage] = useState(""); // New state to store the delete message
  const [deletingCandidates, setDeletingCandidates] = useState([]); // Track candidates to delete

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

  const handleClickBulkAction = (event) => {
    setAnchorBulkActionEl(event.currentTarget);
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

  const handleArchive = (id) => {
    console.log(`Archiving candidate with ID: ${id}`);
    // TODO: Implement API call or state update to archive candidate
  };

  // 🔥 Handle Delete Action (Determines message & opens drawer)
  const handleDelete = (id = null) => {
    if (id) {
      setDeleteMessage("This candidate profile");
      setDeletingCandidates([id]); // Only delete this one user
    } else if (selectedCandidates.length === 1) {
      setDeleteMessage("Selected candidate profile");
      setDeletingCandidates([...selectedCandidates]); // Single selected user
    } else {
      setDeleteMessage("Selected candidate profiles");
      setDeletingCandidates([...selectedCandidates]); // Multiple selected users
    }

    setDeleteCandidateDrawerOpen(true);
  };
  // 🔥 Handle Confirm Delete (Filters Out Deleted Candidates)
  const handleConfirmDelete = (id) => {
    if (id) {
      notifySuccess("Candidate has been permanently deleted.");
    } else if (selectedCandidates.length === 1) {
      notifySuccess("Selected candidate has been permanently deleted.");
    }
    setCandidateList((prev) =>
      prev.filter((candidate) => !deletingCandidates.includes(candidate.id))
    );
    setSelectedCandidates([]); // Clear selection after deletion
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
            Archived Candidates
          </span>
          {/* Action Buttons */}
          {selectedCandidates.length >= 1 && (
            <div className="flex space-x-2">
              {/* ✅ Dynamically Change Button */}

              <button
                className="buttons border-1 border-blue-600 text-buttonBLue min-w-[40px]"
                onClick={(event) => (
                  // setModalVisibility("mergeDuplicateModalVisible", true),
                  setIsColumnSelectorOpen(true), handleClose()
                )}
              >
                Restore Selected
              </button>
              <button
                className="buttons text-white bg-buttonBLue"
                onClick={() => handleDelete()}
              >
                Delete Selected
              </button>

              {/* <button className="text-gray-700 pl-[8px]" onClick={handleClick}>
              <ThreeDots />
            </button> */}
            </div>
          )}
        </div>
        <div className="flex-1 bg-grey-90 flex flex-col overflow-hidden">
          {/* Table Wrapper with Horizontal Scroll */}

          <ArchiveCandidateTable
            header={archivedCandidateHeader}
            data={archivedCandidates}
            setSelectedCandidateUser={setSelectedCandidate}
            // AddJobClick={() => toggleAddToJobsDrawer(true)}
            // AddFolderClick={() => toggleAddToFolderDrawer(true)}
            // ChangeOwnerShipClick={() => toggleChangeOwnershipDrawer(true)}
            setSelectedCandidateUsers={setSelectedCandidates}
            showDeleteIcon={false}
          />
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
      <MergeDuplicateModal
        visible={modals?.mergeDuplicateModalVisible}
        onClose={() => setModalVisibility("mergeDuplicateModalVisible", false)}
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
      <AddToJobsDrawer
        // onApply={applyFilters}
        // onReset={resetFilters}
        filters={filters}
        isOpen={addToJobsDrawerOpen}
        onClose={() => toggleAddToJobsDrawer(false)}
      />
      <DeleteCandidateDrawer
        isOpen={deleteCandidateDrawerOpen}
        onClose={() => setDeleteCandidateDrawerOpen(false)}
        deleteMessage={deleteMessage} // Pass message dynamically
        onConfirmDelete={handleConfirmDelete} // Pass function to confirm delete
      />
      <CreateCandidateMenu
        anchorEl={anchorCreateCandidtaeEl}
        open={Boolean(anchorCreateCandidtaeEl)}
        onClose={handleCloseMenu}
      />
    </div>
  );
};

export default ArchiveCandidates;
