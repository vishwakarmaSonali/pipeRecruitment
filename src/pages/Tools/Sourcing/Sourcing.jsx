import React, { useState, useRef, useEffect } from "react";
import { Menu, MenuItem, ListItemIcon, Typography } from "@mui/material";
import { css } from "@emotion/react";
import "./Sourcing.css";
import ProfileAdd from "../../../assets/icons/sourcingIcons/profile-add.svg";
import jobIcon from "../../../assets/icons/sourcingIcons/briefcase.svg";
import FolderAdd from "../../../assets/icons/sourcingIcons/folder-add.svg";
import Download from "../../../assets/icons/sourcingIcons/download.svg";
import { ReactComponent as Tick } from "../../../assets/icons/sourcingIcons/tick.svg";
import FilterIcon from "../../../assets/icons/filter.svg";
import { ReactComponent as DropArrow } from "../../../assets/icons/droparrow.svg";
import FilterModal from "../../../components/filterModal/FilterModal";
import FolderModal from "../../../components/AddToFolderModals/AddModal";
import hiddenTalent from "../../../assets/images/SourcingImages/1.png";
import refineSearch from "../../../assets/images/SourcingImages/2.png";
import talentpipelines from "../../../assets/images/SourcingImages/3.png";
import AddToFolderModal from "../../../components/AddToJobsModals/AddToJobs";
import AddToJobsModal from "../../../components/AddToJobsModals/AddToJobs";
import { sourcingHubInfo } from "./config";
import Navbar from "../../../components/navbar/Navbar";
import CandidateCard from "../../../components/sourcing/CandidateCard";
import CandidateDetails from "../../../components/sourcing/CandidateDetails";
import PaginationComponent from "../../../components/common/PaginationComponent";
import CandidateDetailsDrawer from "../../../components/sourcing/CandidateDetailsDrawer";
import { fetchCandidates } from "../../../actions/sourcingActions";
import { useDispatch, useSelector } from "react-redux";
import ShimmerEffectCandidateCard from "../../../components/sourcing/ShimmerEffectCandidateCard";

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
  toggleModal,
  isBulkAction,
  onSelectAll,
  isAllSelected,
  toggleJobModal,
  filters, // Receive filters prop
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [jobModalOpen, setJobModalOpen] = useState(false);
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
  const handleAddToFolderMenu = () => {
    handleClose();
    setModalOpen(true);
  };
  const handleAddToJobMenu = () => {
    handleClose();
    setJobModalOpen(true);
  };
  return (
    <div className="sourcing-header-container">
      <p className="font-22-medium color-dark-black">Sourcing</p>
      <button
        className="text-white bg-buttonBLue px-[14px] py-[10px] rounded-[8px] flex items-center space-x-1 shadow-md hover:bg-opacity-80"
        onClick={isBulkAction ? handleClick : toggleModal}
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
        <MenuItem onClick={handleAddToJobMenu}>
          <ListItemIcon>
            <img src={jobIcon} alt="Add to jobs" />
          </ListItemIcon>
          <Typography
            sx={{ fontSize: "14px", fontFamily: "'Ubuntu', sans-serif" }}
          >
            Add to jobs
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleAddToFolderMenu}>
          <ListItemIcon>
            <img src={FolderAdd} alt="Add to folder" />
          </ListItemIcon>
          <Typography
            sx={{ fontSize: "14px", fontFamily: "'Ubuntu', sans-serif" }}
          >
            Add to folder
          </Typography>
        </MenuItem>
      </Menu>
      {modalOpen && (
        <FolderModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      )}
      {jobModalOpen && (
        <AddToJobsModal
          isOpen={jobModalOpen}
          onClose={() => setJobModalOpen(false)}
        />
      )}
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

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selectedCandidate, setSelectedCandidate] = useState(
    windowWidth < 1024 ? {} : candidateData[0]
  );
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const perPageLimit = 10;

  const [filters, setFilters] = useState({
    jobTitle: "",
    location: "",
    company: "",
    yearsOfExperience: { from: "", to: "" },
    industry: "",
    education: { major: "", school: "", degree: "" },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [candidateDrawerOpen, setCandidateDrawerOpen] = useState(false);

  const toggleCandidateDrawer = (open) => {
    setCandidateDrawerOpen(open);
  };

  const handlePageChange = (page) => {
    setSelectedCandidates([]);
    setCurrentPage(page);
    dispatch(fetchCandidates(null, candidateFilters, page));
  };

  const toggleModal = () => {
    console.log("Modal toggle triggered");
    setIsModalOpen((prev) => !prev);
  };
  const toggleJobModal = () => {
    console.log("Modal job modal toggle triggered");
    setIsJobModalOpen((prev) => !prev);
  };

  // Function to handle applying filters
  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    setFiltersApplied(true);
    setIsModalOpen(false);
  };

  // Function to reset filters
  const resetFilters = () => {
    setFilters({
      jobTitle: "",
      location: "",
      company: "",
      yearsOfExperience: { from: "", to: "" },
      industry: "",
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
    dispatch(fetchCandidates(null, { limit: perPageLimit }, 1));
  }, [dispatch]);

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
              <NoFiltersScreen onStartSearching={toggleModal} />
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
              isBulkAction={selectedCandidates.length > 1}
              onSelectAll={handleSelectAll}
              isAllSelected={selectedCandidates.length === candidates.length}
              jobModalOpen={toggleJobModal}
              filters={filters} // Pass filters as a prop
            />
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
                />
              </div>
            </div>

            <div className="sourcing-pagination-div">
              <div
                className="display-flex align-center"
                style={{ gap: 6, flex: 0.5 }}
              >
                <div
                  className={`candidate-card-checkbox`}
                  onClick={handleSelectAll}
                >
                  {selectedCandidates?.length === candidates?.length && (
                    <Tick />
                  )}
                </div>
                <p className="font-12-regular color-dark-black">
                  {perPageLimit * (currentPage - 1)} -{" "}
                  {perPageLimit * currentPage > totalCandidateData
                    ? totalCandidateData
                    : perPageLimit * currentPage}{" "}
                  of {totalCandidateData}
                </p>
              </div>
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
              <div style={{ flex: 0.5 }} />
            </div>
          </div>
        )}
      </div>

      <FilterModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        onApply={applyFilters}
        onReset={resetFilters}
        filters={filters}
      />
      <AddToJobsModal
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
      />
      <CandidateDetailsDrawer
        visible={candidateDrawerOpen}
        onClose={() => toggleCandidateDrawer(false)}
        data={selectedCandidate}
      />
    </div>
  );
};

export default Sourcing;
