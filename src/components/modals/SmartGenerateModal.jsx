import React from "react";
import "./modal.css";
import Modal from "react-bootstrap/Modal";
import { ReactComponent as CloseIcon } from "../../assets/icons/closeModal.svg";
import { useModal } from "../common/ModalProvider";
import { useNavigate } from "react-router-dom";

const SmartGenerateModal = ({ visible, onClose }) => {
  const navigate = useNavigate();
  const { modals, setModalVisibility } = useModal();

  const handleBackdropClick = () => {
    setModalVisibility("animatedModal", true);
    setTimeout(() => {
      setModalVisibility("animatedModal", false);
    }, 200);
  };
  return (
    <Modal
      show={visible}
      onHide={handleBackdropClick}
      dialogClassName={`common-modal ${
        modals?.animatedModal ? "zoom-out" : "zoom-in"
      }`}
      contentClassName="modal-content"
      backdropClassName="custom-backdrop"
    >
      <div className="display-column-24">
        <div className="display-column-8">
          <div className="display-flex-justify align-center">
            <p className="modal-title-text">Smart Generate</p>
            <button onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
          <p className="modal-description-text">
            Upload a document, let AI handle the details.
          </p>
        </div>
        <div className="display-column" style={{ gap: 10, width: "100%" }}>
          <button
            className="smart-generate-btn"
            onClick={() => {
              onClose();
              setModalVisibility("uploadResumeCandidateModalVisible", true);
            }}
          >
            Upload a Resume
          </button>
          <button
            className="smart-generate-btn"
            onClick={() => {
              onClose();
              navigate("/candidate/upload-resume");
            }}
          >
            Upload Multiple Resume
          </button>
          <button
            className="smart-generate-btn"
            onClick={() => {
              onClose();
              navigate("/candidate/upload-resume-csv-json");
            }}
          >
            Upload a Json or CSV file
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SmartGenerateModal;
