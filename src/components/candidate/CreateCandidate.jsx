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
import { useDispatch, useSelector } from "react-redux";

import { profileImage } from "../../helpers/assets";
import StyledDropdownInput from "./StyledDropdownInput";
import DropdownWithInput from "./StyledDropdownInput";
import CustomCalendar from "../DatePicker/CustomDatePicker";
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
import EducationDetailsManager from "./EducationDetailsManager";
import ExperienceDetailsManager from "./ExperienceDetailsManager";
import HeaderWithActions from "./CandidateHeader";
import { createCandidates } from "../../actions/candidateActions";
import { useNavigate } from "react-router-dom";
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
  { id: 2, frequency: "Daily" },
  { id: 3, frequency: "Weekly" },
  { id: 4, frequency: "Bi-weekly" },
  { id: 5, frequency: "Semi-Monthly" },
  { id: 6, frequency: "Quaterly" },
  { id: 7, frequency: "Anually" },
];
const CreateCandidateForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const today = new Date();
  const [description, setDescription] = useState("");
  const [profileImages, setProfileImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("None");
  const [firstName, setFirstName] = useState(""); // New state for First Name
  const [lastName, setLastName] = useState(""); // New state for First Name
  const [dateofbirth, setDateofbirth] = useState(null);

  const [lastUpdatedDate, setLastUpdatedDate] = useState(
    format(today, "yyyy-MM-dd")
  );
  const [selectedLocations, setSelectedLocations] = useState([]); // Ensure it's an array
  const [selectedCountry, setSelectedCountry] = useState({
    code: "US",
    name: "United States",
    dialCode: "+1",
    flag: "🇺🇸",
  });

  const [showContactedCalendar, setShowContactedCalendar] = useState(false);
  const [showUpdatedCalendar, setShowUpdatedCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(today);
  const [showCalendar, setShowCalendar] = useState(false);
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

  // ✅ State management

  const [selectedJob, setSelectedJob] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState([]);
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [eduDetails, setEduDetails] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [selectedNationality, setSelectedNationality] = useState([]);
  const [selectedJobs, setSelectedJobs] = useState([]); // Store selected jobs
  const [yearsOfExp, setYearsOfExp] = useState("");
  const [highestQualification, setHighestQualification] = useState("");
  const [currentEmployer, setCurrentEmployer] = useState("");
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
  const handleDateOfBirthSelect = (date) => {
    setDateofbirth(date);
    setShowUpdatedCalendar(false);
  };
  // ✅ Handle Form Submission
  // const handleCreate = () => {
  //   const candidateData = {
  //     profileImage,
  //     selectedTitle,
  //     firstName, // ✅ Log first name
  //     lastName,
  //     selectedGender,
  //     dateofbirth,
  //     // lastUpdatedDate,
  //     selectedLocations,
  //     selectedNationality,
  //     selectedJobs,
  //     nationality,
  //     phoneNumber: `${selectedCountry.dialCode} ${phoneNumber}`,
  //     country: selectedCountry.name,
  //     frequency,
  //     currentSalaryCurrency,
  //     expectedSalaryCurrency,
  //     yearsOfExp,
  //     highestQualification,
  //     currentEmployer,
  //     currentSalary,
  //     expectedSalary,
  //     // selectedJob,
  //     // selectedFolder,
  //     skills,
  //     languages,
  //     socialLinks,
  //     experience,
  //     education,
  //     // phoneNumber,
  //     // email,
  //     // description,
  //   };
  //   let params = {};

  //    dispatch(createCandidates(null,candidateData ));
  //   console.log("🚀 Candidate Data:", candidateData);
  // };
  const handleCreate = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      alert("First Name and Last Name are required!");
      return;
    }

    const candidateData = {
      first_name: firstName,
      last_name: lastName,
      ...(email && { email }),
      // ...(salutation && { salutation:selectedTitle }),  // ✅ Added missing `salutation`
      ...(dateofbirth && { date_of_birth: dateofbirth }), // ✅ Added `date_of_birth`
      ...(selectedGender && { gender: selectedGender.label.toLowerCase() }), // ✅ Added `gender`
      ...(phoneNumber && {
        phone: phoneNumber,
        country_code: selectedCountry.dialCode || "+91", // ✅ Added `country_code`
      }),
      ...(selectedLocations.length > 0 && { city: selectedLocations[0] }),
      // ...(selectedState && { state: selectedState }), // ✅ Added `state`
      ...(selectedCountry.name && { country: selectedCountry.name }),
      ...(selectedTitle !== "None" && { salutation: selectedTitle }),
      ...(skills.length > 0 && {
        skills: skills.map((skill) => ({
          name: skill.name,
          level: parseInt(skill.score, 10) || 1,
        })),
      }),
      ...(description && { info: description }),
      ...(selectedNationality.length > 0 && {
        nationality: selectedNationality,
      }),
      ...(selectedJobs.length > 0 && { jobs: selectedJobs }),
      showArray: [{ key: "value" }, { hasBool: true }], // ✅ Already included
      // work_preference: { waaafh: true, aadf: false }, // ✅ Already included
      ...(highestQualification && {
        education_1: { [highestQualification]: "yes" },
      }),
      ...(yearsOfExp && { years_of_experience: yearsOfExp }),
      ...(currentSalary && { current_salary: currentSalary }),
      ...(expectedSalary && { expected_salary: expectedSalary }),
    };

    try {
      const response = await dispatch(createCandidates(null, candidateData));
      console.log("response>>>>", response);

      if (response?.success || response?.id) {
        alert("Candidate created successfully!");
        navigate("/candidates"); // ✅ Navigate on success
      } else {
        alert(
          response?.message || "Failed to create candidate. Please try again."
        );
      }
    } catch (error) {
      console.error("❌ API Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  // ✅ Reset Form
  const handleDiscard = () => {
    setProfileImage(null);
    setImagePreview("");
    setSelectedTitle("None");
    setFirstName("");
    setLastName("");
    setSelectedGender([]);
    setDateofbirth(null); // Reset date of birth
    setSelectedLocations([]);
    setSelectedNationality([]);
    setSelectedJobs([]); // Clear selected jobs
    setNationality([]);
    setPhoneNumber("");
    setSelectedCountry({
      code: "US",
      name: "United States",
      dialCode: "+1",
      flag: "🇺🇸",
    }); // Reset country
    setFrequency(null);
    setCurrentSalaryCurrency({
      code: "USD",
      name: "US Dollar",
      symbol: "US$",
      flag: "🇺🇸",
    }); // Reset salary currency
    setExpectedSalaryCurrency({
      code: "GBP",
      name: "British Pound",
      symbol: "£",
      flag: "🇬🇧",
    }); // Reset expected salary currency
    setYearsOfExp("");
    setHighestQualification("");
    setCurrentEmployer("");
    setCurrentSalary("");
    setExpectedSalary("");
    setSkills([]); // Reset skills
    setLanguages([]); // Reset languages
    setSocialLinks([]);
    setExperience([]);
    setEducation([]);
  };

  return (
    <div
      className="w-full h-screen bg-white overflow-hidden overscroll-none"
      style={{ boxSizing: "border-box" }}
    >
      <Navbar />
      <HeaderWithActions
        title="Create Candidate"
        primaryButtonText="Create"
        secondaryButtonText="Discard"
        onPrimaryClick={handleCreate}
        onSecondaryClick={handleDiscard}
      />
      <div
        className="overflow-auto flex-grow h-[calc(90vh-30px)] bg-grey-90"
        style={{ flex: 1, display: "flex", flexDirection: "column" }}
      >
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
                    <DropdownWithInput
                      selectedTitle={selectedTitle}
                      setSelectedTitle={setSelectedTitle}
                      firstName={firstName}
                      setFirstName={setFirstName}
                    />
                  </div>
                  <div className="flex-1 border-1 rounded-[8px]">
                    <input
                      placeholder="Last Name"
                      className="filter-input"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="display-flex gap-[10px] mt-[10px]">
                  <div className="flex-1">
                    <CustomDropdown
                      options={genderOptions}
                      placeholder="Gender"
                      selectedValues={selectedGender}
                      onChange={(selected) => setSelectedGender(selected)}
                      optionKey="label"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <div className="flex items-center border-1 rounded-[8px] h-[38px] px-2">
                      <input
                        placeholder="Date of Birth"
                        className=" outline-none border-none padding-0 margin-0 text-sm font-ubuntu"
                        value={
                          dateofbirth == null
                            ? ""
                            : format(dateofbirth, "MMMM d, yyyy")
                        }
                        onFocus={() => setShowUpdatedCalendar(true)}
                        readOnly
                      />
                      <div className="mr-2">
                        <Calendar2 />
                      </div>
                    </div>

                    {showUpdatedCalendar && (
                      <div className="absolute w-[100%] z-10 bg-white mt-1">
                        <CustomCalendar
                          onDateSelect={handleDateOfBirthSelect}
                          initialDate={dateofbirth}
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
                      setSelectedNationalities={setSelectedNationality}
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
                    <AddToJobsDropdown
                      placeholder={"Add to jobs"}
                      selectedJobs={selectedJobs}
                      setSelectedJobs={setSelectedJobs}
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
                    <PhoneNumberInput
                      selectedCountry={selectedCountry}
                      setSelectedCountry={setSelectedCountry}
                      phoneNumber={phoneNumber}
                      setPhoneNumber={setPhoneNumber}
                    />
                  </div>
                  <div className="flex-1 border-1 rounded-[8px]">
                    <input
                      placeholder="Email Id"
                      className="filter-input"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
              <TagManager tags={skills} setTags={setSkills} />
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
                      value={yearsOfExp}
                      onChange={(e) => setYearsOfExp(e.target.value)}
                    />
                  </div>
                  <div className="flex-1 border-1 rounded-[8px]">
                    <input
                      placeholder="Highest Qualification"
                      className="filter-input"
                      type="text"
                      value={highestQualification}
                      onChange={(e) => setHighestQualification(e.target.value)}
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
                      value={currentEmployer}
                      onChange={(e) => setCurrentEmployer(e.target.value)}
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
              <LanguageListManager
                selectedLanguages={languages}
                setSelectedLanguages={setLanguages}
              />
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
              <SocialLinksManager
                selectedSocialLinks={socialLinks}
                setSelectedSocialLinks={setSocialLinks}
              />
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
              <ExperienceDetailsManager
                setExperienceDetails={setExperience}
                experienceDetails={experience}
              />
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
              <EducationDetailsManager
                educationDetails={education}
                setEducationDetails={setEducation}
              />
            </div>
          </div>
          {/* Education details block ends */}
        </div>
      </div>
    </div>
  );
};

export default CreateCandidateForm;
