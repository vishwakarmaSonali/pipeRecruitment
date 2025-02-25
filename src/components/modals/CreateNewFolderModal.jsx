import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./modal.css";
import { useModal } from "../common/ModalProvider";
import { ReactComponent as CloseIcon } from "../../assets/icons/closeModal.svg";
import { ReactComponent as Plus } from "../../assets/icons/plus.svg";
import CommonButton from "../common/CommonButton";
import CommonTextInput from "../common/CommonTextInput";
import CommonSearchBox from "../common/CommonSearchBox";
import CommonTextArea from "../common/CommonTextArea";
const companies = [
  {
    name: "UpTech",
    location: "New York, USA",
    color: "bg-blue-600",
    initials: "U",
  },
  {
    name: "WebSolutions",
    location: "Sydney, Australia",
    color: "bg-purple-500",
    initials: "W",
  },
  {
    name: "Spark Solutions",
    location: "New York, USA",
    color: "bg-orange-500",
    initials: "S",
  },
  {
    name: "CodeHive Technologies",
    location: "Delhi, India",
    color: "bg-black",
    initials: "H",
  },
  {
    name: "NordSoft Solutions",
    location: "Copenhagen, Denmark",
    color: "bg-gray-300",
    initials: "N",
  },
];
const CreateNewFolderModal = ({ visible, onClose, addFolder, setTags, tags }) => {
  const { modals, setModalVisibility } = useModal();
  const [searchValue, setSearchValue] = useState("");
  const [selectedCompanies, setSelectedCompanies] = useState([]); // Store selected items
  const [folderTitle, setFolderTitle] = useState("");
  const [folderDescription, setFolderDescription] = useState("");

  // Handle backdrop click
  const handleBackdropClick = () => {
    setModalVisibility("createFolderModalVisible", false);
    onClose();
  };

  // Handle Create Folder
  const handleCreateFolder = () => {
    if (isFormValid) {
      addFolder({
        folder_name: folderTitle,
        candidate_count: 0, // Default 0 candidates
        created_on: new Date().toISOString().split("T")[0], // Today's Date
        created_by: "Admin",
      });
      setFolderTitle("");
      setFolderDescription("");
      onClose();
    }
  };

  // Check if both fields are filled
  const isFormValid =
    folderTitle.trim() !== "" && folderDescription.trim() !== "";

  return (
    <Modal
      show={visible}
      onHide={handleBackdropClick}
      dialogClassName={`common-modal`}
      contentClassName="modal-content"
      backdropClassName="custom-backdrop"
    >
      <div className="fixed inset-0 bg-gray-100 bg-opacity-10 flex justify-center items-center ">
        <div className="bg-white p-[14px] rounded-lg shadow-lg min-w-[400px]">
          <div className="flex items-center justify-between mb-[24px] ">
            <h2 className="text-lg font-semibold ">Share Folder</h2>
            <button onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
          <div className="space-y-[10px]">
            <CommonTextInput
              placeholder="Folder Name"
              value={folderTitle}
              onChange={(e) => setFolderTitle(e.target.value)}
            />
            <CommonTextArea
              placeholder="Description"
              value={folderDescription}
              onChange={(e) => setFolderDescription(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center mt-[24px]">
            
            <CommonButton title={"Create Folder"} disabled={!isFormValid}  onClick={handleCreateFolder} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateNewFolderModal;
