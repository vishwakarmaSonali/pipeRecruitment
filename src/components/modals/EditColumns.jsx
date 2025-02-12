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

// 🏗️ Draggable Item Component
const DraggableItem = ({ column, removeColumn }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: column });
  
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      
    //   padding: "10px",
      marginBottom: "8px",
      background: "#fff",
      borderRadius: "8px",
      cursor: "grab",
      border: "1px solid #ddd",
    };
  
    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="font-ubuntu text-m text-customBlue gap-[8px] px-[12px] py-[12px] max-h-[40px]"  >
        <span style={{ cursor: "grab"  }} >
            <img src={MenuIcon} alt="menu"/> 
            </span> {column}
        <button
          className="remove-btn text-customBlue"
          onClick={(e) => {
            e.preventDefault(); // ✅ Prevents default behavior
            e.stopPropagation(); // ✅ Prevents drag interference
            removeColumn(column);
          }}
          onTouchStart={(e) => {
            // e.preventDefault(); // ✅ Ensures touch events work properly
            // e.stopPropagation(); // ✅ Prevents unintended drag movement
            removeColumn(column);
          }}
        >
        <CloseIcon height={"14px"} width={"14px"}/>
        </button>
      </div>
    );
  };
  

  const EditColumnModal = ({ visible, onClose }) => {
    const dispatch = useDispatch();
    const selectedColumns = useSelector((state) => state.columns.selected);
    const [searchQuery, setSearchQuery] = useState("");
    const [checkedColumns, setCheckedColumns] = useState([...selectedColumns]);
  
    // Generate column options dynamically from candidates object
    const formatColumnName = (key) => {
      return key
        .replace(/_/g, " ") // Replace underscores with spaces
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize words
    };
    const columnOptions = Object.keys(candidates[0]).map(formatColumnName);
  
    // 🔍 Filter Columns based on search
    const filteredColumns = columnOptions.filter((column) =>
      column.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    // ✅ Right Side - Only show checked columns (for dragging)
    const reorderedColumns = checkedColumns;
  
    // ✅ Handle Checkbox Change (Move Between Lists)
    const handleCheckboxChange = (column) => {
      setCheckedColumns((prev) => {
        const newChecked = prev.includes(column)
          ? prev.filter((c) => c !== column) // Remove if unchecked
          : [...prev, column]; // Add if checked
        return newChecked;
      });
    };
  
    // 🔃 Handle Drag & Drop for Rearranging Checked Columns
    const handleDragEnd = (event) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;
  
      setCheckedColumns((prev) => {
        const oldIndex = prev.indexOf(active.id);
        const newIndex = prev.indexOf(over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    };
  
    // ❌ Handle Remove Column
    const handleRemoveColumn = (column) => {
      setCheckedColumns((prevChecked) => prevChecked.filter((c) => c !== column));
    };
  
    // 🚀 Handle "Unselect All"
    const handleUnselectAll = () => {
      setCheckedColumns([]);
    };
  
    // ✅ Save Selected & Ordered Columns to Redux
    const handleSave = () => {
      console.log("checked columne>>>>",checkedColumns);
      
      dispatch(setColumns(checkedColumns));
      onClose();
    };
  
    return (
      <Modal show={visible} onHide={onClose} dialogClassName="common-modal">
        <div className="common-modal-container min-w-[640px]">
          <div className="display-column-26">
            <div className="display-column-8">
              <div className="display-flex-justify align-center">
                <p className="modal-title-text">Edit Column</p>
                <button onClick={onClose}>
                  <CloseIcon />
                </button>
              </div>
            </div>
          </div>
  
          {/* 🔍 Search Input */}
          <div className="columns-container mt-[24px]">
            {/* ✅ Column Selection (Left Side) */}
            <div className="column-selection">
              <div className="sticky-header flex flex-col items-start">
                <span className="row-title">Select columns to display</span>
                <div className="flex items-center border bg-white max-h-[40px] rounded-[8px] p-[10px] gap-[12px] w-full">
                  <SearchIcon height="20px" width="20px" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent outline-none border-none w-full text-sm text-gray-700"
                  />
                </div>
  
                {/* ✅ Unselect All & Count (Now Updates Correctly) */}
                <div className="flex items-center justify-between w-full my-[12px]">
                  <span className="text-blue-600 font-medium text-sm cursor-pointer" onClick={handleUnselectAll}>
                    Unselect all
                  </span>
                  <span className="text-sm text-gray-600">
                    {checkedColumns.length} of {columnOptions.length}
                  </span>
                </div>
              </div>
  
              {/* ✅ Show all columns (Selected = Ticked, Unselected = Empty) */}
              <div className="checkbox-list">
                {filteredColumns.map((column) => (
                  <div key={column} className="column-option flex items-center gap-2 cursor-pointer" onClick={() => handleCheckboxChange(column)}>
                    <div className={`w-[20px] h-[20px] border-1 border-customBlue bg-white rounded-[6px] flex items-center justify-center`}>
                      {checkedColumns.includes(column) && <img src={Tick} alt="Selected" />}
                    </div>
                    {column}
                  </div>
                ))}
              </div>
            </div>
  
            {/* 🔃 Column Reordering (Right Side - Only Checked Columns) */}
            <div className="column-reorder flex flex-col justify-start p-0 m-0 scroll-width-none">
              <span className="row-title">Re-arrange columns</span>
              <div className="draggable-container p-0 scroll-width-none">
                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={reorderedColumns} strategy={verticalListSortingStrategy}>
                    {reorderedColumns.map((column) => (
                      <DraggableItem key={column} column={column} removeColumn={handleRemoveColumn} />
                    ))}
                  </SortableContext>
                </DndContext>
              </div>
            </div>
          </div>
  
          {/* ✅ Save Button */}
          <div className="modal-footer">
            <button className="px-[14px] py-[10px] max-h-[36px] text-m font-ubuntu rounded-[8px] flex items-center gap-1 min-w-[120px] justify-center bg-buttonBLue text-buttonBLue cursor-pointer" onClick={handleSave}>
              <span className="font-ubuntu text-white text-m">Save</span>
            </button>
          </div>
        </div>
      </Modal>
    );
  };
  

export default EditColumnModal;
