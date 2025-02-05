import React from "react";
import "./modal.css";
import Modal from "react-bootstrap/Modal";
import { ReactComponent as CloseIcon } from "../../assets/icons/closeModal.svg";
import { ReactComponent as FormIcon } from "../../assets/icons/form.svg";
import { ReactComponent as PenIcon } from "../../assets/icons/magicpen.svg";
import { useModal } from "../common/ModalProvider";

const CreateCandidateModal = ({ visible, onClose }) => {
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
      dialogClassName={`common-modal `}
      contentClassName="modal-content"
      backdropClassName="custom-backdrop"
    >
      <div
        className={`common-modal-container ${modals?.animatedModal && "shake"}`}
      >
        <div className="display-column-24">
          <div className="display-column-8">
            <div className="display-flex-justify align-center">
              <p className="modal-title-text">Create Candidate</p>
              <button onClick={onClose}>
                <CloseIcon />
              </button>
            </div>
            <p className="modal-description-text">
              Adding candidates enables you to input their details, attach
              resumes to their profiles, assign them to jobs, and manage various
              other actions effortlessly.
            </p>
          </div>
          <div className="display-flex" style={{ gap: 10 }}>
            <button
              className="fill-form-btn"
              onClick={() => {
                onClose();
                setModalVisibility("createCandidateFormModalVisible", true);
              }}
            >
              <FormIcon className="form-icon" />
              <span className="modal-description-text ">Fill Form</span>
            </button>
            <button
              className="fill-form-btn"
              onClick={() => {
                onClose();
                setModalVisibility("smartGenerateModalVisible", true);
              }}
            >
              <PenIcon className="form-icon" />
              <span className="modal-description-text ">Smart Generate</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateCandidateModal;
