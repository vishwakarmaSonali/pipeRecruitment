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
import PhoneInputComponent from "../common/PhoneInputComponent";
import HtmlViewComponent from "../common/HtmlViewComponent";
import TagList from "../common/TagList";
import TagManager from "../common/TagList";
import CurrencyInput from "../common/CurrencyInput";
import CurrencySelector from "../common/CurrencyInput";
import AddToJobsDropdown from "../AutocompleteDropdowns/AddToJobsDropdown";
import LanguageListManager from "./LanguageListManager";
import SocialLinksManager from "./SocialLinksManager";
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
const frequencyOptions = [
  { id: 1, frequency: "Hourly" },
  { id: 2, frequency: "Weekly" },
  { id: 3, frequency: "Monthly" },
  { id: 4, frequency: "Anually" },
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
  const [nationality, setNationality] = useState([]);
  const [frequency, setFrequency] = useState(null);
  const [currentSalaryCurrency, setCurrentSalaryCurrency] = useState({
    code: "USD",
    name: "US Dollar",
    symbol: "US$",
    flag: "🇺🇸",
  });

  const [expectedSalaryCurrency, setExpectedSalaryCurrency] = useState({
    code: "GBP",
    name: "British Pound",
    symbol: "£",
    flag: "🇬🇧",
  });

  const [currentSalary, setCurrentSalary] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");

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
        className="overflow-auto flex-grow h-[calc(100vh-80px)] bg-grey-90"
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
        <div className="main-container-candidateForm overflow-auto">
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
                  <div className="flex-1  rounded-[8px]">
                  <CustomDropdown
                options={nationalityOptions} // List of available options
                placeholder="Add to folder" // Placeholder text
                selectedValues={nationality} // State to track selected options
                onChange={setNationality} // Function to update state
                optionKey="nationality" // Key to display in the dropdown
                multiSelect={true} // Enable multiple selections
              
              />
                  </div>
                  <div className="flex-1 rounded-[8px]">
                    {/* <input
                      placeholder="Add to Jobs"
                      className="filter-input flex-1 border rounded-[8px]"
                    /> */}
                    <AddToJobsDropdown placeholder={"Add to jobs"}/>
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
                    <input
                      placeholder="Email Id"
                      className="filter-input"
                      type="email"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Contact details block ends */}
          {/* Candidate description block starts */}
          <div className="flex justify-between mt-[26px]">
            <div className=" flex flex-1 max-w-[350px]">
              <span className="items-start font-ubuntu text-xl font-medium">
                Candidate description
              </span>
            </div>
            <div className="flex flex-1  flex-col items-center">
              <HtmlViewComponent
                value={description}
                onChange={setDescription}
              />
            </div>
          </div>
          {/* Candidate description block ends */}
          {/* Skills block starts */}
          <div className="flex justify-between mt-[26px]">
            <div className=" flex flex-1 max-w-[350px]">
              <span className="items-start font-ubuntu text-xl font-medium">
                Skills
              </span>
            </div>
            <div className="flex flex-1 ">
              <TagManager />
            </div>
          </div>
          {/* Skills block ends */}
          {/* Professional details block starts */}
          <div className="flex justify-between mt-[26px]">
            <div className=" bg-red-900 flex flex-1 max-w-[350px]">
              <span className="items-start font-ubuntu text-xl font-medium">
                Professional details
              </span>
            </div>
            <div className="flex flex-1 flex-col items-center">
              <div className="w-full">
                <div className="display-flex gap-[10px] mt-[10px]">
                  <div className="flex-1 border-1 rounded-[8px]">
                    <input
                      placeholder="Years of Experience"
                      className="filter-input"
                      type="number"
                    />
                  </div>
                  <div className="flex-1 border-1 rounded-[8px]">
                    <input
                      placeholder="Highest Qualification"
                      className="filter-input"
                      type="text"
                    />
                  </div>
                </div>
                <div className="display-flex gap-[10px] mt-[10px]">
                  <div className="flex-1 border-1 rounded-[8px]">
                    <input
                      placeholder="Current Job Title"
                      className="filter-input"
                      type="text"
                    />
                  </div>
                  <div className="flex-1 border-1 rounded-[8px]">
                    <input
                      placeholder="Current Employer"
                      className="filter-input"
                      type="text"
                    />
                  </div>
                </div>
                {/* salary details */}
                <div className="display-flex gap-[10px] mt-[10px]">
                  <div className="flex-1  rounded-[8px]">
                    <CustomDropdown
                      options={frequencyOptions}
                      placeholder="Salary Frequency"
                      selectedValue={frequency}
                      onChange={setFrequency}
                      optionKey="frequency"
                    />
                  </div>
                  <div className="flex-1 rounded-[8px]">
                    <CurrencySelector
                      label="Current Salary"
                      selectedCurrency={currentSalaryCurrency}
                      setSelectedCurrency={setCurrentSalaryCurrency}
                      salary={currentSalary}
                      setSalary={setCurrentSalary}
                    />
                  </div>
                  <div className="flex-1 rounded-[8px]">
                    <CurrencySelector
                      label="Expected Salary"
                      selectedCurrency={expectedSalaryCurrency}
                      setSelectedCurrency={setExpectedSalaryCurrency}
                      salary={expectedSalary}
                      setSalary={setExpectedSalary}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Professional details block ends */}
            {/* Languages block starts */}
            <div className="flex justify-between mt-[26px]">
            <div className=" flex flex-1 max-w-[350px]">
              <span className="items-start font-ubuntu text-xl font-medium">
                Languages
              </span>
            </div>
            <div className="flex flex-1 ">
              <LanguageListManager />
            </div>
          </div>
          {/* Languages block ends */}
            {/* Social links block starts */}
            <div className="flex justify-between mt-[26px]">
            <div className=" flex flex-1 max-w-[350px]">
              <span className="items-start font-ubuntu text-xl font-medium">
                Social links
              </span>
            </div>
            <div className="flex flex-1 ">
            <SocialLinksManager />
            </div>
          </div>
          {/* Social links block ends */}
            {/* Experience details block starts */}
            <div className="flex justify-between mt-[26px]">
            <div className=" flex flex-1 max-w-[350px]">
              <span className="items-start font-ubuntu text-xl font-medium">
                Experience details
              </span>
            </div>
            <div className="flex flex-1 ">
              <TagManager />
            </div>
          </div>
          {/* Experience details block ends */}
           {/* Education details block starts */}
           <div className="flex justify-between mt-[26px]">
            <div className=" flex flex-1 max-w-[350px]">
              <span className="items-start font-ubuntu text-xl font-medium">
                Education details
              </span>
            </div>
            <div className="flex flex-1 ">
              <TagManager />
            </div>
          </div>
          {/* Education details block ends */}
        </div>
      </div>
    </div>
  );
};

export default CreateCandidateForm;
