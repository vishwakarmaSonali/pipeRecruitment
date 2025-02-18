import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useModal } from "../common/ModalProvider";
import { ReactComponent as CloseIcon } from "../../assets/icons/closeModal.svg";
import CommonButton from "../common/CommonButton";
import CommonTextInput from "../common/CommonTextInput";

const AddSkillModal = ({ visible, onClose }) => {
  const { modals, setModalVisibility } = useModal();
      const [tags, setTags] = useState([
          { name: "UI Design", score: "08" },
          { name: "UX Design", score: "09" },
          { name: "Figma", score: "09" },
          { name: "Sketch", score: "05" },
        ]);
 const [newSkill, setNewSkill] = useState("");
      const [newScore, setNewScore] = useState("");
            const [showModal, setShowModal] = useState(false);
      
  const handleBackdropClick = () => {
    setModalVisibility("AddSkillModalVisible", false)
    
  };
  const handleAddTag = () => {
    if (newSkill.trim() !== "" && newScore.trim() !== "") {
      setTags([...tags, { name: newSkill, score: newScore }]);
      setNewSkill(""); // Reset input fields
      setNewScore("");
      handleBackdropClick(false); // Close modal
    }
  };

  return (
    <Modal
      show={visible}
      onHide={handleBackdropClick}
      dialogClassName={`common-modal`}
      contentClassName="modal-content"
      backdropClassName="custom-backdrop"
    >
     <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center ">
      <div className="bg-white p-[14px] rounded-lg shadow-lg min-w-[400px]">
        <h2 className="text-lg font-semibold mb-4">Add Skill</h2>

        {/* Skill Name Input */}
        <label className="block text-sm text-customBlue font-ubuntu">Skill Name</label>
        <input
          type="text"
          className="w-full border border-gray-300 p-2 outline-none rounded-md mt-1 text-sm text-customBlue font-ubuntu"
          placeholder="Enter skill name"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
        />

      {/* Score Selection */}
      <label className="block text-sm text-customBlue font-ubuntu mt-4">
          Select Score
        </label>
        <div className="flex gap-2 mt-2">
          {[...Array(10)].map((_, i) => {
            const score = (i + 1).toString().padStart(2, "0");
            return (
              <button
                key={score}
                className={`w-[37px] h-[16px] rounded-[3px] text-sm font-semibold ${
                  newScore && parseInt(score) <= parseInt(newScore)
                    ? "bg-green text-white"
                    : "border border-gray-300 text-gray-700"
                }`}
                onClick={() => setNewScore(score)}
              >
                
              </button>
            );
          })}
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => handleBackdropClick(false)}
            className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleAddTag}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
    </Modal>
  );
};

export default AddSkillModal;
