import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import "../filterModal/FilterModal.css";
import { ReactComponent as CloseIcon } from "../../assets/icons/drawerClose.svg";
import { Drawer } from "@mui/material";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import TitleSearchDropdown from "../AutocompleteDropdowns/TitleSearchDropDown";
import LocationSearchDropdown from "../AutocompleteDropdowns/LocationSearchDropDown";
import SkillSearchDropdown from "../AutocompleteDropdowns/SkillDropdown";
import OrganizationSearchDropdown from "../AutocompleteDropdowns/OrganizationSearchDropDown";
import CommonDropdown from "../common/CommonDropdown";
import CommonTextInput from "../common/CommonTextInput";
const FilterDrawer = ({ isOpen, onClose, onApply, onReset, filters }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [isVisible, setIsVisible] = useState(isOpen);

  const [radius, setRadius] = useState("");
  const [industry, setIndustry] = useState([]);
  const [selectedTitles, setSelectedTitles] = useState([]); // Ensure it's an array
  const [selectedLocations, setSelectedLocations] = useState([]); // Ensure it's an array
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedOrganizations, setSelectedOrganizations] = useState([]); // Ensure it's an array
  console.log("onApply>>>>>>", onApply);

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
  const [experience, setExperience] = useState({ from: "", to: "" });

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

  const handleIndustryChange = (selectedItem) => {
    if (!industry.includes(selectedItem)) {
      setIndustry([...industry, selectedItem]);
    }
  };

  const removeIndustry = (index) => {
    setIndustry(industry.filter((_, i) => i !== index));
  };
  const handleApplyFilters = () => {
    console.log(
      "selectedTitlesselectedTitles",
      selectedTitles,
      "locationslocations",
      selectedLocations
    );

    onApply({
      ...localFilters,
      radiusType: radius?.type || "",
      industry: industry?.industryType || "",
      titles: selectedTitles,
      location: selectedLocations,
      skills: selectedSkills,
      organizations: selectedOrganizations,
      experience,
    });
  };

  const handleResetFilters = () => {
    setSelectedTitles([]); // Reset titles
    setSelectedLocations([]); // Reset locations
    setSelectedOrganizations([]); // Reset organizations
    setSelectedSkills([]); // Reset skills
    setIndustry([]); // Reset industry selection
    setExperience({ from: "", to: "" }); // Reset experience input
    setRadius(""); // Reset radius
    setLocalFilters({}); // Clear local filters state
    onReset(); // Call parent reset function
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

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <div role="presentation" className="candidate-details-drawer">
        <div className="py-[20px] h-full display-column" style={{ gap: 20 }}>
          <div className="flex justify-between items-center">
            <h2 className="font-24-medium color-dark-black">Filters</h2>
            <button onClick={onClose}>
              <CloseIcon />
            </button>
          </div>

          <div className="filter-form">
            <div className="display-column-6 ">
              <label className="font-12-regular color-dark-black">
                Job Title
              </label>
              <div className="flex-1">
                <TitleSearchDropdown
                  selectedTitles={selectedTitles}
                  setSelectedTitles={setSelectedTitles}
                />
              </div>
            </div>

            <div className="display-column-6 ">
              <label className="font-12-regular color-dark-black">
                Location
              </label>
              <LocationSearchDropdown
                selectedLocations={selectedLocations}
                setSelectedLocations={setSelectedLocations}
                placeholder={"Preferred Location"}
                multipleSelect={true}
              />
            </div>

            <div className="display-column-6 ">
              <label className="font-12-regular color-dark-black">Radius</label>
              <div className="">
                <CommonTextInput
                  type="text"
                  placeholder="Enter distance"
                  className="filter-input"
                  value={localFilters.radius || ""}
                  onChange={(e) => handleInputChange(e, "radius")}
                  onKeyDown={(e) => {
                    if (!/^[0-9]$/.test(e.key) && e.key !== "Backspace") {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
              <CommonDropdown
                options={radiusOptions}
                placeholder="Select Radius"
                selectedValue={radius}
                onChange={setRadius}
                optionKey="type"
              />
              {/* {radius && (
                <div className="inputItemsDiv">
                  <div className="inputed-item">
                    {localFilters.radius} {radius?.type}
                    <button
                      className="ml-2 text-customBlue"
                      onClick={removeRadius}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )} */}
            </div>

            <div className="display-column-6">
              <label className="font-12-regular color-dark-black">
                Company
              </label>
              <div className="rounded-[8px]">
                <OrganizationSearchDropdown
                  selectedOrganizations={selectedOrganizations}
                  setSelectedOrganizations={setSelectedOrganizations}
                />
              </div>
            </div>

            <div className="display-column-6 ">
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

            <div className="display-column-6 ">
              <label className="font-12-regular color-dark-black">Skills</label>
              <div className="">
                <SkillSearchDropdown
                  selectedSkills={selectedSkills}
                  setSelectedSkills={setSelectedSkills}
                />
              </div>
            </div>

            <div className="display-column-6 ">
              <label className="font-12-regular color-dark-black">Domain</label>
              <CommonDropdown
                options={industryOptions}
                placeholder="Select Domain"
                selectedValue={industry}
                onChange={setIndustry}
                optionKey="industryType"
              />
              {industry.length > 0 && (
                <div className="inputItemsDiv">
                  {industry.map((item, index) => (
                    <div key={index} className="inputed-item">
                      {item?.industryType}
                      <button
                        className="ml-2 text-customBlue"
                        onClick={() => removeIndustry(index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="display-column-6 ">
              <label className="font-12-regular color-dark-black">
                Education
              </label>
              <div>
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
              <div>
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
              <div>
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
            </div>
          </div>

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
              Filter Search
            </button>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default FilterDrawer;
