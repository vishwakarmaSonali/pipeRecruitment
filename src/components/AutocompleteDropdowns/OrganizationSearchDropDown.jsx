import React, { useState, useEffect } from "react";
import axios from "axios";

const OrganizationSearchDropdown = ({ selectedOrganizations = [], setSelectedOrganizations }) => {
  const [organizationQuery, setOrganizationQuery] = useState("");
  const [organizationSuggestions, setOrganizationSuggestions] = useState([]);
  const [showOrganizationDropdown, setShowOrganizationDropdown] = useState(false);

  // Fetch organization suggestions from API
  useEffect(() => {
    if (organizationQuery.length > 1) {
      const fetchOrganizations = async () => {
        try {
          const response = await axios.get(
            `http://3.110.81.44/api/candidate-profiles/suggest/organization?query=${organizationQuery}`
          );
          console.log("Organization API Response:", response?.data?.suggestions);

          // Ensure response is an array
          const suggestions = Array.isArray(response?.data?.suggestions)
            ? response.data.suggestions
            : [];

          setOrganizationSuggestions(suggestions);
          setShowOrganizationDropdown(true);
        } catch (error) {
          console.error("Error fetching organizations:", error);
          setOrganizationSuggestions([]);
        }
      };

      fetchOrganizations();
    } else {
      setOrganizationSuggestions([]);
      setShowOrganizationDropdown(false);
    }
  }, [organizationQuery]);

  // Handle organization selection
  const handleSelectOrganization = (organization) => {
    if (!Array.isArray(selectedOrganizations)) {
      setSelectedOrganizations([]); // Ensure it's always an array
    }

    if (!selectedOrganizations.includes(organization)) {
      setSelectedOrganizations([...selectedOrganizations, organization]);
    }
    setOrganizationQuery("");
    setShowOrganizationDropdown(false);
  };

  // Remove selected organization
  const removeOrganization = (index) => {
    setSelectedOrganizations(selectedOrganizations.filter((_, i) => i !== index));
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Enter Company"
        className="filter-input border"
        value={organizationQuery}
        onChange={(e) => setOrganizationQuery(e.target.value)}
        onFocus={() => setShowOrganizationDropdown(true)}
      />

      {/* Organization Suggestions Dropdown */}
      {showOrganizationDropdown && organizationSuggestions.length > 0 && (
            <div className=" left-0 w-[405px] flex flex-col  bg-white border border-borderGrey rounded-lg shadow-md  max-h-[460px] overflow-auto z-50 text-sm">
          {organizationSuggestions.map((organization, index) => (
            <div
              key={index}
              className="px-2 py-2 flex  gap-2 hover:bg-customGrey1 cursor-pointer"
              onClick={() => handleSelectOrganization(organization)}
            >
              {organization}
            </div>
          ))}
        </div>
      )}

      {/* Selected Organizations List */}
      {Array.isArray(selectedOrganizations) && selectedOrganizations.length > 0 && (
        <div className="inputItemsDiv mt-2 flex flex-wrap">
          {selectedOrganizations.map((organization, index) => (
            <div key={index} className="inputed-item">
              {organization}
              <button
                className="ml-2 text-customBlue"
                onClick={() => removeOrganization(index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrganizationSearchDropdown;
