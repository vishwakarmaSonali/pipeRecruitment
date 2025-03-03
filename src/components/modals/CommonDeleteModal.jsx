import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useModal } from "../common/ModalProvider";
import { ReactComponent as CloseIcon } from "../../assets/icons/closeModal.svg";
import CommonSearchBox from "../common/CommonSearchBox";
import { ReactComponent as FolderIcon } from "../../assets/icons/addFolder.svg";
import { ReactComponent as Folder } from "../../assets/icons/folderIcon.svg";
import CancelButton from "../common/CancelButton";
import DeleteButton from "../common/DeleteButton";

const CommonDeleteModal = ({
  visible,
  onClose,
  onClickDelete,
  title,
  description,
  isLoading,
  btnTitle,
}) => {
  const [modalAnimation, setModalAnimation] = useState(false);

  const handleBackdropClick = () => {
    setModalAnimation(true);
    setTimeout(() => {
      setModalAnimation(false);
    }, 600);
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
          <div
            className="display-column"
            style={{ gap: 8, alignItems: "center" }}
          >
            <div className="display-flex-justify align-center">
              <p className="font-16-medium color-dark-black ">{title}</p>
              {/* <button onClick={onClose}>
              <CloseIcon />
            </button> */}
            </div>
            <p className="font-12-regular color-dark-black text-center">
              {description}
            </p>
          </div>
          <div className="display-flex justify-center" style={{ gap: 8 }}>
            <CancelButton
              title={"Cancel"}
              onClick={onClose}
              disabled={isLoading}
            />
            <DeleteButton
              onClick={onClickDelete}
              btnTitle={btnTitle}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CommonDeleteModal;
