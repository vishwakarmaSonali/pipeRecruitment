import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./modal.css";
import CommonButton from "../common/CommonButton";
import CommonTextInput from "../common/CommonTextInput";
import CancelButton from "../common/CancelButton";

const AddSkillsModal = ({ visible, onClose, setTags, tags, setSkillValue }) => {
  const [newSkill, setNewSkill] = useState("");
  const [newScore, setNewScore] = useState("");
  const [modalAnimation, setModalAnimation] = useState(false);

  const handleBackdropClick = () => {
    setModalAnimation(true);
    setTimeout(() => {
      setModalAnimation(false);
    }, 600);
  };

  const resetData = () => {
    setNewScore("");
    setNewSkill("");
    onClose();
  };

  const handleAddTag = () => {
    if (newSkill.trim() !== "" && newScore.trim() !== "") {
      if (!!tags) {
        setTags([...tags, { name: newSkill, score: newScore }]);
      }
      setNewSkill("");
      setNewScore("");
      onClose();
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
      <div
        className={`common-modal-container overflow-visible ${
          modalAnimation && "shake"
        }`}
      >
        <div className="display-column" style={{ gap: 24 }}>
          <div className="display-column" style={{ gap: 8 }}>
            <CommonTextInput
              type="text"
              placeholder="Skill Name"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
            />

            <div className="skill-score-container">
              {[...Array(10)].map((_, i) => {
                const score = (i + 1).toString().padStart(2, "0");
                return (
                  <button
                    key={score}
                    className={`skill-score-item-div ${
                      newScore && parseInt(score) <= parseInt(newScore)
                        ? "skilled-skill-bg "
                        : ""
                    }`}
                    onClick={() => setNewScore(score)}
                  ></button>
                );
              })}
            </div>
          </div>

          <div
            className="display-flex"
            style={{ gap: 8, justifyContent: "center" }}
          >
            <CancelButton title={"Cancel"} onClick={resetData} />
            <CommonButton
              title={"Add"}
              onClick={handleAddTag}
              disabled={!newSkill.trim() || !newScore.trim()}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddSkillsModal;
