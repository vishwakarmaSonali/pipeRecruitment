import React, { useState, useRef, useEffect } from "react";
import "./Sourcing.css";
import SearchIcon from "../../../assets/icons/sourcingIcons/search-normal.svg";
import MessagesIcon from "../../../assets/icons/sourcingIcons/messages.svg";
import NotificationIcon from "../../../assets/icons/sourcingIcons/notification.svg";
import LocationPin from "../../../assets/icons/sourcingIcons/locationpin.svg";
import University from "../../../assets/icons/sourcingIcons/teacher.svg";
import ProfileImage from "../../../assets/images/profileImage.svg";
import ProfileAdd from "../../../assets/icons/sourcingIcons/profile-add.svg";
import jobIcon from "../../../assets/icons/sourcingIcons/briefcase.svg";
import FolderAdd from "../../../assets/icons/sourcingIcons/folder-add.svg";
import Download from "../../../assets/icons/sourcingIcons/download.svg";
import Tick from "../../../assets/icons/sourcingIcons/tick.svg";
import FilterIcon from "../../../assets/icons/filter.svg";
const skills = [
  "UI Design",
  "Wireframing",
  "UX Design",
  "Prototyping",
  "Graphics",
  "Typography",
  "Color Theory",
  "Illustration",
  "Designing",
  "Mapping",
  "Animation",
  "3D Modeling",
];
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

const SkillsList = ({ isExpanded }) => {
  const maxRows = 2; // Maximum number of rows to display
  const [visibleSkills, setVisibleSkills] = useState([]);
  const [remainingCount, setRemainingCount] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    // Calculate the visible skills based on the available space
    const calculateSkills = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const skillWidth = 110; // Approximate width of a skill item
        const itemsPerRow = Math.floor(containerWidth / skillWidth);
        const maxVisible = itemsPerRow * maxRows;

        if (skills.length > maxVisible && !isExpanded) {
          setVisibleSkills(skills.slice(0, maxVisible - 1));
          setRemainingCount(skills.length - (maxVisible - 1));
        } else {
          setVisibleSkills(skills);
          setRemainingCount(0);
        }
      }
    };

    calculateSkills();
    window.addEventListener("resize", calculateSkills);
    return () => window.removeEventListener("resize", calculateSkills);
  }, []);

  return (
    <div ref={containerRef} className="py-[12px] bg-white">
      <div className="flex flex-wrap gap-2">
        {visibleSkills.map((skill, index) => (
          <div key={index} className="candidate-skill">
            {skill}
          </div>
        ))}

        {/* Show "+X more" button in the 2nd row if needed */}
        {remainingCount > 0 && (
          <div
            className="candidate-skill"
            onClick={() => setVisibleSkills(skills)}
          >
            +{remainingCount} more
          </div>
        )}
      </div>
    </div>
  );
};
const BulkActionView = ({ toggleModal, isBulkAction }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="w-full bg-gray-100 p-4 flex items-center justify-between">
      {/* Left Section: Checkbox and Text */}
      <div className="flex items-center space-x-2">
        {/* Custom Checkbox */}
        <div
          className={`w-[22px] h-[22px] border border-customBlue rounded-md flex items-center justify-center cursor-pointer`}
          onClick={() => setIsChecked(!isChecked)}
        >
          {isChecked && (
            <img
              src={Tick}
              alt="Selected"
              className="items-center justify-center"
            />
          )}
        </div>

        <p className="text-gray-700 text-m">
          <span className="cursor-pointer">1-100</span> of 23162
        </p>
      </div>

      {/* Dynamic Button - Changes from "Filter" to "Bulk Action" */}
      <button
        className={` text-white bg-buttonBLue px-[14px] py-[10px] rounded-[8px] flex items-center space-x-1 shadow-md hover:bg-opacity-80`}
        onClick={toggleModal}
      >
        <span>{isBulkAction ? "Bulk Action" : "Filter"}</span>
        <img src={FilterIcon} alt="filter" />
      </button>
    </div>
  );
};

