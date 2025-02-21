import React, { useState } from "react";
import { useModal } from "../common/ModalProvider";
import AddExperienceDetailsModal from "../modals/AddExperienceDetailsModal";

const ExperienceDetailsManager = ({experienceDetails,setExperienceDetails}) => {
  const { modals, setModalVisibility } = useModal();

  // ✅ Function to handle adding experience details
  const handleAddExperience = (details) => {
    if (!details) return;

    setExperienceDetails((prevDetails) => [...prevDetails, details]); // Append new entry
    console.log("Updated Experience Details:", experienceDetails); // Debugging log
    setModalVisibility("AddExperienceDetailModalVisible", false); // Close modal
  };

  // ✅ Function to remove an experience entry
  const removeExperience = (index) => {
    setExperienceDetails((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4 ">
      {/* List of Added Experience Details */}
      {experienceDetails.length > 0 && (
        <div className="flex flex-col gap-2">
          {experienceDetails.map((exp, index) => {
            console.log("expexpepepepepe",exp);
            
            return (
                <div
                  key={index}
                  className="flex items-center justify-between  p-2 rounded-md space-x-2  flex-1"
                  >
                  {/* ✅ Display Experience Details */}
                  <div className="space-y-1">
                  <p className="text-l font-ubuntu font-medium text-customBlue">
                  {exp.position} at {exp.company}</p>
                   
                    <p className="text-m font-ubuntu text-customBlue">{exp.location}</p>
                    <p className="font-ubuntu text-m text-customGray">
                      {exp.startDate} - {exp.endDate === "Currently Working" ? "Present" : exp.endDate}
                    </p>
                  </div>
    
                  {/* ✅ Remove Button */}
                  {/* <button
                    onClick={() => removeExperience(index)}
                    className="text-red-500 hover:text-red-700 text-lg"
                  >
                    ✕
                  </button> */}
                </div>
              )
          })}
        </div>
      )}

      {/* Add Experience Button */}
      <button
        onClick={() => setModalVisibility("AddExperienceDetailModalVisible", true)}
        className="text-buttonBLue font-ubuntu text-sm"
      >
        + Add 
      </button>

      {/* Experience Details Modal */}
      <AddExperienceDetailsModal
        visible={modals?.AddExperienceDetailModalVisible}
        onClose={() => setModalVisibility("AddExperienceDetailModalVisible", false)}
        onAddExperience={handleAddExperience} // ✅ Pass callback to store experience details
      />
    </div>
  );
};

export default ExperienceDetailsManager;
