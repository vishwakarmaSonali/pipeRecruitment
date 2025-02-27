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
  candidateTableHeader,
} from "../../../helpers/config";
import CandidateTable1 from "../../../components/candidate/ArchivedCandidateTable";
import ArchiveCandidateTable from "../../../components/candidate/ArchivedCandidateTable";
import PaginationComponent from "../../../components/common/PaginationComponent";
import MergeCandidates from "../../../components/candidate/MergeCandidateComp";
const MergeDuplicateCandidatesPage = ({ isDrawerOpen }) => {
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
  const handlePageChange = (page) => {
    setCurrentPage(page);
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
           Merge Duplicate Candidates
          </span>
          {/* Action Buttons */}
       
            <div className="flex space-x-2">
              {/* ✅ Dynamically Change Button */}

             
              <button
                className="buttons text-white bg-buttonBLue"
                onClick={() => handleDelete()}
              >
               Merge Candidates
              </button>

              {/* <button className="text-gray-700 pl-[8px]" onClick={handleClick}>
              <ThreeDots />
            </button> */}
            </div>
        
        </div>
        <div className="flex-1 bg-grey-90 flex flex-col">
     {/* put this here */}
     <div className="">
<MergeCandidates candidate1={candidate1} candidate2={candidate2}/>
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

export default MergeDuplicateCandidatesPage;

const candidate2 = {
    "success": true,
    "candidate": {
        "structuredCandidate": {
            "candidateDetails": {
                "label": "Candidate Details",
                "order": 1,
                "hide": false,
                "fields": [
                    {
                        "name": "salutation",
                        "label": "Salutation",
                        "type": "text",
                        "options": [],
                        "order": 1,
                        "default": true,
                        "hide": false,
                        "value": "ms."
                    },
                    {
                        "name": "first_name",
                        "label": "First Name",
                        "type": "text",
                        "options": [],
                        "order": 2,
                        "default": true,
                        "hide": false,
                        "value": "Sonali"
                    },
                    {
                        "name": "last_name",
                        "label": "Last Name",
                        "type": "text",
                        "options": [],
                        "order": 3,
                        "default": true,
                        "hide": false,
                        "value": "Vishwakarma"
                    },
                    {
                        "name": "gender",
                        "label": "Gender",
                        "type": "select",
                        "options": [
                            "Male",
                            "Female",
                            "Other"
                        ],
                        "order": 4,
                        "default": true,
                        "hide": false,
                        "value": "female"
                    },
                    {
                        "name": "date_of_birth",
                        "label": "Date of Birth",
                        "type": "date",
                        "options": [],
                        "order": 5,
                        "default": true,
                        "hide": false,
                        "value": "1998-04-02"
                    },
                    {
                        "name": "location",
                        "label": "Location",
                        "type": "text",
                        "options": [],
                        "order": 6,
                        "default": true,
                        "hide": false,
                        "value": "Hyderabad, Telangana, India"
                    },
                    {
                        "name": "nationality",
                        "label": "Nationality",
                        "type": "text",
                        "options": [],
                        "order": 7,
                        "default": true,
                        "hide": false,
                        "value": "indian"
                    },
                    {
                        "name": "add_to_folder",
                        "label": "Add to Folder",
                        "type": "boolean",
                        "options": [],
                        "order": 8,
                        "default": true,
                        "hide": false,
                        "value": null
                    },
                    {
                        "name": "add_to_jobs",
                        "label": "Add to Jobs",
                        "type": "boolean",
                        "options": [],
                        "order": 9,
                        "default": true,
                        "hide": false,
                        "value": null
                    },
                    {
                        "name": "profile_photo",
                        "label": "Profile Photo",
                        "type": "text",
                        "options": [],
                        "order": 10,
                        "default": true,
                        "hide": false,
                        "value": null
                    }
                ],
                "data": null
            },
            "contact_details": {
                "label": "Contact Details",
                "order": 2,
                "hide": false,
                "fields": [
                    {
                        "name": "country_code",
                        "label": "Country Code",
                        "type": "text",
                        "options": [],
                        "order": 1,
                        "default": true,
                        "hide": false,
                        "value": "+91"
                    },
                    {
                        "name": "phone",
                        "label": "Phone",
                        "type": "text",
                        "options": [],
                        "order": 2,
                        "default": true,
                        "hide": false,
                        "value": "9090909090"
                    },
                    {
                        "name": "email",
                        "label": "Email",
                        "type": "text",
                        "options": [],
                        "order": 3,
                        "default": true,
                        "hide": false,
                        "value": "ss.doe@example.com"
                    }
                ],
                "data": null
            },
            "candidate_description": {
                "label": "Candidate Description",
                "order": 3,
                "hide": false,
                "fields": [
                    {
                        "name": "description",
                        "label": "Description",
                        "type": "text",
                        "options": [],
                        "order": 1,
                        "default": true,
                        "hide": false,
                        "value": null
                    }
                ],
                "data": null
            },
            "skills": {
                "label": "Skills",
                "order": 4,
                "hide": false,
                "fields": [],
                "data": [
                    {
                        "name": "JavaScript",
                        "level": 5
                    },
                    {
                        "name": "Node.js",
                        "level": 4
                    }
                ]
            },
            "professional_details": {
                "label": "Professional Details",
                "order": 5,
                "hide": false,
                "fields": [
                    {
                        "name": "experience",
                        "label": "Experience (Years)",
                        "type": "number",
                        "options": [],
                        "order": 1,
                        "default": true,
                        "hide": false,
                        "value": null
                    },
                    {
                        "name": "highest_qualification",
                        "label": "Highest Qualification",
                        "type": "text",
                        "options": [],
                        "order": 2,
                        "default": true,
                        "hide": false,
                        "value": null
                    },
                    {
                        "name": "current_job_title",
                        "label": "Current Job Title",
                        "type": "text",
                        "options": [],
                        "order": 3,
                        "default": true,
                        "hide": false,
                        "value": null
                    },
                    {
                        "name": "current_employer",
                        "label": "Current Employer",
                        "type": "text",
                        "options": [],
                        "order": 4,
                        "default": true,
                        "hide": false,
                        "value": null
                    },
                    {
                        "name": "current_salary",
                        "label": "Current Salary",
                        "type": "number",
                        "options": [],
                        "order": 5,
                        "default": true,
                        "hide": false,
                        "value": null
                    },
                    {
                        "name": "expected_salary",
                        "label": "Expected Salary",
                        "type": "number",
                        "options": [],
                        "order": 6,
                        "default": true,
                        "hide": false,
                        "value": null
                    },
                    {
                        "name": "domain",
                        "label": "Industry Domain",
                        "type": "text",
                        "options": [],
                        "order": 7,
                        "default": true,
                        "hide": false,
                        "value": null
                    }
                ],
                "data": null
            },
            "languages": {
                "label": "Languages",
                "order": 6,
                "hide": false,
                "fields": [
                    {
                        "name": "language",
                        "label": "Language",
                        "type": "text",
                        "options": [],
                        "order": 1,
                        "default": true,
                        "hide": false,
                        "value": null
                    }
                ],
                "data": null
            },
            "social_links": {
                "label": "Social Links",
                "order": 7,
                "hide": false,
                "fields": [
                    {
                        "name": "linkedin_url",
                        "label": "LinkedIn URL",
                        "type": "text",
                        "options": [],
                        "order": 1,
                        "default": true,
                        "hide": false,
                        "value": null
                    },
                    {
                        "name": "twitter_url",
                        "label": "Twitter URL",
                        "type": "text",
                        "options": [],
                        "order": 2,
                        "default": true,
                        "hide": false,
                        "value": null
                    },
                    {
                        "name": "github_url",
                        "label": "GitHub URL",
                        "type": "text",
                        "options": [],
                        "order": 3,
                        "default": true,
                        "hide": false,
                        "value": null
                    },
                    {
                        "name": "facebook_url",
                        "label": "Facebook URL",
                        "type": "text",
                        "options": [],
                        "order": 4,
                        "default": true,
                        "hide": false,
                        "value": null
                    }
                ],
                "data": null
            },
            "employment_history": {
                "label": "Employment History",
                "order": 8,
                "hide": false,
                "fields": [
                    {
                        "name": "company",
                        "label": "Company",
                        "type": "text",
                        "options": [],
                        "order": 1,
                        "default": true,
                        "hide": false,
                        "value": null
                    },
                    {
                        "name": "title",
                        "label": "Job Title",
                        "type": "text",
                        "options": [],
                        "order": 2,
                        "default": true,
                        "hide": false,
                        "value": "Software Engineer"
                    },
                    {
                        "name": "start_date",
                        "label": "Start Date",
                        "type": "date",
                        "options": [],
                        "order": 3,
                        "default": true,
                        "hide": false,
                        "value": null
                    },
                    {
                        "name": "end_date",
                        "label": "End Date",
                        "type": "date",
                        "options": [],
                        "order": 4,
                        "default": true,
                        "hide": false,
                        "value": null
                    },
                    {
                        "name": "current",
                        "label": "Current Job",
                        "type": "boolean",
                        "options": [],
                        "order": 5,
                        "default": true,
                        "hide": false,
                        "value": null
                    },
                    {
                        "name": "location",
                        "label": "Location",
                        "type": "text",
                        "options": [],
                        "order": 6,
                        "default": true,
                        "hide": false,
                        "value": "Hyderabad, Telangana, India"
                    },
                    {
                        "name": "industry",
                        "label": "Industry",
                        "type": "text",
                        "options": [],
                        "order": 7,
                        "default": true,
                        "hide": false,
                        "value": null
                    }
                ],
                "data": null
            },
            "education": {
                "label": "Education",
                "order": 9,
                "hide": false,
                "fields": [
                    {
                        "name": "school",
                        "label": "School/University",
                        "type": "text",
                        "options": [],
                        "order": 1,
                        "default": true,
                        "hide": false,
                        "value": null
                    },
                    {
                        "name": "degree",
                        "label": "Degree",
                        "type": "text",
                        "options": [],
                        "order": 2,
                        "default": true,
                        "hide": false,
                        "value": null
                    },
                    {
                        "name": "field_of_study",
                        "label": "Field of Study",
                        "type": "text",
                        "options": [],
                        "order": 3,
                        "default": true,
                        "hide": false,
                        "value": null
                    },
                    {
                        "name": "start_date",
                        "label": "Start Year",
                        "type": "date",
                        "options": [],
                        "order": 4,
                        "default": true,
                        "hide": false,
                        "value": null
                    },
                    {
                        "name": "end_date",
                        "label": "End Year",
                        "type": "date",
                        "options": [],
                        "order": 5,
                        "default": true,
                        "hide": false,
                        "value": null
                    }
                ],
                "data": null
            }
        },
        "raw_data": {
            "first_name": "Sonali",
            "last_name": "Vishwakarma",
            "profileImage":"",
            "email": "ss.doe@example.com",
            "salutation": "ms.",
            "nationality": "indian",
            "date_of_birth": "1998-04-02",
            "gender": "female",
            "phone": "9090909090",
            "country_code": "+91",
            "city": "Hyderabad",
            "state": "Telangana",
            "country": "India",
            "title": "Software Engineer",
            "skills": [
                {
                    "name": "JavaScript",
                    "level": 5
                },
                {
                    "name": "Node.js",
                    "level": 4
                }
            ],
            "info": "test info",
            "showArray": [
                {
                    "key": "value"
                },
                {
                    "hasBool": true
                }
            ],
            "work_preference": {
                "waaafh": true,
                "aadf": false
            },
            "education_1": {
                "Bachlor of Computer Science": "yes"
            },
            "location": "Hyderabad, Telangana, India",
            "geo_location": {
                "lat": 17.360589,
                "lon": 78.4740613
            }
        }
    }
}

const candidate1 = {
    "success": true,
    "candidate": {
        "structuredCandidate": {
            "candidateDetails": {
                "label": "Candidate Details",
                "order": 1,
                "hide": false,
                "fields": [
                    {
                        "name": "salutation",
                        "label": "Salutation",
                        "type": "text",
                        "options": [],
                        "order": 1,
                        "default": true,
                        "hide": false,
                        "value": "Ms."
                    },
                    {
                        "name": "first_name",
                        "label": "First Name",
                        "type": "text",
                        "options": [],
                        "order": 2,
                        "default": true,
                        "hide": false,
                        "value": "Sonali"
                    },
                    {
                        "name": "last_name",
                        "label": "Last Name",
                        "type": "text",
                        "options": [],
                        "order": 3,
                        "default": true,
                        "hide": false,
                        "value": "Vishwakarma"
                    },
                    {
                        "name": "gender",
                        "label": "Gender",
                        "type": "select",
                        "options": [
                            "Male",
                            "Female",
                            "Other"
                        ],
                        "order": 4,
                        "default": true,
                        "hide": false,
                        "value": "female"
                    },
                    {
                        "name": "date_of_birth",
                        "label": "Date of Birth",
                        "type": "date",
                        "options": [],
                        "order": 5,
                        "default": true,
                        "hide": false,
                        "value": "2025-02-12"
                    },
                    {
                        "name": "location",
                        "label": "Location",
                        "type": "text",
                        "options": [],
                        "order": 6,
                        "default": true,
                        "hide": false,
                        "value": null
                    },
                    {
                        "name": "nationality",
                        "label": "Nationality",
                        "type": "text",
                        "options": [],
                        "order": 7,
                        "default": true,
                        "hide": false,
                        "value": null
                    },
                    {
                        "name": "add_to_folder",
                        "label": "Add to Folder",
                        "type": "boolean",
                        "options": [],
                        "order": 8,
                        "default": true,
                        "hide": false,
                        "value": null
                    },
                    {
                        "name": "add_to_jobs",
                        "label": "Add to Jobs",
                        "type": "boolean",
                        "options": [],
                        "order": 9,
                        "default": true,
                        "hide": false,
                        "value": null
                    },
                    {
                        "name": "profile_photo",
                        "label": "Profile Photo",
                        "type": "text",
                        "options": [],
                        "order": 10,
                        "default": true,
                        "hide": false,
                        "value": null
                    }
                ],
                "data": null
            },
            "contact_details": {
                "label": "Contact Details",
                "order": 2,
                "hide": false,
                "fields": [
                    {
                        "name": "country_code",
                        "label": "Country Code",
                        "type": "text",
                        "options": [],
                        "order": 1,
                        "default": true,
                        "hide": false,
                        "value": "+1"
                    },
                    {
                        "name": "phone",
                        "label": "Phone",
                        "type": "text",
                        "options": [],
                        "order": 2,
                        "default": true,
                        "hide": false,
                        "value": "9090909090"
                    },
                    {
                        "name": "email",
                        "label": "Email",
                        "type": "text",
                        "options": [],
                        "order": 3,
                        "default": true,
                        "hide": false,
                        "value": "tulsidholariya2311@gmail.com"
                    }
                ],
                "data": null
            },
            "candidate_description": {
                "label": "Candidate Description",
                "order": 3,
                "hide": false,
                "fields": [
                    {
                        "name": "description",
                        "label": "Description",
                        "type": "text",
                        "options": [],
                        "order": 1,
                        "default": true,
                        "hide": false,
                        "value": null
                    }
                ],
                "data": null
            },
            "skills": {
                "label": "Skills",
                "order": 4,
                "hide": false,
                "fields": [],
                "data": [
                    {
                        "name": "developer",
                        "level": 8
                    },
                    {
                        "name": "quality analyst",
                        "level": 5
                    }
                ]
            },
            "professional_details": {
                "label": "Professional Details",
                "order": 5,
                "hide": false,
                "fields": [
                    {
                        "name": "experience",
                        "label": "Experience (Years)",
                        "type": "number",
                        "options": [],
                        "order": 1,
                        "default": true,
                        "hide": false,
                        "value": null
                    },
                    {
                        "name": "highest_qualification",
                        "label": "Highest Qualification",
                        "type": "text",
                        "options": [],
                        "order": 2,
                        "default": true,
                        "hide": false,
                        "value": null
                    },
                    {
                        "name": "current_job_title",
                        "label": "Current Job Title",
                        "type": "text",
                        "options": [],
                        "order": 3,
                        "default": true,
                        "hide": false,
                        "value": null
                    },
                    {
                        "name": "current_employer",
                        "label": "Current Employer",
                        "type": "text",
                        "options": [],
                        "order": 4,
                        "default": true,
                        "hide": false,
                        "value": null
                    },
                    {
                        "name": "current_salary",
                        "label": "Current Salary",
                        "type": "number",
                        "options": [],
                        "order": 5,
                        "default": true,
                        "hide": false,
                        "value": "3232"
                    },
                    {
                        "name": "expected_salary",
                        "label": "Expected Salary",
                        "type": "number",
                        "options": [],
                        "order": 6,
                        "default": true,
                        "hide": false,
                        "value": "32232"
                    },
                    {
                        "name": "domain",
                        "label": "Industry Domain",
                        "type": "text",
                        "options": [],
                        "order": 7,
                        "default": true,
                        "hide": false,
                        "value": null
                    }
                ],
                "data": null
            },
            "languages": {
                "label": "Languages",
                "order": 6,
                "hide": false,
                "fields": [
                    {
                        "name": "language",
                        "label": "Language",
                        "type": "text",
                        "options": [],
                        "order": 1,
                        "default": true,
                        "hide": false,
                        "value": null
                    }
                ],
                "data": null
            },
            "social_links": {
                "label": "Social Links",
                "order": 7,
                "hide": false,
                "fields": [
                    {
                        "name": "linkedin_url",
                        "label": "LinkedIn URL",
                        "type": "text",
                        "options": [],
                        "order": 1,
                        "default": true,
                        "hide": false,
                        "value": null
                    },
                    {
                        "name": "twitter_url",
                        "label": "Twitter URL",
                        "type": "text",
                        "options": [],
                        "order": 2,
                        "default": true,
                        "hide": false,
                        "value": null
                    },
                    {
                        "name": "github_url",
                        "label": "GitHub URL",
                        "type": "text",
                        "options": [],
                        "order": 3,
                        "default": true,
                        "hide": false,
                        "value": null
                    },
                    {
                        "name": "facebook_url",
                        "label": "Facebook URL",
                        "type": "text",
                        "options": [],
                        "order": 4,
                        "default": true,
                        "hide": false,
                        "value": null
                    }
                ],
                "data": null
            },
            "employment_history": {
                "label": "Employment History",
                "order": 8,
                "hide": false,
                "fields": [
                    {
                        "name": "company",
                        "label": "Company",
                        "type": "text",
                        "options": [],
                        "order": 1,
                        "default": true,
                        "hide": false,
                        "value": null
                    },
                    {
                        "name": "title",
                        "label": "Job Title",
                        "type": "text",
                        "options": [],
                        "order": 2,
                        "default": true,
                        "hide": false,
                        "value": null
                    },
                    {
                        "name": "start_date",
                        "label": "Start Date",
                        "type": "date",
                        "options": [],
                        "order": 3,
                        "default": true,
                        "hide": false,
                        "value": null
                    },
                    {
                        "name": "end_date",
                        "label": "End Date",
                        "type": "date",
                        "options": [],
                        "order": 4,
                        "default": true,
                        "hide": false,
                        "value": null
                    },
                    {
                        "name": "current",
                        "label": "Current Job",
                        "type": "boolean",
                        "options": [],
                        "order": 5,
                        "default": true,
                        "hide": false,
                        "value": null
                    },
                    {
                        "name": "location",
                        "label": "Location",
                        "type": "text",
                        "options": [],
                        "order": 6,
                        "default": true,
                        "hide": false,
                        "value": null
                    },
                    {
                        "name": "industry",
                        "label": "Industry",
                        "type": "text",
                        "options": [],
                        "order": 7,
                        "default": true,
                        "hide": false,
                        "value": null
                    }
                ],
                "data": null
            },
            "education": {
                "label": "Education",
                "order": 9,
                "hide": false,
                "fields": [
                    {
                        "name": "school",
                        "label": "School/University",
                        "type": "text",
                        "options": [],
                        "order": 1,
                        "default": true,
                        "hide": false,
                        "value": null
                    },
                    {
                        "name": "degree",
                        "label": "Degree",
                        "type": "text",
                        "options": [],
                        "order": 2,
                        "default": true,
                        "hide": false,
                        "value": null
                    },
                    {
                        "name": "field_of_study",
                        "label": "Field of Study",
                        "type": "text",
                        "options": [],
                        "order": 3,
                        "default": true,
                        "hide": false,
                        "value": null
                    },
                    {
                        "name": "start_date",
                        "label": "Start Year",
                        "type": "date",
                        "options": [],
                        "order": 4,
                        "default": true,
                        "hide": false,
                        "value": null
                    },
                    {
                        "name": "end_date",
                        "label": "End Year",
                        "type": "date",
                        "options": [],
                        "order": 5,
                        "default": true,
                        "hide": false,
                        "value": null
                    }
                ],
                "data": null
            }
        },
        "raw_data": {
            "first_name": "Sonali",
            "last_name": "Vishwakarma",
            "profileImage":"https://www.google.com/url?sa=i&url=https%3A%2F%2Fgratisography.com%2F&psig=AOvVaw0jpV1N6p5cR0YT2sVP1cau&ust=1740726665040000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOD4-KWm44sDFQAAAAAdAAAAABAE",
            "email": "tulsidholariya2311@gmail.com",
            "date_of_birth": "2025-02-12",
            "gender": "female",
            "phone": "9090909090",
            "country_code": "+1",
            "city": "London, England, United Kingdom",
            "country": "United States",
            "salutation": "Ms.",
            "skills": [
                {
                    "name": "developer",
                    "level": 8
                },
                {
                    "name": "quality analyst",
                    "level": 5
                }
            ],
            "info": "<p>fsdsdfsdfsdf</p>",
            "showArray": [
                {
                    "key": "value"
                },
                {
                    "hasBool": true
                }
            ],
            "education_1": {
                "MCA": "yes"
            },
            "years_of_experience": "3.5",
            "current_salary": "3232",
            "expected_salary": "32232",
            "location": null,
            "geo_location": null
        }
    }
}




