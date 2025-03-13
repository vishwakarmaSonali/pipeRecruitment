import React, { useState } from "react";
import { useModal } from "../common/ModalProvider";
import AddSocialLinksModal from "../modals/AddSocialLinksModal";

const SocialLinksManager = ({selectedSocialLinks,setSelectedSocialLinks}) => {
  const { modals, setModalVisibility } = useModal();

  // ✅ Function to handle adding new social links
  const handleAddSocialLinks = (link) => {
    setSelectedSocialLinks((prevLinks) => [...prevLinks, link]); // Append new entry
    setModalVisibility("addSocialLinksModalVisible", false); // Close modal
  };

  // ✅ Function to remove a social link
  const removeSocialLink = (index) => {
    setSelectedSocialLinks((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="">
      {/* Selected Social Links List */}
      <div className="flex flex-row gap-2 mb-2">
        {selectedSocialLinks.map((link, index) => (
          <div
            key={index}
             className="bg-white border text-gray-700 text-sm max-h-[30px] p-[8px] rounded-[8px] flex items-center gap-[8px] justify-between  border-customBlue space-x-1"
          >
            {/* ✅ Show Icon & Name */}
            <div className="flex items-center ">
              <img src={link.icon}  className="w-5 h-5" />
              
            </div>

            {/* ✅ Show Entered URL */}
            <div className="flex items-center gap-1">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 font-ubuntu text-m text-customBlue"
              >
                {link.url}
              </a>
              <button
                onClick={() => removeSocialLink(index)}
                className="text-red-500 text-sm focus:outline-none"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Social Link Button */}
      <button
        onClick={() => setModalVisibility("addSocialLinksModalVisible", true)}
        className="text-buttonBLue font-ubuntu text-sm"
      >
        + Add
      </button>

      {/* Social Link Selection Modal */}
      <AddSocialLinksModal
        visible={modals?.addSocialLinksModalVisible}
        onClose={() => setModalVisibility("addSocialLinksModalVisible", false)}
        onAddSocial={handleAddSocialLinks} // ✅ Pass callback to store links
      />
    </div>
  );
};

export default SocialLinksManager;
