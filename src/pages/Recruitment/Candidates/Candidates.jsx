import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Candidates.css";
import { useSelector } from "react-redux"; // Import Redux selector

import { ReactComponent as Plus } from "../../../assets/icons/plus.svg";
import { ReactComponent as FilterIcon } from "../../../assets/icons/filter.svg";
import { ReactComponent as RefreshIcon } from "../../../assets/icons/refresh.svg";
import { ReactComponent as DropArrow } from "../../../assets/icons/droparrow.svg";
import { ReactComponent as AddToJobsIcon } from "../../../assets/icons/sourcingIcons/briefcase.svg";
import { ReactComponent as AddtoFolderIcon } from "../../../assets/icons/sourcingIcons/folder-add.svg";
import { ReactComponent as EditUser } from "../../../assets/icons/user-edit.svg";
import { ReactComponent as MergeDuplicateIcon } from "../../../assets/icons/merge.svg";
import { ReactComponent as ArchiveIcon } from "../../../assets/icons/archive.svg";
import { ReactComponent as ExportIcon } from "../../../assets/icons/export.svg";
import { ReactComponent as ColumnIcon } from "../../../assets/icons/columns.svg";
import SettingIcon from "../../../assets/icons/setting-2.svg";
import CreateCandidateModal from "../../../components/modals/CreateCandidateModal";
import { useModal } from "../../../components/common/ModalProvider";
import CreateCandidateFormModal from "../../../components/modals/CreateCandidateFormModal";
import SmartGenerateModal from "../../../components/modals/SmartGenerateModal";
import UploadResumeCandidateModal from "../../../components/modals/UploadResumeCandidateModal";
import GlobalMenu from "../../../components/GlobalMenu/GlobalMenu";
import SearchableMenu from "../../../components/SearchableMenu/SearchableMenu";
import FilterMenu from "../../../components/FilterMenu/FilterMenu";
import SaveFiltersModal from "../../../components/modals/SaveFiltersModal";
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
import PaginationComponent from "../../../components/common/PaginationComponent";
import { truncate } from "lodash";
import { useLocation } from "react-router-dom";
import CandidateOverviewDrawer from "../../../components/candidate/CandidateOverviewDrawer";
import {
  addCandidateToArchiveAction,
  fetchCandidateDetails,
  fetchCandidates,
  fetchCandidatesList,
  fetchCandidateSummary,
  fetchColumnsList,
} from "../../../actions/candidateActions";
import CandidateInfoModal from "../../../components/modals/CandidateInfoModal";
import { ReactComponent as Tick } from "../../../assets/icons/sourcingIcons/tick.svg";
import { fetchAllLabels } from "../../../actions/customizationActions";
import CustomizableCandidateTable from "../../../components/candidate/CustomizableCandidateTable";

