import React,{useState} from "react";
import "./Sourcing.css";
import SearchIcon from "../../../assets/icons/sourcingIcons/search-normal.svg";
import MessagesIcon from "../../../assets/icons/sourcingIcons/messages.svg";
import NotificationIcon from "../../../assets/icons/sourcingIcons/notification.svg";
import LocationPin from "../../../assets/icons/sourcingIcons/locationpin.svg";
import University from "../../../assets/icons/sourcingIcons/teacher.svg";
const skills = [
  "UI Design",
  "UX Design",
  "Wireframing",
  "Prototyping",
  "Graphics",
  "Typography",
  "Color Theory",
  "Illustration",
  "Designing",
  "Mapping",
];

const SkillsGrid = ({ maxVisibleSkills = 8 }) => {
  const [showAll, setShowAll] = useState(false); // Toggle to show all skills
  const visibleSkills = showAll ? skills : skills.slice(0, maxVisibleSkills);
  const remainingCount = skills.length - maxVisibleSkills;

  return (
    <div className="w-full">
      {/* Skills Grid */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2">
        {visibleSkills.map((skill, index) => (
          <div
            key={index}
            className="bg-gray-100 px-2 py-1 rounded-md shadow-sm text-center hover:shadow-md"
          >
            <text className="text-gray-800 font-m">{skill}</text>
          </div>
        ))}

        {/* Show "+X more" if there are additional skills */}
        {!showAll && remainingCount > 0 && (
          <div
            className="bg-gray-200 p-2 rounded-md shadow-sm text-center hover:shadow-md cursor-pointer"
            onClick={() => setShowAll(true)}
          >
            <text className="text-gray-600 font-m">+{remainingCount} more</text>
          </div>
        )}
      </div>
    </div>
  );
};
const Sourcing = () => {
  return (
    <div className="w-full h-full bg-gray-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between bg-white shadow-sm w-full h-16 px-4">
        {/* Screen Name */}
        <h1 className="header-title">Sourcing Hub</h1>
        <div className="flex items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1 mx-2">
            <img src={SearchIcon} alt="Search" className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
          </div>
          <div className="header-icons">
            <img src={MessagesIcon} alt="MessagesIcon" />
          </div>
          <div className="header-icons">
            <img src={NotificationIcon} alt="MessagesIcon" />
          </div>
          <div className="profile-div">
            <img src={NotificationIcon} alt="MessagesIcon" />
          </div>
        </div>
      </div>
      {/* Count and Filter Section */}
      <div className="w-full bg-customGrey p-4">
        <p className="text-gray-700 font-medium">Candidates (42)</p>
        {/* Add filters or actions here if needed */}
      </div>

      {/* ScrollView */}
      <div className="candidate-scroll">
  <div className="space-y-4">
    {/* Candidate Cards */}
    {Array.from({ length: 100 }).map((_, index) => (
  <div
    key={index}
    className="bg-white p-4 rounded-[14px] shadow-sm hover:shadow-md flex flex-col space-y-4"
  >
    {/* Candidate Details */}
    <div className="flex items-center">
      {/* Checkbox */}
      <input
        type="checkbox"
        className="w-5 h-5 mr-4 border-gray-300 rounded focus:ring-blue-500"
      />

      {/* Profile Image */}
      <div className="candidate-profile-div">
        <img
          src={NotificationIcon}
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />
      </div>

      {/* Candidate Info */}
      <div className="flex flex-col ml-4">
        <p className="candidate-name font-bold text-gray-800">
          Joanna Chou
        </p>
        <p className="candidate-designation text-gray-600 text-sm">
          Sr. UI UX Designer at TechNova Solutions
        </p>
      </div>
    </div>

    {/* Dotted Line */}
    <div className="border-t border-dashed border-gray-300"></div>

    {/* Location and University Info */}
    <div className="flex items-center space-x-2">
      <img src={LocationPin} alt="Location Icon" className="w-5 h-5" />
      <p className="text-gray-700 text-sm">San Francisco, CA</p>
    </div>
    <div className="flex items-center space-x-2">
      <img src={University} alt="University Icon" className="w-5 h-5" />
      <p className="text-gray-700 text-sm">Rhode Island School of Design</p>
    </div>
           {/* Skills Grid */}
           <SkillsGrid />
  </div>
))}
  </div>
</div>

      {/* Content */}
      <div className="w-full h-full">
        <p className="text-gray-600">
          Welcome to the Sourcing screen. Your content goes here.
        </p>
      </div>
    </div>
  );
};

export default Sourcing;
