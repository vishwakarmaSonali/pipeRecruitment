import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useModal } from "../common/ModalProvider";
import CommonSearchBox from "../common/CommonSearchBox";
import { ReactComponent as Folder } from "../../assets/icons/folderIcon.svg";
import { ReactComponent as TickCircle } from "../../assets/icons/tick-circle.svg";
import CancelButton from "../common/CancelButton";
import CommonButton from "../common/CommonButton";

const availableFolderData = [
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
];

const AddToFolderModal = ({ visible, onClose, folders }) => {
  const { modals, setModalVisibility } = useModal();
  const [modalAnimation, setModalAnimation] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [folderData, setFolderData] = useState(availableFolderData);

  const [selectedFolderData, setSelectedFolderData] = useState([]);

  const folderHandler = (id) => {
    const updatedData = folderData?.map((item) => {
      if (item?.id === id) {
        return { ...item, selected: !item?.selected };
      } else {
        return { ...item };
      }
    });

    const filterData = updatedData?.filter((item) => item?.selected);
    setSelectedFolderData(filterData);
    setFolderData(updatedData);
  };

  const resetData = () => {
    setFolderData(availableFolderData);
    setSelectedFolderData([]);
    onClose();
  };

  const handleBackdropClick = () => {
    setModalAnimation(true);
    setTimeout(() => {
      setModalAnimation(false);
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
          modalAnimation && "shake"
        }`}
      >
        <div className="display-column" style={{ gap: 24 }}>
          <div className="display-column" style={{ gap: 16 }}>
            <CommonSearchBox
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {folderData?.length > 0 && (
              <div className="display-column" style={{ gap: 10 }}>
                {folderData?.map((item) => {
                  return (
                    <button
                      key={item?.id}
                      className={`folder-list-item ${
                        item?.selected && "selected-item-common-bg"
                      }`}
                      onClick={() => folderHandler(item?.id)}
                    >
                      <Folder />
                      <span
                        className="font-14-regular color-dark-black flex-1"
                        style={{ textAlign: "left" }}
                      >
                        {item?.name}
                      </span>
                      {item?.selected && <TickCircle />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          <div className="display-flex justify-center" style={{ gap: 8 }}>
            <CancelButton title={"Cancel"} onClick={resetData} />
            <CommonButton
              title={"Add"}
              onClick={() => {
                folders(selectedFolderData);
                onClose();
              }}
              disabled={selectedFolderData?.length < 1}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddToFolderModal;
