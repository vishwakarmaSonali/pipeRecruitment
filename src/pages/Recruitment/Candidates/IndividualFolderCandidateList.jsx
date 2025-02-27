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
import { ReactComponent as AddtoFolderIcon } from "../../../assets/icons/sourcingIcons/folder-add.svg";
import { ReactComponent as AddToJobsIcon } from "../../../assets/icons/sourcingIcons/briefcase.svg";
import { ReactComponent as AddLabelIcon } from "../../../assets/icons/tag.svg";
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
import ShareFolderModal from "../../../components/modals/ShareFolderModal";
import CommonDeleteModal from "../../../components/modals/CommonDeleteModal";
import AddToJobsDrawer from "../../../components/candidate/AddToJobsDrawer";
import AddToFolderDrawer from "../../../components/candidate/AddToFolderDrawer";
import AddLabelDrawer from "../../../components/candidate/AddLabelDrawer";
import CandidateTable from "../../../components/candidate/CandidateTable";
import { candidateTableHeader } from "../../../helpers/config";

const companies = [
  {
    id: 1,
    name: "xBoost",
    logo: "https://via.placeholder.com/40/000000/FFFFFF?text=X", // Replace with actual logo
    bgColor: "bg-black",
  },
  {
    id: 2,
    name: "Upside",
    logo: "https://via.placeholder.com/40/0000FF/FFFFFF?text=U", // Replace with actual logo
    bgColor: "bg-blue-700",
  },
  {
    id: 3,
    name: "Crown",
    logo: "https://via.placeholder.com/40/004F4F/FFFFFF?text=C", // Replace with actual logo
    bgColor: "bg-teal-800",
  },
];
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
  const [addToFolderDrawerOpen, setAddToFolderDrawerOpen] = useState(false);
  const [addToJobsDrawerOpen, setAddToJobsDrawerOpen] = useState(false);
  const [addLabelDrawerOpen, setAddLabelDrawerOpen] = useState(false);
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
  const [selectedCandidate, setSelectedCandidate] = useState(null);
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
  const handleBulkActionClose = () => {
    setAnchorBulkActionEl(null);
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
  const threeDotsMenuItems = [
    {
      label: "Add candidates",
      icon: <AddCandidate />,
      onClick: () => (setModalVisibility("AddCandidatesToFolderVisible", true),handleSettingsClose()),
    },
    {
      label: "Share Folder",
      icon: <ShareFolder />,
      onClick: () => (setModalVisibility("AddCandidatesToFolderVisible", true),handleSettingsClose()),
    },
    {
      label: "Export",
      icon: <ExportIcon stroke="#151B23" />,
      onClick: () => handleSettingsClose(),
    },

    {
      label: "Edit Folder",
      icon: <EditIcon />,
      onClick: () => navigate("/archive-candidates"),
    },
    {
      label: "Delete Folder",
      icon: <DeleteIcon />,
      onClick: () => (setModalVisibility('categoryDeleteModalVisible',true),handleSettingsClose()) ,
    },
  ];
  const bulkActionMenuItems = [
 {
       label: "Add to jobs",
       icon: <AddToJobsIcon />,
       onClick: () =>( setAddToJobsDrawerOpen(true),handleBulkActionClose()),
     },
     {
       label: "Add to folder",
       icon: <AddtoFolderIcon stroke="#151B23" />,
       onClick: () => (setAddToFolderDrawerOpen(true),handleBulkActionClose()),
     },
     {
      label: "Add label",
      icon: <AddLabelIcon stroke="#151B23" />,
      onClick: () => (setAddLabelDrawerOpen(true),handleBulkActionClose()),
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
  const HorizontalCompanyList = () => {
    return (
      <div className="flex items-center space-x-4 px-[12px] overflow-x-auto rounded-lg">
        {companies.map((company) => (
          <div
            key={company.id}
            className="flex items-center bg-customGrey1 justify-between p-2 rounded-[8px] space-x-2 min-w-[315px] max-h-[52px]"
          >
            {/* Company Logo */}
            <div className="flex items-center space-x-2 ">
              <div
                className={`w-10 h-10 rounded-full ${company.bgColor} flex items-center justify-center text-white font-semibold`}
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-10 h-10 rounded-full"
                />
              </div>

              {/* Company Name */}
              <p className="text-gray-900 font-medium">{company.name}</p>
            </div>
            {/* Delete Icon */}
            <button className="ml-auto text-gray-500 hover:text-red-600">
              <DeleteIcon />
            </button>
          </div>
        ))}
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
  const handleClickBulkAction = (event) => {
    setAnchorBulkActionEl(event.currentTarget);
  };

  const deleteCategory = () => {
    setModalVisibility("categoryDeleteModalVisible", false);
  };
  const toggleAddToFolderDrawer = (open) => {
    setAddToFolderDrawerOpen(open);
  };

  const toggleAddToJobsDrawer = (open) => {
    setAddToJobsDrawerOpen(open);
  };
  const toggleAddLabelDrawer = (open) => {
    setAddLabelDrawerOpen(open);
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

        <div className="flex items-center justify-between p-[17px] ">
          <div className="flex items-center space-x-4">
            <FolderIcon className="w-[36px] h-[36px] text-blue-500" />
            <div>
              <span className="font-ubuntu font-medium text-l">
                {location.state?.name || "Unknown"}
              </span>
              <p className="text-sm text-gray-600">
                {"Sort listed candidates for CodeHive Technologies, Mumbai"}
              </p>
            </div>
          </div>

          {/* Right Section - Star & Menu */}
          <div className="flex items-center space-x-4">
            {selectedCandidates.length > 0 && (
              <button className="buttons text-white bg-buttonBLue" onClick={handleClickBulkAction}>
                Batch Actions
                <DropArrow fill="white" />
              </button>
            )}
            <button onClick={() => setIsStarred(!isStarred)}>
              {isStarred ? (
                <StarFilled className="w-5 h-5 text-yellow-500" />
              ) : (
                <StarOutlined className="w-5 h-5 text-gray-400" />
              )}
            </button>
            <button
              className="text-gray-500 hover:text-black"
              onClick={handleClickSetting}
            >
              <ThreeDots className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex mb-[24px]  border-gray-300 px-[17px]">
          {/* Candidates Tab */}
          <div
            className={`flex items-center space-x-1 pb-2 cursor-pointer font-ubuntu text-m  px-[10px] border-b border-customGrey ${
              activeTab === "candidates"
                ? "text-black  border-b border-customBlue"
                : "text-gray-500 border-b border-customGrey"
            }`}
            onClick={() => setActiveTab("candidates")}
          >
            <span className="">Candidates</span>
            <span className="text-buttonBLue">03</span>
          </div>

          {/* Team Tab */}
          <div
            className={`flex items-center space-x-1 pb-2 cursor-pointer pl-6 font-ubuntu text-m  px-[10px] ${
              activeTab === "team"
                ? "text-black  border-b border-customBlue"
                : "text-gray-500 border-b border-customGrey"
            }`}
            onClick={() => setActiveTab("team")}
          >
            <span className="">Team</span>
            <span className="text-buttonBLue">03</span>
          </div>
        </div>
        {/* here */}
        {activeTab == "candidates" ? (
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
                setSelectedCandidateUsers={setSelectedCandidates}
                showDeleteIcon={true}
                deleteIconClick={()=>setModalVisibility("removeUserModalVisible", true)}
              />
            </div>
        ) : (
          <div>{HorizontalCompanyList()}</div>
        )}
        {/* filter div */}
      </div>
      <PaginationFooter />
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
        menuItems={bulkActionMenuItems}
      />
      <AddCandidatesToFolder
        visible={modals?.AddCandidatesToFolderVisible}
        onClose={() =>
          setModalVisibility("AddCandidatesToFolderVisible", false)
        }
      />
      <ShareFolderModal
        visible={modals?.ShareFolderModalVisible}
        onClose={() => setModalVisibility("ShareFolderModalVisible", false)}
      />
      <CommonDeleteModal
        visible={modals?.categoryDeleteModalVisible}
        title={"Delete Folder"}
        description={"Are you sure you want to delete this folder?"}
        onClose={() => {
          setModalVisibility("categoryDeleteModalVisible", false);
        }}
        onClickDelete={deleteCategory}
      />
       <CommonDeleteModal
        visible={modals?.removeUserModalVisible}
        title={"Remove User"}
        description={"Are you sure you want to delete this user?"}
        onClose={() => {
          setModalVisibility("removeUserModalVisible", false);
        }}
        onClickDelete={deleteCategory}
      />
         <AddToJobsDrawer
        // onApply={applyFilters}
        // onReset={resetFilters}
        // filters={filters}
        isOpen={addToJobsDrawerOpen}
        onClose={() => toggleAddToJobsDrawer(false)}
      />
         <AddToFolderDrawer
        // onApply={applyFilters}
        // onReset={resetFilters}
        // filters={filters}
        isOpen={addToFolderDrawerOpen}
        onClose={() => toggleAddToFolderDrawer(false)}
      />
              <AddLabelDrawer
        // onApply={applyFilters}
        // onReset={resetFilters}
        // filters={filters}
        isOpen={addLabelDrawerOpen}
        onClose={() => toggleAddLabelDrawer(false)}
      />
   <CommonDeleteModal
        visible={modals?.categoryDeleteModalVisible}
        title={"Delete Folder"}
        description={"Are you sure you want to delete this folder?"}
        onClose={() => {
          setModalVisibility("categoryDeleteModalVisible", false);
          // setSelectedItem(null);
        }}
        // onClickDelete={deleteCategory}
      />
      {/* Menu for Bulk Actions */}
    </div>
  );
};

export default IndividualFilterCandidateListPage;
