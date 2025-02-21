import React, { useState } from "react";
// import { ReactComponent as TrashIcon } from "../../assets/icons/trash.svg"; // Replace with actual trash icon path
import { ReactComponent as ExportIcon } from "../../assets/icons/exportIcon.svg";

const FileUpload = ({ onFilesUpdate }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    handleFiles(files);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const validFiles = files.filter(validateFile);
    if (validFiles.length) {
      const newFileList = [...uploadedFiles, ...validFiles];
      setUploadedFiles(newFileList);
      onFilesUpdate && onFilesUpdate(newFileList);
    }
  };

  const validateFile = (file) => {
    const allowedTypes = ["application/pdf", "application/msword"];
    const maxSize = 20 * 1024 * 1024; // 20MB

    if (!allowedTypes.includes(file.type)) {
      alert("Only .pdf and .doc files are allowed.");
      return false;
    }
    if (file.size > maxSize) {
      alert("File size should not exceed 20MB.");
      return false;
    }
    return true;
  };

  const handleDeleteFile = (index) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(updatedFiles);
    onFilesUpdate && onFilesUpdate(updatedFiles);
  };

  return (
    <div className="w-full max-w-3xl">
      {/* Upload Box */}
      <div
        className="border-2 border-dashed border-gray-400 rounded-lg p-6 flex flex-col items-center justify-center w-full cursor-pointer text-center hover:border-gray-600"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="text-gray-500 text-xl mb-2 gap-[8px]">
            <ExportIcon className="w-[26px] h-[26px]"/>
        </div>
        <p className="font-ubuntu text-sm text-customBlue">Select a file to upload or drag and drop it here</p>
        <p className="font-ubuntu text-sm text-customGray mt-[6px]">
          Supported file type .pdf or .doc (max 20MB)
        </p>
        <input
          type="file"
          accept=".pdf,.doc"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="fileUpload"
        />
        <label htmlFor="fileUpload" className="cursor-pointer w-full h-full absolute top-0 left-0 opacity-0"></label>
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="mt-4">
          {uploadedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between border border-purple-400 p-2 rounded-lg bg-white mt-2"
            >
              <div className="flex flex-col">
                <span className="text-black font-medium">{file.name}</span>
                <span className="text-gray-500 text-sm">{(file.size / 1024).toFixed(2)} KB</span>
              </div>
              <button onClick={() => handleDeleteFile(index)}>
                {/* <TrashIcon className="w-6 h-6 text-red-500 cursor-pointer" /> */}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
