import React, { useState } from "react";
import { ReactComponent as StarFilled } from "../../assets/icons/starfilled.svg";
import { ReactComponent as StarOutlined } from "../../assets/icons/star.svg";
import { ReactComponent as FolderIcon } from "../../assets/icons/folderBlue.svg";
import { ReactComponent as ThreeDots } from "../../assets/icons/threeDots.svg";
import { ReactComponent as AddCandidate } from "../../assets/icons/sourcingIcons/profile-add.svg";
import { ReactComponent as ShareFolder } from "../../assets/icons/share.svg";
import { ReactComponent as ExportIcon } from "../../assets/icons/export.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/candidates/edit-2.svg";

import Tick from "../../assets/icons/sourcingIcons/tick.svg";
import { useNavigate } from "react-router-dom";
import GlobalMenu from "../GlobalMenu/GlobalMenu";

const FavoriteFolders = () => {
  const [starredFolders, setStarredFolders] = useState([1, 5]);
    const [anchorSettingEl, setAnchorSettingEl] = useState(null);
    const openSetting = Boolean(anchorSettingEl);
    const handleSettingsClose = () => {
      setAnchorSettingEl(null);
    };

  
  const navigate = useNavigate();
    const bulkMenuItems = [
      {
        label: "Add candidates",
        icon: <AddCandidate />,
        // onClick: () => setAddToJobsDrawerOpen(true),
      },
      {
        label: "Share Folder",
        icon: <ShareFolder/>,
        // onClick: () => setAddToFolderDrawerOpen(true),
      },
      {
        label: "Export",
        icon: <ExportIcon  stroke="#151B23" />,
        // onClick: () => setChangeOwnershipDrawerOpen(true),
      },
     
      {
        label: "Edit Folder",
        icon: <EditIcon />,
        onClick: () => navigate("/archive-candidates"),
      },
      {
        label: "Delete Folder",
        icon: <DeleteIcon />,
        onClick: () => navigate("/archive-candidates"),
      },
    ];
  const toggleStar = (id) => {
    setStarredFolders((prev) =>
      prev.includes(id) ? prev.filter((folderId) => folderId !== id) : [...prev, id]
    );
  };
  const folders = [
    { id: 1, name: "Front-end developers", candidates: 3, createdBy: "xBoost" },
    { id: 2, name: "UI UX Designers", candidates: 12, createdBy: "Grown" },
    { id: 3, name: "Backend Engineers", candidates: 10, createdBy: "TechPro" },
  ];
  const handleClickSetting = (event) => {
    setAnchorSettingEl(event.currentTarget);
  };

  return (
    <div className="px-3">
      <h2 className="text-lg font-semibold mb-2">Favourites</h2>

      {/* 🔹 Horizontally Scrollable Container */}
      <div className="flex overflow-x-auto  space-x-4 scrollbar-hide py-[10px]">
        {folders.map((folder) => (
          <div
            key={folder.id}
            className="w-64 bg-gray-100 rounded-lg  min-w-[280px] shadow-sm p-[10px] flex flex-col justify-between"
            

          >
            {/* 📁 Folder Icon & Title */}
            <div className="" onClick={() => navigate(`/individual-folder/${folder.id}`, { state: { name: folder.name } })}>
              <FolderIcon className="w-6 h-6 text-blue-500" />
              <span className="font-semibold">{folder.name}</span>
            </div>

            {/* 👤 Candidate Count & Creator */}
            <p className="text-sm text-gray-600 pb-[10px]">{folder.candidates} candidates</p>

            <div className="flex items-center justify-between border-t pt-[10px]" >
              {/* ✅ Checkbox & ⭐ Star Button */}
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border border-gray-400 bg-white rounded-md flex items-center justify-center cursor-pointer">
                  <img src={Tick} alt="Selected" />
                </div>
                <button onClick={() => toggleStar(folder.id)}>
                  {/* {starredFolders.includes(folder.id) ? ( */}
                    <StarFilled className="w-4 h-4 text-yellow-500" />
                  {/* ) : (
                    <StarOutlined className="w-4 h-4 text-gray-400" /> */}
                  {/* )} */}
                </button>
              </div>

              {/* ⋮ More Options */}
              <button className="text-gray-500 hover:text-black" onClick={handleClickSetting}>
                <ThreeDots className="w-[12px] h-[12px]" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <GlobalMenu
        anchorEl={anchorSettingEl}
        open={openSetting}
        onClose={handleSettingsClose}
        menuItems={bulkMenuItems}
      />
    </div>
  );
};

export default FavoriteFolders;