const Candidates = ({ isDrawerOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { token, refreshToken } = useSelector((state) => state.auth);

  const {
    candidatesListingData,
    fetchMoreLoading,
    totalCandidateData,
    totalCandidatePages,
    candidateFilters,
    candidateInfo,
    candidateDetailsLoading,
    candidateListID,
    updateCandidateLoading,
    columnList,
    fetchColumnLoading,
    updateColumnLoading,
  } = useSelector((state) => state.candidates);

  const [candidateList, setCandidateList] = useState(
    candidatesListingData || []
  );

  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Candidates");
  const selectedColumns = useSelector((state) => state.columns.selected); // Get selected columns from Redux
  const savedFilters = useSelector((state) => state?.filters?.filters); // Get saved filters from Redux
  const [isFilterSaved, setIsFilterSaved] = useState(false);
  const [isColumnSelectorOpen, setIsColumnSelectorOpen] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [addToFolderDrawerOpen, setAddToFolderDrawerOpen] = useState(false);
  const [addToJobsDrawerOpen, setAddToJobsDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(20);
  const [selectedCandidateIds, setSelectedCandidateIds] = useState([]);

  const [changeOwnershipDrawerOpen, setChangeOwnershipDrawerOpen] =
    useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [candidateOverviewDrawerOpen, setCandidateOverviewFilterDrawerOpen] =
    useState(false);

  const toggleCandidateOverviewDrawer = (open) => {
    setCandidateOverviewFilterDrawerOpen(open);
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
  // const handleArchiveCandidates = async () => {
  //   if (selectedCandidates.length === 0) {
  //     alert("Please select candidates to archive.");
  //     return;
  //   }

  //   console.log("Archiving Candidates: ", selectedCandidates);
  // handleCloseBulkAction()
  //   try {
  //     // Dispatch archive action
  //     await dispatch(addCandidateToArchiveAction(selectedCandidates, token, refreshToken));

  //     // ✅ Fetch updated list after successful archiving
  //     setTimeout(() => {
  //       dispatch(fetchCandidatesList(candidateFilters, 1));
  //     }, 500);

  //     // Reset selection
  //     setSelectedCandidates([]);
  //   } catch (error) {
  //     console.error("Error archiving candidates:", error);
  //     alert("Failed to archive candidates.");
  //   }
  // };

  const handleArchiveCandidates = () => {
    if (selectedCandidates.length === 0) {
      alert("Please select candidates to archive.");
      return;
    }
    handleCloseBulkAction();
    console.log("Archiving Candidates: ", selectedCandidates);

    // ✅ Remove archived candidates from local state without calling API
    setCandidateList((prevList) =>
      prevList.filter(
        (candidate) => !selectedCandidates.includes(candidate._id)
      )
    );
    dispatch(addCandidateToArchiveAction(selectedCandidates));
    // Reset selection after archiving
    setSelectedCandidates([]);
  };

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
            onClick: () => navigate("/merge-candidate"),
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
      onClick: handleArchiveCandidates, // ✅ Call archive function
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
  const [selectedCandidateId, setSelectedCandidateId] = useState(null); // Store selected candidate ID

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
  const filteredCandidates = candidateList?.filter((candidate) =>
    candidate?.first_name?.toLowerCase().includes(searchQuery.toLowerCase())
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

  const handleResultsChange = (value) => {
    setResultsPerPage(value);
    setIsDropdownOpen(false);
  };

  // ✅ Handle Filter Menu Apply
  const handleFilterApply = (filterOption, inputValue) => {
    if (!inputValue || inputValue.trim() === "") {
      console.log(
        "filterOption?.schoolfilterOption?.schoolfilterOption?.school",
        filterOption?.selectedLabels.map((loc) => `'${loc?.id}'`).join(", ")
      );

      setCurrentPage(1);
      let params = {};
      params.limit = resultsPerPage;
      if (filterOption?.candidateName) {
        params.candidate_name = filterOption?.candidateName;
      }
      if (filterOption?.nationality.length>0) {
        params.nationality = filterOption?.nationality?.join(", ");
      }
      if (filterOption?.workModel) {
        params.work_mode = filterOption?.workModel;
      }
      if (filterOption?.selectedLabels?.length>0) {
        params.labels = filterOption?.selectedLabels
          .map((labelItem) => `${labelItem?.id}`)
          .join(", ");
      }
      if (filterOption?.languages?.length > 0) {
        console.log(
          " filterOption?.languages?.join(",
          ")",
          filterOption?.languages.map((loc) => `'${loc?.language}'`).join(", ")
        );

        params.languages = filterOption?.languages
          .map((lang) => `'${lang?.language}'`)
          .join(", ");
      }
      if (filterOption?.location?.length > 0) {
        params.location = filterOption?.location
          .map((loc) => `'${loc}'`)
          .join(", ");
      }

      if (
        filterOption?.locations?.length > 0 &&
        filterOption?.location?.length < 1
      ) {
        params.location = filterOption?.locations;
      }
      if (!!filterOption?.experience?.from) {
        params.years_of_experience_from = filterOption?.experience?.from;
      }

      if (!!filterOption?.experience?.to) {
        params.years_of_experience_to = filterOption?.experience?.to;
      }
      if (filterOption?.school) {
        params.school = filterOption?.school;
      }
      if (filterOption?.school?.length > 0) {
        params.school = filterOption?.school?.join(",");
      }
      if (filterOption?.globalSearch) {
        params.global = filterOption?.globalSearch;
      }
      if (filterOption?.globalSearch?.length > 0) {
        params.global = filterOption?.globalSearch?.join(",");
      }
      if (filterOption?.degree?.length > 0) {
        params.degree = filterOption?.degree?.join(",");
      }
      if (filterOption?.degree) {
        params.degree = filterOption?.degree;
      }
      if (filterOption?.company) {
        params.company = filterOption?.company;
      }
      if (filterOption?.company?.length > 0) {
        params.company = filterOption?.company?.join(",");
      }

      console.log("params in candidate filters", params);

      dispatch(fetchCandidatesList(params, 1));
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
  // Extract headers dynamically but filter out unwanted fields
  // Extract headers dynamically but filter out unwanted fields
  const tableHeaders = candidateList.length
    ? Object.keys(candidateList[0]).filter(
        (key) => key !== "_id" && key !== "profile_photo" // ❌ Exclude these fields
      )
    : [];

  // Ensure First & Last Name are always present
  const headers = [...tableHeaders];

  useEffect(() => {
    setCandidateList(candidatesListingData);
  }, [candidatesListingData]);

  const handlePageChange = (page) => {
    setSelectedCandidates([]);
    setCurrentPage(page);
    dispatch(fetchCandidatesList(candidateFilters, page));
  };

  useEffect(() => {
    setCurrentPage(1);
    let params = {};
    params.limit = resultsPerPage;

    console.log("Fetching params>>>>", candidateFilters);
    if (!updateColumnLoading) {
      dispatch(fetchCandidatesList(params, 1));
    }
  }, [dispatch, resultsPerPage, updateColumnLoading]);

  useEffect(() => {
    dispatch(fetchAllLabels());
  }, [dispatch]);

  useEffect(() => {
    if (!updateColumnLoading) {
      dispatch(fetchColumnsList());
    }
  }, [dispatch, updateColumnLoading]);

  useEffect(() => {
    if (!updateCandidateLoading && !!selectedCandidateId) {
      dispatch(fetchCandidateDetails(selectedCandidateId));
      dispatch(fetchCandidateSummary(selectedCandidateId));
    }
  }, [selectedCandidateId, updateCandidateLoading]);

  const handleCandidateEyeClick = (id) => {
    setSelectedCandidateId(id);
    toggleCandidateOverviewDrawer(true);
  };

  const handleCandidateClick = (id) => {
    navigate(`/candidates?id=${id}`);
  };

  const handleNextCandidate = () => {
    const searchParams = new URLSearchParams(location.search);
    const currentId = searchParams.get("id");

    if (currentId) {
      const currentIndex = candidateListID?.indexOf(currentId);
      if (currentIndex !== -1 && currentIndex < candidateListID?.length - 1) {
        navigate(`/candidates?id=${candidateListID[currentIndex + 1]}`);
      }
    }
  };

  const handlePrevCandidate = () => {
    const searchParams = new URLSearchParams(location.search);
    const currentId = searchParams.get("id");

    if (currentId) {
      const currentIndex = candidateListID?.indexOf(currentId);
      if (currentIndex > 0) {
        navigate(`/candidates?id=${candidateListID[currentIndex - 1]}`);
      }
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get("id");
    console.log(">>>>>>>>>>>>>>>>candidateId", userId);

    if (!!userId) {
      setSelectedCandidateId(userId);
      setTimeout(() => {
        setModalVisibility("candidateInfoModalVisible", true);
      }, [300]);
    } else {
      setModalVisibility("candidateInfoModalVisible", false);
    }
  }, [location]);

  return (
    <div className="sourcing-main-container">
      <Navbar />
      <div className="display-flex flex-1">
        <div
          style={{
            flex: 1,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
            transition: "width 500ms",
          }}
        >
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
                    setIsColumnSelectorOpen(true), handleClose()
                  )}
                >
                  Columns <ColumnIcon />
                </button>
                <button className="buttons border-1 border-blue-600 text-buttonBLue min-w-[40px]">
                  <ExportIcon stroke="#1761D8" />
                </button>

                <button className="buttons border-1 border-blue-600 text-buttonBLue  min-w-[40px] ">
                  <RefreshIcon stroke="#1761D8" />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-grey-90 flex flex-col">
              {isFilter && (
                <div className="flex items-center justify-between p-[10px]">
                  {/* Display Applied Filters */}
                  <div className="flex items-center gap-2 flex-wrap"></div>
                  <div className="flex items-center justify-center gap-[8px]">
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
                {!!candidateList[0] && (
                  <CustomizableCandidateTable
                    data={candidateList}
                    setSelectedCandidateUser={setSelectedCandidate}
                    AddJobClick={() => toggleAddToJobsDrawer(true)}
                    AddFolderClick={() => toggleAddToFolderDrawer(true)}
                    ChangeOwnerShipClick={() =>
                      toggleChangeOwnershipDrawer(true)
                    }
                    setSelectedCandidateUsers={setSelectedCandidates}
                    showDeleteIcon={false}
                    eyeClickOn={handleCandidateEyeClick}
                    onCandidateClick={handleCandidateClick} // Pass function to handle clicks
                    // onCandidateSelect={handleCandidateSelection} // Handle selection
                  />
                )}
              </div>
            </div>
          </div>

          {candidateList?.length > 0 && (
            <div className="sourcing-pagination-div">
              <div
                className="display-flex align-center"
                style={{ gap: 6, flex: 0.5 }}
              >
                <div
                  className={`candidate-card-checkbox`}
                  onClick={setSelectedCandidate}
                >
                  {selectedCandidates?.length === candidateList?.length && (
                    <Tick />
                  )}
                </div>
                <p className="font-12-regular color-dark-black">
                  {resultsPerPage * (currentPage - 1)} -{" "}
                  {resultsPerPage * currentPage > totalCandidateData
                    ? totalCandidateData
                    : resultsPerPage * currentPage}{" "}
                  of {totalCandidateData}
                </p>
              </div>
              {totalCandidatePages > 1 && (
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <PaginationComponent
                    totalPages={totalCandidatePages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
              <div
                className="relative flex items-center space-x-2 justify-end w-1/4"
                ref={dropdownRef}
              >
                <span className="font-12-regular color-grey">
                  Results per page
                </span>
                <button
                  className="border border-customGray rounded-md px-2 py-1 gap-1 text-sm font-ubuntu focus:outline-none focus:ring-0 relative items-center flex"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {resultsPerPage}
                  <DropArrow fill="customBlue" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute bottom-full mb-2 right-0 w-16 text-sm font-ubuntu bg-white shadow-lg rounded-lg overflow-hidden z-50">
                    {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((option) => (
                      <button
                        key={option}
                        className={`block w-full text-center px-4 py-2 text-customBlue hover:bg-gray-100 ${
                          option === resultsPerPage && "bg-gray-100"
                        }`}
                        onClick={() => handleResultsChange(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {isColumnSelectorOpen && (
          <ColumnSelector
            isOpen={isColumnSelectorOpen}
            onClose={() => setIsColumnSelectorOpen(false)}
            selectedColumns={selectedColumns}
            columnData={columnList}
            // setSelectedColumns={setSelectedColumns}
          />
        )}
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

      <CandidateFilterDrawer
        onApply={handleFilterApply}
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
      <CandidateOverviewDrawer
        isOpen={candidateOverviewDrawerOpen}
        onClose={() => toggleCandidateOverviewDrawer(false)}
      />
      <CandidateInfoModal
        visible={modals?.candidateInfoModalVisible}
        onClose={() => {
          const searchParams = new URLSearchParams(location.search);
          searchParams.delete("id");
          navigate(`/candidates?${searchParams?.toString()}`);
          setModalVisibility("candidateInfoModalVisible", false);
          setSelectedCandidateId(null);
        }}
        candidateId={selectedCandidateId}
        prevButtonClick={handlePrevCandidate}
        nextButtonClick={handleNextCandidate}
      />
    </div>
  );
};

export default Candidates;
