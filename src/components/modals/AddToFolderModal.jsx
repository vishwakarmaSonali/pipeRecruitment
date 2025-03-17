import React, { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchSuggestedFolders } from "../../actions/candidateActions";
import CommonSearchBox from "../common/CommonSearchBox";
import { ReactComponent as Folder } from "../../assets/icons/folderIcon.svg";
import { ReactComponent as TickCircle } from "../../assets/icons/tick-circle.svg";
import CancelButton from "../common/CancelButton";
import CommonButton from "../common/CommonButton";

const AddToFolderModal = ({
  visible,
  onClose,
  folders,
  isLoading,
  selectedFolderId,
  setSelectedFolderId,
}) => {
  const dispatch = useDispatch();
  const { folderList } = useSelector((state) => state?.candidates);

  const [modalAnimation, setModalAnimation] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [folderData, setFolderData] = useState(folderList);
  const [selectedFolderData, setSelectedFolderData] = useState([]);

  useEffect(() => {
    setFolderData(folderList);
  }, [folderList]);

  useEffect(() => {
    if (selectedFolderId?.length) {
      const updatedData = folderList?.map((item) => ({
        ...item,
        selected: selectedFolderId?.includes(item?._id),
      }));
      setFolderData(updatedData);
      setSelectedFolderData(updatedData.filter((item) => item.selected));
    }
  }, [selectedFolderId, folderList]);

  const debouncedFetchFolders = useCallback(
    debounce((query) => {
      dispatch(fetchSuggestedFolders(query));
    }, 300),
    [dispatch]
  );

  useEffect(() => {
    debouncedFetchFolders(searchValue);
  }, [searchValue, debouncedFetchFolders]);

  const folderHandler = (id) => {
    let updatedSelectedIds = [...selectedFolderId];

    if (updatedSelectedIds?.includes(id)) {
      updatedSelectedIds = updatedSelectedIds?.filter(
        (folderId) => folderId !== id
      );
    } else {
      updatedSelectedIds?.push(id);
    }

    setSelectedFolderId(updatedSelectedIds);

    const updatedData = folderData.map((item) => ({
      ...item,
      selected: updatedSelectedIds?.includes(item?._id),
    }));

    setSelectedFolderData(updatedData.filter((item) => item?.selected));
    setFolderData(updatedData);
  };

  const resetData = () => {
    setFolderData(folderList);
    setSelectedFolderData([]);
    setSelectedFolderId([]);
    onClose();
  };

  const handleBackdropClick = () => {
    setModalAnimation(true);
    setTimeout(() => setModalAnimation(false), 600);
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
            {folderData?.length > 0 ? (
              <div className="display-column" style={{ gap: 10 }}>
                {folderData?.map((item) => (
                  <button
                    key={item?._id}
                    className={`folder-list-item ${
                      item?.selected && "selected-item-common-bg"
                    }`}
                    onClick={() => folderHandler(item?._id)}
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
                ))}
              </div>
            ) : (
              <div>
                <p className="font-16-regular color-grey text-center">
                  Data not found
                </p>
              </div>
            )}
          </div>
          <div className="display-flex justify-center" style={{ gap: 8 }}>
            <CancelButton title="Cancel" onClick={resetData} />
            <CommonButton
              title="Add"
              onClick={() => folders(selectedFolderData)}
              disabled={selectedFolderData?.length < 1}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddToFolderModal;
