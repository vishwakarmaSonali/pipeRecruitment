import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import "./Candidates.css";
import { Menu } from "@mui/material";
import Navbar from "../../../components/navbar/Navbar";
import { commonStyle } from "../../../helpers/config";
import { useModal } from "../../../components/common/ModalProvider";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CommonAddButton from "../../../components/common/CommonAddButton";
import { ReactComponent as DraggableIcon } from "./assets/draggable.svg";
import { ReactComponent as ArrowRight } from "./assets/arrow-right.svg";
import { ReactComponent as LockIcon } from "./assets/lock.svg";
import { ReactComponent as MoreIcon } from "./assets/moreMenu.svg";

const candidateCustomizationsTabs = [
  {
    id: 1,
    name: "Summary Fields",
    selected: true,
  },
  {
    id: 2,
    name: "Labels",
    selected: false,
  },
  {
    id: 3,
    name: "Domains",
    selected: false,
  },
];

const initialState = [
  {
    id: 1,
    name: "Candidate Details",
    fields: [
      { id: 1, name: "Candidate Name" },
      { id: 2, name: "Candidate First Name" },
      { id: 3, name: "Candidate Last Name" },
      { id: 4, name: "Gender" },
      { id: 5, name: "Date of Birth" },
      { id: 6, name: "Current Address" },
      { id: 7, name: "Candidate Email Address" },
      { id: 8, name: "Candidate Phone Number" },
      { id: 9, name: "Skype" },
      { id: 10, name: "Other Contact" },
      { id: 11, name: "University" },
      { id: 12, name: "Current Company" },
      { id: 13, name: "Current Position" },
      { id: 14, name: "Candidate Location" },
    ],
  },
  {
    id: 2,
    name: "Placement Details",
    fields: [
      { id: 1, name: "Employment Status" },
      { id: 2, name: "Hired Date" },
      { id: 3, name: "Hired Date" },
      { id: 4, name: "Probation End Date" },
      { id: 5, name: "Left Date" },
      { id: 6, name: "Placement Job" },
      { id: 7, name: "Placement Client" },
    ],
  },
  { id: 3, name: "Log Book" },
  { id: 4, name: "Recent Activity History" },
  { id: 5, name: "Addresses" },
  { id: 6, name: "Dependent" },
  { id: 7, name: "Emergency Contacts" },
  { id: 8, name: "Skills" },
  {
    id: 9,
    name: "Additional Information",
    fields: [
      { id: 1, name: "Candidate Domain" },
      { id: 2, name: "Nationalities" },
      { id: 3, name: "Languages" },
      { id: 4, name: "Current Salary" },
      { id: 5, name: "Expected Salary" },
      { id: 6, name: "Notice Period" },
      { id: 7, name: "GDPR Consent" },
      { id: 8, name: "Email Consent" },
    ],
  },
  { id: 10, name: "Experience" },
  { id: 11, name: "Education" },
  { id: 12, name: "Jobs" },
  { id: 13, name: "Folders" },
];

