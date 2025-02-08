import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useModal } from "../common/ModalProvider";
import { ReactComponent as CloseIcon } from "../../assets/icons/closeModal.svg";
import CommonButton from "../common/CommonButton";
import CommonTextInput from "../common/CommonTextInput";

const CreateFolderModal = ({ visible, onClose }) => {
  const { modals, setModalVisibility } = useModal();
  const [folderName, setFolderName] = useState("");

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
      dialogClassName={`common-modal`}
      contentClassName="modal-content"
      backdropClassName="custom-backdrop"
    >
      <div
        className={`common-modal-container overflow-visible ${
          modals?.animatedModal && "shake"
        }`}
      >
        <div className="display-column" style={{ gap: 24 }}>
          <div className="display-flex-justify align-center">
            <p className="font-16-medium color-dark-black">Add to Folder</p>
            <button
              onClick={() => {
                setFolderName("");
                onClose();
              }}
            >
              <CloseIcon />
            </button>
          </div>
          <CommonTextInput
            type={"text"}
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder={"folderName"}
          />
          <div className="display-flex justify-center">
            <CommonButton
              title={"Create & Add"}
              disabled={!(folderName?.length > 0)}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateFolderModal;
