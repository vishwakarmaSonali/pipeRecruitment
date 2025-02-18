import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import Profile from "../../assets/images/profile.png";
import "./index.css";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { ReactComponent as GallaryEdit } from "../../assets/icons/gallery-edit.svg";
import { ReactComponent as Calendar2 } from "../../assets/icons/calendar-2.svg";

import { profileImage } from "../../helpers/assets";
import StyledDropdownInput from "./StyledDropdownInput";
import DropdownWithInput from "./StyledDropdownInput";
import CustomCalendar from "../DatePicker/CustomDatePicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import LocationSearchDropdown from "../AutocompleteDropdowns/LocationSearchDropDown";
import NationalitySearchDropdown from "../AutocompleteDropdowns/NationalitySearchDropDown";
import PhoneNumberInput from "./PhoneNumberInput";
const genderOptions = [
  { id: 1, label: "Female" },
  { id: 2, label: "Male" },
  { id: 3, label: "Others" },
];
const nationalityOptions = [
  { id: 1, nationality: "American" },
  { id: 2, nationality: "Canadian" },
  { id: 3, nationality: "British" },
  { id: 4, nationality: "Australian" },
  { id: 5, nationality: "Indian" },
];

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
  const [selectedLocations, setSelectedLocations] = useState([]); // Ensure it's an array
  const [selectedNationality, setSelectedNationlity] = useState([]); // Ensure it's an array

  const [showContactedCalendar, setShowContactedCalendar] = useState(false);
  const [showUpdatedCalendar, setShowUpdatedCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(format(today, "yyyy-MM-dd"));
  const [selectedGender, setSelectedGender] = useState([]);
  const [nationality, setNationality] = useState(null);

  const handleNationalityChange = (selectedItem) => {
    setNationality(selectedItem);
  };
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
          {/* Candidate details block starts */}
          <div className="flex justify-between ">
            <div className=" bg-red-900 flex flex-1 max-w-[350px]">
              <span className="items-start font-ubuntu text-xl font-medium">
                Candidate details
              </span>
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
                <div className="display-flex gap-[10px] mt-[10px]">
                  <div className="flex-1">
                    <DropdownWithInput />
                  </div>
                  <div className="flex-1 border-1 rounded-[8px]">
                    <input placeholder="Last Name" className="filter-input" />
                  </div>
                </div>
                <div className="display-flex gap-[10px] mt-[10px]">
                  <div className="flex-1">
                    <CustomDropdown
                      options={genderOptions}
                      placeholder="Gender"
                      selectedValues={selectedGender}
                      onChange={setSelectedGender}
                      optionKey="label"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center border-1 rounded-[8px]">
                      <input
                        placeholder="Date of Birth"
                        className=" outline-none border-none padding-0 margin-0"
                        value={
                          lastUpdatedDate
                            ? format(lastUpdatedDate, "yyyy-MM-dd")
                            : ""
                        }
                        onFocus={() => setShowUpdatedCalendar(true)}
                        readOnly
                      />
                      <div className="mr-3">
                        <Calendar2 />
                      </div>
                    </div>

                    {showUpdatedCalendar && (
                      <div className="absolute z-10 flex-1 w-full bg-white mt-1">
                        <CustomCalendar
                          onDateSelect={handleLastUpdatedDateSelect}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="display-flex gap-[10px] mt-[10px]">
                  <div className="flex-1">
                    <LocationSearchDropdown
                      selectedLocations={selectedLocations}
                      setSelectedLocations={setSelectedLocations}
                      placeholder={"Location"}
                    />
                  </div>
                  <div className="flex-1">
                    {/* <CustomDropdown
                  options={nationalityOptions}
                  placeholder="Select Nationality"
                  selectedValue={nationality}
                  onChange={handleNationalityChange}
                  optionKey="nationality"
                /> */}
                    <NationalitySearchDropdown
                      selectedNationalities={selectedNationality}
                      setSelectedNationalities={setSelectedNationlity}
                      placeholder={"Nationality"}
                      multipleSelect={false}
                    />
                  </div>
                </div>
                <div className="display-flex gap-[10px] mt-[10px]">
                  <div className="flex-1 border-1 rounded-[8px]">
                    <input
                      placeholder="Add to Folder"
                      className="filter-input "
                    />
                  </div>
                  <div className="flex-1 border-1 rounded-[8px]">
                    <input
                      placeholder="Add to Jobs"
                      className="filter-input flex-1 border-1 rounded-[8px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Candidate details block ends */}
          {/* Contact details block starts */}
          <div className="flex justify-between mt-[26px]">
            <div className=" bg-red-900 flex flex-1 max-w-[350px]">
              <span className="items-start font-ubuntu text-xl font-medium">
                Contact details
              </span>
            </div>
            <div className="flex flex-1 flex-col items-center">
            
              <div className="w-full">
                <div className="display-flex gap-[10px] mt-[10px]">
                  <div className="flex-1">
                  <PhoneNumberInput />
                  </div>
                  <div className="flex-1 border-1 rounded-[8px]">
                    <input placeholder="Email Id" className="filter-input" type="email" />
                  </div>
                </div>
              
              </div>
            </div>
          </div>
          {/* Contact details block ends */}
        </div>
      </div>
    </div>
  );
};

export default CreateCandidateForm;
