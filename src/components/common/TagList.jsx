import React, { useState } from "react";
import { useModal } from "../common/ModalProvider";
import AddSkillModal from "../modals/AddSkillsModal";
const TagManager = () => {
    const [tags, setTags] = useState([
        { name: "UI Design", score: "08" },
        { name: "UX Design", score: "09" },
        { name: "Figma", score: "09" },
        { name: "Sketch", score: "05" },
      ]);
    
      const [showModal, setShowModal] = useState(false);
      const [newSkill, setNewSkill] = useState("");
      const [newScore, setNewScore] = useState("");
      const { modals, setModalVisibility } = useModal();
    
      // Function to add a new tag
      const handleAddTag = () => {
        if (newSkill.trim() !== "" && newScore.trim() !== "") {
          setTags([...tags, { name: newSkill, score: newScore }]);
          setNewSkill(""); // Reset input fields
          setNewScore("");
          setShowModal(false); // Close modal
        }
      };
    
      // Function to remove a tag
      const removeTag = (index) => {
        setTags(tags.filter((_, i) => i !== index));
      };
    

  return (
    <div className="">
      {/* Tag List */}
      <div className="flex flex-wrap gap-2 mb-1">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-blueBg text-customBlue px-3 py-1 rounded-[6px] text-m"
          >
            <span className="text-customBlue  rounded-[6px] text-m">{tag.name}</span>
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
        className=" text-buttonBLue font-ubuntu text-sm"
      >
       + Add Skill
      </button>

      {/* Modal */}
     
      <AddSkillModal  visible={modals?.AddSkillModalVisible}
        onClose={() => setModalVisibility("AddSkillModalVisible", false)}/>
    </div>
  );
};

export default TagManager;


