import React, { useState } from "react";
import CloseIcon from "../../assets/icons/close.svg";
import SearchIcon from "../../assets/icons/sourcingIcons/search-normal.svg";
import CustomDropdown from "../CustomDropdown/CustomDropdown";

const companies = [
  {
    name: "UpTech",
    location: "New York, USA",
    color: "bg-blue-600",
    initials: "U",
  },
  {
    name: "WebSolutions",
    location: "Sydney, Australia",
    color: "bg-purple-500",
    initials: "W",
  },
  {
    name: "Spark Solutions",
    location: "New York, USA",
    color: "bg-orange-500",
    initials: "S",
  },
  {
    name: "CodeHive Technologies",
    location: "Delhi, India",
    color: "bg-black",
    initials: "hive",
  },
  {
    name: "NordSoft Solutions",
    location: "Copenhagen, Denmark",
    color: "bg-gray-300",
    initials: "NORD",
  },
];

const jobStatusOptions = [
  { id: 1, type: "Active", color: "#98D4DF" },
  { id: 2, type: "In-active", color: "#F2AFAF" },
  { id: 3, type: "On-Hold", color: "#F5E29E" },
  { id: 4, type: "Won", color: "#9ADFA1" },
];
const AddToJobsModal = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState("");
  const [jobStatus, setJobStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white w-[400px] rounded-lg shadow-lg p-[14px]">
        {/* Header */}
        <div className="flex justify-between items-center pb-[14px]">
          <h2 className="text-l font-ubuntu font-medium text-customBlue">
            Add to jobs
          </h2>
          <button
            onClick={onClose}
            className="text-customGrey1 hover:text-black"
          >
            <img src={CloseIcon} alt="close" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative flex">
          <img src={SearchIcon} alt="Search" className="search-icon" />
          <input
            type="text"
            placeholder="Search"
            className="search-input customGrey1  focus:outline-none focus:ring-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Dropdown */}
        <div className="mt-[10px]">
          <CustomDropdown
            options={jobStatusOptions}
            placeholder="Job Status"
            selectedValue={jobStatus}
            onChange={setJobStatus}
            optionKey="type"
          />
        </div>

        {/* Company List */}
        {companies.length>0?<ul className="mt-4 max-h-[300px] overflow-auto scroll-width-none">
          {companies
            .filter((company) =>
              company.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((company, index) => (
              <li

              onClick={onClose}
                key={index}
                className="flex items-center space-x-3 px-2 py-[8.5px]  mb-[10px] hover:bg-gray-100 rounded-md cursor-pointer"
              >
                <div
                  className={`w-10 h-10 flex items-center justify-center text-white font-bold rounded-full ${company.color}`}
                >
                  {company.initials}
                </div>
                <div>
                  <p className="font-semibold">{company.name}</p>
                  <p className="text-gray-500 text-sm">{company.location}</p>
                </div>
              </li>
            ))}
        </ul>:
       <div className=" bg-red-900 items-center flex mt-[24px]">
           <span className="font-ubuntu font-customBlue text-l text-center text-wrap ">No jobs created yet! Start creating jobs to add candidates.</span>
        </div>
            
    }
      </div>
    </div>
  );
};

export default AddToJobsModal;
