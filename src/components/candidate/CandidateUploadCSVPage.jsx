import React, { useRef, useState } from "react";
import "../../pages/Recruitment/Candidates/Candidates.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/Header/Header";
import { ReactComponent as UploadIcon } from "../../assets/icons/uploadIcon.svg";
import { ReactComponent as Upload } from "../../assets/icons/upload.svg";
import { ReactComponent as HistoryIcon } from "../../assets/icons/history.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import { historyResumeData } from "../../helpers/config";
import CommonButton from "../../components/common/CommonButton";
import { useNavigate } from "react-router-dom";
import ResumeHistoryTable from "../../components/candidate/ResumeHistoryTable";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { LineWeight } from "@mui/icons-material";
import Navbar from "../navbar/Navbar";
import HeaderWithActions from "./CandidateHeader";

const CandidateUploadResumeCsvJsonPage = () => {
  const fileInputRef = useRef();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Upload");
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [value, setValue] = React.useState("csv");
  const [uploadStep, setUploadStep] = useState(1);

  const clearData = () => {
    setFiles([]);
  };

  const addFiles = (newFiles) => {
    const maxFiles = 100;
    const maxFileSize = 20 * 1024 * 1024; // 20MB

    if (files.length + newFiles.length > maxFiles) {
      return alert("You can only upload a maximum of 100 JSON files.");
    }

    const jsonFiles = newFiles.filter((file) => file.name.endsWith(".json"));

    if (jsonFiles.length !== newFiles.length) {
      alert("Only JSON files are allowed.");
    }

    const validFiles = jsonFiles.filter((file) => {
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

    const uniqueFiles = validFiles.map((file) => ({
      id: `${Date.now()}-${file.name}`,
      file,
      progress: 0,
    }));

    if (uniqueFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...uniqueFiles]);
    }
  };

  const handleAddFilesCsv = (newFiles) => {
    const maxFiles = 100;
    const maxFileSize = 20 * 1024 * 1024; // 20MB

    const allowedExtensions = [".csv", ".xls", ".xlsx"];

    const csvFiles = newFiles.filter((file) =>
      allowedExtensions.some((ext) => file.name.endsWith(ext))
    );

    if (files.length + newFiles.length > maxFiles) {
      return alert("You can only upload a maximum of 100 JSON files.");
    }

    if (csvFiles.length !== newFiles.length) {
      alert("Only CSV, XLS, and XLSM files are allowed.");
    }

    const validFiles = csvFiles.filter((file) => {
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

    const uniqueFiles = validFiles.map((file) => ({
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

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const renderFirstComponent = () => {
    return (
 <div className="upload-resume-inner-container">
         <div className="upload-resume-inner-container-section1 ">
        <div className="border-2" style={{ gap: 12,border:1 }}>
          <p className="font-16-medium color-dark-black">Select a file format</p>
          <p className="font-14-regular color-grey">
            You can choose a Json or a CVS file to upload.
          </p>
        </div>
        <div>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value="csv"
              control={
                <Radio
                  sx={{
                    color: "#151B23",
                    "&.Mui-checked": {
                      color: "#151B23",
                    },
                  }}
                />
              }
              label="CSV File"
              sx={styles?.label}
            />
            <FormControlLabel
              value="json"
              control={
                <Radio
                  sx={{
                    color: "#151B23",
                    "&.Mui-checked": {
                      color: "#151B23",
                    },
                  }}
                />
              }
              label="JSON File"
              sx={styles?.label}
            />
          </RadioGroup>
        </div>
        <div
          className="display-flex justify-end"
          style={{ gap: 8, paddingBottom: "16px" }}
        >
          <button className="cancel-btn" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <CommonButton
            title={"Procced"}
            btnStyle={{ minWidth: "120px" }}
            onClick={() => setUploadStep(2)}
          />
        </div>
        
      </div>
      <div className="upload-resume-inner-container-section1 " style={{gap:12}}>
      <div className="border-2" style={{ gap: 12,border:1 }}>
        <p className="font-16-medium color-dark-black">Upload files</p>
        <p className="font-14-regular color-grey">
        Drag and drop or select the file you want to upload. You can upload maximum 100 files at a time.
        </p>
      </div>
    
      
    </div>
 </div>
    );
  };

  const renderSecondComponent = () => {
    return (
      <div className="upload-resume-inner-container">
   <div className="border-1 p-[20px] border-green rounded-[10px]">
   <div className="display-column" style={{ gap: 12 }}>
          <p className="font-16-medium color-dark-black">Select a file format</p>
          <p className="font-14-regular color-grey">
            You can choose a Json or a CVS file to upload.
          </p>
        </div>
        <div className="display-column" style={{ gap: 12 }}>
          <div className="file-label">
            {value === "csv" ? "CSV File" : "JSON File"}
          </div>
        </div>
   </div>
        <div className="border p-[20px] rounded-[10px] space-y-[12px]">
        <p className="font-16-medium color-dark-black">Upload files</p>
        <p className="font-14-regular color-grey">
        Drag and drop or select the file you want to upload. You can upload maximum 100 files at a time.
        </p>
              <p className="font-14-regular color-grey flex place-content-end">
                {files?.length} files selected
              </p>
              
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
              value === "csv"
                ? handleAddFilesCsv(droppedFiles)
                : addFiles(droppedFiles);
            }}
          >
            <div
              className={`upload-container ${isDragging && "drag-upload"}`}
              onClick={() => {
                fileInputRef.current.click();
              }}
            >
              <Upload />
              <p className="font-12-regular color-dark-black">
                Select a file to upload or drag and drop it here
              </p>
              <p className="font-12-regular color-grey">
                Supported file types{" "}
                {value === "csv" ? ".xlsx, .xls, .csv " : ".json"} (max 20MB)
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              id="file-input"
              multiple
              accept={value === "csv" ? ".xlsx, .xls, .csv" : ".json"}
              onChange={(e) => {
                const selectedFiles = Array.from(e.target.files);
                console.log("Selected Files:", selectedFiles);
                if (selectedFiles.length > 0) {
                  value === "csv"
                    ? handleAddFilesCsv(selectedFiles)
                    : addFiles(selectedFiles);
                }
                e.target.value = "";
              }}
              hidden
            />
          </div>
          {files?.length > 0 && (
            <div className="display-column" style={{ gap: 10 }}>
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
        {/* <div
          className="display-flex justify-center"
          style={{ gap: 8, paddingBottom: "16px" }}
        >
          <button
            className="cancel-btn"
            onClick={() => {
              clearData();
              setUploadStep(1);
            }}
          >
            Cancel
          </button>
          <CommonButton
            title={"Import"}
            disabled={!(files?.length > 0)}
            btnStyle={{ minWidth: "120px" }}
          />
        </div> */}

      </div>
    );
  };
  const handleCreate = () => {
    console.log("Create button clicked");
    // Add your logic here
  };

  const handleDiscard = () => {
    console.log("Discard button clicked");
    // Add your logic here
  };
  return (
    <div
      className="w-full h-screen overflow-hidden overscroll-none bg-white"
      style={{ boxSizing: "border-box"}}
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
        className="overflow-auto scroll-width-none "
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fff",
        }}
      >
    
        <div className="upload-resume-main-container">
          {activeTab === "Upload" &&
            (uploadStep === 1
              ? renderFirstComponent()
              : renderSecondComponent())}

          {activeTab === "History" && (
            <ResumeHistoryTable data={historyResumeData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateUploadResumeCsvJsonPage;

const styles = {
  label: {
    "& .MuiTypography-root": {
      fontSize: "14px",
      lineHeight: "16.09px",
      fontFamily: "Ubuntu",
      fontWeight: 400,
      color: "#151B23",
    },
  },
};
