import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./modal.css";
import { ReactComponent as CloseIcon } from "../../assets/icons/closeModal.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/sourcingIcons/search-normal.svg";
import { useModal } from "../common/ModalProvider";
import { ReactComponent as ThreeDots } from "../../assets/icons/threeDots.svg";
import { ReactComponent as StarFilled } from "../../assets/icons/starfilledYellow.svg";
import { ReactComponent as StarOutline } from "../../assets/icons/starOutline.svg";
import { ReactComponent as InfoIcon } from "../../assets/icons/infoCircle.svg";

const savedFilters = {
  favourite: [
    { id: 1, name: "Candidates without jobs" },
    { id: 2, name: "Duplicates" },
  ],
  createdByMe: [
    { id: 3, name: "Applied" },
    { id: 4, name: "Sourced" },
    { id: 5, name: "Owned by me" },
  ],
};

const SavedFiltersModal = ({ visible, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // 🔍 Filter items based on search
  const filterItems = (items) =>
    items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <Modal
      show={visible}
      onHide={onClose}
      dialogClassName="common-modal"
      contentClassName="modal-content"
      backdropClassName="custom-backdrop"
    >
      <div className="common-modal-container">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <p className="modal-title-text  font-semibold">Saved Filters</p>
          <button onClick={onClose} className="">
            <CloseIcon />
          </button>
        </div>

        {/* Search Bar */}
        <div className="search-box flex items-center p-[10px] bg-customGrey1 rounded-[8px]  my-3">
          <SearchIcon className="mr-2" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none border-none w-full text-sm text-gray-700 placeholder:text-gray-400"
          />
        </div>

        {/* Favourite Filters */}
        <div className="filters-section border-b ">
        <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-customBlue">Favourite</p>
        <InfoIcon />
        </div>
          <div className="mt-2 mb-[8px]">
            {filterItems(savedFilters.favourite).map((filter) => (
              <div
                key={filter.id}
                className="filter-item flex items-center justify-between py-[13px] rounded-md cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <StarFilled className="text-yellow-500" />
                  <span className="text-sm text-gray-800">{filter.name}</span>

                </div>
                <ThreeDots height={"12px"} width={"12px"}/>
              </div>
            ))}
          </div>
        </div>

        {/* Created by Me Filters */}
        <div className="filters-section mt-3">
        <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-customBlue">Created by me</p>
        <InfoIcon />
        </div>
          <div className="mt-2">
            {filterItems(savedFilters.createdByMe).map((filter) => (
              <div
                key={filter.id}
                className="filter-item flex items-center justify-between py-[13px] rounded-md cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <StarOutline className="text-gray-400" />
                  <span className="text-sm text-gray-800">{filter.name}</span>
                </div>
                <ThreeDots />
              </div>
            ))}
          </div>
        </div>

        {/* Footer Section (if needed) */}
      </div>
      
    </Modal>
  );
};

export default SavedFiltersModal;
