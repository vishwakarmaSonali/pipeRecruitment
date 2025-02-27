import React, { useState } from "react";
import "../../components/filterModal/FilterModal.css";
import { ReactComponent as CloseIcon } from "../../assets/icons/drawerClose.svg";
import { ReactComponent as FolderIcon } from "../../assets/icons/sourcingIcons/folder-add.svg";
import { ReactComponent as Folder } from "../../assets/icons/folderIcon.svg";
import { ReactComponent as LabelClose } from "../../assets/icons/labelClose.svg";

import { Drawer } from "@mui/material";
import CommonSearchBox from "../common/CommonSearchBox";
import CommonDropdown from "../common/CommonDropdown";

import { ReactComponent as TickCircle } from "../../assets/icons/tick-circle.svg";

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

const AddToJobsDrawer = ({ isOpen, onClose, onApply, onReset }) => {
  const [folderData, setFolderData] = useState([
    { id: 1, name: "Designer", isEditable: false },
    { id: 2, name: "Developer", isEditable: false },
    { id: 3, name: "HR", isEditable: false },
  ]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(null);
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
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <div role="presentation" className="candidate-details-drawer w-[460px] flex flex-col h-full">
        {/* Header */}
        <div className="py-[20px]  flex justify-between items-center">
          <h2 className="font-24-medium color-dark-black">Add to Jobs</h2>
          <button onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

       

        {/* Folder List (Scrollable) */}
        <div className="flex-1 overflow-auto">
        <div className=" ">
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
            className="display-column"
            style={{ gap: 6,}}
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
          style={{ gap: 10, overflowY: "auto" }}
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
        </div>

        {/* ✅ Fixed Bottom Buttons */}
        <div className=" py-4 bg-white bottom-0">
          <div className="flex justify-between space-x-4">
            <button
              className="w-1/2  text-buttonBLue flex justify-center items-center py-[12px] rounded-[8px] btn-text h-[40px]"
              style={{border:"1px solid #1761D8" }}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="w-1/2 text-white bg-buttonBLue flex justify-center items-center py-[12px] rounded-[8px] btn-text h-[40px]"
              onClick={onClose}
            >
              Save
            </button>
           
           
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default AddToJobsDrawer;
