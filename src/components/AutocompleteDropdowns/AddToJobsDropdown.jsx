import React, { useState } from "react";
import { ReactComponent as CloseIcon } from "../../assets/icons/closeModal.svg";
import { ReactComponent as LabelClose } from "../../assets/icons/labelClose.svg";
import { ReactComponent as TickCircle } from "../../assets/icons/tick-circle.svg";
import { ReactComponent as DropArrow } from "../../assets/icons/droparrow.svg";
import CommonSearchBox from "../common/CommonSearchBox";
import CommonDropdown from "../common/CommonDropdown";

const jobStatusOptions = [
  { id: 1, type: "Active", color: "#98D4DF" },
  { id: 2, type: "In-active", color: "#F2AFAF" },
  { id: 3, type: "On-Hold", color: "#F5E29E" },
  { id: 4, type: "Won", color: "#9ADFA1" },
];

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
    initials: "HIVE",
  },
  {
    name: "NordSoft Solutions",
    location: "Copenhagen, Denmark",
    color: "bg-gray-300",
    initials: "NORD",
  },
];
const AddToJobsDropdown = ({ placeholder }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedJobStatus, setSelectedJobStatus] = useState([]);
  const [jobStatusData, setJobStatusData] = useState(jobStatusOptions);
  const [selectedCompanies, setSelectedCompanies] = useState([]); // Allow multiple selection

  const handleMultiSelectHandler = (item) => {
    const updatedData = jobStatusData?.map((data) => {
      if (data?.id === item?.id) {
        return { ...data, selected: !item?.selected };
      } else {
        return { ...data };
      }
    });
    const filterData = updatedData?.filter((filter) => filter?.selected);
    setSelectedJobStatus(filterData);
    setJobStatusData(updatedData);
  };

  const removeStatusHandler = (item) => {
    const updateData = jobStatusData?.map((data) => {
      if (data?.id === item?.id) {
        return { ...data, selected: false };
      } else {
        return { ...data };
      }
    });

    const updateSelectedJobStatus = selectedJobStatus.filter(
      (filter) => filter?.id !== item?.id
    );

    setSelectedJobStatus(updateSelectedJobStatus);
    setJobStatusData(updateData);
  };

 // ✅ Toggle Company Selection (Allow multiple)
 const toggleCompanySelection = (company) => {
  setSelectedCompanies((prev) =>
    prev.some((c) => c.name === company.name)
      ? prev.filter((c) => c.name !== company.name) // Remove if already selected
      : [...prev, company] // Add if not selected
  );
};
  return (
    <div className="relative w-full">
      {/* Dropdown Input */}
      <div
        className="w-full px-[12px] py-[10px] border flex justify-between items-center cursor-pointer bg-white border-customGrey1 rounded-[8px] text-sm font-ubuntu text-customBlue"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <span className="text-gray-600">{placeholder}</span>
        <DropArrow className="w-[14px] h-[14px]" />
      </div>

      {/* Open Modal */}
      {isModalOpen && (
        <div className="absolute top-full left-0 w-full z-50 mt-2 p-4 bg-white rounded-lg shadow-lg border border-gray-300">
        <div className="display-column" style={{ gap: 10 }}>
          <CommonSearchBox
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <CommonDropdown
            options={jobStatusData}
            placeholder="Job Status"
            selectedValue={""}
            optionKey="type"
            type={"jobStatus"}
            handleMultiSelectHandler={handleMultiSelectHandler}
          />
          <div
            className="display-flex"
            style={{ gap: 6, flexWrap: "wrap" }}
          >
            {selectedJobStatus?.map((item) => {
              return (
                <div className="selected-job-status-label">
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: 100,
                      backgroundColor: item?.color,
                    }}
                  />
                  <span className="font-12-regular color-dark-black">
                    {item?.type}
                  </span>
                  <button onClick={() => removeStatusHandler(item)}>
                    <LabelClose />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div
          className="display-column"
          style={{ gap: 10, maxHeight: 256, overflowY: "auto" }}
        >
          {companies?.map((item, index) => {
            return (
              <div key={index} className="job-compony-list-item" onClick={() => toggleCompanySelection(item)}>
                <div
                  className="display-flex align-center"
                  style={{ gap: 6 }}
                >
                  <div className="w-h-32">
                    <span>{item?.initials}</span>
                  </div>
                  <div className="display-column" style={{ gap: 4 }}>
                    <p className="font-14-medium color-dark-black">
                      {item?.name}
                    </p>
                    <p className="font-10-regular color-dark-black">
                      {item?.location}
                    </p>
                  </div>
                </div>
                <div
                  className="display-flex align-center"
                  style={{ gap: 8 }}
                >
                  <div
                    className="w-h-14"
                    style={{ backgroundColor: "#98D4DF" }}
                  />
                  <button>
                  {selectedCompanies.some((c) => c.name === item.name) &&  <TickCircle />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      )}
    </div>
  );
};

export default AddToJobsDropdown;
