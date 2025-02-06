import React, { useState } from "react";
import "./modal.css";
import Modal from "react-bootstrap/Modal";
import { ReactComponent as CloseIcon } from "../../assets/icons/closeModal.svg";
import { ReactComponent as InfoIcon } from "../../assets/icons/infoCircle.svg";
import { useModal } from "../common/ModalProvider";
import { useDispatch, useSelector } from "react-redux";
import { saveFilterAsync } from "../../store/filterSlice"; // Import Redux thunk action

const SaveFiltersModal = ({ visible, onClose, selectedConditions }) => {
  const dispatch = useDispatch();
  const { modals, setModalVisibility } = useModal();
  
  const [isShared, setIsShared] = useState(false);
  const [filterName, setFilterName] = useState("");
  
  const { loading, error, filters } = useSelector((state) => state.filters); // Get filters from Redux

  // Handle Save Filter
  const handleSaveFilter = async () => {
    if (!filterName.trim()) {
      alert("Please enter a filter name!");
      return;
    }

    // Prevent duplicate filter names
    const isDuplicate = filters?.some((filter) => filter.name.toLowerCase() === filterName.toLowerCase());
    if (isDuplicate) {
      alert("A filter with this name already exists. Please use a different name.");
      return;
    }

    // Dispatch Redux action to save filter
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
      dialogClassName={`common-modal`}
      contentClassName="modal-content"
      backdropClassName="custom-backdrop"
    >
      <div className={`common-modal-container ${modals?.animatedModal && "shake"}`}>
        <div className="display-column-24">
          {/* Header Section */}
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

          {/* Filter Name Input */}
          <div>
            <input
              type="text"
              placeholder="Filter Name"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              className="bg-transparent border border-gray-400 outline-none p-[12px] rounded-[8px] w-full text-sm text-gray-700 placeholder:text-customGray"
            />

            {/* Display Selected Conditions */}
            {selectedConditions.length > 0 && (
              <div className="selected-conditions mt-2">
                <p className="text-sm font-medium text-gray-600">Selected Conditions:</p>
                <ul className="mt-1 bg-gray-100 p-2 rounded-lg text-sm">
                  {selectedConditions?.map((condition, index) => (
                    <li key={index} className="py-1 text-gray-700">- {condition}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Toggle switch for sharing */}
            <div className="toggle-container mt-4">
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
            {loading && <p className="text-blue-500 mt-2">Saving filter...</p>}
            {error && <p className="text-red-500 mt-2">{error}</p>}

            {/* Save Button */}
            <div className="flex justify-center mt-[24px]">
              <button
                onClick={handleSaveFilter}
                className="px-[14px] py-[10px] max-h-[36px] text-m font-ubuntu rounded-[8px] flex items-center gap-1 min-w-[120px] justify-center text-white bg-buttonBLue"
              >
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
