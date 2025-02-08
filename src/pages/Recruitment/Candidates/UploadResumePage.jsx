import React, { useRef, useState } from "react";
import "./Candidates.css";
import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/Header/Header";
import { ReactComponent as UploadIcon } from "../../../assets/icons/uploadIcon.svg";
import { ReactComponent as Upload } from "../../../assets/icons/upload.svg";
import { ReactComponent as HistoryIcon } from "../../../assets/icons/history.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/icons/delete.svg";
import CommonDropdown from "../../../components/common/CommonDropdown";
import { jobOptions, historyResumeData } from "../../../helpers/config";
import CommonButton from "../../../components/common/CommonButton";
import { useNavigate } from "react-router-dom";
import ResumeHistoryTable from "../../../components/candidate/ResumeHistoryTable";

const uploadResumeInfo = [
  `The filename follows this structure: “Candidate ID + hyphen + text” Example: “123-Jane Doe.pdf” or “456789-Resume.pdf.”`,
  "Files are in PDF, DOC, DOCX, or RTF format.",
  "Candidate IDs exist in your database before uploading.",
  "The candidates associated with the Candidate IDs do not already have resumes linked to their profiles.",
  "Each Candidate ID is unique within the upload batch.",
];

const UploadResumePage = () => {
  const fileInputRef = useRef();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Upload");
  const [jobValue, setJobValue] = useState("");
  const [folderValue, setFolderValue] = useState("");
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const addFiles = (newFiles) => {
    const maxFileSize = 20 * 1024 * 1024;
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

  return (
    <div
      className="w-full h-screen overflow-hidden overscroll-none"
      style={{ boxSizing: "border-box", display: "flex" }}
    >
      <Sidebar />
      <div
        className="overflow-auto scroll-width-none "
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fff",
        }}
      >
        <Header />
        <div className="upload-resume-header">
          <div className="upload-resume-header-btn-div">
            <button
              className={`tab-resume-upload
                ${
                  activeTab === "Upload"
                    ? "active-tab-resume-upload"
                    : "disable-tab-resume-upload"
                }
              `}
              onClick={() => setActiveTab("Upload")}
            >
              <UploadIcon
                fill={activeTab === "Upload" ? "#151B23" : "#797979"}
              />
              Upload
            </button>
            <button
              className={`tab-resume-upload
                ${
                  activeTab === "History"
                    ? "active-tab-resume-upload"
                    : "disable-tab-resume-upload"
                }
              `}
              onClick={() => setActiveTab("History")}
            >
              <HistoryIcon
                stroke={activeTab === "History" ? "#151B23" : "#797979"}
              />
              History
            </button>
          </div>
        </div>
        <div className="upload-resume-main-container">
          {activeTab === "Upload" && (
            <div className="upload-resume-inner-container">
              <div className="display-column" style={{ gap: 12 }}>
                <p className="font-16-medium color-dark-black">
                  Upload resumes
                </p>
                <p className="font-14-regular color-grey">
                  Drag and drop or select resumes to upload. You can upload up
                  to 100 resumes at a time.
                </p>
                <p className="font-14-regular color-grey">
                  The uploaded resumes will be linked to their corresponding
                  candidates. To ensure a successful import, please make sure:
                </p>
                <ul className="resume-indo-list">
                  {uploadResumeInfo?.map((item, index) => {
                    return (
                      <li
                        className="font-14-regular color-grey"
                        key={index + 1}
                      >
                        {item}
                      </li>
                    );
                  })}
                </ul>
                <a className="learn-more-link">Learn More</a>
              </div>
              <div className="display-column" style={{ gap: 12 }}>
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
                {files?.length > 0 && (
                  <div className="display-column" style={{ gap: 10 }}>
                    <p className="font-14-regular color-grey">
                      {files?.length} files selected
                    </p>
                    <div
                      className="display-column"
                      style={{ gap: 10, maxHeight: "400px", overflow: "auto" }}
                    >
                      {files?.map((file) => {
                        return (
                          <div key={file?.id} className="uploaded-file-div">
                            <div className="display-column" style={{ gap: 2 }}>
                              {file?.file?.name && (
                                <p className="modal-description-text color-dark-black">
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
                )}
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
                    className={`upload-container ${
                      isDragging && "drag-upload"
                    }`}
                    onClick={() => {
                      fileInputRef.current.click();
                    }}
                  >
                    <Upload />
                    <p className="font-12-regular color-dark-black">
                      Select a file to upload or drag and drop it here
                    </p>
                    <p className="font-12-regular color-grey">
                      Supported file types .pdf, .doc, .docx, .rtf (max 20MB)
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="file-input"
                    multiple
                    accept=".pdf, .doc, .docs, .rtf"
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
              </div>
              <div
                className="display-flex justify-center"
                style={{ gap: 8, paddingBottom: "16px" }}
              >
                <button className="cancel-btn" onClick={() => navigate(-1)}>
                  Cancel
                </button>
                <CommonButton
                  title={"Import"}
                  disabled={!(files?.length > 0)}
                  btnStyle={{ minWidth: "120px" }}
                />
              </div>
            </div>
          )}

          {activeTab === "History" && (
            <ResumeHistoryTable data={historyResumeData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadResumePage;
