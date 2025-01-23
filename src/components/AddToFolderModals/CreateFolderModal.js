import React, { useState } from "react";

const CreateFolderModal = ({ onClose, onAddFolder }) => {
        const [folderName, setFolderName] = useState("");
    const handleCreate = () => {
        if (folderName.trim() !== "") {
          onAddFolder(folderName.trim()); // Add new folder to the list
          setFolderName("");
          onClose(); // Close the modal
        }
      };
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[400px] rounded-[14px] shadow-lg  p-[14px] ">
      <div className="flex justify-between  pb-[20px] ">
      <h2 className="text-l font-medium font-ubuntu">Create new folder</h2>
            <button onClick={onClose} className="text-customBlue hover:text-gray-700">
              ✕
            </button>
          </div>
  
          <div className="">
            <input
              type="text"
              placeholder="Folder Name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              className="bg-white w-full mt-1 px-[12px] py-[12px] border max-h-[38px] leading-[14px] border-customGrey1 rounded-[8px] text-sm font-ubuntu text-customBlue placeholder:text-customGray focus:outline-none focus:ring-0"
            />
          </div>
  
          <div className="mt-6 flex justify-center">
          <button
            className={`py-[10px] px-[18px] rounded-[8px] max-h-[36px] flex items-center shadow-md font-ubuntu text-m ${
              folderName.trim() !== "" 
                ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer" 
                : "bg-customGray text-white cursor-not-allowed"
            }`}
            disabled={folderName.trim() === ""}
            onClick={handleCreate}
          >
            Create & Add
          </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default CreateFolderModal;
  