import React, { useState, useEffect, useRef } from "react";
import "./Candidates.css";
import { useSelector } from "react-redux"; // Import Redux selector

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
import { ReactComponent as DownloadIcon } from "../../../assets/icons/sourcingIcons/download.svg";
import { ReactComponent as DocumentSign } from "../../../assets/icons/candidates/edit-2.svg";
import { ReactComponent as ExportIcon } from "../../../assets/icons/export.svg";
import { ReactComponent as ColumnIcon } from "../../../assets/icons/columns.svg";
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
import { candidates } from "../../../helpers/dataCandidates";
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
import { useNavigate } from "react-router-dom";
import CandidateTable from "../../../components/candidate/CandidateTable";
import { candidateTableHeader } from "../../../helpers/config";
import PaginationComponent from "../../../components/common/PaginationComponent";

const Candidates = ({ isDrawerOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    fetchMoreLoading,
    totalCandidateData,
    totalCandidatePages,
    candidateFilters,
    candidateData,
  } = useSelector((state) => state.sourcing);
  const [candidateList, setCandidateList] = useState(candidates);
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
  const [hoveredCandidate, setHoveredCandidate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(20);

  const [changeOwnershipDrawerOpen, setChangeOwnershipDrawerOpen] =
    useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleResultsChange = (value) => {
    setResultsPerPage(value);
    setIsDropdownOpen(false);
  };

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
      onClick: () => navigate("/archive-candidates"),
    },
  ];

  const toggleFilterDrawer = (open) => {
    setFilterDrawerOpen(open);
  };
  const toggleAddToFolderDrawer = (open) => {
    setAddToFolderDrawerOpen(open);
  };
  const toggleAddToJobsDrawer = (open) => {
    setAddToJobsDrawerOpen(open);
  };
  const toggleChangeOwnershipDrawer = (open) => {
    setChangeOwnershipDrawerOpen(open);
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
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  return (
    <div className="sourcing-main-container">
      <Navbar />
      <div
        className="bg-grey-90"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Tabs Section */}

        <div className="flex items-center justify-between p-[17px]">
          <span className="font-ubuntu font-medium text-custom-large">
            Candidates
          </span>
          {/* Action Buttons */}
          <div className="flex space-x-2">
            {/* ✅ Dynamically Change Button */}

            <button
              className="buttons text-white bg-buttonBLue"
              onClick={handleClickBulkAction}
            >
              Batch Actions
              <DropArrow fill="white" />
            </button>

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
                // setModalVisibility("mergeDuplicateModalVisible", true),
                setIsColumnSelectorOpen(true), handleClose()
              )}
            >
              Columns <ColumnIcon />
            </button>
            <button
              className="buttons border-1 border-blue-600 text-buttonBLue min-w-[40px]"
              onClick={() => setIsFilter(!isFilter)}
            >
              <ExportIcon stroke="#1761D8" />
            </button>

            <button className="buttons border-1 border-blue-600 text-buttonBLue  min-w-[40px] ">
              <RefreshIcon stroke="#1761D8" />
            </button>
            {/* <button className="text-gray-700 pl-[8px]" onClick={handleClick}>
              <ThreeDots />
            </button> */}
          </div>
        </div>
        <div className="flex-1 bg-grey-90 flex flex-col">
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
          <div
            style={{
              overflow: "hidden",
              flex: 1,
              maxHeight: "calc(100vh - 194px)",
            }}
          >
            <CandidateTable
              header={candidateTableHeader}
              data={filteredCandidates}
              setSelectedCandidateUser={setSelectedCandidate}
              AddJobClick={() => toggleAddToJobsDrawer(true)}
              AddFolderClick={() => toggleAddToFolderDrawer(true)}
              ChangeOwnerShipClick={() => toggleChangeOwnershipDrawer(true)}
              setSelectedCandidateUsers={setSelectedCandidates}
            />
          </div>
        </div>
      </div>

      <div className="sourcing-pagination-div">
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <PaginationComponent
            totalPages={5}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

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
      <AddToFolderDrawer
        // onApply={applyFilters}
        // onReset={resetFilters}
        filters={filters}
        isOpen={addToFolderDrawerOpen}
        onClose={() => toggleAddToFolderDrawer(false)}
      />
      <ChangeOwnershipDrawer
        // onApply={applyFilters}
        // onReset={resetFilters}
        filters={filters}
        isOpen={changeOwnershipDrawerOpen}
        onClose={() => toggleChangeOwnershipDrawer(false)}
      />
      <CreateCandidateMenu
        anchorEl={anchorCreateCandidtaeEl}
        open={Boolean(anchorCreateCandidtaeEl)}
        onClose={handleCloseMenu}
      />
    </div>
  );
};

export default Candidates;
