import React, { useState,useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setColumns } from "../../store/columnSlice";
import { Button } from "@mui/material";
import { ReactComponent as CloseIcon } from "../../assets/icons/closeModal.svg";
import { useModal } from "../common/ModalProvider";
import { ReactComponent as SearchIcon } from "../../assets/icons/sourcingIcons/search-normal.svg";
import Tick from "../../assets/icons/sourcingIcons/tick.svg";
import MenuIcon from "../../assets/icons/menu.svg"
// DnD Kit
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { candidates } from "../../helpers/dataCandidates";

const columnOptions = [
  "Candidate Name",
  "Candidate First Name",
  "Candidate Last Name",
  "Reference Id",
  "Location",
  "Gender",
  "Diploma",
  "University",
  "Current Company",
  "Current Position",
  "Email",
  "Birthdate",
  "Candidate Address",
  "Employment Status",
  "Contact Number",
  "Hired Date",
  "Start Date",
  "ATS score",
  "Created Date",
  "Created By",
];


  const MergeDuplicateModal = ({ visible, onClose }) => {
    const dispatch = useDispatch();

  
    // ✅ Save Selected & Ordered Columns to Redux
    const handleSave = () => {
    
      onClose();
    };
  
    return (
      <Modal show={visible} onHide={onClose} dialogClassName="common-modal">
        <div className="common-modal-container min-w-[400px]">
          <div className="display-column-26">
            <div className="display-column-8">
              <div className="display-flex-justify align-center mb-[24px]">
                <p className="modal-title-text">Merge Duplicate</p>
                <button onClick={onClose}>
                  <CloseIcon />
                </button>
              </div>
              <span className="font-ubuntu text-m text-customBlue">
              If duplicates are detected in the selected candidates, they will be merged, with the most recently updated candidate set as the primary record. 
              </span>
              <span className="font-ubuntu text-m text-customBlue">
              Candidates without duplicates in the selection will not be affected.
              </span>
            </div>
          </div>
  
     
  
          {/* ✅ Save Button */}
          <div className="modal-footer">
            <button className="px-[14px] py-[10px] max-h-[36px] text-m font-ubuntu rounded-[8px] flex items-center gap-1 min-w-[120px] justify-center bg-buttonBLue text-buttonBLue cursor-pointer" onClick={handleSave}>
              <span className="font-ubuntu text-white text-m">Merge</span>
            </button>
          </div>
        </div>
      </Modal>
    );
  };
  

export default MergeDuplicateModal;