const CandidateList = ({
  onSelect,
  selectedCandidateId,
  onCandidateSelect,
  selectedCandidates,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="candidate-scroll">
      <div className="space-y-4 mb-[170px]">
        {/* Candidate Cards */}
        {candidates.map((candidate) => {
          console.log("cadidate selectssss", candidate);
          return (
            <div
              key={candidate.id}
              className={`p-4 rounded-[14px] shadow-md bg-white hover:shadow-lg flex flex-col  cursor-pointer `}
              onClick={() => onSelect(candidate)}
            >
              {/* Candidate Details */}
              <div className="flex items-center space-x-2">
                {/* Checkbox */}
                <div
                  className={`w-[22px] h-[22px] border  border-customBlue bg-white  rounded-md flex items-center justify-center cursor-pointer`}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent candidate card click event
                    onCandidateSelect(candidate.id);
                  }}
                >
                  {selectedCandidates.includes(candidate.id) && (
                    <img src={Tick} alt="Selected" className="w-4 h-4" />
                  )}
                </div>

                {/* Profile Image */}
                <div className="candidate-profile-div">
                  <img
                    src={ProfileImage}
                    alt="Profile"
                    className="w-[46px] h-[46px] rounded-[100px]"
                  />
                </div>

                {/* Candidate Info */}
                <div className="flex flex-col ml-4">
                  <p className="candidate-name">{candidate.name}</p>
                  <p className="candidate-designation">{candidate.position}</p>
                </div>
              </div>

              {/* Dotted Line */}
              <div className="border-b border-dashed border-customGray my-[12px]"></div>

              {/* Location and University Info */}
              <div className="flex items-center space-x-[12px] pb-[12px]">
                <img
                  src={LocationPin}
                  alt="Location Icon"
                  className="w-5 h-5"
                />
                <text className="candidate-location-designation-text">
                  {candidate.location}
                </text>
              </div>
              <div className="flex items-center space-x-[12px]">
                <img
                  src={University}
                  alt="University Icon"
                  className="w-5 h-5"
                />
                <p className="candidate-location-designation-text">
                  Rhode Island School of Design
                </p>
              </div>
              {/* Skills Grid */}
              <SkillsList isExpanded={false} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ExperienceEducation = () => {
  return (
    <div className="grid md:grid-cols-2 gap-3 bg-white">
      {/* Experience Section */}
      <div className="details-griddiv">
        <text className="details-title">EXPERIENCE</text>
        <div className="divider-border"></div>
        <div className="space-y-4">
          <div>
            <p className="main-title">
              Senior UI/UX Designer at TechNova Solutions
            </p>
            <p className=" main-title location-university-text-weight">
              San Francisco, CA
            </p>
            <p className="main-title location-university-text-color">
              March 2020 - Present
            </p>
          </div>

          <div>
            <p className="main-title">UI/UX Designer at PixelBright Studios</p>
            <p className=" main-title location-university-text-weight">
              Los Angeles, CA
            </p>
            <p className="main-title location-university-text-color">
              May 2016 - February 2020
            </p>
          </div>

          <div>
            <p className="main-title">
              Junior UI/UX Designer at DesignHive Creative Agency
            </p>
            <p className="main-title location-university-text-weight">
              Austin, TX
            </p>
            <p className="main-title location-university-text-color">
              June 2014 - April 2026
            </p>
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div className="details-griddiv">
        <text className="details-title">EDUCATION</text>
        <div className="divider-border"></div>
        <div className="space-y-4">
          <div>
            <p className="main-title">
              Master of Fine Arts in Interaction Design
            </p>
            <p className="main-title location-university-text-weight">
              Rhode Island School of Design
            </p>
            <p className="main-title location-university-text-color">
              August 2012 - May 2014
            </p>
          </div>

          <div>
            <p className="main-title">Bachelor of Arts in Graphic Design</p>
            <p className="main-title location-university-text-weight">
              California College of the Arts
            </p>
            <p className="main-title location-university-text-color">
              August 2008 - May 2012
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CandidateDetails = ({ selectedCandidate }) => {
  if (!selectedCandidate) {
    return (
      <div className="w-3/5 flex items-center justify-center text-gray-500 text-lg">
        Select a candidate to view details
      </div>
    );
  }

  return (
    <>
      {/* detail header */}
      <div className="flex items-center justify-between ">
        {/* profile and name and actions */}
        <div className="items-center flex space-x-[10px] ">
          <img
            src={ProfileImage}
            alt="profileImage"
            className="h-[52px] w-[52px] rounded-[100px]"
          />
          <text className="detail-profile-name">{selectedCandidate.name}</text>
        </div>
        {/* profile actions */}
        <div className="flex items-center justify-between space-x-[6px]">
          <img
            src={ProfileAdd}
            alt="Profile Add"
            className="proifle-action-icon"
          />
          <img
            src={jobIcon}
            alt="jobIcon Add"
            className="proifle-action-icon"
          />
          <img
            src={FolderAdd}
            alt="Folder Add"
            className="proifle-action-icon"
          />
          <img src={Download} alt="Download" className="proifle-action-icon" />
        </div>
      </div>
      {/* skills div */}
      <div className="details-specific-div">
        <text className="details-title">SKILLS</text>
        <SkillsList isExpanded={true} />
      </div>
      <div className="details-specific-div">
        <text className="details-title">PERSONAL DETAILS</text>
        <div className="divider-border"></div>
        {/* personal details grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-[8px]">
            <p className="font-semibold text-gray-700">Location:</p>
            <p className="font-semibold text-gray-700">Email:</p>
            <p className="font-semibold text-gray-700">Phone Number:</p>
            <p className="font-semibold text-gray-700">Linked In:</p>
            <p className="font-semibold text-gray-700">Languages:</p>
          </div>

          <div className="space-y-2">
            <p className="text-gray-800">San Francisco, CA</p>
            <p className="text-gray-800">joanna.chou@example.com</p>
            <p className="text-gray-800">+1-415-123-4567</p>
            <p className="text-gray-800">linkedin.com/in/joannachou</p>
            <div className="flex space-x-2">
              <span className="language">English</span>
              <span className="language">Mandarin</span>
              <span className="language">Spanish</span>
            </div>
          </div>
        </div>
      </div>
      <ExperienceEducation />
    </>
  );
};

const PaginationFooter = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 1154;

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="fixed bottom-0 w-screen bg-gray-100 py-2 flex items-center justify-center shadow-md">
      <div className="flex items-center space-x-4">
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
          ◄
        </button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-2 text-gray-700">
          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              className={`px-3 py-1 rounded-md ${
                currentPage === page
                  ? "text-blue-600 font-bold"
                  : "text-gray-700"
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
                ? "text-blue-600 font-bold"
                : "text-gray-700"
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
          ►
        </button>
      </div>
    </div>
  );
};

const Sourcing = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedCandidates, setSelectedCandidates] = useState([]); // Store selected candidates
  const [isCountHeaderSelected, setIsCountHeaderSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage filter modal state

  // Function to toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  // Handle candidate selection
  const handleCandidateSelect = (candidateId) => {
    setSelectedCandidates(
      (prevSelected) =>
        prevSelected.includes(candidateId)
          ? prevSelected.filter((id) => id !== candidateId) // Remove if already selected
          : [...prevSelected, candidateId] // Add if not selected
    );
  };
  return (
    <div className="w-full h-screen bg-gray-100 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-between bg-white shadow-sm w-full h-auto lg:h-16  px-2 py-2 header-container">
        <h1 className="header-title">Sourcing Hub</h1>
        {/* Icons Section */}
        <div className="flex items-center header-icons-container space-x-2">
          {/* Search Input */}
          <div className="relative hidden md:flex lg:flex">
            <img src={SearchIcon} alt="Search" className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
          </div>
          <button className="header-icons search xl:hidden">
            <img src={SearchIcon} alt="Search" />
          </button>
          <div className="header-icons">
            <img src={MessagesIcon} alt="MessagesIcon" />
          </div>
          <div className="header-icons">
            <img src={NotificationIcon} alt="MessagesIcon" />
          </div>
          <div className="profile-div">
            <img src={ProfileImage} alt="MessagesIcon" />
          </div>
        </div>
      </div>
      {/* Count and Filter Section */}

      {/* Count and Filter Section */}
      <BulkActionView
        toggleModal={toggleModal}
        isBulkAction={selectedCandidates.length > 1}
      />
      {/* Add filters or actions here if needed */}

      {/* ScrollView */}
      <div className="w-full h-screen overflow-hidden flex">
        {/* Candidate List Section */}
        <div className="candidate-list w-full lg:w-[40%] px-4">
    <CandidateList
      onSelect={setSelectedCandidate}
      selectedCandidateId={selectedCandidate?.id}
      onCandidateSelect={handleCandidateSelect}
      selectedCandidates={selectedCandidates}
    />
  </div>

  {/* Candidate Details Section */}
  <div className="candidate-details hidden lg:block">
    <CandidateDetails selectedCandidate={selectedCandidate} />
  </div>
      </div>
      <PaginationFooter />
      {/* Filter Modal */}
      {isModalOpen && (
        <div>
          {/* Modal Overlay */}
          <div
            className="fixed top-0 right-0 h-full w-full bg-black bg-opacity-50"
            onClick={toggleModal}
          ></div>

          {/* Modal Content */}
          <div className="fixed top-0 right-0 h-full w-[30%] bg-white shadow-lg transform transition-transform duration-300 translate-x-0">
            <div className="p-6 flex flex-col h-full">
              {/* Modal Header */}
              <div className="flex justify-between items-center border-b pb-4">
                <h2 className="text-xl font-bold text-gray-800">Filters</h2>
                <button
                  onClick={toggleModal}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-auto mt-4">
                <p className="text-gray-600">Add filter options here...</p>
              </div>

              {/* Modal Footer */}
              <div className="border-t pt-4 mt-4">
                <button
                  onClick={toggleModal}
                  className="w-full bg-blue-600 text-white py-2 rounded-md shadow-md hover:bg-blue-700"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sourcing;
