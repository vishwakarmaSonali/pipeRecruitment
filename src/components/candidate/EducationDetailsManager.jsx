import React, { useState } from "react";
import { useModal } from "../common/ModalProvider";
import AddEducationDetailsModal from "../modals/AddEducationDetailsModal";

const EducationDetailsManager = () => {
  const [educationDetails, setEducationDetails] = useState([]); // ✅ Store education entries
  const { modals, setModalVisibility } = useModal();

  // ✅ Function to handle adding education details
  const handleAddEducation = (details) => {
    setEducationDetails((prevDetails) => [...prevDetails, details]); // Append new entry
    setModalVisibility("AddEducationDetailModalVisible", false); // Close modal
  };

  // ✅ Function to remove an education entry
  const removeEducation = (index) => {
    setEducationDetails((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="">
      {/* List of Added Education Details */}
      <div className="flex flex-col gap-2 mb-2">
        {educationDetails.map((edu, index) => (
          <div
            key={index}
            className="flex items-center justify-between  p-2 rounded-md space-x-2"
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
                {edu.startDate} -{" "}
                {edu.endDate === "Currently Working" ? "Present" : edu.endDate}
              </p>
            </div>

            {/* ✅ Remove Button */}
            {/* <button
              onClick={() => removeEducation(index)}
              className="text-red-500 text-sm focus:outline-none"
            >
              ✕
            </button> */}
          </div>
        ))}
      </div>

      {/* Add Education Button */}
      <button
        onClick={() =>
          setModalVisibility("AddEducationDetailModalVisible", true)
        }
        className="text-buttonBLue font-ubuntu text-sm"
      >
        + Add
      </button>

      {/* Education Details Modal */}
      <AddEducationDetailsModal
        visible={modals?.AddEducationDetailModalVisible}
        onClose={() =>
          setModalVisibility("AddEducationDetailModalVisible", false)
        }
        onAddEducation={handleAddEducation} // ✅ Pass callback to store education details
      />
    </div>
  );
};

export default EducationDetailsManager;
