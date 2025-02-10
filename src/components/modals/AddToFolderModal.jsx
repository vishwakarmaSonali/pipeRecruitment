import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useModal } from "../common/ModalProvider";
import { ReactComponent as CloseIcon } from "../../assets/icons/closeModal.svg";
import CommonSearchBox from "../common/CommonSearchBox";
import { ReactComponent as FolderIcon } from "../../assets/icons/addFolder.svg";
import { ReactComponent as Folder } from "../../assets/icons/folderIcon.svg";

const AddToFolderModal = ({ visible, onClose }) => {
  const { modals, setModalVisibility } = useModal();
  const [searchValue, setSearchValue] = useState("");

  const [folderData, setFolderData] = useState([
    {
      id: 1,
      name: "Designer",
    },
    {
      id: 2,
      name: "Developer",
    },
    {
      id: 3,
      name: "HR",
    },
  ]);

  const handleBackdropClick = () => {
    setModalVisibility("animatedModal", true);
    setTimeout(() => {
      setModalVisibility("animatedModal", false);
    }, 600);
  };
  return (
    <Modal
      show={visible}
      onHide={handleBackdropClick}
      dialogClassName={`common-modal`}
      contentClassName="modal-content"
      backdropClassName="custom-backdrop"
    >
      <div
        className={`common-modal-container overflow-visible ${
          modals?.animatedModal && "shake"
        }`}
      >
        <div className="display-column" style={{ gap: 24 }}>
          <div className="display-flex-justify align-center">
            <p className="font-16-medium color-dark-black">Add to Folder</p>
            <button onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
          <CommonSearchBox
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {folderData?.length > 0 && (
            <div className="display-column" style={{ gap: 10 }}>
              {folderData?.map((item) => {
                return (
                  <button key={item?.id} className="folder-list-item">
                    <Folder />
                    <span className="font-14-regular color-dark-black">
                      {item?.name}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
          <button
            className="create-folder-btn"
            onClick={() => {
              onClose();
              setModalVisibility("createFolderModalVisible", true);
            }}
          >
            <FolderIcon />
            <span className="font-14-regular color-dark-black">
              Create folder
            </span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddToFolderModal;
