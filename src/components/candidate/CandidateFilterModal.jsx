import React, { useState, useEffect, useRef } from "react";
import "../../components/filterModal/FilterModal.css";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import { ReactComponent as CloseIcon } from "../../assets/icons/drawerClose.svg";
import { Drawer } from "@mui/material";
import Tick from "../../assets/icons/sourcingIcons/tick.svg";
import CustomCalendar from "../DatePicker/CustomDatePicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import SkillSearchDropdown from "../AutocompleteDropdowns/SkillDropdown";
import LocationSearchDropdown from "../AutocompleteDropdowns/LocationSearchDropDown";
import NationalitySearchDropdown from "../AutocompleteDropdowns/NationalitySearchDropDown";

const CandidateFilterDrawer = ({
  isOpen,
  onClose,
  onApply,
  onReset,
  filters,
}) => {
  const today = new Date();
  const [localFilters, setLocalFilters] = useState(filters || {});
  const [checkedColumns, setCheckedColumns] = useState([]);
  const [radius, setRadius] = useState(null);
  const [industry, setIndustry] = useState([]);
  const [experience, setExperience] = useState({ from: "", to: "" });
  const [languages, setLanguages] = useState([]);
  const [nationality, setNationality] = useState(null);
  const [pipelineStage, setPipelineStage] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [selectedFrequencies, setSelectedFrequencies] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);
  const [lastContactedDate, setLastContactedDate] = useState(format(today, "yyyy-MM-dd"));
  const [lastUpdatedDate, setLastUpdatedDate] = useState(format(today, "yyyy-MM-dd"));
  const [showContactedCalendar, setShowContactedCalendar] = useState(false);
  const [showUpdatedCalendar, setShowUpdatedCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(format(today, "yyyy-MM-dd"));
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skillQuery, setSkillQuery] = useState("");
  const [skillSuggestions, setSkillSuggestions] = useState([]);
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState([]); // Ensure it's an array

  const radiusOptions = [
    { id: 1, type: "Kilometer" },
    { id: 2, type: "Mile" },
  ];
  const industryOptions = [
    { id: 1, industryType: "IT" },
    { id: 2, industryType: "Finance" },
    { id: 3, industryType: "Healthcare" },
    { id: 4, industryType: "Retail" },
  ];
  const checkboxOptions = ["Candidate Without Jobs", "Duplicate Candidates"];
  const languageOptions = [
    { id: 1, language: "English" },
    { id: 2, language: "Spanish" },
    { id: 3, language: "French" },
    { id: 4, language: "German" },
    { id: 5, language: "Chinese" },
  ];

  const nationalityOptions = [
    { id: 1, nationality: "American" },
    { id: 2, nationality: "Canadian" },
    { id: 3, nationality: "British" },
    { id: 4, nationality: "Australian" },
    { id: 5, nationality: "Indian" },
  ];
  const domainOptions = [
    { id: 1, stageName: "Information Technology (IT) & Software" },
    { id: 2, stageName: "Finance & Banking" },
    { id: 3, stageName: "Healthcare & Life Sciences" },
    { id: 4, stageName: "Education & Training" },
    { id: 5, stageName: "Manufacturing & Engineering" },
    { id: 6, stageName: "Retail & E-Commerce" },
    { id: 7, stageName: "Marketing & Advertising" },
    { id: 8, stageName: "Legal & Compliance" },
    { id: 9, stageName: "Automotive & Transportation" },
    { id: 10, stageName: "Construction & Real Estate" },
    { id: 11, stageName: "Government & Public Sector" },
    { id: 12, stageName: "Energy & Utilities" },
    { id: 13, stageName: "Media & Entertainment" },
    { id: 14, stageName: "Hospitality & Travel" },
    { id: 14, stageName: "Telecommunications" },
  ];
  const frequencyOptions = [
    { id: 1, frequency: "Hourly" },
    { id: 2, frequency: "Daily" },
    { id: 3, frequency: "Weekly" },
    { id: 4, frequency: "Bi-Weekly (Every two weeks)" },
    { id: 5, frequency: "Semi-Monthly (Twice a month)" },
    { id: 6, frequency: "Monthly" },
    { id: 7, frequency: "Quarterly" },
    { id: 8, frequency: "Yearly (Annually)" },
  ];
  const labelOptions = [
    { id: 1, label: "Urgent" },
    { id: 2, label: "High Priority" },
    { id: 3, label: "Medium Priority" },
    { id: 4, label: "Low Priority" },
  ];

  const sourceOptions = [
    { id: 1, source: "LinkedIn" },
    { id: 2, source: "Indeed" },
    { id: 3, source: "Referral" },
    { id: 4, source: "Company Website" },
  ];

  const handleNationalityChange = (selectedItem) => {
    setNationality(selectedItem);
  };
  const handleLastContactedDateSelect = (date) => {
    setLastContactedDate(date); 
    setShowContactedCalendar(false)
  };
  const handleLastUpdatedDateSelect = (date) => {
    setLastUpdatedDate(date); 
    setShowUpdatedCalendar(false)
  };

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleInputChange = (e, field) => {
    setLocalFilters({
      ...localFilters,
      [field]: e.target.value,
    });
  };

  const handleKeyDown = (e, field) => {
    if (
      e.key === "Enter" &&
      typeof localFilters[field] === "string" &&
      localFilters[field].trim()
    ) {
      setLocalFilters((prevFilters) => ({
        ...prevFilters,
        [field]: "",
        [`${field}List`]: [
          ...(prevFilters[`${field}List`] || []),
          localFilters[field].trim(),
        ],
      }));
    }
  };

  const removeItem = (field, index) => {
    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      [`${field}List`]: prevFilters[`${field}List`].filter(
        (_, i) => i !== index
      ),
    }));
  };

  const handleApplyFilters = () => {
    const appliedFilters = {
      ...localFilters,
      radiusType: radius?.type || "",
      industry: industry?.industryType || "",
      experience,
      languages: selectedLanguages,
      nationality: nationality?.nationality || "",
      pipelineStage,
      searchText,
      selectedDomains,
      selectedFrequencies,
      selectedLabels,
      selectedSources,
      lastContactedDate,
    };

    console.log("Applied Filters:", appliedFilters); // Log all values

    onApply(appliedFilters);
  };

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // Remove the radius input value
  const removeRadius = () => {
    setRadius("");
  };
  const handleExperienceChange = (e, field) => {
    setExperience({
      ...experience,
      [field]: e.target.value,
    });
  };
  const handleCheckboxChange = (column) => {
    setCheckedColumns((prev) => {
      const updatedColumns = prev ? [...prev] : []; // Ensure prev is always an array
      return updatedColumns.includes(column)
        ? updatedColumns.filter((c) => c !== column)
        : [...updatedColumns, column];
    });
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <div role="presentation" className="candidate-details-drawer w-[460px]">
        <div className="py-[20px] h-full display-column" style={{ gap: 20 }}>
          <div className="flex justify-between items-center">
            <h2 className="font-24-medium color-dark-black">Filters</h2>
            <button onClick={onClose}>
              <CloseIcon />
            </button>
          </div>

          <div className="filter-form">
            <div className="display-column-6 border-b pb-2 ">
              <label className="font-12-regular color-dark-black">
                Quick Filters
              </label>
              <div>
                {checkboxOptions.map((column) => (
                  <div
                    key={column}
                    className="flex items-center space-x-3 py-2 cursor-pointer text-sm font-ubuntu"
                    onClick={() => handleCheckboxChange(column)}
                  >
                    {/* Custom Checkbox */}
                    <div
                      className={`w-[20px] h-[20px] border border-gray-400 rounded-md flex items-center justify-center ${
                        checkedColumns?.includes(column)
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                    >
                      {checkedColumns?.includes(column) && (
                        <img src={Tick} alt="Selected" />
                      )}
                    </div>

                    {/* Column Name */}
                    <span
                      className={`${
                        checkedColumns?.includes(column)
                          ? "text-black"
                          : "text-gray-400"
                      }`}
                    >
                      {column}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="display-column-6 border-b pb-3">
              <label className="font-12-regular color-dark-black">
                Basic Information
              </label>
            <div className="border-1 rounded-[8px]">
            <input
                type="text"
                placeholder="Candidate Name"
                className="filter-input border-1"
                value={localFilters.candidateName || ""}
                onChange={(e) => handleInputChange(e, "candidateName")}
                onKeyDown={(e) => handleKeyDown(e, "candidateName")}
              />
            </div>
              <CustomDropdown
                options={languageOptions} // List of available options
                placeholder="Select Languages" // Placeholder text
                selectedValues={selectedLanguages} // State to track selected options
                onChange={setSelectedLanguages} // Function to update state
                optionKey="language" // Key to display in the dropdown
                multiSelect={true} // Enable multiple selections
                showCheckbox={true} // Show checkboxes for selection
              />

              <div>
                {/* <CustomDropdown
                  options={nationalityOptions}
                  placeholder="Select Nationality"
                  selectedValue={nationality}
                  onChange={handleNationalityChange}
                  optionKey="nationality"
                /> */}
                <NationalitySearchDropdown 
                 selectedNationalities={nationality} 
                 setSelectedNationalities={handleNationalityChange} 
                 placeholder={"Nationality"}
                 multipleSelect={true}
                 />
              </div>
            </div>
            <div className="display-column-6">
              <label className="font-12-regular color-dark-black">
                Experience & Qualifications
              </label>
              <div className="border-1 rounded-[8px]">
              <input
                type="text"
                placeholder="Enter company"
                className="filter-input"
                value={localFilters.company || ""}
                onChange={(e) => handleInputChange(e, "company")}
                onKeyDown={(e) => handleKeyDown(e, "company")}
              />
              </div>
              {localFilters.companyList?.length > 0 && (
                <div className="inputItemsDiv">
                  {localFilters.companyList?.map((companyItem, index) => (
                    <div key={index} className="inputed-item">
                      {companyItem}
                      <button
                        className="ml-2 text-customBlue"
                        onClick={() => removeItem("company", index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
 <div className="border-1 rounded-[8px]">

              <input
                type="text"
                placeholder="Education level"
                className="filter-input"
                value={localFilters.educationLevel || ""}
                onChange={(e) => handleInputChange(e, "educationLevel")}
                onKeyDown={(e) => handleKeyDown(e, "educationLevel")}
              />
 </div>
              {localFilters.educationLevelList?.length > 0 && (
                <div className="inputItemsDiv">
                  {localFilters.educationLevelList?.map(
                    (educationLevelItem, index) => (
                      <div key={index} className="inputed-item">
                        {educationLevelItem}
                        <button
                          className="ml-2 text-customBlue"
                          onClick={() => removeItem("educationLevel", index)}
                        >
                          ✕
                        </button>
                      </div>
                    )
                  )}
                </div>
              )}
                 <SkillSearchDropdown
              selectedSkills={selectedSkills} 
              setSelectedSkills={setSelectedSkills} 
            />
            <div className="border-1 rounded-[8px]">

              <input
                type="text"
                placeholder="University/Institution"
                className="filter-input"
                value={localFilters.school || ""}
                onChange={(e) => handleInputChange(e, "school")}
                onKeyDown={(e) => handleKeyDown(e, "school")}
              />
            </div>
              {localFilters.schoolList?.length > 0 && (
                <div className="inputItemsDiv">
                  {localFilters.schoolList?.map((schoolsDataItem, index) => (
                    <div key={index} className="inputed-item">
                      {schoolsDataItem}
                      <button
                        className="ml-2 text-customBlue"
                        onClick={() => removeItem("school", index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
               <div className="border-1 rounded-[8px]">

              <input
                type="text"
                placeholder="Degree"
                className="filter-input"
                value={localFilters.degree || ""}
                onChange={(e) => handleInputChange(e, "degree")}
                onKeyDown={(e) => handleKeyDown(e, "degree")}
              />
               </div>
              {localFilters.degreeList?.length > 0 && (
                <div className="inputItemsDiv">
                  {localFilters.degreeList?.map((degreesItem, index) => (
                    <div key={index} className="inputed-item">
                      {degreesItem}
                      <button
                        className="ml-2 text-customBlue"
                        onClick={() => removeItem("degree", index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="display-column-6 pb-3 border-b ">
              <label className="font-12-regular color-dark-black">
                Years of Experience
              </label>
              <div className="flex space-x-2">
              <div className="border-1 rounded-[8px]">
                <input
                  type="text"
                  placeholder="From"
                  className="filter-input"
                  value={experience.from}
                  onChange={(e) => handleExperienceChange(e, "from")}
                  onKeyDown={(e) => {
                    if (!/^[0-9]$/.test(e.key) && e.key !== "Backspace") {
                      e.preventDefault();
                    }
                  }}
                />
                </div>
                <div className="border-1 rounded-[8px]">

                <input
                  type="text"
                  placeholder="To"
                  className="filter-input"
                  value={experience.to}
                  onChange={(e) => handleExperienceChange(e, "to")}
                  onKeyDown={(e) => {
                    if (!/^[0-9]$/.test(e.key) && e.key !== "Backspace") {
                      e.preventDefault();
                    }
                  }}
                />
                </div>
              </div>
              {experience.from && experience.to && (
                <div className="inputItemsDiv">
                  <div className="inputed-item">
                    {`${experience.from} - ${experience.to} years`}
                    <button
                      className="ml-2 text-customBlue"
                      onClick={() => setExperience({ from: "", to: "" })}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="display-column-6 pb-3 border-b ">
              <label className="font-12-regular color-dark-black">
                Job-Related
              </label>
                <LocationSearchDropdown 
              selectedLocations={selectedLocations} 
              setSelectedLocations={setSelectedLocations} 
              placeholder={"Preferred Location"}
            />

              <CustomDropdown
                options={domainOptions} // List of available domain options
                placeholder="Select Domains" // Placeholder text
                selectedValues={selectedDomains} // State to track selected domains
                onChange={setSelectedDomains} // Function to update state
                optionKey="stageName" // Key to display in the dropdown
                multiSelect={true} // Enable multiple selections
                showCheckbox={true} // Show checkboxes for selection
              />
            </div>
            <div className="display-column-6 ">
              <label className="font-12-regular color-dark-black">
                Education
              </label>
              <div className="border-1 rounded-[8px]">
              <input
                type="text"
                placeholder="Enter Major"
                className="filter-input"
                value={localFilters.major || ""}
                onChange={(e) => handleInputChange(e, "major")}
                onKeyDown={(e) => handleKeyDown(e, "major")}
              />
              </div>
              {localFilters.majorList?.length > 0 && (
                <div className="inputItemsDiv">
                  {localFilters.majorList?.map((majorItem, index) => (
                    <div key={index} className="inputed-item">
                      {majorItem}
                      <button
                        className="ml-2 text-customBlue"
                        onClick={() => removeItem("major", index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
               <div className="border-1 rounded-[8px]">

              <input
                type="text"
                placeholder="Enter School"
                className="filter-input"
                value={localFilters.school || ""}
                onChange={(e) => handleInputChange(e, "school")}
                onKeyDown={(e) => handleKeyDown(e, "school")}
              />
               </div>
              {localFilters.schoolList?.length > 0 && (
                <div className="inputItemsDiv">
                  {localFilters.schoolList?.map((schoolsDataItem, index) => (
                    <div key={index} className="inputed-item">
                      {schoolsDataItem}
                      <button
                        className="ml-2 text-customBlue"
                        onClick={() => removeItem("school", index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
               <div className="border-1 rounded-[8px]">

              <input
                type="text"
                placeholder="Enter Degree"
                className="filter-input"
                value={localFilters.degree || ""}
                onChange={(e) => handleInputChange(e, "degree")}
                onKeyDown={(e) => handleKeyDown(e, "degree")}
              />
               </div>
              {localFilters.degreeList?.length > 0 && (
                <div className="inputItemsDiv">
                  {localFilters.degreeList?.map((degreesItem, index) => (
                    <div key={index} className="inputed-item">
                      {degreesItem}
                      <button
                        className="ml-2 text-customBlue"
                        onClick={() => removeItem("degree", index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="display-column-6 pb-3 border-b ">
              <label className="font-12-regular color-dark-black">
                Expected Salary
              </label>
              <div className="flex items-center space-x-2">
              <div className="border-1 rounded-[8px] flex-1">
                <input
                  type="text"
                  placeholder="Enter Major"
                  className="filter-input"
                  value={localFilters.major || ""}
                  onChange={(e) => handleInputChange(e, "major")}
                  onKeyDown={(e) => handleKeyDown(e, "major")}
                />
                </div>
                <div className="border-1 rounded-[8px] flex-1">
                <input
                  type="text"
                  placeholder="Enter Major"
                  className="filter-input"
                  value={localFilters.major || ""}
                  onChange={(e) => handleInputChange(e, "major")}
                  onKeyDown={(e) => handleKeyDown(e, "major")}
                />
                </div>
              </div>

              <div className="flex items-center space-x-2">
              <div className="border-1 rounded-[8px] flex-1">
                <input
                  type="text"
                  placeholder="Enter Major"
                  className="filter-input"
                  value={localFilters.major || ""}
                  onChange={(e) => handleInputChange(e, "major")}
                  onKeyDown={(e) => handleKeyDown(e, "major")}
                />
                </div>
                <div className="flex-1">
                <CustomDropdown
                  options={frequencyOptions} // List of available frequencies
                  placeholder="Select Frequency" // Placeholder text
                  selectedValues={selectedFrequencies} // State to track selected frequencies
                  onChange={setSelectedFrequencies} // Function to update state
                  optionKey="frequency" // Key to display in the dropdown
                  multiSelect={false} // Enable multiple selections
                  showCheckbox={false} // Show checkboxes for selection
                />
                </div>
              </div>
            </div>
            <div className="display-column-6 pb-3 border-b ">
              <label className="font-12-regular color-dark-black">Date</label>
              <div className="border-1 rounded-[8px]">

              <input
                type="text"
                placeholder="Last Contacted"
                // className="filter-input"
                className="filter-input"
                value={
                  lastContactedDate
                    ? format(lastContactedDate, "yyyy-MM-dd")
                    : ""
                }
                onFocus={() => setShowContactedCalendar(true)}
                readOnly
              />
</div>
              {showContactedCalendar && (
                <div className=" z-10 bg-white mt-1">
                  <CustomCalendar onDateSelect={handleLastContactedDateSelect} />
                </div>
              )}
              <div className="date-picker-container"></div>
              <div className="border-1 rounded-[8px] flex-1">

              <input
                type="text"
                placeholder="Last Updated"
                className="filter-input"
                value={
                  lastUpdatedDate
                    ? format(lastUpdatedDate, "yyyy-MM-dd")
                    : ""
                }
                onFocus={() => setShowUpdatedCalendar(true)}
                readOnly
              />
              </div>
               {showUpdatedCalendar && (
                <div className=" z-10 bg-white mt-1">
                  <CustomCalendar onDateSelect={handleLastUpdatedDateSelect} />
                </div>
              )}
            </div>
            <div className="display-column-6">
              <label className="font-12-regular color-dark-black">
                Job-Related
              </label>

              <CustomDropdown
                options={labelOptions}
                placeholder="Select Labels"
                selectedValues={selectedLabels}
                onChange={setSelectedLabels}
                optionKey="label"
                multiSelect={true}
                showCheckbox={true}
              />
              <CustomDropdown
                options={sourceOptions}
                placeholder="Select Source"
                selectedValues={selectedSources}
                onChange={setSelectedSources}
                optionKey="source"
                multiSelect={true}
                showCheckbox={true}
              />
            </div>
          </div>

          {/* <CustomCalendar onDateSelect={handleDateSelection} selectedDate={lastContactedDate} /> */}

          <div className="flex justify-between space-x-4">
            <button
              className="w-1/2 border border-buttonBLue text-buttonBLue  flex justify-center items-center py-[12px] max-h-[40px] rounded-[8px] btn-text"
              onClick={onReset}
            >
              Reset
            </button>
            <button
              className="w-1/2 bg-buttonBLue text-white flex justify-center items-center py-[12px] max-h-[40px] rounded-[8px] hover:bg-blue-700 btn-text"
              onClick={() => handleApplyFilters()}
            >
              Apply
            </button>
          </div>
        </div>
        {/* Hidden DatePicker Component */}
      </div>
    </Drawer>
  );
};

export default CandidateFilterDrawer;
