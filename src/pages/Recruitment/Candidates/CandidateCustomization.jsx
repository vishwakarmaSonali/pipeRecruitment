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
import { useModal } from "../../../components/common/ModalProvider";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CommonAddButton from "../../../components/common/CommonAddButton";
import { ReactComponent as DraggableIcon } from "./assets/draggable.svg";
import { ReactComponent as ArrowRight } from "./assets/arrow-right.svg";
import { ReactComponent as LockIcon } from "./assets/lock.svg";
import { ReactComponent as MoreIcon } from "./assets/moreMenu.svg";
import { ReactComponent as HideIcon } from "./assets/hide.svg";
import { ReactComponent as EditIcon } from "./assets/edit.svg";
import { ReactComponent as DeleteIcon } from "./assets/delete.svg";
import { commonStyle } from "../../../helpers/config";
import { useSelector, useDispatch } from "react-redux";
import {
  addNewCategoryFunction,
  categoryDraggableFuction,
  categoryFieldDraggableFuction,
  deleteCategoryFunction,
} from "../../../actions/customizationActions";
import CommonDeleteModal from "../../../components/modals/CommonDeleteModal";
import AddFieldDrawer from "../../../components/candidate/AddFieldDrawer";

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

const CandidateCustomization = () => {
  const dispatch = useDispatch();
  const { categoryData } = useSelector((state) => state?.customization);
  const { modals, setModalVisibility } = useModal();
  const [candidateTabs, setCandidateTabs] = useState(
    candidateCustomizationsTabs
  );
  const [selectedCandidateTab, setSelectedCandidateTab] =
    useState("Summary Fields");

  const [categories, setCategories] = useState(categoryData);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedFieldItem, setSelectedFieldItem] = useState(null);
  const [fieldsData, setFieldsData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);
  const [addCategoryBtnDisable, setAddCategoryBtnDisable] = useState(false);
  const openMenu1 = Boolean(anchorEl);
  const openMenu2 = Boolean(anchorE2);
  const [newCategoryId, setNewCategoryId] = useState(null);
  const inputRefs = useRef({});
  const [errorMessages, setErrorMessages] = useState({});
  const [addFieldDrawerOpen, setAddFieldDrawerOpen] = useState(false);

  const toggleAddFieldDrawer = (open) => {
    setAddFieldDrawerOpen(open);
  };

  const handleCategoryMenuClick = (event, item) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleCategoryMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFieldMenuClick = (event, item) => {
    setAnchorE2(event.currentTarget);
    setSelectedFieldItem(item);
  };

  const handleFieldMenuClose = () => {
    setAnchorE2(null);
    setSelectedFieldItem(null);
  };

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
    setAddCategoryBtnDisable(true);
    const newId = Date.now().toString();
    const newCategory = {
      id: newId,
      name: "Candidate Name",
      fields: [],
      selected: true,
      custom: true,
      editable: true,
    };

    setCategories((prev) =>
      prev
        .map((category) => ({ ...category, selected: false }))
        .concat(newCategory)
    );

    setNewCategoryId(newId);
    setSelectedCategory({});
    setTimeout(() => {
      if (inputRefs.current[newCategory.id]) {
        inputRefs.current[newCategory.id].focus();
        inputRefs.current[newCategory.id].select();
      }
    }, 100);
  };

  const handleCategoryNameChange = (id, newName) => {
    if (newName.length > 300) return;

    const updateData = categories?.map((category) => {
      if (category.id === id) {
        return { ...category, name: newName };
      } else {
        return category;
      }
    });

    setCategories(updateData);

    dispatch(addNewCategoryFunction(updateData));

    let error = "";

    if (newName.trim().length < 2) {
      error = "Name must be at least 2 characters.";
    } else if (
      categories.some(
        (category) =>
          category.id !== id &&
          category.name.trim().toLowerCase() === newName.trim().toLowerCase()
      )
    ) {
      error = "This name already exists.";
    }

    setErrorMessages((prev) => ({
      ...prev,
      [id]: error,
    }));
  };

  const saveCategoryName = (id, name) => {
    const isDuplicate = categories.some(
      (category) => category.name === name && category.id !== id
    );

    if (isDuplicate || name.length < 2 || name.length > 300) {
      inputRefs.current[id]?.focus();
      return;
    }

    const updateData = categories?.map((category) => {
      if (category.id === id) {
        return { ...category, editable: false, selected: true };
      } else {
        return { ...category, selected: false };
      }
    });

    const filterData = updateData?.filter((filter) => filter?.selected);
    setCategories(updateData);
    setSelectedCategory(filterData[0]);
    setAddCategoryBtnDisable(false);
  };

  const deleteCategory = () => {
    const updateData = categories?.filter(
      (item) => item?.id !== selectedItem?.id
    );

    dispatch(deleteCategoryFunction(updateData));
    setCategories(updateData);
    setModalVisibility("categoryDeleteModalVisible", false);
    setSelectedItem(null);
    setAddCategoryBtnDisable(false);
  };

  const editCategoryHandler = () => {
    const updatedData = categories?.map((item) => {
      if (item?.id === selectedItem?.id) {
        return { ...item, editable: true };
      } else {
        return { ...item };
      }
    });
    setCategories(updatedData);
    setNewCategoryId(selectedItem?.id);
  };

  useEffect(() => {
    if (newCategoryId && inputRefs.current[newCategoryId]) {
      const inputElement = inputRefs.current[newCategoryId];
      inputElement.focus();
      inputElement.select();
      setNewCategoryId(null);
    }
  }, [categories]);

  const selectedCustomizationCategoryHandler = (item) => {
    const updatedData = categories?.map((data) => {
      if (item?.id === data?.id) {
        return { ...data, selected: true };
      } else {
        return { ...data, selected: false };
      }
    });
    const filterData = updatedData?.filter((filter) => filter?.selected);
    setSelectedCategory(filterData[0]);
    setCategories(updatedData);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedItems = [...categories];
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);
    dispatch(categoryDraggableFuction(reorderedItems));
    setCategories(reorderedItems);
  };

  const onDragEndFields = (result) => {
    if (!result.destination) return;

    const reorderedItems = [...selectedCategory?.fields];

    const [movedItem] = reorderedItems?.splice(result.source.index, 1);
    reorderedItems?.splice(result.destination.index, 0, movedItem);
    dispatch(
      categoryFieldDraggableFuction(selectedCategory?.id, reorderedItems)
    );
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
                disable={addCategoryBtnDisable}
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
                      {categories?.map((item, index) => (
                        <Draggable
                          key={item?.id}
                          draggableId={item.id?.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <>
                              <div
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
                                  style={{ gap: 8, flex: 1 }}
                                >
                                  <div {...provided.dragHandleProps}>
                                    <DraggableIcon
                                      fill={
                                        item?.selected ? "#151B23" : "#797979"
                                      }
                                    />
                                  </div>
                                  {!!item?.fields && (
                                    <button className="display-flex align-center justify-center">
                                      <ArrowRight
                                        fill={
                                          item?.selected ? "#151B23" : "#797979"
                                        }
                                      />
                                    </button>
                                  )}

                                  <input
                                    ref={(el) =>
                                      (inputRefs.current[item.id] = el)
                                    }
                                    type="text"
                                    value={item?.name}
                                    onChange={(e) =>
                                      handleCategoryNameChange(
                                        item?.id,
                                        e.target.value
                                      )
                                    }
                                    onBlur={() =>
                                      saveCategoryName(item.id, item?.name)
                                    }
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        saveCategoryName(item.id, item?.name);
                                      }
                                    }}
                                    disabled={!item?.editable}
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
                                  {!item?.custom && (
                                    <LockIcon
                                      stroke={
                                        item?.selected ? "#151B23" : "#797979"
                                      }
                                    />
                                  )}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleCategoryMenuClick(e, item);
                                    }}
                                  >
                                    <MoreIcon
                                      stroke={
                                        item?.selected ? "#151B23" : "#797979"
                                      }
                                    />
                                  </button>
                                </div>
                              </div>
                              {errorMessages[item.id] && (
                                <p className="font-12-regular color-error">
                                  {errorMessages[item.id]}
                                </p>
                              )}
                            </>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      <Menu
                        anchorEl={anchorEl}
                        open={openMenu1}
                        onClose={handleCategoryMenuClose}
                        PaperProps={{
                          sx: commonStyle.sx,
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                      >
                        <div className="display-column">
                          <button className="common-menu-item-btn">
                            <HideIcon /> Hide
                          </button>

                          {selectedItem?.custom && (
                            <>
                              <button
                                className="common-menu-item-btn"
                                onClick={() => {
                                  handleCategoryMenuClose();
                                  editCategoryHandler();
                                }}
                              >
                                <EditIcon /> Edit
                              </button>

                              <button
                                className="common-menu-item-btn"
                                onClick={() => {
                                  setModalVisibility(
                                    "categoryDeleteModalVisible",
                                    true
                                  );
                                  handleCategoryMenuClose();
                                }}
                              >
                                <DeleteIcon /> Delete
                              </button>
                            </>
                          )}
                        </div>
                      </Menu>
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>
          <div className="flex-1">
            {!!selectedCategory?.fields && (
              <div className="category-main-container">
                <div className="display-flex-justify align-center">
                  <p className="font-14-medium color-dark-black">
                    Fields - {selectedCategory?.name}
                  </p>
                  <CommonAddButton
                    title={"Add Field"}
                    onClick={() => toggleAddFieldDrawer(true)}
                  />
                </div>
                <div>
                  {selectedCategory?.fields?.length > 0 ? (
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
                                      {!item?.custom && (
                                        <LockIcon stroke={"#797979"} />
                                      )}
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleFieldMenuClick(e, item);
                                        }}
                                      >
                                        <MoreIcon stroke={"#797979"} />
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                            <Menu
                              anchorEl={anchorE2}
                              open={openMenu2}
                              onClose={handleFieldMenuClose}
                              PaperProps={{
                                sx: commonStyle.sx,
                              }}
                              transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                              }}
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                              }}
                            >
                              <div className="display-column">
                                <button className="common-menu-item-btn">
                                  <HideIcon /> Hide
                                </button>
                                <button className="common-menu-item-btn">
                                  <EditIcon /> Edit
                                </button>
                                {selectedFieldItem?.custom && (
                                  <button className="common-menu-item-btn">
                                    <DeleteIcon /> Delete
                                  </button>
                                )}
                              </div>
                            </Menu>
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  ) : (
                    <p className="font-14-regular color-grey">
                      No fields exists within category
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <CommonDeleteModal
        visible={modals?.categoryDeleteModalVisible}
        title={"Delete Category"}
        description={"Are you sure you want to delete this category?"}
        onClose={() => {
          setModalVisibility("categoryDeleteModalVisible", false);
          setSelectedItem(null);
        }}
        onClickDelete={deleteCategory}
      />
      <AddFieldDrawer
        visible={addFieldDrawerOpen}
        onClose={() => toggleAddFieldDrawer(false)}
      />
    </div>
  );
};

export default CandidateCustomization;
