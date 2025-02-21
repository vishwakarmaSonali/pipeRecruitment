import React, { useState,  useEffect } from "react";
import { Menu, MenuItem, ListItemIcon, Typography } from "@mui/material";
import { css } from "@emotion/react";
import "./Sourcing.css";
import ProfileAdd from "../../../assets/icons/sourcingIcons/profile-add.svg";
import jobIcon from "../../../assets/icons/sourcingIcons/briefcase.svg";
import { ReactComponent as Tick } from "../../../assets/icons/sourcingIcons/tick.svg";
import { ReactComponent as FolderAdd } from "../../../assets/icons/sourcingIcons/folder-add.svg";
import FilterIcon from "../../../assets/icons/filter.svg";
import { ReactComponent as DropArrow } from "../../../assets/icons/droparrow.svg";
import { sourcingHubInfo } from "./config";
import Navbar from "../../../components/navbar/Navbar";
import CandidateCard from "../../../components/sourcing/CandidateCard";
import CandidateDetails from "../../../components/sourcing/CandidateDetails";
import PaginationComponent from "../../../components/common/PaginationComponent";
import CandidateDetailsDrawer from "../../../components/sourcing/CandidateDetailsDrawer";
import { fetchCandidates } from "../../../actions/sourcingActions";
import { useDispatch, useSelector } from "react-redux";
import ShimmerEffectCandidateCard from "../../../components/sourcing/ShimmerEffectCandidateCard";
import FilterDrawer from "../../../components/sourcing/FilterDrawer";
import { useModal } from "../../../components/common/ModalProvider";
import AddToJobsModal from "../../../components/modals/AddToJobsModal";
import AddToFolderModal from "../../../components/modals/AddToFolderModal";
import CreateFolderModal from "../../../components/modals/CreateFolderModal";

const candidates = [
  {
    id: 1,
    name: "Joanna Chou",
    position: "Sr. UI UX Designer at TechNova Solutions",
    location: "San Francisco, CA",
    education: "Rhode Island School of Design",
  },
  {
    id: 2,
    name: "David Kim",
    position: "Frontend Developer at WebWorks",
    location: "New York, NY",
    education: "MIT",
  },
  {
    id: 3,
    name: "Emily Johnson",
    position: "Product Manager at SoftCorp",
    location: "Austin, TX",
    education: "Stanford University",
  },
  {
    id: 4,
    name: "Michael Brown",
    position: "Graphic Designer at Creative Inc.",
    location: "Los Angeles, CA",
    education: "ArtCenter College of Design",
  },
  {
    id: 5,
    name: "Jessica Lee",
    position: "Marketing Specialist at GrowthHackers",
    location: "Seattle, WA",
    education: "Harvard University",
  },
  {
    id: 6,
    name: "Mark Smith",
    position: "Backend Engineer at DevTech",
    location: "Chicago, IL",
    education: "University of Chicago",
  },
  {
    id: 7,
    name: "Sophia White",
    position: "UX Researcher at Pixel Labs",
    location: "Denver, CO",
    education: "Carnegie Mellon University",
  },
  {
    id: 8,
    name: "Robert Wilson",
    position: "Data Scientist at DataWorld",
    location: "San Diego, CA",
    education: "UC Berkeley",
  },
  {
    id: 9,
    name: "Daniel Martinez",
    position: "AI Engineer at AI Innovations",
    location: "Boston, MA",
    education: "MIT",
  },
  {
    id: 10,
    name: "Laura Adams",
    position: "Digital Marketer at Trendy Ads",
    location: "Miami, FL",
    education: "Columbia University",
  },
];

