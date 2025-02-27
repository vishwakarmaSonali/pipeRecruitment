import React, { useState } from "react";
import "../../components/filterModal/FilterModal.css";
import { ReactComponent as CloseIcon } from "../../assets/icons/drawerClose.svg";
import { ReactComponent as FolderIcon } from "../../assets/icons/sourcingIcons/folder-add.svg";
import { ReactComponent as Folder } from "../../assets/icons/folderIcon.svg";
import { Drawer } from "@mui/material";
import CommonSearchBox from "../common/CommonSearchBox";
import CommonButton from "../common/CommonButton";
import { ReactComponent as TickCircle } from "../../assets/icons/tick-circle.svg";
import { useNavigate } from "react-router-dom";

const AddToFolderDrawer = ({ isOpen, onClose, onApply, onReset }) => {
  const navigate = useNavigate()
  const [folderData, setFolderData] = useState([
    { id: 1, name: "Designer", isEditable: false },
    { id: 2, name: "Developer", isEditable: false },
    { id: 3, name: "HR", isEditable: false },
  ]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(null);

  // ✅ Generate Unique "New Folder" Name
  const generateUniqueFolderName = () => {
    let baseName = "New Folder";
    let count = 1;

    // Check if "New Folder" exists, and append a number if needed
    let newName = baseName;
    while (folderData.some((folder) => folder.name === newName)) {
      newName = `${baseName} ${count}`;
      count++;
    }
    return newName;
  };

  // ✅ Create a New Folder
  const handleCreateFolder = () => {
    const newFolderName = generateUniqueFolderName();

    const newFolder = {
      id: Date.now(),
      name: newFolderName,
      isEditable: true, // ✅ Only newly created folders are editable
    };

    setFolderData((prev) => [...prev, newFolder]);
  };

  // ✅ Allow Editing for NEW FOLDERS Only
  const handleEditFolder = (id, value) => {
    setFolderData((prev) =>
      prev.map((folder) =>
        folder.id === id && folder.isEditable
          ? { ...folder, name: value }
          : folder
      )
    );
  };

  // ✅ Stop Editing (Once edited, it becomes non-editable)
  const handleBlur = (id) => {
    setFolderData((prev) =>
      prev.map((folder) =>
        folder.id === id && folder.isEditable
          ? { ...folder, isEditable: false }
          : folder
      )
    );
  };
 // ✅ Handle Folder Selection
 const handleSelectFolder = (id) => {
  setSelectedFolder(selectedFolder === id ? null : id); // Toggle selection
  navigate("/folder-candidates")
};
  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <div role="presentation" className="candidate-details-drawer w-[460px] flex flex-col h-full">
        {/* Header */}
        <div className="py-[20px]  flex justify-between items-center">
          <h2 className="font-24-medium color-dark-black">Add to Folder</h2>
          <button onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        {/* Search & Create Folder */}
        <div className="">
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <CommonSearchBox
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            <CommonButton
              title={"Create Folder"}
              icon={<FolderIcon stroke="#ffffff" />}
              onClick={handleCreateFolder}
            />
          </div>
        </div>

        {/* Folder List (Scrollable) */}
        <div className="flex-1 overflow-auto  mt-4">
          {folderData?.length > 0 && (
            <div className="display-column space-y-2 ">
              {folderData?.map((item) => (
                <div key={item.id} className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition ${
                  selectedFolder === item.id ? "bg-blueBg" : ""
                }`} onClick={() => handleSelectFolder(item.id)}>
                <div className="items-center flex">
                <Folder className="mr-2" />
                  
                  {/* ✅ Editable Input for NEW FOLDERS Only */}
                  {item.isEditable ? (
                    <input
                      type="text"
                      className="border-b border-customGrey1 outline-none bg-transparent text-black px-2 py-2 max-h-[30px]" 
                      value={item.name}
                      autoFocus
                      onChange={(e) => handleEditFolder(item.id, e.target.value)}
                      onBlur={() => handleBlur(item.id)} // Stop editing on blur
                    />
                  ) : (
                    <span className="font-14-regular color-dark-black">
                      {item.name}
                    </span>
                  )}
                  </div>
                    {/* Tick Icon (when selected) */}
                            {selectedFolder === item.id && (
                             <div className="flex items-end">
                               <TickCircle />
                              </div>
                            )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ✅ Fixed Bottom Buttons */}
        <div className=" py-4 bg-white bottom-0">
          <div className="flex justify-between space-x-4">
            <button
              className="w-1/2  text-buttonBLue flex justify-center items-center py-[12px] rounded-[8px] btn-text h-[40px]"
              style={{border:"1px solid #1761D8" }}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="w-1/2 text-white bg-buttonBLue flex justify-center items-center py-[12px] rounded-[8px] btn-text h-[40px]"
              onClick={onClose}
            >
              Save
            </button>
           
           
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default AddToFolderDrawer;