const CandidateCustomization = () => {
  const { modals, setModalVisibility } = useModal();
  const [candidateTabs, setCandidateTabs] = useState(
    candidateCustomizationsTabs
  );
  const [selectedCandidateTab, setSelectedCandidateTab] =
    useState("Summary Fields");

  const [columns, setColumns] = useState(initialState);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [fieldsData, setFieldsData] = useState([]);

  const selectedTabHandler = (id) => {
    const updatedData = candidateTabs?.map((item) => {
      if (item?.id === id) {
        return { ...item, selected: true };
      } else {
        return { ...item, selected: false };
      }
    });

    const filterTab = updatedData?.filter((item) => item?.selected);
    setSelectedCandidateTab(filterTab[0]?.name);
    setCandidateTabs(updatedData);
  };

  const handleAddCategory = () => {
    const newCategory = {
      id: Date.now().toString(),
      name: "Candidate Name",
      fields: [],
      selected: true,
      editable: true,
    };
    setColumns((prev) => [...prev, newCategory]);
  };

  const selectedCustomizationCategoryHandler = (item) => {
    const updatedData = columns?.map((data) => {
      if (item?.id === data?.id) {
        return { ...data, selected: true };
      } else {
        return { ...data, selected: false };
      }
    });
    const filterData = updatedData?.filter((filter) => filter?.selected);
    setSelectedCategory(filterData[0]);
    setColumns(updatedData);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedItems = [...columns];
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    setColumns(reorderedItems);
  };

  const onDragEndFields = (result) => {
    if (!result.destination) return;

    const reorderedItems = [...selectedCategory?.fields];

    const [movedItem] = reorderedItems?.splice(result.source.index, 1);
    reorderedItems?.splice(result.destination.index, 0, movedItem);

    setSelectedCategory((prev) => ({
      ...prev,
      fields: [...reorderedItems],
    }));
  };

  return (
    <div className="candidate-info-main-container">
      <Navbar />
      <div className="candidate-customization-header">
        <p className="font-22-medium color-dark-black padding-16">
          Candidate Customization
        </p>
        <div className="candidate-customization-tab-main">
          {candidateTabs?.map((item) => {
            return (
              <button
                key={item?.id}
                className={`candidate-customization-tab-btn ${
                  item?.selected && "active-info-tab"
                }`}
                onClick={() => selectedTabHandler(item?.id)}
              >
                {item?.name}
              </button>
            );
          })}
        </div>
      </div>
      <div className="candidate-customization-container">
        <p className="font-16-medium color-dark-black">
          {selectedCandidateTab}
        </p>
        <div className="display-column" style={{ gap: 10 }}>
          <p className="font-14-regular color-grey">
            Define and manage custom fields to tailor candidate profiles with
            specific information relevant to your hiring needs.
          </p>
          <ul className="font-14-regular color-grey customize-summary-field-ul">
            <li>
              Changes made here will be reflected across all users in your
              account.
            </li>
            <li>
              Default categories and fields cannot be deleted but can be hidden
              if not needed.
            </li>
          </ul>
        </div>
        <div className="candidate-customization-inner-container">
          <div className="category-main-container flex-1">
            <div className="display-flex-justify align-center">
              <p className="font-14-medium color-dark-black">Categories</p>
              <CommonAddButton
                title={"Add Category"}
                onClick={handleAddCategory}
              />
            </div>
            <div>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="column">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="candidate-customization-category-item"
                    >
                      {columns?.map((item, index) => (
                        <Draggable
                          key={item?.id}
                          draggableId={item.id?.toLocaleString()}
                          index={index}
                        >
                          {(provided) => (
                            <button
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`customize-category-item ${
                                item?.selected && "selected-category-item"
                              }`}
                              onClick={() => {
                                if (!!item?.fields) {
                                  selectedCustomizationCategoryHandler(item);
                                }
                              }}
                            >
                              <div
                                className="display-flex align-center "
                                style={{ gap: 8 }}
                              >
                                <div {...provided.dragHandleProps}>
                                  <DraggableIcon
                                    fill={
                                      item?.selected ? "#151B23" : "#797979"
                                    }
                                  />
                                </div>
                                {!!item?.fields && (
                                  <ArrowRight
                                    fill={
                                      item?.selected ? "#151B23" : "#797979"
                                    }
                                  />
                                )}
                                <input
                                  type="text"
                                  value={item?.name}
                                  disabled
                                  className={`customize-category-input ${
                                    item?.selected &&
                                    "selected-customize-category-input"
                                  }`}
                                />
                              </div>
                              <div
                                className="display-flex align-center"
                                style={{ gap: 8 }}
                              >
                                <LockIcon
                                  stroke={
                                    item?.selected ? "#151B23" : "#797979"
                                  }
                                />
                                <button>
                                  <MoreIcon
                                    stroke={
                                      item?.selected ? "#151B23" : "#797979"
                                    }
                                  />
                                </button>
                              </div>
                            </button>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>

                {/* <div className="display-flex align-center" style={{ gap: 20 }}>
                  <div className="divider-line" />
                  <p
                    className="font-12-regular color-grey"
                    style={{ minWidth: "max-content" }}
                  >
                    Second Column
                  </p>
                  <div className="divider-line" />
                </div> */}

                {/* <Droppable droppableId="secondColumn">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="candidate-customization-category-item"
                    >
                      {columns.secondColumn.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="customize-category-item"
                            >
                              <div
                                className="display-flex align-center"
                                style={{ gap: 8 }}
                              >
                                <div {...provided.dragHandleProps}>
                                  <DraggableIcon />
                                </div>
                                {item?.clickable && <ArrowRight />}
                                <input
                                  type="text"
                                  value={item?.name}
                                  disabled
                                  className="customize-category-input"
                                />
                              </div>
                              <div
                                className="display-flex align-center"
                                style={{ gap: 8 }}
                              >
                                <LockIcon />
                                <button>
                                  <MoreIcon />
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable> */}
              </DragDropContext>
            </div>
          </div>
          <div className="flex-1">
            {!!selectedCategory?.name && (
              <div className="category-main-container">
                <div className="display-flex-justify align-center">
                  <p className="font-14-medium color-dark-black">
                    Fields - {selectedCategory?.name}
                  </p>
                  <CommonAddButton title={"Add Field"} />
                </div>
                <div>
                  <DragDropContext onDragEnd={onDragEndFields}>
                    <Droppable droppableId="fields">
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="display-column"
                        >
                          {selectedCategory?.fields?.map((item, index) => (
                            <Draggable
                              key={item?.id}
                              draggableId={item.id?.toLocaleString()}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  className={`customize-field-item`}
                                >
                                  <div
                                    className="display-flex align-center "
                                    style={{ gap: 8 }}
                                  >
                                    <div {...provided.dragHandleProps}>
                                      <DraggableIcon fill={"#151B23"} />
                                    </div>
                                    <p className="font-12-regular color-dark-black">
                                      {item?.name}
                                    </p>
                                  </div>
                                  <div
                                    className="display-flex align-center"
                                    style={{ gap: 8 }}
                                  >
                                    <LockIcon stroke={"#797979"} />
                                    <button>
                                      <MoreIcon stroke={"#797979"} />
                                    </button>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateCustomization;
