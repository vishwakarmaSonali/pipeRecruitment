import React, { useState } from "react";
import "./modal.css";
import Modal from "react-bootstrap/Modal";
import { ReactComponent as CloseIcon } from "../../assets/icons/closeModal.svg";
import { ReactComponent as InfoIcon } from "../../assets/icons/infoCircle.svg";
import { useModal } from "../common/ModalProvider";
import { useDispatch, useSelector } from "react-redux";
import { saveFilterAsync } from "../../store/filterSlice"; // Import Redux thunk action


const SaveFiltersModal = ({ visible, onClose,selectedConditions }) => {
    const dispatch = useDispatch();

  const { modals, setModalVisibility } = useModal();
  const [isShared, setIsShared] = useState(false);
  const [filterName, setFilterName] = useState("");

  const { loading, error } = useSelector((state) => state.filters);

  const handleBackdropClick = () => {
    setModalVisibility("animatedModal", true);
    setTimeout(() => {
      setModalVisibility("animatedModal", false);
    }, 200);
  };
  const handleSaveFilter = async () => {
    if (!filterName.trim()) {
      alert("Please enter a filter name!");
      return;
    }

    // Dispatch thunk action to save filter in Redux
    dispatch(saveFilterAsync({ name: filterName, conditions: selectedConditions, shared: isShared }));

    // Reset state
    setFilterName("");
    setIsShared(false);

    // Close the modal
    onClose();
  };
  return (
    <Modal
      show={visible}
      onHide={onClose}
      dialogClassName={`common-modal `}
      contentClassName="modal-content"
      backdropClassName="custom-backdrop"
    >
      <div
        className={`common-modal-container ${modals?.animatedModal && "shake"}`}
      >
        <div className="display-column-24">
          <div className="display-column-8">
            <div className="display-flex-justify align-center">
              <p className="modal-title-text">Save Filter</p>
              <button onClick={onClose}>
                <CloseIcon />
              </button>
            </div>
            <p className="modal-description-text">
              Saved filters help you organize your data by keeping important
              information readily available. These filters can be shared with
              your team to enhance collaboration and streamline workflows.
            </p>
          </div>
          <div>
            <input
              type="text"
              placeholder="Filter Name"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              className="bg-transparent border border-gray-400 outline-none p-[12px] rounded-[8px]  w-full text-sm text-gray-700 placeholder:text-customGray  bg-red-800"
            />
            {/* Toggle switch for sharing */}
            <div className="toggle-container">
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={isShared}
                  onChange={() => setIsShared(!isShared)}
                />
                <span className="slider round"></span>
              </label>
              <span className="share-text">Share with team members</span>
              <InfoIcon className="info-icon" />
            </div>
              {/* Show loading or error messages */}
              {loading && <p>Saving filter...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="flex justify-center mt-[24px] ">
              <button  onClick={handleSaveFilter} className=" px-[14px] py-[10px] max-h-[36px] text-m font-ubuntu rounded-[8px] flex items-center gap-1 min-w-[120px] justify-center  text-white  bg-buttonBLue">
              {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SaveFiltersModal;
