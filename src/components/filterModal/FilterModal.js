import React,{useState} from "react";
import "./FilterModal.css"
import DropArrow from "../../assets/icons/droparrow.svg"
import CustomDropdown from "../CustomDropdown/CustomDropdown";
const FilterModal = ({ isOpen, onClose }) => {
    // State for each input field
    const [jobTitleInput, setJobTitleInput] = useState('');
    const [jobTitles, setJobTitles] = useState([]);
  
    const [locationInput, setLocationInput] = useState('');
    const [locations, setLocations] = useState([]);
  
    const [companyInput, setCompanyInput] = useState('');
    const [company, setCompany] = useState([]);

    // const [industryInput, setIndustryInput] = useState('');
    // const [industries, setIndustries] = useState([]);

    const [majorInput, setMajorInput] = useState('');
    const [major, setMajor] = useState([]);

    const [degreeInput, setDegreeInput] = useState('');
    const [degrees, setDegrees] = useState([]);

    const [schoolInput, setSchoolInput] = useState('');
    const [schoolsData, setSchoolsData] = useState([]);
  
    const [radius, setRadius] = useState("");
    const [industry, setIndustry] = useState("");
  
    const radiusOptions = ["Kilometer", "Mile"];
    const industryOptions = ["IT", "Finance", "Healthcare", "Retail","IT", "Finance", "Healthcare", "Retail","IT", "Finance", "Healthcare", "Retail"];
  
    // Handler function for input key down
    const handleKeyDown = (e, inputValue, setInputValue, dataArray, setDataArray) => {
      if (e.key === 'Enter' && inputValue.trim()) {
        setDataArray([...dataArray, inputValue.trim()]);
        setInputValue('');
      }
    };
  
    // Remove an item from the array
    const removeItem = (index, dataArray, setDataArray) => {
      setDataArray(dataArray.filter((_, i) => i !== index));
    };

  return (
    <div
  className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end ${
    isOpen ? 'visible' : 'invisible'
  }`}
>

    <div
      className={`fixed top-0 right-0 h-full rounded-l-[8px] w-[460px] bg-white shadow-lg transform transition-transform duration-500 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-[20px] flex flex-col h-full">
        {/* Modal Header */}
        <div className="flex justify-between items-center">
          <h2 className="filter-heading">Filters</h2>
          <button onClick={onClose} className="text-customBlue hover:text-gray-900">
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
              value={jobTitleInput}
              onChange={(e) => setJobTitleInput(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, jobTitleInput, setJobTitleInput, jobTitles, setJobTitles)}
            />
         {jobTitles.length>0 && <div className="inputItemsDiv">
              {jobTitles.map((title, index) => (
                <div key={index} className="inputed-item">
                  {title}
                  <button className="ml-2 text-customBlue" onClick={() => removeItem(index, jobTitles, setJobTitles)}>✕</button>
                </div>
              ))}
            </div>}
          </div>

          <div>
            <label className="filter-title">Location</label>
            <input
            
              type="text"
              placeholder="Enter location"
              className="filter-input"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, locationInput, setLocationInput, locations, setLocations)}
            />
            {locations.length>0 &&   <div className="inputItemsDiv">
              {locations.map((loc, index) => (
                <div key={index} className="inputed-item">
                  {loc}
                  <button className="ml-2 text-customBlue" onClick={() => removeItem(index, locations, setLocations)}>✕</button>
                </div>
              ))}
            </div>}
          </div>

          <div>
            <label className="filter-title">Radius</label>
            <input
            
              type="text"
              placeholder="Enter distance"
              className="filter-input"
              
            />
        <CustomDropdown
              options={radiusOptions}
              placeholder="Select Radius"
              selectedValue={radius}
              onChange={setRadius}
            />
          </div>

          <div>
            <label className="filter-title">Company</label>
            <input
            
              type="text"
              placeholder="Enter company"
              className="filter-input"
              value={companyInput}
              onChange={(e) => setCompanyInput(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, companyInput, setCompanyInput, company, setCompany)}
            />
             {company.length>0 && <div className="inputItemsDiv">
              {company.map((companyItem, index) => (
                <div key={index} className="inputed-item">
                  {companyItem}
                  <button className="ml-2 text-customBlue" onClick={() => removeItem(index, company, setCompany)}>✕</button>
                </div>
              ))}
            </div>}
          </div>

          <div>
            <label className="filter-title">Years of Experience</label>
            <div className="flex space-x-2">
              <input
              
                type="text"
                placeholder="From"
                className="filter-input"
              />
              <input
              
                type="text"
                placeholder="To"
                className="filter-input"
              />
            </div>
          </div>

           {/* Industry Dropdown */}
           <CustomDropdown
              options={industryOptions}
              placeholder="Select Industry"
              selectedValue={industry}
              onChange={setIndustry}
            />
          <div>
            <label className="filter-title">Education</label>
            <input
            
              type="text"
              placeholder="Enter Major"
              className="filter-input"
              value={majorInput}
              onChange={(e) => setMajorInput(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, majorInput, setMajorInput, major, setMajor)}
            />
             {major.length>0 && <div className="inputItemsDiv">
              {major.map((majorItem, index) => (
                <div key={index} className="inputed-item">
                  {majorItem}
                  <button className="ml-2 text-customBlue" onClick={() => removeItem(index, major, setMajor)}>✕</button>
                </div>
              ))}
            </div>}
            <input
            
              type="text"
              placeholder="Enter School"
              className="filter-input"
              value={schoolInput}
              onChange={(e) => setSchoolInput(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, schoolInput, setSchoolInput, schoolsData, setSchoolsData)}
            />
            {schoolsData.length>0 &&  <div className="inputItemsDiv">
              {schoolsData.map((schoolsDataItem, index) => (
                <div key={index} className="inputed-item">
                  {schoolsDataItem}
                  <button className="ml-2 text-customBlue" onClick={() => removeItem(index, schoolsData, setSchoolsData)}>✕</button>
                </div>
              ))}
            </div>}
            <input
            
              type="text"
              placeholder="Enter Degree"
              className="filter-input"
              value={degreeInput}
              onChange={(e) => setDegreeInput(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, degreeInput, setDegreeInput, degrees, setDegrees)}
            />
             {degrees.length>0 && <div className="inputItemsDiv">
              {degrees.map((degreesItem, index) => (
                <div key={index} className="inputed-item">
                  {degreesItem}
                  <button className="ml-2 text-customBlue" onClick={() => removeItem(index, degrees, setDegrees)}>✕</button>
                </div>
              ))}
            </div>}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="mt-6 flex justify-between space-x-4">
          <button className="w-1/2 border border-buttonBLue text-buttonBLue  flex justify-center items-center py-[12px] max-h-[40px] rounded-[8px] btn-text">
            Reset
          </button>
          <button className="w-1/2 bg-buttonBLue text-white flex justify-center items-center py-[12px] max-h-[40px] rounded-[8px] hover:bg-blue-700 btn-text">
            Filter Search
          </button>
        </div>
      </div>
    </div>
</div>
  );
};

export default FilterModal;
