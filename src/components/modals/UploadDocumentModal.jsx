import React, { useState, useEffect, useRef } from "react";
import "./modal.css";
import Modal from "react-bootstrap/Modal";
import { useModal } from "../common/ModalProvider";
import { ReactComponent as UploadIcon } from "../../assets/icons/upload.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import CommonButton from "../common/CommonButton";
import CancelButton from "../common/CancelButton";

const UploadDocumentModal = ({
  visible,
  onClose,
  uploadedFiles,
  attachmentData,
}) => {
  const [modalAnimation, setModalAnimation] = useState(false);
  const fileInputRef = useRef();

  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const maxFiles = 10;
  const maxFileSize = 20 * 1024 * 1024;

  const resetData = () => {
    setFiles([]);
    onClose();
  };

  const addFiles = (newFiles) => {
    const allowedExtensions = [
      ".pdf",
      ".doc",
      ".docx",
      ".rtf",
      ".zip",
      ".jpg",
      ".jpeg",
      ".png",
      ".mp4",
      ".avi",
    ];

    const allowFiles = newFiles.filter((file) =>
      allowedExtensions.some((ext) => file.name.endsWith(ext))
    );

    if (files.length + newFiles.length > maxFiles) {
      return alert(`You can only upload a maximum of 10 files.`);
    }

    if (allowFiles.length !== newFiles.length) {
      return alert(
        "Only pdf, doc, docx, rtf, zip, jpg, jpeg, png, mp4 and avi files are allowed."
      );
    }

    const filteredFiles = newFiles.filter((file) => {
      if (file.size > maxFileSize) {
        alert(`${file.name} exceeds the 20MB limit and won't be uploaded.`);
        return false;
      }
      return !files.some(
        (existingFile) =>
          existingFile.file.name === file.name &&
          existingFile.file.size === file.size
      );
    });

    const uniqueFiles = filteredFiles.map((file) => ({
      id: `${Date.now()}-${file.name}`,
      file,
      progress: 0,
    }));

    if (uniqueFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...uniqueFiles]);
    }
  };

  const handleRemoveFile = (fileId) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
  };

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
          <p className="font-16-medium color-dark-black text-center">
            Upload document
          </p>

          <div className="display-column" style={{ gap: 10, width: "100%" }}>
            <div
              className={`upload-label`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => {
                setIsDragging(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                const droppedFiles = Array.from(e.dataTransfer.files);
                addFiles(droppedFiles);
              }}
            >
              <div
                className={`upload-container ${isDragging && "drag-upload"}`}
                onClick={() => {
                  fileInputRef.current.click();
                }}
              >
                <UploadIcon />
                <div className="display-column" style={{ gap: 8 }}>
                  <p className="font-12-regular color-dark-black text-center">
                    Select a file to upload or drag and drop it here
                  </p>
                  <p className="font-12-regular color-grey text-center">
                    Supported file types .pdf, .doc, .docx, .rtf, .zip, .jpg,
                    .jpeg, .png, .mp4, .avi (max 20MB)
                  </p>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                id="file-input"
                multiple
                accept=".pdf, .doc, .docs, .rtf, .zip, .jpg, .jpeg, .png, .mp4, .avi"
                onChange={(e) => {
                  const selectedFiles = Array.from(e.target.files);
                  console.log("Selected Files:", selectedFiles);
                  if (selectedFiles.length > 0) {
                    addFiles(selectedFiles);
                  }
                  e.target.value = "";
                }}
                hidden
              />
            </div>
            <div
              className="display-column"
              style={{ gap: 10, maxHeight: "500px", overflow: "auto" }}
            >
              {files?.map((file) => {
                return (
                  <div key={file?.id} className="uploaded-file-div">
                    <div className="display-column" style={{ gap: 2 }}>
                      {file?.file?.name && (
                        <p className="font-14-regular color-dark-black">
                          {file?.file?.name}
                        </p>
                      )}
                      {!!file?.file?.size && (
                        <p className="font-12-regular color-dark-black">
                          {(file?.file?.size / 1024).toFixed(2)} KB
                        </p>
                      )}
                    </div>
                    <button onClick={() => handleRemoveFile(file.id)}>
                      <DeleteIcon />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="display-flex justify-center" style={{ gap: 8 }}>
            <CancelButton title={"Cancel"} onClick={resetData} />
            <CommonButton
              title={"Add"}
              disabled={files?.length < 1}
              onClick={() => {
                uploadedFiles([...attachmentData, ...files]);
                resetData();
              }}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UploadDocumentModal;
