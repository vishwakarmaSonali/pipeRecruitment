import React, { useState } from "react";
import "../../components/filterModal/FilterModal.css";
import { ReactComponent as CloseIcon } from "../../assets/icons/drawerClose.svg";
import { ReactComponent as FolderIcon } from "../../assets/icons/sourcingIcons/folder-add.svg";
import { ReactComponent as Folder } from "../../assets/icons/folderIcon.svg";
import { ReactComponent as TickCircle } from "../../assets/icons/tick-circle.svg";
import { Drawer } from "@mui/material";
import CommonSearchBox from "../common/CommonSearchBox";
import CommonButton from "../common/CommonButton";

const ChangeOwnershipDrawer = ({ isOpen, onClose, onApply, onReset }) => {
    const initialUsers = [
        { id: 1, name: "Julien", avatar: "J", isOwner: false },
        { id: 2, name: "xBoost", avatar: "X", isOwner: false },
        { id: 3, name: "Olivia Carter", avatar: "O", isOwner: true }, // Initial Owner
        { id: 4, name: "Kate", avatar: "K", isOwner: false },
        { id: 5, name: "Xia Recruiters", avatar: "X", isOwner: false },
        { id: 6, name: "Upside", avatar: "U", isOwner: false },
        { id: 7, name: "Grown", avatar: "G", isOwner: false },
        { id: 8, name: "Riya", avatar: "R", isOwner: false },
        { id: 9, name: "FindAnywhere", avatar: "F", isOwner: false },
        { id: 10, name: "Aaron", avatar: "A", isOwner: false },
        { id: 11, name: "Tim", avatar: "T", isOwner: false },
      ];
    
      const [users, setUsers] = useState(initialUsers);
      const [searchValue, setSearchValue] = useState("");
      const [selectedUser, setSelectedUser] = useState(null);
  const handleSelect = (user) => {
    if (!user.isOwner) {
      setSelectedUser(selectedUser === user.id ? null : user.id);
    }
  };
  const handleSave = () => {
    if (!selectedUser) return;

    // Update ownership in the users array
    const updatedUsers = users.map((user) => ({
      ...user,
      isOwner: user.id === selectedUser, // Set selected user as owner, reset others
    }));

    setUsers(updatedUsers);
    setSelectedUser(null); // Reset selection after saving
    // onApply(updatedUsers); // Pass updated users back to parent if needed
    onClose(); // Close drawer
  };
  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <div role="presentation" className="candidate-details-drawer w-[460px] flex flex-col h-full">
        {/* Header */}
        <div className="py-[20px]  flex justify-between items-center">
          <h2 className="font-24-medium color-dark-black">Change Ownership</h2>
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
          </div>
        </div>

        {/* Folder List (Scrollable) */}
        <div className="flex-1 overflow-auto  mt-4">
        {/* <div className="w-[320px] bg-white shadow-md rounded-lg p-4"> */}
      {users.map((user) => (
        <div
          key={user.id}
          className={`flex items-center justify-between px-1 py-2 rounded-md cursor-pointer ${
            user.isOwner ? "cursor-not-allowed " : ""
          } ${
            selectedUser === user.id ? "bg-blueBg" : ""
          }`}
          onClick={() => handleSelect(user)}
        >
          <div className="flex items-center gap-3">
            {/* Profile Image / Avatar */}
            {user.image ? (
              <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full" />
            ) : (
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blueBg text-white text-sm font-medium">
                {user.avatar}
              </div>
            )}

            {/* User Name */}
            <span className="text-gray-900 font-medium">{user.name}</span>
          </div>

          {/* Owner Badge */}
          {user.isOwner && (
            <span className="px-2 py-1 bg-blueBg text-xs text-buttonBLue rounded-[100px]">Owner</span>
          )}

          {/* Tick Icon (when selected) */}
          {selectedUser === user.id && (
            <TickCircle />
          )}
        </div>
      ))}
      
    {/* </div> */}
        </div>

        {/* ✅ Fixed Bottom Buttons */}
        <div className=" py-4 bg-white bottom-0">
          <div className="flex justify-between space-x-4">
            <button
              className="w-1/2 border border-buttonBLue text-buttonBLue flex justify-center items-center py-[12px] rounded-[8px] btn-text h-[40px]"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
                className={`w-1/2 text-white  flex justify-center items-center py-[12px] rounded-[8px] btn-text h-[40px] ${
                    selectedUser ? "bg-buttonBLue" : " bg-customGray cursor-not-allowed"
                  }`}
          onClick={handleSave}
          disabled={!selectedUser}
>
              Save
            </button>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default ChangeOwnershipDrawer;