const BulkActionView = ({
  isBulkAction,
  filters,
  onClickFilter,
  onClickAddJob,
  onClickFolder,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const open = Boolean(anchorEl);

  // Function to calculate the number of applied filters
  const countAppliedFilters = () => {
    let count = 0;
    Object.values(filters).forEach((filter) => {
      if (typeof filter === "object") {
        // Count nested filters for years of experience and education
        Object.values(filter).forEach((nestedFilter) => {
          if (nestedFilter && nestedFilter.trim() !== "") count++;
        });
      } else if (filter && filter.trim() !== "") {
        count++;
      }
    });
    return count;
  };

  const filterCount = countAppliedFilters();

  const menuItemStyle = css`
  font-size: 14px;
  font-weight: 500;
  text:'ubuntu'
  fontFamily: "'Ubuntu', sans-serif",  // Apply Ubuntu font
  color: #333;
   &:hover {
    background-color: #f0f0f0;
  }
`;
  // Function to handle opening the dropdown menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to handle closing the dropdown menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="sourcing-header-container">
      <p className="font-22-medium color-dark-black">Sourcing</p>
      <button
        className="text-white bg-buttonBLue px-[14px] py-[10px] rounded-[8px] flex items-center space-x-1 shadow-md hover:bg-opacity-80"
        onClick={isBulkAction ? handleClick : onClickFilter}
      >
        <span className="font-ubuntu text-m">
          {isBulkAction
            ? "Bulk Action"
            : `Filter ${filterCount > 0 ? `(${filterCount})` : ""}`}
        </span>
        {isBulkAction ? (
          <DropArrow fill="white" />
        ) : (
          <img src={FilterIcon} alt="filter" />
        )}
      </button>

      {/* Menu for Bulk Actions */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: "12px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            width: "180px",
            padding: "5px 0",
            marginTop: "5px",
            fontFamily: "'Ubuntu', sans-serif", // Apply Ubuntu font
            fontSize: "14px",
            color: "#151B23",
          },
        }}
      >
        <MenuItem onClick={handleClose} css={menuItemStyle}>
          <ListItemIcon>
            <img src={ProfileAdd} alt="Add to candidate" />
          </ListItemIcon>
          <Typography
            sx={{ fontSize: "14px", fontFamily: "'Ubuntu', sans-serif" }}
          >
            Add to candidate
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            onClickAddJob();
          }}
        >
          <ListItemIcon>
            <img src={jobIcon} alt="Add to jobs" />
          </ListItemIcon>
          <Typography
            sx={{ fontSize: "14px", fontFamily: "'Ubuntu', sans-serif" }}
          >
            Add to jobs
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            onClickFolder();
          }}
        >
          <ListItemIcon>
            <FolderAdd />
          </ListItemIcon>
          <Typography
            sx={{ fontSize: "14px", fontFamily: "'Ubuntu', sans-serif" }}
          >
            Add to folder
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

