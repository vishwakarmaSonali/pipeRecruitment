import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ReactComponent as DropArrow } from "../assets/icons/arrowDown.svg";
import { ReactComponent as CloseIcon } from "../assets/icons/closeModal.svg";
import { ReactComponent as SearchIcon } from "../assets/icons/sourcingIcons/search-normal.svg"; // MUI Search Icon
import Tick from "../assets/icons/sourcingIcons/tick.svg";
import { useDispatch, useSelector } from "react-redux";
import { candidates } from "../helpers/dataCandidates";
import MenuIcon from "../assets/icons/menu.svg";

// DnD Kit
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const allColumns = [
  "Current Position",
  "Email Id",
  "Contact Number",
  "ATS Score",
  "Created Date",
  "Created By",
  "Employment Status",
  "Hired Date",
  "Start Date",
];

const ColumnSelector = ({ isOpen, onClose, setSelectedColumns }) => {
  const dispatch = useDispatch();
  const selectedColumns = useSelector((state) => state.columns.selected);
  const [columns, setColumns] = useState(selectedColumns);
  const [isExpanded, setIsExpanded] = useState({ select: true, arrange: true });
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
    console.log("checked columne>>>>", checkedColumns);

    // dispatch(setColumns(checkedColumns));
    // onClose();
  };

  // Toggle column selection
  const handleToggle = (column) => {
    setCheckedColumns((prev) =>
      prev.includes(column)
        ? prev.filter((c) => c !== column)
        : [...prev, column]
    );
  };

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
      background: "#1761D80F",
      borderRadius: "8px",
      cursor: "grab",
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="font-ubuntu text-m text-customBlue gap-[8px] px-[12px] py-[12px] max-h-[40px]"
      >
        <span style={{ cursor: "grab" }}></span> {column}
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
          <CloseIcon height={"14px"} width={"14px"} />
        </button>
      </div>
    );
  };

  return (
    <>
      <div
        className={`w-[460px] bg-white  p-[20px]   transition-transform delay-300ms z-50 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          borderLeft: "1.5px solid #D7D7D7",
          height: "calc(100vh - 60px)",
        }}
      >
        <div className="flex justify-between items-center ">
          <h2 className="text-xxl font-medium font-ubuntu text-customBlue">
            Columns
          </h2>
          <button
            onClick={onClose}
            className="text-xxl font-normal font-ubuntu text-customBlue"
          >
            <CloseIcon height={"20px"} width={"20px"} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto my-3 gap-[12px] space-y-[12px]">
          {/* Accordion: Select Columns */}
          <div className="">
            <button
              className="w-full text-left p-2 rounded-[8px] border-1 bg-white font-medium text-m font-ubuntu flex items-center justify-between"
              onClick={() =>
                setIsExpanded({ ...isExpanded, select: !isExpanded.select })
              }
            >
              Select columns to display
              <DropArrow
                width={14}
                height={14}
                fill="customBlue"
                className={`w-5 h-5 transition-transform ${
                  isExpanded.select ? "rotate-0" : "rotate-180"
                }`}
              />
            </button>
            {isExpanded.select && (
              <div className="px-[8px] pt-[12px] gap-[12px]">
                <div className="flex items-center  bg-customGrey1 rounded-[8px] p-[10px] gap-[12px] ">
                  <SearchIcon height="20px" width="20px" />
                  <input
                    type="text"
                    placeholder="Search"
                    //  value={searchQuery}
                    //  onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent outline-none border-none w-full text-sm text-gray-700"
                  />
                </div>
                <div className="flex justify-between my-[12px]">
                  <button className="" onClick={() => setCheckedColumns([])}>
                    <span className="text-buttonBLue text-m font-ubuntu">
                      Unselect all
                    </span>
                  </button>
                  <button>
                    <span className="text-m font-ubuntu text-customBlue">
                      10 of 20
                    </span>
                  </button>
                </div>
                {/* ✅ Show all columns (Selected = Ticked, Unselected = Empty) */}
                <div
                  className={`checkbox-list overflow-auto ${
                    isExpanded.select ? "max-h-[540px]" : "max-h-[250px] "
                  }`}
                >
                  {filteredColumns.map((column) => (
                    <div
                      key={column}
                      className="column-option flex items-center  cursor-pointer text-m font-ubuntu"
                      onClick={() => handleCheckboxChange(column)}
                    >
                      <div
                        className={`w-[20px] h-[20px]  border-1 border-customBlue bg-white rounded-[6px] flex items-center justify-center`}
                      >
                        {checkedColumns.includes(column) && (
                          <img src={Tick} alt="Selected" />
                        )}
                      </div>
                      {column}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Accordion: Arrange Columns */}
          <div className="">
            <button
              className="w-full text-left p-2 rounded-[8px] border-1 bg-white font-medium text-m font-ubuntu flex items-center justify-between"
              onClick={() =>
                setIsExpanded({ ...isExpanded, arrange: !isExpanded.arrange })
              }
            >
              Arrange Columns
              <DropArrow
                width={14}
                height={14}
                fill="customBlue"
                className={`w-5 h-5 transition-transform ${
                  isExpanded.arrange ? "rotate-0" : "rotate-180"
                }`}
              />
            </button>

            <div
              className={`mx-[10px] my-[12px]  overflow-auto${
                isExpanded.select ? "max-h-[540px]" : "max-h-[250px] "
              }`}
            >
              {isExpanded.arrange && (
                <div className="draggable-container p-0 scroll-width-none">
                  <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={reorderedColumns}
                      strategy={verticalListSortingStrategy}
                    >
                      {reorderedColumns.map((column) => (
                        <DraggableItem
                          key={column}
                          column={column}
                          removeColumn={handleRemoveColumn}
                          style={{ background: "red" }}
                        />
                      ))}
                    </SortableContext>
                  </DndContext>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Fixed Footer with Buttons */}
        <div className="  pt-3 pb-2 flex justify-end space-x-2 bg-white">
          <button
            className="px-[14px] py-[10px] max-h-[36px] text-m font-ubuntu rounded-[8px] flex items-center gap-1 w-full justify-center border-1 border-buttonBLue  cursor-pointer"
            onClick={onClose}
          >
            <span className="font-ubuntu text-buttonBLue text-m">Cancel</span>
          </button>
          <button
            className="px-[14px] py-[10px] max-h-[36px] text-m font-ubuntu rounded-[8px] flex items-center gap-1 w-full justify-center bg-buttonBLue text-buttonBLue cursor-pointer"
            onClick={handleSave}
          >
            <span className="font-ubuntu text-white text-m">Save</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ColumnSelector;
