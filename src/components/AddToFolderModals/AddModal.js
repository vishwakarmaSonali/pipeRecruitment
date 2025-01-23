import React,{useState} from "react";
import SearchIcon from "../../assets/icons/sourcingIcons/search-normal.svg"
import "./AddModal.css"
import folderIcon from "../../assets/icons/folder.svg"
import FolderAdd from "../../assets/icons/sourcingIcons/folder-add.svg";
import CreateFolderModal from "./CreateFolderModal";

const FolderModal = ({ isOpen, onClose }) => {
    const [createFolderOpen, setCreateFolderOpen] = useState(false);
  const [folders, setFolders] = useState([]); // Initial folders

  // Function to add a new folder
  const handleAddFolder = (newFolder) => {
    setFolders((prevFolders) => [...prevFolders, newFolder]);
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ">
      <div className="bg-white w-[400px]  rounded-[14px] shadow-lg  p-[14px] ">
        <div className="flex justify-between  pb-[20px] ">
          <h2 className="text-l font-medium font-ubuntu">Add to folder</h2>
          <button onClick={onClose} className="text-customBlue hover:text-gray-700">
            ✕
          </button>
        </div>

        <div className="">
        <div className="relative hidden md:flex lg:flex">
            <img src={SearchIcon} alt="Search" className="search-icon" />
            <input
              type="text"
              placeholder="Search"
              className="search-input"
            />
          </div>

          <ul className="space-y-2 mt-[16px] max-h-[250px] overflow-auto font-ubuntu text-m scroll-width-none ">
          {folders.map((folder, index) => (
              <li
                key={index}
                className=" items-center flex gap-[8px] p-[10px] rounded cursor-pointer hover:bg-gray-100"
              >
                <img src={folderIcon} alt="Folder Icon" />
                <text>{folder}</text>
              </li>
            ))}
            
          </ul>

          <button className="mt-4 w-full px-[8px] flex items-center gap-[8px] bg-buttonBlueOpacity text-customBlue font-ubuntu text-m py-2 rounded-[8px]"               onClick={() => setCreateFolderOpen(true)}
          >
          <img src={FolderAdd} alt="Folder Add" className="proifle-action-icon" />
            <text>Create folder</text>
          </button>
        </div>
      </div>
       {/* Create Folder Modal */}
       {createFolderOpen && (
        <CreateFolderModal
          onClose={() => setCreateFolderOpen(false)}
          onAddFolder={handleAddFolder}
        />
      )}
    </div>
  );
};

export default FolderModal;