const NoFiltersScreen = ({ onStartSearching }) => {
  return (
    <div className="sourcing-main-inner-div">
      <h2 className="font-ubuntu text-3xl text-customBlue  text-center font-medium z-50 max-w-[420px]">
        Expand Your Talent Search with Our Sourcing Hub
      </h2>
      <div className="display-flex-20">
        {sourcingHubInfo?.map((item) => {
          return (
            <div key={item?.id} className="sourcing-info-div">
              <img src={item?.image} className="sourcing-info-img" />
              <div className="display-column-8">
                <p className="sourcing-info-title-text">{item?.name}</p>
                <p className="sourcing-info-decription-text">{item?.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="text-white text-ubuntu text-m bg-buttonBLue px-[14px] py-[10px] rounded-[8px] space-x-1 shadow-md hover:bg-opacity-80"
        onClick={onStartSearching}
      >
        {" Start Searching +"}
      </button>
    </div>
  );
};
const Sourcing = () => {
  const dispatch = useDispatch();
  const {
    fetchMoreLoading,
    totalCandidateData,
    totalCandidatePages,
    candidateFilters,
    candidateData,
  } = useSelector((state) => state.sourcing);

  const { modals, setModalVisibility } = useModal();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selectedCandidate, setSelectedCandidate] = useState(
    windowWidth < 1024 ? {} : candidateData[0]
  );
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(20);
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const perPageLimit = 100;

  const [filters, setFilters] = useState({
    jobTitle: "",
    locations: "",
    company: "",
    yearsOfExperience: { from: "", to: "" },
    industry: "",
    radius: "",
    skill: "",
    education: { major: "", school: "", degree: "" },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [candidateDrawerOpen, setCandidateDrawerOpen] = useState(false);

  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const toggleCandidateDrawer = (open) => {
    setCandidateDrawerOpen(open);
  };

  const toggleFilterDrawer = (open) => {
    setFilterDrawerOpen(open);
  };

  const handlePageChange = (page) => {
    setSelectedCandidates([]);
    setCurrentPage(page);
    dispatch(fetchCandidates(null, candidateFilters, page));
  };

  const handleResultsChange = (value) => {
    setResultsPerPage(value);
    setIsDropdownOpen(false);
  };

  const toggleModal = () => {
    console.log("Modal toggle triggered");
    setIsModalOpen((prev) => !prev);
  };

  // Function to handle applying filters
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
      titles: [], // Clear selected job titles
      location: "",
      locations: [], // Clear selected locations
      company: "",
      companies: [], // Clear selected companies
      skills: [], // Clear selected skills
      organizations: [], // Clear selected organizations
      yearsOfExperience: { from: "", to: "" },
      industry: "",
      radius: "",
      radiusType: "",
      education: { major: "", school: "", degree: "" },
    });

    setFiltersApplied(false);
  };

  // Function to select/deselect all candidates
  const handleSelectAll = () => {
    if (selectedCandidates?.length === candidateData?.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(candidateData?.map((candidate) => candidate._id));
    }
  };
  // Handle individual candidate selection
  const handleCandidateSelect = (candidateId) => {
    setSelectedCandidates((prevSelected) =>
      prevSelected.includes(candidateId)
        ? prevSelected.filter((id) => id !== candidateId)
        : [...prevSelected, candidateId]
    );
  };
  const handleCandidateSelectContainer = (candidate) => {
    setSelectedCandidate(candidate);
    if (windowWidth < 1024) {
      toggleCandidateDrawer(true);
    }
  };

  const emptyComponent = () => {
    return (
      <div className="display-column" style={{ gap: 12, maxWidth: "400px" }}>
        <p
          className="font-20-medium color-dark-black"
          style={{ fontWeight: 700, textAlign: "center" }}
        >
          No Result Found
        </p>
        <p
          className="font-16-regular color-dark-black"
          style={{ textAlign: "center" }}
        >
          Oops! No results match your filters. Try adjusting your criteria to
          explore more options
        </p>
      </div>
    );
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    let params = {};
    params.limit = resultsPerPage;
    if (filters?.titles?.length > 0) {
      params.title = filters.titles.join(", ");
    }

    if (filters?.locations?.length > 0) {
      params.location = filters.locations.map((loc) => `'${loc}'`).join(", ");
    }

    if (!!filters?.radius) {
      params.radius = filters?.radius;
    }

    if (!!filters?.radiusType) {
      params.radiusUnit = filters?.radiusType;
    }

    if (filters?.organizations?.length > 0) {
      params.company = filters?.organizations.join("");
    }

    if (filters?.companyList?.length > 0) {
      params.company = filters?.companyList?.join(", ");
    }

    if (!!filters?.experience?.from) {
      params.years_of_experience_from = filters?.experience?.from;
    }

    if (!!filters?.experience?.to) {
      params.years_of_experience_to = filters?.experience?.to;
    }

    if (!!filters?.skill && !(filters?.skillList?.length > 0)) {
      params.skill = filters?.skill;
    }

    if (filters?.skillList?.length > 0) {
      params.skill = filters?.skillList?.join(", ");
    }

    if (filters?.industry) {
      params.industry = filters?.industry;
    }

    if (!!filters?.major && !(filters?.majorList?.length > 0)) {
      params.major = filters?.major;
    }

    if (!!filters?.degree && !(filters?.degreeList?.length > 0)) {
      params.degree = filters?.degree;
    }

    if (!!filters?.school && !(filters?.schoolList?.length > 0)) {
      params.school = filters?.school;
    }

    if (filters?.schoolList?.length > 0) {
      params.school = filters?.schoolList?.join(", ");
    }

    if (filters?.degreeList?.length > 0) {
      params.degree = filters?.degreeList?.join(", ");
    }

    if (filters?.majorList?.length > 0) {
      params.major = filters?.majorList?.join(", ");
    }

    dispatch(fetchCandidates(null, params, 1));
  }, [dispatch, filters, resultsPerPage]);

  useEffect(() => {
    setSelectedCandidate(candidateData[0]);
  }, [candidateData]);

  return (
    <div className="sourcing-main-container">
      <Navbar />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "transparent",
        }}
      >
        {!filtersApplied ? (
          <div
            className="scroll-width-none"
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <NoFiltersScreen
                onStartSearching={() => toggleFilterDrawer(true)}
              />
            </div>
            <p className="sourcing-info-div-auto font-ubuntu">
              Our platform uses trusted third-party data to offer a separate
              external candidate database, keeping your internal data secure and
              private.{" "}
              <span style={{ color: "#1761D8", cursor: "pointer" }}>
                Learn more about data usage.
              </span>
            </p>
          </div>
        ) : (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              backgroundColor: "transparent",
            }}
          >
            <BulkActionView
              toggleModal={toggleModal}
              isBulkAction={selectedCandidates.length > 0}
              onSelectAll={handleSelectAll}
              onClickAddJob={() =>
                setModalVisibility("addToJobsModalVisible", true)
              }
              onClickFolder={() =>
                setModalVisibility("addToFolderModalVisible", true)
              }
              isAllSelected={selectedCandidates.length === candidates.length}
              filters={filters} // Pass filters as a prop
              onClickFilter={() => toggleFilterDrawer(true)}
            />
            {candidateData?.length > 0 ? (
              <div className="sourcing-inner-div">
                <div className="sourcing-inner-section-1">
                  {fetchMoreLoading
                    ? Array(3)
                        .fill("")
                        .map((_, index) => (
                          <ShimmerEffectCandidateCard key={index} />
                        ))
                    : candidateData?.map((item) => {
                        return (
                          <CandidateCard
                            selectedCandidates={selectedCandidates}
                            data={item}
                            selectCandidateClick={(e) => {
                              e.stopPropagation();
                              handleCandidateSelect(item?._id);
                            }}
                            selectedCandidateId={selectedCandidate?._id}
                            onClick={() => handleCandidateSelectContainer(item)}
                          />
                        );
                      })}
                </div>

                <div className="sourcing-inner-section-2">
                  <CandidateDetails
                    data={selectedCandidate}
                    loading={fetchMoreLoading}
                    onClickAddJob={() =>
                      setModalVisibility("addToJobsModalVisible", true)
                    }
                    onClickAddFolder={() =>
                      setModalVisibility("addToFolderModalVisible", true)
                    }
                  />
                </div>
              </div>
            ) : (
              <div className="flex-1 display-flex align-center justify-center">
                {emptyComponent()}
              </div>
            )}

            {candidateData?.length > 0 && (
              <div className="sourcing-pagination-div">
                <div
                  className="display-flex align-center"
                  style={{ gap: 6, flex: 0.5 }}
                >
                  <div
                    className={`candidate-card-checkbox`}
                    onClick={handleSelectAll}
                  >
                    {selectedCandidates?.length === candidateData?.length && (
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
                      {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(
                        (option) => (
                          <button
                            key={option}
                            className={`block w-full text-center px-4 py-2 text-customBlue hover:bg-gray-100 ${
                              option === resultsPerPage && "bg-gray-100"
                            }`}
                            onClick={() => handleResultsChange(option)}
                          >
                            {option}
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <FilterDrawer
        onApply={applyFilters}
        onReset={resetFilters}
        filters={filters}
        isOpen={filterDrawerOpen}
        onClose={() => toggleFilterDrawer(false)}
      />

      <CandidateDetailsDrawer
        visible={candidateDrawerOpen}
        onClose={() => toggleCandidateDrawer(false)}
        data={selectedCandidate}
        onClickAddJob={() => setModalVisibility("addToJobsModalVisible", true)}
        onClickAddFolder={() =>
          setModalVisibility("addToFolderModalVisible", true)
        }
      />
      <AddToJobsModal
        visible={modals?.addToJobsModalVisible}
        onClose={() => setModalVisibility("addToJobsModalVisible", false)}
      />
      <AddToFolderModal
        visible={modals?.addToFolderModalVisible}
        onClose={() => setModalVisibility("addToFolderModalVisible", false)}
      />
      <CreateFolderModal
        visible={modals?.createFolderModalVisible}
        onClose={() => setModalVisibility("createFolderModalVisible", false)}
      />
    </div>
  );
};

export default Sourcing;
