import React, { useState } from "react";
import CloseIcon from "../../assets/icons/close.svg";
import SearchIcon from "../../assets/icons/sourcingIcons/search-normal.svg";
import { ReactComponent as DropArrow } from "../../assets/icons/droparrow.svg";

const jobStatusOptions = [
  { id: 1, type: "Active", color: "#98D4DF" },
  { id: 2, type: "In-active", color: "#F2AFAF" },
  { id: 3, type: "On-Hold", color: "#F5E29E" },
  { id: 4, type: "Won", color: "#9ADFA1" },
];

const companies = [
  { name: "UpTech", location: "New York, USA", color: "bg-blue-600", initials: "U" },
  { name: "WebSolutions", location: "Sydney, Australia", color: "bg-purple-500", initials: "W" },
  { name: "Spark Solutions", location: "New York, USA", color: "bg-orange-500", initials: "S" },
  { name: "CodeHive Technologies", location: "Delhi, India", color: "bg-black", initials: "HIVE" },
  { name: "NordSoft Solutions", location: "Copenhagen, Denmark", color: "bg-gray-300", initials: "NORD" },
];

const AddToJobsModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!isOpen) return null;

  const toggleStatus = (status) => {
    setSelectedStatuses((prev) =>
      prev.some((s) => s.id === status.id)
        ? prev.filter((s) => s.id !== status.id) // Remove if already selected
        : [...prev, status] // Add if not selected
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white w-[400px] rounded-lg shadow-lg p-[14px]">
        {/* Header */}
        <div className="flex justify-between items-center pb-[14px]">
          <h2 className="text-l font-ubuntu font-medium text-customBlue">Add to jobs</h2>
          <button onClick={onClose} className="text-customGrey1 hover:text-black">
            <img src={CloseIcon} alt="close" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative flex">
          <img src={SearchIcon} alt="Search" className="search-icon" />
          <input
            type="text"
            placeholder="Search"
            className="search-input customGrey1 focus:outline-none focus:ring-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Job Status Multi-Select Dropdown */}
        <div className="mt-[10px] relative">
          <div
            className="w-full px-[12px] py-[10px] border flex justify-between items-center cursor-pointer bg-white border-customGrey1 rounded-[8px] text-sm font-ubuntu text-customBlue"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="flex flex-wrap items-center gap-2">
              {selectedStatuses.length > 0 ? (
                selectedStatuses.map((status) => (
                  <div key={status.id} className="flex items-center bg-gray-200 px-2 py-1 rounded-lg">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }}></div>
                    <span className="ml-2">{status.type}</span>
                    <button
                      className="ml-2 text-red-500 font-bold"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStatus(status);
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))
              ) : (
                <span className="text-gray-500">Select Job Status</span>
                
              )}
            </div>
            <DropArrow fill={"customBlue"} className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
          </div>

          {/* Dropdown Items */}
          {isDropdownOpen && (
            <ul className="absolute left-0 w-full bg-white border border-borderGrey rounded-lg shadow-lg mt-2 max-h-40 overflow-auto z-50 text-sm font-ubuntu text-customBlue">
              {jobStatusOptions.map((status) => (
                <li key={status.id} onClick={() => toggleStatus(status)} className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }}></div>
                  <span>{status.type}</span>
                  <input type="checkbox" checked={selectedStatuses.some((s) => s.id === status.id)} readOnly className="ml-auto w-4 h-4" />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Company List */}
        {companies.length > 0 ? (
          <ul className="mt-4 max-h-[300px] overflow-auto scroll-width-none">
            {companies
              .filter((company) => company.name.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((company, index) => (
                <li
                  key={index}
                  onClick={onClose}
                  className="flex items-center space-x-3 px-2 py-[8.5px] mb-[10px] hover:bg-gray-100 rounded-md cursor-pointer"
                >
                  <div className={`w-10 h-10 flex items-center justify-center text-white font-bold rounded-full ${company.color}`}>
                    {company.initials}
                  </div>
                  <div>
                    <p className="font-semibold">{company.name}</p>
                    <p className="text-gray-500 text-sm">{company.location}</p>
                  </div>
                </li>
              ))}
          </ul>
        ) : (
          <div className="bg-red-900 items-center flex mt-[24px]">
            <span className="font-ubuntu font-customBlue text-l text-center text-wrap">No jobs created yet! Start creating jobs to add candidates.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddToJobsModal;
