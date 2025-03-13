import React, { useState } from "react";
import { useModal } from "../common/ModalProvider";
import AddExperienceDetailsModal from "../modals/AddExperienceDetailsModal";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Three dots icon
import { commonStyle } from "../../helpers/config";

const ExperienceDetailsManager = ({
  experienceDetails,
  setExperienceDetails,
}) => {
  const { modals, setModalVisibility } = useModal();
  const [selectedIndex, setSelectedIndex] = useState(null); // Track selected experience index
  const [anchorEl, setAnchorEl] = useState(null);
  const [editExperienceData, setEditExperienceData] = useState(null); // Store selected experience for editing

  // ✅ Function to handle adding/updating experience details
  const handleAddOrUpdateExperience = (details) => {
    setExperienceDetails((prevDetails) => {
      if (selectedIndex !== null) {
        console.log("✅ Updating existing experience at index:", selectedIndex);
        return prevDetails.map((exp, i) =>
          i === selectedIndex ? { ...details, end_date: details.isCurrentlyWorking ? null : details.end_date } : exp
        );
      } else {
        console.log("🆕 Adding new experience...");
        return [...prevDetails, { ...details, end_date: details.isCurrentlyWorking ? null : details.end_date }];
      }
    });
  
    // Reset state after updating
    setTimeout(() => {
      setSelectedIndex(null);
      setEditExperienceData(null);
      setModalVisibility("AddExperienceDetailModalVisible", false);
    }, 0);
  };
  

  // ✅ Function to remove an experience entry
  const removeExperience = (index) => {
    console.log("❌ Removing experience at index:", index);
    setExperienceDetails((prev) => prev.filter((_, i) => i !== index));
    handleCloseMenu();
  };

  // ✅ Open menu for a specific entry
  const handleOpenMenu = (event, index) => {
    console.log("📌 Opening menu for index:", index);
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index); // Store index properly
  };

  // ✅ Close menu
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // ✅ Handle editing experience (open modal with selected data)
  const handleEditExperience = () => {
    console.log("✏️ Editing Experience at index:", selectedIndex);
    setEditExperienceData({ ...experienceDetails[selectedIndex] }); // Ensure deep copy
    setModalVisibility("AddExperienceDetailModalVisible", true);
    handleCloseMenu(); // Keep selectedIndex intact until modal closes
  };

  return (
    <div className="space-y-4">
      {/* List of Added Experience Details */}
      {experienceDetails.length > 0 && (
        <div className="flex flex-col gap-2">
          {experienceDetails.map((exp, index) => {
            console.log("expedfsdfsdfsdfsdf",exp);
            
            return (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded-md"
              >
                {/* ✅ Display Experience Details */}
                <div className="space-y-1">
                  <p className="text-l font-ubuntu font-medium text-customBlue">
                    {exp.position} at {exp.company}
                  </p>
                  <p className="text-m font-ubuntu text-customBlue">
                    {exp.location}
                  </p>
                  <p className="font-ubuntu text-m text-customGray">
                    {exp.start_date} -{" "}
                    {exp.isCurrentlyWorking ? "Present" : exp.end_date}
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
                  <MenuItem onClick={handleEditExperience}>Edit</MenuItem>
                  <MenuItem onClick={() => removeExperience(index)}>
                    Remove
                  </MenuItem>
                </Menu>
              </div>
            )
          })}
        </div>
      )}

      {/* Add Experience Button */}
      <button
        onClick={() => {
          console.log("➕ Opening Add Experience Modal...");
          setSelectedIndex(null);
          setEditExperienceData(null);
          setModalVisibility("AddExperienceDetailModalVisible", true);
        }}
        className="text-buttonBLue font-ubuntu text-sm"
      >
        + Add
      </button>

      {/* Experience Details Modal (Pass Edit Data) */}
      <AddExperienceDetailsModal
        visible={modals?.AddExperienceDetailModalVisible}
        onClose={() => {
          console.log("🛑 Closing Modal...");
          setModalVisibility("AddExperienceDetailModalVisible", false);
          setSelectedIndex(null);
          setEditExperienceData(null);
        }}
        onAddExperience={handleAddOrUpdateExperience} // ✅ Pass callback to store/update experience details
        selectedExperienceData={editExperienceData} // ✅ Pass selected experience data for editing
        isEditing={selectedIndex !== null} // ✅ Ensure form resets when adding new
      />
    </div>
  );
};

export default ExperienceDetailsManager;
