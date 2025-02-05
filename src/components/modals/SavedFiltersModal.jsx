import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./modal.css";
import { ReactComponent as CloseIcon } from "../../assets/icons/closeModal.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/sourcingIcons/search-normal.svg";
import { ReactComponent as ThreeDots } from "../../assets/icons/threeDots.svg";
import { ReactComponent as StarFilled } from "../../assets/icons/starfilledYellow.svg";
import { ReactComponent as StarOutline } from "../../assets/icons/starOutline.svg";
import { ReactComponent as InfoIcon } from "../../assets/icons/infoCircle.svg";
import { Menu, MenuItem, Typography, Button } from "@mui/material";

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
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // 🔍 Filter items based on search
  const filterItems = (items) =>
    items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Open menu at the clicked item's position
  const handleMenuOpen = (event, filter) => {
    setMenuAnchor(event.currentTarget);
    setSelectedFilter(filter);
  };

  // Close the menu
  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedFilter(null);
  };

  // Open delete confirmation modal
  const handleDeleteClick = () => {
    setShowDeleteModal(true);
    handleMenuClose();
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    console.log("Deleting filter:", selectedFilter);
    setShowDeleteModal(false);
    // 🔴 Here you can add actual deletion logic (e.g., API call)
  };

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
          <p className="modal-title-text font-semibold">Saved Filters</p>
          <button onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        {/* Search Bar */}
        <div className="search-box flex items-center p-[10px] bg-customGrey1 rounded-[8px] my-3">
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
        <div className="filters-section border-b">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-customBlue">Favourite</p>
            <InfoIcon />
          </div>
          <div className="mt-2 mb-[8px]">
            {filterItems(savedFilters.favourite).map((filter) => (
              <div
                key={filter.id}
                className="filter-item flex items-center justify-between py-[13px] rounded-md cursor-pointer relative"
              >
                <div className="flex items-center gap-2">
                  <StarFilled className="text-yellow-500" />
                  <span className="text-sm text-gray-800">{filter.name}</span>
                </div>
                <button onClick={(e) => handleMenuOpen(e, filter)}>
                  <ThreeDots />
                </button>
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
                className="filter-item flex items-center justify-between py-[13px] rounded-md cursor-pointer relative"
              >
                <div className="flex items-center gap-2">
                  <StarOutline className="text-gray-400" />
                  <span className="text-sm text-gray-800">{filter.name}</span>
                </div>
                <button onClick={(e) => handleMenuOpen(e, filter)}>
                  <ThreeDots />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* MUI Dropdown Menu */}
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          PaperProps={{
            sx: {
              borderRadius: "12px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              width: "120px",
              padding: "5px 0",
              marginTop: "5px",
            },
          }}
        >
          <MenuItem onClick={handleMenuClose}>
            <span className="text-sm text-customBlue font-ubuntu">Edit filter</span>
          </MenuItem>
          <MenuItem onClick={handleDeleteClick} >
            <span className="text-sm text-customBlue font-ubuntu">Delete filter</span>
          </MenuItem>
        </Menu>

        {/* Delete Confirmation Modal */}
        <Modal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          dialogClassName="delete-modal  flex items-center  justify-center "
          centered
          className="delete-modal-backdrop"
        >
          <div className="delete-modal-container items-center bg-white min-w-[400px] p-[14px] rounded-[8px]">
            <h3 className="text-lg font-semibold text-gray-900 text-center">
              Delete Filter
            </h3>
            <p className="text-sm text-gray-600 mt-2 text-center">
              Are you sure you want to delete this filter?
            </p>

            {/* Buttons */}
            <div className="flex justify-center gap-3 mt-4 text-center">
            <button
                className={`buttons border border-blue-600 text-buttonBLue cursor-pointer `}
                 onClick={() => setShowDeleteModal(false)}
                // disabled={conditions.length > 0}
              >
               Cancel
              </button>
              <button
                className={`buttons bg-red text-white cursor-pointer `}
                 onClick={() => setShowDeleteModal(false)}
                // disabled={conditions.length > 0}
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </Modal>
  );
};

export default SavedFiltersModal;
