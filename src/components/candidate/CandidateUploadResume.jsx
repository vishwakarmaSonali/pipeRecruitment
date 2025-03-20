import React, { useState,useRef } from "react";
import Navbar from "../navbar/Navbar";
import HeaderWithActions from "./CandidateHeader";
import CommonDropdown from "../common/CommonDropdown";
import "../../pages/Recruitment/Candidates/Candidates.css";

import FileUpload from "./UploadResumeFile";
import { ReactComponent as UploadIcon } from "../../assets/icons/uploadIcon.svg";
import { ReactComponent as Upload } from "../../assets/icons/upload.svg";
import { ReactComponent as HistoryIcon } from "../../assets/icons/history.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import { jobOptions, historyResumeData } from "../../helpers/config";
import CommonButton from "../../components/common/CommonButton";
import { useNavigate } from "react-router-dom";
import ResumeHistoryTable from "../../components/candidate/ResumeHistoryTable";
import TitleSearchDropdown from "../AutocompleteDropdowns/TitleSearchDropDown";
import { useDispatch } from "react-redux";
import { extractResume } from "../../actions/candidateActions";
const CreateCandidateUploadResume = () => {
    const fileInputRef = useRef();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("Upload");
    const [jobValue, setJobValue] = useState("");
    const [folderValue, setFolderValue] = useState("");
    const [files, setFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

      const [selectedTitles, setSelectedTitles] = useState([]); // Ensure it's an array


  const handleDiscard = () => {
    console.log("Discard button clicked");
    // Add your logic here
  };
  
  const handleFileSelect = (file) => {
    console.log("Selected File:", file);
  };
  const handleRemoveFile = (fileId) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
  };
  const addFiles = (newFiles) => {
    const maxFiles = 100;
    const maxFileSize = 20 * 1024 * 1024; // 20MB
    const allowedExtensions = [".pdf", ".doc", ".docx"];
  
    // Validate file extensions
    const validFiles = newFiles.filter((file) =>
      allowedExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))
    );
  
    if (validFiles.length !== newFiles.length) {
      alert("Only PDF, DOC, and DOCX files are allowed.");
    }
  
    // Prevent exceeding max file limit
    if (files.length + validFiles.length > maxFiles) {
      return alert("You can only upload a maximum of 100 files.");
    }
  
    // Validate file size and check for duplicates
    const filteredFiles = validFiles.filter((file) => {
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
  
    // Create unique file objects
    const uniqueFiles = filteredFiles.map((file) => ({
      id: `${Date.now()}-${file.name}`,
      file, // ✅ Ensure actual file object is stored
      progress: 0,
    }));
  
    // Add new files to the state
    if (uniqueFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...uniqueFiles]);
    }
  };
  
  const handleCreate = async () => {
    if (files.length === 0) {
      alert("Please upload at least one resume.");
      return;
    }
  
    console.log("📂 Uploading Resumes...");
  
    for (const fileObj of files) {
      if (fileObj?.file instanceof File) {
        console.log("✅ File is valid:", fileObj.file);
        console.log("🔍 File Name:", fileObj.file.name);
        console.log("📏 File Size:", fileObj.file.size);
        console.log("📝 File Type:", fileObj.file.type);
        await dispatch(extractResume(fileObj.file));  // Call API
      } else {
        console.error("❌ Invalid file object:", fileObj);
      }
    }
  
    alert("✅ Resumes uploaded successfully!");
  };
  
  
  return (
    <div
      className="w-full h-screen bg-white overflow-hidden overscroll-none"
      style={{ boxSizing: "border-box" }}
    >
      <Navbar />
      <HeaderWithActions
        title="Create Candidate"
        primaryButtonText="Create"
        secondaryButtonText="Discard"
        onPrimaryClick={handleCreate}
        onSecondaryClick={handleDiscard}
      />
      <div
        className="overflow-auto flex-grow h-[calc(100vh-80px)] bg-grey-90 place-items-center"
        style={{ flex: 1, display: "flex", flexDirection: "column" }}
      >
        <div className="resumeContainers mt-[16px]">
          {/* Title & Subtitle */}
          <div className="space-y-[12px] mb-[20px]">
            <h2 className="text-l text-customBlue font-ubuntu font-medium">
              Select job or folder
            </h2>
            <p className="text-m  text-customGray font-ubuntu">
              Select job and/or folder to automatically add the candidate there.
            </p>
          </div>

          {/* Dropdowns */}
          <div className="space-y-3">
            {/* <CommonDropdown placeholder={"Select Job (optional)"} /> */}
            <TitleSearchDropdown
                    placeholder={"Select Job (optional)"}
                    selectedTitles={selectedTitles}
                    setSelectedTitles={setSelectedTitles}
                    allowMultiple={false}
                    showIcon={true}
                  />
            <CommonDropdown placeholder={"Select Folder (optional)"} options={[]} />
          </div>
        </div>
        <div className="resumeContainers mt-[12px]">
          {/* Title & Subtitle */}
        
          <div className="space-y-[12px] mb-[12px]">
            <h2 className="text-l text-customBlue font-ubuntu font-medium">
              Upload files
            </h2>
            <p className="text-m  text-customGray font-ubuntu">
              Drag and drop or select the file you want to upload. You can
              upload maximum 100 files at a time.
            </p>
          </div>
          {files?.length > 0 && (
                  <div className="display-column my-[12px]" style={{  alignItems:"self-end" }}>
                    <p className="font-14-regular color-grey">
                      {files?.length} files selected
                    </p>
                    </div>)}
          <div>
     
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
                {files?.length > 0 && (
                  <div className="display-column" style={{ gap: 10, marginTop:10 }}>
                   
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCandidateUploadResume;
