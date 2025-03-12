import React, { useState } from "react";
import { useModal } from "../common/ModalProvider";
import AddEducationDetailsModal from "../modals/AddEducationDetailsModal";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Three dots icon
import { commonStyle } from "../../helpers/config";

const EducationDetailsManager = ({ educationDetails, setEducationDetails }) => {
  const { modals, setModalVisibility } = useModal();
  const [selectedIndex, setSelectedIndex] = useState(null); // Track selected education index
  const [editEducationData, setEditEducationData] = useState(null); // Store selected education for editing
  const [anchorEl, setAnchorEl] = useState(null);

  // ✅ Function to handle adding/updating education details
  const handleAddOrUpdateEducation = (details) => {
    setEducationDetails((prevDetails) => {
      if (selectedIndex !== null) {
        // ✅ Update existing item instead of adding new
        const updatedDetails = [...prevDetails];
        updatedDetails[selectedIndex] = details;
        return updatedDetails;
      } else {
        // ✅ Append new entry
        return [...prevDetails, details];
      }
    });

    // Reset states after saving
    resetForm();
  };

  // ✅ Function to remove an education entry
  const removeEducation = (index) => {
    setEducationDetails((prev) => prev.filter((_, i) => i !== index));
    handleCloseMenu();
  };

  // ✅ Open menu for a specific entry
  const handleOpenMenu = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
  };

  // ✅ Close menu
  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedIndex(null);
  };

  // ✅ Handle editing education
  const handleEditEducation = () => {
    setEditEducationData(educationDetails[selectedIndex]); // ✅ Pre-fill form with selected data
    setModalVisibility("AddEducationDetailModalVisible", true);
    handleCloseMenu(); // Close menu after clicking edit
  };

  // ✅ Reset form when adding new
  const resetForm = () => {
    setSelectedIndex(null);
    setEditEducationData(null);
    setModalVisibility("AddEducationDetailModalVisible", false);
  };

  return (
    <div>
      {/* List of Added Education Details */}
      <div className="flex flex-col gap-2 mb-2">
        {educationDetails.map((edu, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 rounded-md "
          >
            {/* ✅ Display Education Details */}
            <div>
              <p className="text-l font-ubuntu font-medium text-customBlue">
                {edu.degree} in {edu.major}
              </p>
              <p className="text-m font-ubuntu text-customBlue">
                {edu.university}
              </p>
              <p className="font-ubuntu text-m text-customGray">
                {edu.startDate?.month} {edu.startDate?.year} -{" "}
                {edu.endDate?.month} {edu.endDate?.year}
              </p>
            </div>

            {/* ✅ Three Dots Menu */}
            <IconButton onClick={(e) => handleOpenMenu(e, index)}>
              <MoreVertIcon />
            </IconButton>

            {/* ✅ Dropdown Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl) && selectedIndex === index}
              onClose={handleCloseMenu}
              PaperProps={{
                sx: commonStyle.sx,
              }}
            >
              <MenuItem onClick={handleEditEducation}>Edit</MenuItem>
              <MenuItem onClick={() => removeEducation(index)}>Remove</MenuItem>
            </Menu>
          </div>
        ))}
      </div>

      {/* Add Education Button */}
      <button
        onClick={() => {
          resetForm(); // ✅ Ensures form is empty when adding new
          setModalVisibility("AddEducationDetailModalVisible", true);
        }}
        className="text-buttonBLue font-ubuntu text-sm"
      >
        + Add
      </button>

      {/* Education Details Modal */}
      <AddEducationDetailsModal
        visible={modals?.AddEducationDetailModalVisible}
        onClose={resetForm}
        onAddEducation={handleAddOrUpdateEducation} // ✅ Pass callback to store/update education details
        editEducationData={selectedIndex !== null ? editEducationData : null} // ✅ Ensures pre-filled data only when editing
      />
    </div>
  );
};

export default EducationDetailsManager;
