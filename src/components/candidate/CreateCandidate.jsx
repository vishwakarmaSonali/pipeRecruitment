import React, { useEffect, useState } from "react";
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
import {
  createCandidates,
  uploadProfileImage,
} from "../../actions/candidateActions";
import { useNavigate } from "react-router-dom";
import TitleSearchDropdown from "../AutocompleteDropdowns/TitleSearchDropDown";
import CommonTextInput from "../common/CommonTextInput";
import { genderOption } from "../../helpers/config";
import CommonDropdown from "../common/CommonDropdown";
import { DateTimePickerTabs } from "@mui/x-date-pickers";
import DateTimePicker from "../common/DateTimePicker";
import { fetchDomains } from "../../actions/dropdownAction";
import { notifyError, notifySuccess } from "../../helpers/utils";
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
const workModelOptions = [
  { id: 1, workModel: "On-site" },
  { id: 2, workModel: "Remote" },
  { id: 3, workModel: "Hybrid" },
  { id: 4, workModel: "Flexible" },
  { id: 5, workModel: "Freelance/Contract" },
  { id: 6, workModel: "Part-Time" },
];

const CreateCandidateForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const today = new Date();
  const { token, refreshToken } = useSelector((state) => state?.auth);
  const { data, loading, error } = useSelector((state) => state.domains);
  const { uploadProfileLoading } = useSelector((state) => state.candidates);

  const domainOptions =
    data?.map((item) => ({
      id: item._id, // Correct id reference
      name: item.name,
    })) || [];

  const [description, setDescription] = useState("");
  const [profileImages, setProfileImage] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("None");
  const [firstName, setFirstName] = useState(""); // New state for First Name
  const [lastName, setLastName] = useState(""); // New state for First Name
  const [dateofbirth, setDateofbirth] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState(null); // Must be an object or null
  const [selectedWorkModel, setSelectedWorkModel] = useState(null); // Must be an object or null
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [selectedDomains, setSelectedDomains] = useState([]); // For multi-selection

  const [lastUpdatedDate, setLastUpdatedDate] = useState(
    format(today, "yyyy-MM-dd")
  );
  const [selectedLocations, setSelectedLocations] = useState([]); // Ensure it's an array
  const [selectedCountry, setSelectedCountry] = useState();

  const [showContactedCalendar, setShowContactedCalendar] = useState(false);
  const [showUpdatedCalendar, setShowUpdatedCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(today);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const [nationality, setNationality] = useState([]);
  const [frequency, setFrequency] = useState(null);
  const [currentSalaryCurrency, setCurrentSalaryCurrency] = useState();

  const [expectedSalaryCurrency, setExpectedSalaryCurrency] = useState();

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

  const [countryCallingCode, setCountryCallingCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [selectedNationality, setSelectedNationality] = useState([]);
  const [selectedJobs, setSelectedJobs] = useState([]); // Store selected jobs
  const [yearsOfExp, setYearsOfExp] = useState("");
  const [highestQualification, setHighestQualification] = useState("");
  const [selectedTitles, setSelectedTitles] = useState([]); // Ensure it's an array
  const [currentEmployer, setCurrentEmployer] = useState("");
  const [uploadProfileUrl, setUploadProfileUrl] = useState(null);
  const handleNationalityChange = (selectedItem) => {
    setNationality(selectedItem);
  };

  useEffect(() => {
    dispatch(fetchDomains());
  }, [dispatch]);

  const handleDateSelect = (date) => {
    setDateofbirth(date);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("file", file);
      dispatch(uploadProfileImage(formData)).then((response) => {
        if (response?.success) {
          setUploadProfileUrl(response?.preview_url);
          notifySuccess(response?.message);
        } else {
          notifyError(response);
        }
      });
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
    if (!firstName.trim() || !lastName.trim() || !email?.trim()) {
      alert("First Name, Last Name, and Email Fields are required!");
      return;
    }

    console.log("education:>>>>>", selectedWorkModel?.workModel);

    // Parse selected location
    const { city, state, country } =
      selectedLocations.length > 0
        ? parseLocation(selectedLocations[0])
        : { city: "", state: "", country: "" };

    // Extract language details
    const formattedLanguages = languages?.length
      ? languages.map((lang) => ({
          name: lang.name,
          proficiency: lang.level || "Basic",
        }))
      : undefined;

    // Extract education details with YYYY-MM-DD format
    const formattedEducation = education?.length
      ? education.map((edu) => ({
          school: edu?.university || "-",
          degree: edu?.degree || "-",
          field_of_study: edu?.major || "-",
          start_date:
            edu?.startDate?.year && edu?.startDate?.month
              ? format(
                  new Date(`${edu.startDate.year}-${edu.startDate.month}-01`),
                  "yyyy-MM-dd"
                )
              : undefined,
          end_date:
            edu?.endDate?.year && edu?.endDate?.month
              ? format(
                  new Date(`${edu.endDate.year}-${edu.endDate.month}-01`),
                  "yyyy-MM-dd"
                )
              : undefined,
        }))
      : undefined;

    // Extract employment history with YYYY-MM-DD format
    const formattedEmploymentHistory = experience?.length
      ? experience.map((exp) => ({
          company: exp.company || "-",
          position: exp.position || "-",
          start_date: exp.start_date
            ? format(new Date(exp.start_date), "yyyy-MM-dd")
            : undefined,
          end_date: exp.end_date
            ? format(new Date(exp.end_date), "yyyy-MM-dd")
            : undefined, // If null, it's the current job
          location: exp.location || "-",
          current: !exp.end_date,
          title: exp.title || "-",
        }))
      : undefined;

    // Extract social links
    const formattedSocialLinks = socialLinks?.length
      ? socialLinks.map((link) => ({
          name: link.name || "-",
          url: link.url || "",
        }))
      : undefined;
    console.log("profilePhotoprofilePhotoprofilePhoto", profilePhoto);

    // Build candidate data with **conditional inclusion**
    const candidateData = {
      ...(uploadProfileUrl && { profile_photo: uploadProfileUrl }), //return {}
      ...(selectedTitle !== "None" && { salutation: selectedTitle }),
      ...(firstName && { first_name: firstName }),
      ...(lastName && { last_name: lastName }),
      ...(selectedGender && { gender: selectedGender }),
      ...(dateofbirth && {
        date_of_birth: format(new Date(dateofbirth), "yyyy-MM-dd"),
      }),
      ...(city && { city }),
      ...(state && { state }),
      ...(country && { country }),
      ...(selectedCountry?.name && { country: selectedCountry?.name }),
      ...(selectedNationality.length > 0 && {
        nationality: selectedNationality[0],
      }),
      ...(countryCallingCode && {
        country_code: countryCallingCode,
      }),
      ...(phoneNumber && { phone: phoneNumber }),
      ...(email && { email }),
      ...(description && { description }),
      ...(skills.length > 0 && {
        skills: skills.map((skill) => ({
          name: skill.name,
          level: parseInt(skill.score, 10) || 1,
        })),
      }),
      ...(yearsOfExp && { experience: parseInt(yearsOfExp, 10) }),
      ...(highestQualification && { qualification: highestQualification }),
      ...(selectedDomain?.name && { domain: selectedDomain.name }),
      ...(selectedTitles.length > 0 && { title: selectedTitles[0] }),
      ...(currentEmployer && { company: currentEmployer }),
      ...(frequency && { salary_frequency: frequency?.frequency }),
      ...(currentSalary && { current_salary: parseInt(currentSalary, 10) }),
      ...(currentSalaryCurrency?.code && {
        current_salary_currency: currentSalaryCurrency.code,
      }),
      ...(expectedSalary && { expected_salary: parseInt(expectedSalary, 10) }),
      ...(expectedSalaryCurrency?.code && {
        expected_salary_currency: expectedSalaryCurrency.code,
      }),
      ...(formattedLanguages && { languages: formattedLanguages }),
      ...(formattedSocialLinks && { social_links: formattedSocialLinks }),
      ...(formattedEmploymentHistory && {
        employment_history: formattedEmploymentHistory,
      }),
      ...(formattedEducation && { education: formattedEducation }),
      ...(selectedWorkModel && { work_mode: selectedWorkModel?.workModel }),
    };

    console.log("Final Candidate Data >>>", candidateData);

    try {
      const response = await dispatch(createCandidates(candidateData));
      console.log("API Response >>>", response);

      if (response?.success || response?.id) {
        alert("Candidate created successfully!");
        navigate("/candidates");
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

  const parseLocation = (locationString) => {
    if (!locationString) return { city: "", state: "", country: "" };

    const parts = locationString.split(",").map((part) => part.trim());

    return {
      city: parts[0] || "", // First part is the city
      state: parts[1] || "", // Second part is the state
      country: parts[2] || "", // Third part is the country
    };
  };

  // ✅ Reset Form
  const handleDiscard = () => {
    setProfileImage(null);
    setImagePreview("");
    setSelectedTitle("None");
    setFirstName("");
    setLastName("");
    setSelectedGender("");
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
      code: "USD",
      name: "US Dollar",
      symbol: "US$",
      flag: "🇺🇸",
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
    <div className="sourcing-main-container">
      <Navbar />
      <HeaderWithActions
        title="Create Candidate"
        primaryButtonText="Create"
        secondaryButtonText="Discard"
        onPrimaryClick={handleCreate}
        onSecondaryClick={handleDiscard}
      />
      <div className="create-candidate-main-container">
        {/* Candidate details block starts */}
        <div className="display-flex-justify">
          <div className="flex-1 max-w-[350px]">
            <span className="font-16-medium color-dark-black">
              Candidate details
            </span>
          </div>
          <div
            className="display-column align-center flex-1"
            style={{ gap: 24 }}
          >
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
            <div className="w-full display-column" style={{ gap: 10 }}>
              <div className="display-flex gap-[10px] ">
                <div className="flex-1">
                  <DropdownWithInput
                    selectedTitle={selectedTitle}
                    setSelectedTitle={setSelectedTitle}
                    firstName={firstName}
                    setFirstName={setFirstName}
                  />
                </div>
                <div className="flex-1">
                  <CommonTextInput
                    type={"text"}
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="display-flex gap-[10px] ">
                <div className="flex-1">
                  <CommonDropdown
                    options={genderOption}
                    placeholder="Gender"
                    selectedValue={selectedGender}
                    onChange={setSelectedGender}
                    optionKey="type"
                    candidateInfo={true}
                  />
                </div>
                <div className="flex-1">
                  <DateTimePicker
                    initialDate={dateofbirth}
                    onDateSelect={handleDateSelect}
                    dob={true}
                  />
                </div>
              </div>

              <div className="display-flex gap-[10px] ">
                <div className="flex-1">
                  <LocationSearchDropdown
                    selectedLocations={selectedLocations}
                    setSelectedLocations={setSelectedLocations}
                    placeholder={"Location"}
                  />
                </div>
                <div className="flex-1">
                  <NationalitySearchDropdown
                    selectedNationalities={selectedNationality}
                    setSelectedNationalities={setSelectedNationality}
                    placeholder={"Nationality"}
                    multipleSelect={false}
                  />
                </div>
              </div>
              <div className="display-flex gap-[10px] ">
                <div className="flex-1 ">
                  <CustomDropdown
                    options={[]}
                    placeholder="Add to folder"
                    selectedValues={nationality}
                    onChange={setNationality}
                    optionKey="nationality"
                    multiSelect={true}
                    showCheckbox={false}
                  />
                </div>
                <div className="flex-1">
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
        <div className="display-flex-justify">
          <div className="flex-1 max-w-[350px]">
            <span className="font-16-medium color-dark-black">
              Contact details
            </span>
          </div>
          <div className="flex-1">
            <div className="w-full">
              <div className="display-flex gap-[10px] mt-[10px]">
                <div className="flex-1">
                  <PhoneInputComponent
                    phoneNumber={phoneNumber}
                    callingCode={countryCallingCode}
                    selectedPhoneNumber={(item) => {
                      setPhoneNumber(item?.phoneNumber);
                      setCountryCallingCode(item?.callingCode);
                    }}
                    setValid={(item) => console.log(">>>>>>>>>setValid", item)}
                  />
                </div>
                <div className="flex-1 ">
                  <CommonTextInput
                    type="email"
                    placeholder="Email Id"
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
        <div className="display-flex-justify">
          <div className="flex-1 max-w-[350px]">
            <span className="font-16-medium color-dark-black">
              Candidate description
            </span>
          </div>
          <div style={{ width: "100%", flex: 1 }}>
            <HtmlViewComponent
              value={description}
              onChange={setDescription}
              placeholder="Add Description"
              toolbarId={"t1"}
            />
          </div>
        </div>
        {/* Candidate description block ends */}
        {/* Skills block starts */}
        <div className="display-flex-justify">
          <div className="flex-1 max-w-[350px]">
            <span className="font-16-medium color-dark-black">Skills</span>
          </div>
          <div className="flex-1 ">
            <TagManager tags={skills} setTags={setSkills} />
          </div>
        </div>
        {/* Skills block ends */}
        {/* Professional details block starts */}
        <div className="display-flex-justify">
          <div className="flex-1 max-w-[350px]">
            <span className="font-16-medium color-dark-black">
              Professional details
            </span>
          </div>
          <div className="flex-1">
            <div className="w-full">
              <div className="display-flex gap-[10px] mt-[10px]">
                <div className="flex-1">
                  <CommonTextInput
                    type="text"
                    placeholder="Years of Experience"
                    value={yearsOfExp}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (/^[0-9.]*$/.test(inputValue)) {
                        setYearsOfExp(inputValue);
                      }
                    }}
                  />
                </div>
                <div className="flex-1 ">
                  <CommonTextInput
                    type="text"
                    placeholder="Highest Qualification"
                    value={highestQualification}
                    onChange={(e) => setHighestQualification(e.target.value)}
                  />
                </div>
              </div>
              <div className="display-flex gap-[10px] mt-[10px]">
                <div className="flex-1">
                  <CustomDropdown
                    options={domainOptions} // Ensure it's an array of objects
                    placeholder="Domain"
                    selectedValues={selectedDomain} // Must be an object
                    onChange={setSelectedDomain} // Must store the full object
                    optionKey="name"
                    multiSelect={false}
                  />
                </div>
                <div className="flex-1">
                  <CustomDropdown
                    options={workModelOptions} // Ensure it's an array of objects
                    placeholder="Work Model"
                    selectedValues={selectedWorkModel} // Must be an object
                    onChange={setSelectedWorkModel} // Must store the full object
                    optionKey="workModel"
                    multiSelect={false}
                  />
                </div>
              </div>
              <div className="display-flex gap-[10px] mt-[10px]">
                <div className="flex-1">
                  <TitleSearchDropdown
                    placeholder={"Current Job Title"}
                    selectedTitles={selectedTitles}
                    setSelectedTitles={setSelectedTitles}
                    allowMultiple={false}
                  />
                </div>
                <div className="flex-1">
                  <CommonTextInput
                    placeholder="Current Employer"
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
                <div className="flex-1">
                  <CurrencySelector
                    label="Current Salary"
                    selectedCurrency={currentSalaryCurrency}
                    setSelectedCurrency={setCurrentSalaryCurrency}
                    salary={currentSalary}
                    setSalary={(value) => {
                      if (/^\d*$/.test(value)) {
                        setCurrentSalary(value); // Only allow numeric values
                      }
                    }}
                  />
                </div>
                <div className="flex-1 rounded-[8px]">
                  <CurrencySelector
                    label="Expected Salary"
                    selectedCurrency={expectedSalaryCurrency}
                    setSelectedCurrency={setExpectedSalaryCurrency}
                    salary={expectedSalary}
                    setSalary={(value) => {
                      if (/^\d*$/.test(value)) {
                        setExpectedSalary(value);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Professional details block ends */}

        {/* Languages block starts */}
        <div className="display-flex-justify">
          <div className="flex-1 max-w-[350px]">
            <span className="font-16-medium color-dark-black">Languages</span>
          </div>
          <div className="flex-1 ">
            <LanguageListManager
              selectedLanguages={languages}
              setSelectedLanguages={setLanguages}
            />
          </div>
        </div>
        {/* Languages block ends */}
        {/* Social links block starts */}
        <div className="display-flex-justify">
          <div className="flex-1 max-w-[350px]">
            <span className="font-16-medium color-dark-black">
              Social links
            </span>
          </div>
          <div className="flex-1">
            <SocialLinksManager
              selectedSocialLinks={socialLinks}
              setSelectedSocialLinks={setSocialLinks}
            />
          </div>
        </div>
        {/* Social links block ends */}
        {/* Experience details block starts */}
        <div className="display-flex-justify">
          <div className="flex-1 max-w-[350px]">
            <span className="font-16-medium color-dark-black">
              Experience details
            </span>
          </div>
          <div className="flex-1 ">
            <ExperienceDetailsManager
              setExperienceDetails={setExperience}
              experienceDetails={experience}
            />
          </div>
        </div>
        {/* Experience details block ends */}
        {/* Education details block starts */}
        <div className="display-flex-justify" style={{ marginBottom: 20 }}>
          <div className="flex-1 max-w-[350px]">
            <span className="font-16-medium color-dark-black">
              Education details
            </span>
          </div>
          <div className="flex-1">
            <EducationDetailsManager
              educationDetails={education}
              setEducationDetails={setEducation}
            />
          </div>
        </div>
        {/* Education details block ends */}
      </div>
    </div>
  );
};

export default CreateCandidateForm;
