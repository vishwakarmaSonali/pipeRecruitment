import React, { useState, useEffect } from "react";
import "./modal.css";
import Modal from "react-bootstrap/Modal";
import { ReactComponent as CloseIcon } from "../../assets/icons/closeModal.svg";
import { useModal } from "../common/ModalProvider";
import { jobOptions } from "../../helpers/config";
import CommonDropdown from "../common/CommonDropdown";
import { ReactComponent as UploadIcon } from "../../assets/icons/upload.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import CommonButton from "../common/CommonButton";
import axios from "axios";

const UploadResumeCandidateModal = ({ visible, onClose }) => {
  const { modals, setModalVisibility } = useModal();
  const [modalAnimation, setModalAnimation] = useState(false);
  const [jobValue, setJobValue] = useState("");
  const [folderValue, setFolderValue] = useState("");
  const [file, setFile] = useState(null);
  const [fileDetails, setFileDetails] = useState({ name: "", size: "" });
  const [isDragging, setIsDragging] = useState(false);

  const MAX_FILE_SIZE = 20 * 1024 * 1024;

  const handleDeleteFile = () => {
    setFile(null);
    setFileDetails({
      name: "",
      size: "",
    });
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];

    if (uploadedFile) {
      if (uploadedFile.size > MAX_FILE_SIZE) {
        alert("File size exceeds 20MB. Please select a smaller file.");
        return;
      }

      setFile(uploadedFile);
      setFileDetails({
        name: uploadedFile.name,
        size: uploadedFile.size,
      });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];

    if (droppedFile) {
      if (droppedFile.size > MAX_FILE_SIZE) {
        alert("File size exceeds 20MB. Please select a smaller file.");
        return;
      }

      setFile(droppedFile);
      setFileDetails({
        name: droppedFile.name,
        size: droppedFile.size,
      });
    }
  };
  const handleBackdropClick = () => {
    setModalVisibility("animatedModal", true);
    setTimeout(() => {
      setModalVisibility("animatedModal", false);
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
          modals?.animatedModal && "shake"
        }`}
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
              Select job and/or folder to automatically add the candidate there.
            </p>
          </div>
          <div className="display-column" style={{ gap: 10, width: "100%" }}>
            <CommonDropdown
              options={jobOptions}
              placeholder="Select Job (optional)"
              selectedValue={jobValue}
              onChange={setJobValue}
              optionKey="value"
            />
            <CommonDropdown
              options={jobOptions}
              placeholder="Select Folder (optional)"
              selectedValue={folderValue}
              onChange={setFolderValue}
              optionKey="value"
            />
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {!fileDetails?.name && (
                <label className="upload-label">
                  <input
                    type="file"
                    id="file-input"
                    accept=".pdf, .doc, .docs, .rtf"
                    onChange={handleFileChange}
                    hidden
                  />
                  <div
                    className={`upload-container ${
                      isDragging && "drag-upload"
                    }`}
                  >
                    <UploadIcon />
                    <p className="-ubuntu color-dark-black">
                      Select a file to upload or drag and drop it here
                    </p>
                    <p className="font-12-regular color-grey">
                      Supported file types .pdf, .doc, .docx, .rtf (max 20MB)
                    </p>
                  </div>
                </label>
              )}

              {!!fileDetails?.name && (
                <div className="uploaded-file-div">
                  <div className="display-column" style={{ gap: 2 }}>
                    {fileDetails?.name && (
                      <p className="modal-description-text color-dark-black">
                        {" "}
                        {fileDetails?.name}
                      </p>
                    )}
                    {!!fileDetails?.size && (
                      <p className="font-12-regular color-dark-black">
                        {" "}
                        {(fileDetails?.size / 1024).toFixed(2)} KB
                      </p>
                    )}
                  </div>
                  <button onClick={handleDeleteFile}>
                    <DeleteIcon />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="display-flex justify-center">
            <CommonButton
              title={"Create Candidate"}
              disabled={!fileDetails?.name}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UploadResumeCandidateModal;
