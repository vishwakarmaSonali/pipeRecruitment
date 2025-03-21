import React, { useState, useEffect, useRef } from "react";
import "../../components/filterModal/FilterModal.css";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import { ReactComponent as CloseIcon } from "../../assets/icons/drawerClose.svg";
import { Drawer } from "@mui/material";
import Tick from "../../assets/icons/sourcingIcons/tick.svg";
import CustomCalendar from "../DatePicker/CustomDatePicker";
import { format } from "date-fns";
import SkillSearchDropdown from "../AutocompleteDropdowns/SkillDropdown";
import LocationSearchDropdown from "../AutocompleteDropdowns/LocationSearchDropDown";
import NationalitySearchDropdown from "../AutocompleteDropdowns/NationalitySearchDropDown";
import CommonTextInput from "../common/CommonTextInput";
import CurrencySelector from "../common/CurrencyInput";
import DateTimePicker from "../common/DateTimePicker";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchDomains, fetchLabels } from "../../actions/dropdownAction";


const CandidateFilterDrawer = ({
  isOpen,
  onClose,
  onApply,
  onReset,
  filters,
}) => {
  const dispatch = useDispatch();
  const today = new Date();
  const [localFilters, setLocalFilters] = useState(filters || {});
  const [checkedColumns, setCheckedColumns] = useState([]);
  const [radius, setRadius] = useState(null);
  const [industry, setIndustry] = useState([]);
  const [experience, setExperience] = useState({ from: "", to: "" });
  const [languages, setLanguages] = useState([]);
  const [nationality, setNationality] = useState([]);
  const [pipelineStage, setPipelineStage] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);
  const [lastContactedDate, setLastContactedDate] = useState(null);
  const [lastUpdatedDate, setLastUpdatedDate] = useState(null);
  const [showContactedCalendar, setShowContactedCalendar] = useState(false);
  const [showUpdatedCalendar, setShowUpdatedCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skillQuery, setSkillQuery] = useState("");
  const [skillSuggestions, setSkillSuggestions] = useState([]);
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState([]); // Ensure it's an array
    const [selectedWorkModel, setSelectedWorkModel] = useState(null); // Must be an object or null
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
  const [selectedFrequencies, setSelectedFrequencies] = useState(null);

  const radiusOptions = [
    { id: 1, type: "Kilometer" },
    { id: 2, type: "Mile" },
  ];

  const checkboxOptions = ["Candidate Without Jobs", "Duplicate Candidates"];
  const languageOptions = [
    { id: 1, language: "English" },
    { id: 2, language: "Spanish" },
    { id: 3, language: "French" },
    { id: 4, language: "German" },
    { id: 5, language: "Chinese" },
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

  const sourceOptions = [
    { id: 1, source: "LinkedIn" },
    { id: 2, source: "Indeed" },
    { id: 3, source: "Referral" },
    { id: 4, source: "Company Website" },
  ];
  const workModelOptions = [
    { id: 1, workModel: "On-site" },
    { id: 2, workModel: "Remote" },
    { id: 3, workModel: "Hybrid" },
    { id: 4, workModel: "Flexible" },
    { id: 5, workModel: "Freelance/Contract" },
    { id: 6, workModel: "Part-Time" },
  ];
  const { data, loading, error } = useSelector((state) => state.labels);
  // Ensure `data` is available and formatted properly
  const labelOptions =
    data?.map((item) => ({
      id: item._id,
      name: item.name, // Adjust the key based on API response
    })) || [];


  useEffect(() => {

    dispatch(fetchLabels());
    dispatch(fetchDomains())
  }, [dispatch]);
  const handleResetFilters = () => {
    setLastContactedDate(null);
    setLastUpdatedDate(null);
    setSelectedSkills([]);
    setSelectedLocations([]);
    setSelectedLanguages([]);
    setNationality([]);
    setPipelineStage([]);
    setSearchText("");
    setIndustry([]);
    setRadius(null);
    setExperience({ from: "", to: "" });
    setCheckedColumns([]);
    setSelectedDomains([]);
    setSelectedLabels([]);
    setSelectedSources([]);
    setSelectedFrequencies(null);
    setCurrentSalary("");
    setExpectedSalary("");
    setSelectedWorkModel(null);
  
    setLocalFilters({}); // Reset all local filters
  };
  

  const handleNationalityChange = (selectedItem) => {
    setNationality(selectedItem);
  };
  const handleLastContactedDateSelect = (date) => {
    setLastContactedDate(date);
    setShowContactedCalendar(false);
  };
  const handleLastUpdatedDateSelect = (date) => {
    setLastUpdatedDate(date);
    setShowUpdatedCalendar(false);
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

  const handleApplyFilters = () => {
    console.log("localFilters.workmodellocalFilters.workmodel",selectedWorkModel);
    
    const appliedFilters = {
      candidateName: localFilters.candidateName || "",
      location: selectedLocations || [], // Ensure locations are stored
      nationality: nationality || [], // Store selected nationality
      languages: selectedLanguages || [], // Store selected languages
      experience: {
        from: experience?.from || "",
        to: experience?.to || "",
      },
      industry: industry || [], // Ensure industry data is captured
      radius: radius || "",
      radiusType: radius?.type || "",
      skill: selectedSkills || [], // Ensure skills are included
      pipelineStage: pipelineStage || [],
      lastContactedDate: lastContactedDate || "",
      lastUpdatedDate: lastUpdatedDate || "",
      searchText: searchText || "",
      selectedDomains: selectedDomains || [],
      selectedLabels: selectedLabels || [],
      selectedSources: selectedSources || [],
      checkedColumns: checkedColumns || [],
      currentSalary: currentSalary || "",
      currentSalaryCurrency: currentSalaryCurrency || {},
      expectedSalary: expectedSalary || "",
      expectedSalaryCurrency: expectedSalaryCurrency || {},
      selectedFrequencies: selectedFrequencies || "",
      company: localFilters.company || localFilters?.companyList || [],
      educationLevel: localFilters.educationLevel || "",
      school: localFilters.school ||localFilters?.schoolList || [],
      degree: localFilters.degree || localFilters?.degreeList || "",
      globalSearch:localFilters?.globalSearch || localFilters?.globalSearchList || [],
      workModel: selectedWorkModel?.workModel || '',
      checkboxOptions: checkedColumns || [], // Ensure checkboxes store selected options
    };
  
    console.log("Applied Filters:", appliedFilters); // ✅ Log all selected filters
  
    if (onApply) {
      onApply(appliedFilters); // ✅ Pass filters to Candidates.js
    } else {
      console.error("onApply is not defined");
    }
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
              <label className="font-12-regular color-dark-black"> 
                Global Search
              </label>
              <div className="">
                <CommonTextInput
                  type="text"
                  placeholder="Global Search"
                  className="filter-input"
                  value={localFilters.globalSearch || []}
                  onChange={(e) => handleInputChange(e, "globalSearch")}
                  onKeyDown={(e) => handleKeyDown(e, "globalSearch")}
                />
              </div>
              {localFilters.globalSearchList?.length > 0 && (
                <div className="inputItemsDiv">
                  {localFilters.globalSearchList?.map((companyItem, index) => (
                    <div key={index} className="inputed-item">
                      {companyItem}
                      <button
                        className="ml-2 text-customBlue"
                        onClick={() => removeItem("globalSearch", index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                
              )}
              <label className="font-12-regular color-dark-black"> 
                Quick Filters
              </label>
            <div className="display-column-6 border-b pb-2 ">
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
              <div className="">
                <CommonTextInput
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
                placeholder="Languages" // Placeholder text
                selectedValues={selectedLanguages} // State to track selected options
                onChange={setSelectedLanguages} // Function to update state
                optionKey="language" // Key to display in the dropdown
                multiSelect={true} // Enable multiple selections
                showCheckbox={true} // Show checkboxes for selection
              />
              <LocationSearchDropdown
                selectedLocations={selectedLocations}
                setSelectedLocations={setSelectedLocations}
                placeholder={"Location"}
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
              <div className="">
                <CommonTextInput
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
              <div className="">
                <CommonTextInput
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
              <div className="">
                <CommonTextInput
                  type="text"
                  placeholder="University/Institution"
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
              <div className="">
                <CommonTextInput
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
                <div className="flex-1">
                  <CommonTextInput
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
                <div className="flex-1">
                  <CommonTextInput
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
              <CustomDropdown
                    options={workModelOptions} // Ensure it's an array of objects
                    placeholder="Work Model"
                    selectedValues={selectedWorkModel} // Must be an object
                    onChange={setSelectedWorkModel} // Must store the full object
                    optionKey="workModel"
                    multiSelect={false}
                  />
              <label className="font-12-regular mt-[7px] color-dark-black ">
                Expected Salary
              </label>
              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <CustomDropdown
                    options={frequencyOptions} // List of available frequencies
                    placeholder="Frequency" // Placeholder text
                    selectedValues={selectedFrequencies} // State to track selected frequency
                    onChange={setSelectedFrequencies} // Function to update state
                    optionKey="frequency" // Key to display in the dropdown
                    multiSelect={false} // Single selection mode
                    showCheckbox={false} // No checkboxes
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className=" flex-1">
                  <CurrencySelector
                    label="Minimum"
                    selectedCurrency={currentSalaryCurrency}
                    setSelectedCurrency={setCurrentSalaryCurrency}
                    salary={currentSalary}
                    setSalary={setCurrentSalary}
                  />
                </div>
                <div className=" flex-1">
                  <CurrencySelector
                    label="Maximum"
                    selectedCurrency={expectedSalaryCurrency}
                    setSelectedCurrency={setExpectedSalaryCurrency}
                    salary={expectedSalary}
                    setSalary={setExpectedSalary}
                  />
                </div>
              </div>
            </div>

            {/* <div className="display-column-6 ">
              <label className="font-12-regular color-dark-black">
                Education
              </label>
              <div className="">
                <CommonTextInput
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
              <div className="">
                <CommonTextInput
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
              <div className="">
                <CommonTextInput
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
            </div> */}

            <div className="display-column-6 pb-3 border-b ">
              <label className="font-12-regular color-dark-black">Date</label>
              <DateTimePicker
                initialDate={lastContactedDate}
                onDateSelect={handleLastContactedDateSelect}
                dob={false}
                placeholder="Last Contacted"
              />
              <DateTimePicker
                initialDate={lastContactedDate}
                onDateSelect={handleLastContactedDateSelect}
                dob={false}
                placeholder="Last Updated"
              />
            </div>
            <div className="display-column-6">
              <label className="font-12-regular color-dark-black">
                Miscellaneous
              </label>

              <CustomDropdown
                options={labelOptions}
                placeholder="Labels"
                selectedValues={selectedLabels}
                onChange={setSelectedLabels}
                optionKey="name"
                multiSelect={true}
                showCheckbox={true}
              />
              <CustomDropdown
                options={sourceOptions}
                placeholder="Source"
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
              onClick={handleResetFilters}
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
