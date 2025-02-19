import React, { useState } from "react";
import { useModal } from "../common/ModalProvider";
import AddSocialLinksModal from "../modals/AddSocialLinksModal";

const SocialLinksManager = () => {
  const [selectedSocialLinks, setSelectedSocialLinks] = useState([]); // ✅ Store added links
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
      <div className="flex flex-col gap-2 mb-2">
        {selectedSocialLinks.map((link, index) => (
          <div
            key={index}
            className="flex items-center justify-between border border-customBlue p-2 rounded-md"
          >
            {/* ✅ Show Icon & Name */}
            <div className="flex items-center gap-2">
              <img src={link.icon}  className="w-5 h-5" />
              <span className="text-customBlue">{link.name}</span>
            </div>

            {/* ✅ Show Entered URL */}
            <div className="flex items-center gap-2">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
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
        + Add Social Link
      </button>

      {/* Social Link Selection Modal */}
      <AddSocialLinksModal
        visible={modals?.addSocialLinksModalVisible}
        onClose={() => setModalVisibility("addSocialLinksModalVisible", false)}
        onAddLanguages={handleAddSocialLinks} // ✅ Pass callback to store links
      />
    </div>
  );
};

export default SocialLinksManager;
