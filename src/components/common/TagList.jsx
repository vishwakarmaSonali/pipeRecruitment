import React, { useState } from "react";
import { useModal } from "../common/ModalProvider";
import AddSkillModal from "../modals/AddSkillsModal";

const TagManager = ({tags,setTags}) => {

  const { modals, setModalVisibility } = useModal();

  // Function to remove a tag
  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div>
      {/* Tag List */}
      <div className="flex flex-wrap gap-2 mb-1">
        {tags?.map((tag, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-blueBg text-customBlue px-3 py-1 rounded-[6px] text-m"
          >
            <span className="text-customBlue rounded-[6px] text-m">{tag.name}</span>
            <span className="text-buttonBLue font-ubuntu text-m font-normal">{tag.score}</span>
            <button
              onClick={() => removeTag(index)}
              className="text-customBlue hover:text-gray-700 font-ubuntu text-sm focus:outline-none"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Add Button */}
      <button
        onClick={() => setModalVisibility("AddSkillModalVisible", true)}
        className="text-buttonBLue font-ubuntu text-sm"
      >
        + Add Skill
      </button>

      {/* Modal */}
      <AddSkillModal
        visible={modals?.AddSkillModalVisible}
        onClose={() => setModalVisibility("AddSkillModalVisible", false)}
        setTags={setTags} // ✅ Pass setTags to update skills dynamically
        tags={tags} // ✅ Pass current tag list
      />
    </div>
  );
};

export default TagManager;
