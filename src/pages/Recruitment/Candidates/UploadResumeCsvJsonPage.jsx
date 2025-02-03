import React, { useRef, useState } from "react";
import "./Candidates.css";
import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/Header/Header";
import { ReactComponent as UploadIcon } from "../../../assets/icons/uploadIcon.svg";
import { ReactComponent as Upload } from "../../../assets/icons/upload.svg";
import { ReactComponent as HistoryIcon } from "../../../assets/icons/history.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/icons/delete.svg";
import { historyResumeData } from "../../../helpers/config";
import CommonButton from "../../../components/common/CommonButton";
import { useNavigate } from "react-router-dom";
import ResumeHistoryTable from "../../../components/candidate/ResumeHistoryTable";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { LineWeight } from "@mui/icons-material";

const UploadResumeCsvJsonPage = () => {
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
        <div className="display-column" style={{ gap: 12 }}>
          <p className="font-16-medium color-dark-black">Upload resumes</p>
          <p className="font-14-regular color-grey">
            You can choose a Json or a CVS file to upload. Drag and drop or
            select the file you want to upload. You can upload maximum 100 files
            at a time.
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
          className="display-flex justify-center"
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
    );
  };

  const renderSecondComponent = () => {
    return (
      <div className="upload-resume-inner-container">
        <div className="display-column" style={{ gap: 12 }}>
          <p className="font-16-medium color-dark-black">Upload resumes</p>
          <p className="font-14-regular color-grey">
            You can choose a Json or a CVS file to upload. Drag and drop or
            select the file you want to upload. You can upload maximum 100 files
            at a time.
          </p>
        </div>
        <div className="display-column" style={{ gap: 12 }}>
          <div className="file-label">
            {value === "csv" ? "CSV File" : "JSON File"}
          </div>
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
                          <p className="font-12-ubuntu color-dark-black">
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
              <p className="font-12-ubuntu color-dark-black">
                Select a file to upload or drag and drop it here
              </p>
              <p className="font-12-ubuntu color-grey">
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
        </div>
        <div
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
        </div>
      </div>
    );
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

export default UploadResumeCsvJsonPage;

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
