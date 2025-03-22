import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ReactComponent as DropArrow } from "../assets/icons/arrowDown.svg";
import { ReactComponent as CloseIcon } from "../assets/icons/closeModal.svg";
import { ReactComponent as SearchIcon } from "../assets/icons/sourcingIcons/search-normal.svg"; // MUI Search Icon
import { ReactComponent as ColumnArrangeIcon } from "../assets/icons/columnIcon.svg"; // MUI Search Icon
import { ReactComponent as Tick } from "../assets/icons/sourcingIcons/tick.svg";
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
import { notifyError, notifySuccess } from "../helpers/utils";
import { updateSelectedColumns } from "../actions/candidateActions";
import CancelButton from "./common/CancelButton";
import CommonButton from "./common/CommonButton";

const ColumnSelector = ({ isOpen, onClose, columnData }) => {
  const dispatch = useDispatch();
  const { updateColumnLoading } = useSelector((state) => state.candidates);
  const [isExpanded, setIsExpanded] = useState({ select: true, arrange: true });
  const [searchQuery, setSearchQuery] = useState("");
  const [allColumnData, setAllColumnData] = useState(columnData);
  const [selectedColumnData, setSelectedColumnData] = useState([]);

  const handleColumnSelect = (item) => {
    const updatedData = allColumnData?.map((column) => {
      if (item?.key === column?.key) {
        return { ...column, showHeader: !item?.showHeader };
      } else {
        return { ...column };
      }
    });

    const filterData = updatedData?.filter((i) => i?.showHeader);
    setSelectedColumnData(filterData);
    setAllColumnData(updatedData);
  };

  const unselectAllHandler = () => {
    const updateData = allColumnData?.map((item) => {
      if (item?.name !== "candidate_name") {
        return { ...item, showHeader: false };
      } else {
        return item;
      }
    });

    setAllColumnData(updateData);
    const filterData = updateData?.filter((item) => item?.showHeader);
    setSelectedColumnData(filterData);
  };

  const removeSelectedColumnHandler = (column) => {
    const updatedData = allColumnData?.map((item) => {
      if (item?.name === column?.name) {
        return { ...item, showHeader: false };
      } else {
        return item;
      }
    });
    const filterData = updatedData?.filter((item) => item?.showHeader);
    setSelectedColumnData(filterData);
    setAllColumnData(updatedData);
  };

  useEffect(() => {
    const filterData = columnData?.filter((item) => item?.showHeader);
    setSelectedColumnData(filterData);
    setAllColumnData(columnData);
  }, [columnData]);

  const handleDragEnd = (event) => {
    if (event.active?.data?.current?.el?.dataset?.noDnd) {
      return; // Ignore click events on the remove button
    }

    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setSelectedColumnData((prev) => {
      const oldIndex = prev.findIndex((col) => col.key === active.id);
      const newIndex = prev.findIndex((col) => col.key === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const handleSave = () => {
    const selectedColumn = selectedColumnData?.map((item) => {
      return { key: item?.key };
    });

    const data = {
      selectedColumns: selectedColumn,
    };

    dispatch(updateSelectedColumns(data)).then((response) => {
      if (response?.success) {
        notifySuccess(response?.message);
      } else {
        notifyError(response);
      }
    });
  };

  const DraggableItem = ({ column }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: column?.key });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
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
        <ColumnArrangeIcon />
        <span style={{ cursor: "grab" }}>{column?.label}</span>
        <button
          data-no-dnd="true"
          onPointerDown={(e) => {
            e.stopPropagation();
            removeSelectedColumnHandler(column);
          }}
          style={{
            cursor: "pointer",
            background: "transparent",
            border: "none",
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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent outline-none border-none w-full text-sm text-gray-700"
                  />
                </div>
                <div className="flex justify-between my-[12px]">
                  <button className="" onClick={unselectAllHandler}>
                    <span className="text-buttonBLue text-m font-ubuntu">
                      Unselect all
                    </span>
                  </button>
                  <button>
                    <span className="text-m font-ubuntu text-customBlue">
                      {selectedColumnData?.length} of {allColumnData?.length}
                    </span>
                  </button>
                </div>

                <div
                  className={`checkbox-list overflow-auto ${
                    isExpanded.select ? "max-h-[540px]" : "max-h-[250px] "
                  }`}
                >
                  {allColumnData
                    ?.filter((column) =>
                      column?.label
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                    .map((column) => {
                      if (column?.name === "candidate_name") {
                        return (
                          <div
                            key={column?.key}
                            className="column-option flex items-center "
                          >
                            <div
                              className={`candidate-card-checkbox border-grey`}
                            >
                              {column?.showHeader && <Tick />}
                            </div>
                            <span className="font-14-regular color-grey">
                              {column?.label}
                            </span>
                          </div>
                        );
                      } else {
                        return (
                          <div
                            key={column?.key}
                            className="column-option flex items-center cursor-pointer text-m font-ubuntu"
                            onClick={() => handleColumnSelect(column)}
                          >
                            <div className={`candidate-card-checkbox`}>
                              {column?.showHeader && <Tick />}
                            </div>
                            <span className="font-14-regular color-dark-black">
                              {column?.label}
                            </span>
                          </div>
                        );
                      }
                    })}
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
              style={{ overflowX: "hidden" }}
            >
              {isExpanded.arrange && (
                <div
                  className="draggable-container p-0 scroll-width-none"
                  style={{ overflowX: "hidden" }}
                >
                  <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={selectedColumnData?.map((col) => col?.key)}
                      strategy={verticalListSortingStrategy}
                    >
                      {selectedColumnData?.map((column) => {
                        if (column?.name === "candidate_name") {
                          return (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "8px",
                                background: "#98989812",
                                borderRadius: "8px",
                              }}
                              className="font-ubuntu text-m text-customBlue gap-[8px] px-[12px] py-[12px] max-h-[40px]"
                            >
                              <ColumnArrangeIcon />
                              <span>{column?.label}</span>
                            </div>
                          );
                        } else {
                          return (
                            <DraggableItem key={column?.key} column={column} />
                          );
                        }
                      })}
                    </SortableContext>
                  </DndContext>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="display-flex" style={{ gap: 8 }}>
          <CancelButton
            title={"Cancel"}
            btnStyle={{ flex: 1 }}
            onClick={onClose}
          />
          <CommonButton
            isLoading={updateColumnLoading}
            title={"Save"}
            btnStyle={{ flex: 1 }}
            onClick={handleSave}
          />
        </div>
      </div>
    </>
  );
};

export default ColumnSelector;
