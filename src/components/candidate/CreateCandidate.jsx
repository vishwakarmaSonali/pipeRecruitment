import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import Profile from "../../assets/images/profile.png";
import "./index.css";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { ReactComponent as GallaryEdit } from "../../assets/icons/gallery-edit.svg";

import { profileImage } from "../../helpers/assets";
import StyledDropdownInput from "./StyledDropdownInput";
import DropdownWithInput from "./StyledDropdownInput";
import CustomCalendar from "../DatePicker/CustomDatePicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
const CreateCandidateForm = () => {
  const today = new Date();
  const [description, setDescription] = useState("");
  const [profileImages, setProfileImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("None");
  const [lastContactedDate, setLastContactedDate] = useState(
    format(today, "yyyy-MM-dd")
  );
  const [lastUpdatedDate, setLastUpdatedDate] = useState(
    format(today, "yyyy-MM-dd")
  );
  const [showContactedCalendar, setShowContactedCalendar] = useState(false);
  const [showUpdatedCalendar, setShowUpdatedCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(format(today, "yyyy-MM-dd"));
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Update profile image with selected file
      setProfileImage(file);

      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleLastUpdatedDateSelect = (date) => {
    setLastUpdatedDate(date);
    setShowUpdatedCalendar(false);
  };
  return (
    <div
      className="w-full h-screen bg-white overflow-hidden overscroll-none"
      style={{ boxSizing: "border-box" }}
    >
      <Navbar />
      <div
        className="overflow-auto scroll-width-none bg-grey-90"
        style={{ flex: 1, display: "flex", flexDirection: "column" }}
      >
        <div className="flex items-center justify-between p-[17px]">
          {/* <div className="flex space-x-6 border-b border-customGray">
            <button
              className={`flex items-center space-x-2 py-2 px-3 text-sm font-medium ${
                activeTab === "candidates"
                  ? "text-black border-b border-black"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("candidates")}
            >
              <CandidatesIcon
                fill={activeTab === "candidates" ? "customBlue" : "#797979"}
              />
              <span
                className={`tab-title-text ${
                  activeTab === "candidates"
                    ? "text-customBlue"
                    : "text-customGray"
                }`}
              >
                Candidates
              </span>
            </button>

            <button
              className={`flex items-center space-x-2 py-2 px-3 text-sm font-medium ${
                activeTab === "folder"
                  ? "text-black border-b border-black"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("folder")}
            >
              <Folder
                fill={activeTab === "folder" ? "customBlue" : "#797979"}
              />
              <span
                className={`tab-title-text ${
                  activeTab === "folder" ? "text-customBlue" : "text-customGray"
                }`}
              >
                Folder
              </span>
            </button>

            <button
              className={`flex items-center space-x-2 py-2 px-3 text-sm font-medium ${
                activeTab === "sourcing"
                  ? "text-black border-b border-black"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("sourcing")}
            >
              <SourcingIcon
                fill={activeTab === "sourcing" ? "customBlue" : "#797979"}
              />
              <span
                className={`tab-title-text ${
                  activeTab === "sourcing"
                    ? "text-customBlue"
                    : "text-customGray"
                }`}
              >
                Sourcing
              </span>
            </button>
          </div> */}
          <span className="font-ubuntu font-medium text-custom-large">
            Create Candidate
          </span>
          {/* Action Buttons */}
          <div className="flex items-center gap-[8px] ">
            <button className="buttons border-1 border-buttonBLue text-buttonBLue min-w-[120px]">
              Discard
            </button>
            <button className="buttons  text-white  bg-buttonBLue">
              Create
            </button>
          </div>
        </div>
        <div className="main-container-candidateForm">
          <div className="flex justify-between ">
            <div className=" bg-red-900 flex flex-1 max-w-[350px]">
              <span className="items-start">candidate details</span>
            </div>
            <div className="flex flex-1 flex-col items-center">
              {/* profile image picker */}
              <div
                className="candidate-upload-img-div bg-green-500 "
                onClick={() => document.getElementById("file-input").click()}
              >
                {!!imagePreview ? (
                  <img src={imagePreview} className={`common-img `} />
                ) : (
                  <GallaryEdit />
                )}
                <input
                  type="file"
                  id="file-input"
                  style={{
                    display: "none",
                  }}
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <div className="w-full">
              <div className="display-flex gap-[10px] mt-[12px]">
                  <div className="flex-1">
                    <DropdownWithInput />
                  </div>
                  <div className="flex-1">

                  <input placeholder="last Name" className="outline-none" />
                  </div>
                </div>
                <div className="display-flex gap-[10px] mt-[12px]">
                  <div className="flex-1">
                    <input placeholder="Gender" className=" outline-none" />
                  </div>
                  <div className="flex-1">
                    <input
                      placeholder="Date of Birth"
                      className=" outline-none"
                      value={
                        lastContactedDate
                          ? format(lastContactedDate, "yyyy-MM-dd")
                          : ""
                      }
                      onFocus={() => setShowUpdatedCalendar(true)}
                      readOnly
                    />

                    {showUpdatedCalendar && (
                      <div className="absolute z-10 bg-white mt-1">
                        <CustomCalendar
                          onDateSelect={handleLastUpdatedDateSelect}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="display-flex gap-[10px] mt-[12px]">
                  <input
                    placeholder="Add to Folder"
                    className=" outline-none flex-1"
                  />
                  <input
                    placeholder="Add to Jobs"
                    className=" outline-none flex-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCandidateForm;
