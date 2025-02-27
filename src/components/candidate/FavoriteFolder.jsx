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
import AddCandidatesToFolder from "../modals/AddCandidatesToFolder";
import ShareFolderModal from "../modals/ShareFolderModal";
import { useModal } from "../common/ModalProvider";
import CommonDeleteModal from "../modals/CommonDeleteModal";

const FavoriteFolders = () => {
    const { modals, setModalVisibility } = useModal();
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
         onClick: () => (setModalVisibility("AddCandidatesToFolderVisible", true),handleSettingsClose()),
       },
       {
         label: "Share Folder",
         icon: <ShareFolder />,
         onClick: () => (setModalVisibility("ShareFolderModalVisible", true),handleSettingsClose()),
       },
      {
        label: "Export",
        icon: <ExportIcon  stroke="#151B23" />,
        // onClick: () => setChangeOwnershipDrawerOpen(true),
      },
     
      {
        label: "Edit Folder",
        icon: <EditIcon />,
        onClick: () => (navigate("/archive-candidates"),handleSettingsClose()),
      },
      {
        label: "Delete Folder",
        icon: <DeleteIcon />,
        onClick: () => (setModalVisibility("categoryDeleteModalVisible", true),handleSettingsClose()),
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
  const deleteCategory = () => {
    setModalVisibility("categoryDeleteModalVisible", false);
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
                <div className="w-5 h-5  rounded-[6px] flex items-center justify-center cursor-pointer"  style={{border:"1px solid #151B23"}}>
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
       <AddCandidatesToFolder
        visible={modals?.AddCandidatesToFolderVisible}
        onClose={() =>
          setModalVisibility("AddCandidatesToFolderVisible", false)
        }
      />
      <ShareFolderModal
        visible={modals?.ShareFolderModalVisible}
        onClose={() => setModalVisibility("ShareFolderModalVisible", false)}
      />
        <CommonDeleteModal
        visible={modals?.categoryDeleteModalVisible}
        title={"Delete Folder"}
        description={"Are you sure you want to delete this folder?"}
        onClose={() => {
          setModalVisibility("categoryDeleteModalVisible", false);
          // setSelectedItem(null);
        }}
        onClickDelete={deleteCategory}
      />
    </div>
  );
};

export default FavoriteFolders;
