import React, { useState, useEffect, useRef } from "react";
import "./FilterModal.css";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
const FilterModal = ({ isOpen, onClose, onApply, onReset, filters }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [isVisible, setIsVisible] = useState(isOpen);
  const modalRef = useRef(null);

  const [radius, setRadius] = useState("");
  const [industry, setIndustry] = useState([]);

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
    setLocalFilters(filters); // Sync local state with parent filters
  }, [filters]);

  // Handle input change
  const handleInputChange = (e, field) => {
    setLocalFilters({
      ...localFilters,
      [field]: e.target.value,
    });
  };

  // Handle Enter key to add item to list
  const handleKeyDown = (e, field) => {
    if (e.key === "Enter" && localFilters[field]?.trim()) {
      setLocalFilters((prevFilters) => ({
        ...prevFilters,
        [field]: "",
        [`${field}List`]: [
          ...(prevFilters[`${field}List`] || []),
          prevFilters[field].trim(),
        ],
      }));
    }
  };

  // Remove an item from the array
  const removeItem = (field, index) => {
    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      [`${field}List`]: prevFilters[`${field}List`].filter(
        (_, i) => i !== index
      ),
    }));
  };
  // Handle adding industry items
  const handleIndustryChange = (selectedItem) => {
    if (!industry.includes(selectedItem)) {
      setIndustry([...industry, selectedItem]);
    }
  };

  // Remove selected industry
  const removeIndustry = (index) => {
    setIndustry(industry.filter((_, i) => i !== index));
  };
  const handleApplyFilters = () => {
    console.log("Applied Filters:", {
      jobTitle: localFilters.jobTitleList,
      location: localFilters.locationList,
      company: localFilters.companyList,
      major: localFilters.majorList,
      school: localFilters.schoolList,
      degree: localFilters.degreeList,
      radius: radius,
      skill: localFilters.skillList,
      industry: industry,
      experienceFrom: experience.from,
      experienceTo: experience.to,
    });
    onApply({ ...localFilters, radius, industry, experience });
  };

  // Effect to handle the modal visibility state and animation
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 300); // Reduce delay
    }
  }, [isOpen]);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // Detect clicks outside the modal to close it with animation
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  // Handle input change for single radius value
  const handleRadiusChange = (e) => {
    setRadius(e.target.value);
  };

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
  if (!isOpen && !isVisible) return null;

  return (
    <div
      onClick={onClose} // Close when clicking outside
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      } transition-opacity duration-1500`}
      style={{ zIndex: 999 }}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicked inside
        className={`fixed top-0 right-0 h-full rounded-l-[8px] w-[460px] bg-white shadow-lg transform transition-transform duration-1500 ease-in-out ${
          isOpen ? "animate-slideIn" : "animate-slideOut"
        }`}
      >
        <div className="p-[20px] flex flex-col h-full">
          {/* Modal Header */}
          <div className="flex justify-between items-center">
            <h2 className="filter-heading">Filters</h2>
            <button
              onClick={onClose}
              className="text-customBlue hover:text-gray-900"
            >
              ✕
            </button>
          </div>

          {/* Filter Form */}
          <div className="flex-1 overflow-auto pb-[6px] scroll-width-none mt-[32px] space-y-[6px]">
            <div>
              <label className="filter-title">Job Title</label>
              <input
                type="text"
                placeholder="Enter title"
                className="filter-input"
                value={localFilters.jobTitle || ""}
                onChange={(e) => handleInputChange(e, "jobTitle")}
                onKeyDown={(e) => handleKeyDown(e, "jobTitle")}
              />
              {localFilters.jobTitleList?.length > 0 && (
                <div className="inputItemsDiv">
                  {localFilters.jobTitleList.map((title, index) => (
                    <div key={index} className="inputed-item">
                      {title}
                      <button
                        className="ml-2 text-customBlue"
                        onClick={() => removeItem("jobTitle", index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="filter-title">Location</label>
              <input
                type="text"
                placeholder="Enter location"
                className="filter-input"
                value={localFilters.location || ""}
                onChange={(e) => handleInputChange(e, "location")}
                onKeyDown={(e) => handleKeyDown(e, "location")}
              />
              {localFilters.locationList?.length > 0 && (
                <div className="inputItemsDiv">
                  {localFilters.locationList?.map((loc, index) => (
                    <div key={index} className="inputed-item">
                      {loc}
                      <button
                        className="ml-2 text-customBlue"
                        onClick={() => removeItem("location", index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="filter-title">Radius</label>
              <input
                type="text"
                placeholder="Enter distance"
                className="filter-input"
                value={radius?.type}
                onChange={handleRadiusChange}
              />
              <CustomDropdown
                options={radiusOptions}
                placeholder="Select Radius"
                selectedValue={radius}
                onChange={setRadius}
                optionKey="type"
              />
              {radius && (
                <div className="inputItemsDiv">
                  <div className="inputed-item">
                    {radius?.type}
                    <button
                      className="ml-2 text-customBlue"
                      onClick={removeRadius}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="filter-title">Company</label>
              <input
                type="text"
                placeholder="Enter company"
                className="filter-input"
                value={localFilters.company || ""}
                onChange={(e) => handleInputChange(e, "company")}
                onKeyDown={(e) => handleKeyDown(e, "company")}
              />
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
            </div>

            <div>
              <label className="filter-title">Years of Experience</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="From"
                  className="filter-input"
                  value={experience.from}
                  onChange={(e) => handleExperienceChange(e, "from")}
                />
                <input
                  type="text"
                  placeholder="To"
                  className="filter-input"
                  value={experience.to}
                  onChange={(e) => handleExperienceChange(e, "to")}
                />
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

            <div>
              <label className="filter-title">Skills</label>
              <input
                type="text"
                placeholder="Enter skill"
                className="filter-input"
                value={localFilters.skill || ""}
                onChange={(e) => handleInputChange(e, "skill")}
                onKeyDown={(e) => handleKeyDown(e, "skill")}
              />
              {localFilters.skillList?.length > 0 && (
                <div className="inputItemsDiv">
                  {localFilters.skillList?.map((skill, index) => (
                    <div key={index} className="inputed-item">
                      {skill}
                      <button
                        className="ml-2 text-customBlue"
                        onClick={() => removeItem("skill", index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Industry Dropdown */}
            <div>
              <label className="filter-title">Industry</label>
              <CustomDropdown
                options={industryOptions}
                placeholder="Select Industry"
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
            <div>
              <label className="filter-title">Education</label>
              <input
                type="text"
                placeholder="Enter Major"
                className="filter-input"
                value={localFilters.major || ""}
                onChange={(e) => handleInputChange(e, "major")}
                onKeyDown={(e) => handleKeyDown(e, "major")}
              />
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
              <input
                type="text"
                placeholder="Enter School"
                className="filter-input"
                value={localFilters.school || ""}
                onChange={(e) => handleInputChange(e, "school")}
                onKeyDown={(e) => handleKeyDown(e, "school")}
              />
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
              <input
                type="text"
                placeholder="Enter Degree"
                className="filter-input"
                value={localFilters.degree || ""}
                onChange={(e) => handleInputChange(e, "degree")}
                onKeyDown={(e) => handleKeyDown(e, "degree")}
              />
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

          {/* Footer Buttons */}
          <div className="mt-6 flex justify-between space-x-4">
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
              Filter Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
