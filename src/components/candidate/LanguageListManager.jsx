import React, { useState } from "react";
import { useModal } from "../common/ModalProvider";
import AddLanguages from "../modals/AddLanguagesModal";
import { ReactComponent as CloseIcon } from "../../assets/icons/closeModal.svg";

const LanguageListManager = ({ selectedLanguages, setSelectedLanguages }) => {
  const { modals, setModalVisibility } = useModal();

  // ✅ Function to add selected languages when "Add" is clicked in the modal
  const handleAddLanguages = (languages) => {
    setSelectedLanguages(languages); // Update the state
    setModalVisibility("addLanguageModalVisible", false); // Close modal
  };

  // ✅ Function to remove a selected language
  const removeLanguage = (index) => {
    setSelectedLanguages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="">
      {/* Selected Languages List */}
      <div className="flex flex-wrap gap-2 mb-1">
        {selectedLanguages.map((language, index) => (
          <div
            key={index}
            className="bg-white border text-gray-700 text-sm max-h-[30px] p-[8px] rounded-[8px] flex items-center gap-[8px]"
          >
            <span className="text-customBlue rounded-[6px] text-m">{language.name}</span>
            <button
              onClick={() => removeLanguage(index)}
              className="text-customBlue  font-ubuntu text-sm focus:outline-none"
            >
            <CloseIcon height={"10px"} width={"10px"}/>
            </button>
          </div>
        ))}
      </div>

      {/* Add Language Button */}
      <button
        onClick={() => setModalVisibility("addLanguageModalVisible", true)}
        className="text-buttonBLue font-ubuntu text-sm"
      >
        + Add 
      </button>

      {/* Language Selection Modal */}
      <AddLanguages
        visible={modals?.addLanguageModalVisible}
        onClose={() => setModalVisibility("addLanguageModalVisible", false)}
        onAddLanguages={handleAddLanguages} // ✅ Pass the callback to receive selected languages
      />
    </div>
  );
};

export default LanguageListManager;
