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
import {
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
} from "../../../helpers/config";
import ArchiveCandidateTable from "../../../components/candidate/ArchivedCandidateTable";
import PaginationComponent from "../../../components/common/PaginationComponent";
import { useNavigate } from "react-router-dom";
import { deleteArchivedCandidates, fetchArchivedCandidates, restoreArchivedCandidates } from "../../../actions/customizationActions";
const ArchiveCandidates = ({ isDrawerOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const archivedCandidates = useSelector(
    (state) => state.customization.archivedCandidates?.results
  );
  console.log("archivedCandidatesarchivedCandidates",archivedCandidates);
  
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
  const [currentPage, setCurrentPage] = useState(1);

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
    ...(selectedCandidates?.length > 1
      ? [
          {
            label: "Merge Duplicate",
            icon: <MergeDuplicateIcon />,
            onClick: () =>
              navigate("/merge-candidate")
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
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [forceUpdateKey, setForceUpdateKey] = useState(Date.now()); // 🔥 Force UI Re-render

  
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
  

  useEffect(() => {
    if (currentPage) {
      dispatch(fetchArchivedCandidates(currentPage)).then((data) => {
        if (data && data.totalPages) {
          setTotalPages(data.totalPages);
        }
      });
    }
  }, [dispatch, currentPage]);

  

  // Update local state when Redux data changes
  useEffect(() => {
    dispatch(fetchArchivedCandidates(currentPage));
  }, [dispatch, currentPage]); // Re-fetch when page changes

  useEffect(() => {
    setSelectedCandidates([]); // Clear selection after updates
  }, [archivedCandidates]); // Ensure UI refreshes when Redux data changes
 // ✅ Update local state when Redux data changes
 useEffect(() => {
  if (archivedCandidates.length > 0) {
    setCandidateList([...archivedCandidates]); // Deep copy to trigger re-render
  } else {
    setCandidateList([]); // Ensure empty state updates
  }
}, [archivedCandidates]);
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
  const handleCloseBulkAction = () => {
    setAnchorBulkActionEl(null);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

const handleRestore = (id) => {
    const candidateIds = id ? [id] : selectedCandidates;
  
    if (candidateIds.length === 0) {
      console.error("No candidate selected for restore");
      return;
    }
  
    dispatch(restoreArchivedCandidates(candidateIds)).then(() => {
      notifySuccess("Candidates successfully restored.");
      dispatch(fetchArchivedCandidates(currentPage)); // 🔥 Re-fetch updated data
      
      setSelectedCandidates([]); // Clear selection
      setForceUpdateKey(Date.now()); // 🔥 Force re-render
    });
  };
  // 🔥 Handle Delete Action (Determines message & opens drawer)
  const handleDelete = (id = null) => {
    console.log("Deleting archived candidates:", id || selectedCandidates);
  
    if (id) {
      setDeleteMessage("This candidate profile");
      setDeletingCandidates([id]); // Only delete this one user
    } else if (selectedCandidates?.length === 1) {
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
    console.log(selectedCandidates,"id<<<<<<<<");
    
    if (id) {
      notifySuccess("Candidate has been permanently deleted.");
    } else if (selectedCandidates?.length === 1) {
      notifySuccess("Selected candidate has been permanently deleted.");
    }
    dispatch(deleteArchivedCandidates(selectedCandidates)).then(() => {
      notifySuccess("Candidates successfully deleted.");
      dispatch(fetchArchivedCandidates(currentPage)); // 🔥 Re-fetch updated data
      setSelectedCandidates([]); // Clear selection
    });
    setCandidateList((prev) =>
      prev?.filter((candidate) => !deletingCandidates.includes(candidate.id))
    );
    setSelectedCandidates([]); // Clear selection after deletion
    setForceUpdateKey(Date.now()); // 🔥 Force re-render

    setDeleteCandidateDrawerOpen(false);
  };
  // 🔥 Ensure `candidateList` updates with Redux changes
useEffect(() => {
  setCandidateList(archivedCandidates); // Update local state when Redux state changes
}, [archivedCandidates]);
  return (
    <div
      className="sourcing-main-container"
      // style={{ boxSizing: "border-box" }}
    >
      <Navbar />
      <div
        className=" bg-grey-90"
        style={{ flex: 1, display: "flex", flexDirection: "column" }}
      >

        <div className="flex items-center justify-between p-[17px]">
          <span className="font-ubuntu font-medium text-custom-large">
            Archived Candidates
          </span>
          {/* Action Buttons */}
          {selectedCandidates?.length >= 1 && (
            <div className="flex space-x-2">
              {/* ✅ Dynamically Change Button */}

              <button
                className="buttons border-1 border-blue-600 text-buttonBLue min-w-[40px]"
                onClick={(event) => (
                  handleRestore()
                )}
              >
                Restore Selected
              </button>
              <button
                className="buttons text-white bg-buttonBLue"
                onClick={() => handleDelete(selectedCandidates)}
              >
                Delete Selected
              </button>

              {/* <button className="text-gray-700 pl-[8px]" onClick={handleClick}>
              <ThreeDots />
            </button> */}
            </div>
          )}
        </div>
        <div className="flex-1 bg-grey-90 flex flex-col">
        <div
            style={{
              overflow: "hidden",
              flex: 1,
              maxHeight: "calc(100vh - 194px)",
            }}
          >
              <ArchiveCandidateTable
              key={forceUpdateKey} 
            header={archivedCandidateHeader}
            data={archivedCandidates}
            setSelectedCandidateUser={setSelectedCandidate}
            setSelectedCandidateUsers={setSelectedCandidates}
            showDeleteIcon={false}
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
             <DeleteCandidateDrawer
        isOpen={deleteCandidateDrawerOpen}
        onClose={() => setDeleteCandidateDrawerOpen(false)}
        deleteMessage={deleteMessage} // Pass message dynamically
        onConfirmDelete={handleConfirmDelete} // Pass function to confirm delete
      />
        </div>
      </div>
      {/* Menu for Bulk Actions */}

  
    </div>
  );
};

export default ArchiveCandidates;
