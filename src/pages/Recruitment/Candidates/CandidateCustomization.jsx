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
  deleteLabel,
  fetchAllLabels,
  updateLabel,
  addLabel,
  fetchAllDomains,
  addDomain,
  updateDomain,
  deleteDomain,
  fetchAllCategories,
  reorderCategory,
  reorderCategoryFields,
  addCategoryFunction,
  deleteCategory,
  hideCategory,
  updateCategory,
  deleteCategoryField,
  hideCategoryField,
  addCategoryFieldFunction,
  updateCategoryField,
} from "../../../actions/customizationActions";
import CommonDeleteModal from "../../../components/modals/CommonDeleteModal";
import AddFieldDrawer from "../../../components/candidate/AddFieldDrawer";
import { ReactComponent as CancelIcon } from "./assets/cancel.svg";
import { ReactComponent as RightIcon } from "./assets/right.svg";
import { ReactComponent as LableIcon } from "./assets/label.svg";
import { ReactComponent as AddCircleIcon } from "./assets/add-circle.svg";
import { HexColorPicker } from "react-colorful";
import { ReactComponent as AddIcon } from "../../../assets/icons/plusIcon.svg";
import CommonLoader from "../../../components/common/CommonLoader";
import {
  notifyError,
  notifySuccess,
  toSnakeCase,
} from "../../../helpers/utils";
import Breadcrumb from "../../../components/administration/Breadcrumb";

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
  const {
    labelData,
    updateLabelLoading,
    deleteLabelLoading,
    addLabelLoading,
    domainData,
    updateDomainLoading,
    deleteDomainLoading,
    addDomainLoading,
    fetchDomainLoading,
    categoriesData,
    fetchLoading,
    addCategoryLoading,
    deleteCategoryLoading,
    updateCategoryLoading,
    hideCategoryLoading,
    deleteCategoryFieldLoading,
    hideCategoryFieldLoading,
    addCategoryFieldLoading,
    updateCategoryFieldLoading,
  } = useSelector((state) => state?.customization);

  const { modals, setModalVisibility } = useModal();
  const [candidateTabs, setCandidateTabs] = useState(
    candidateCustomizationsTabs
  );

  const [selectedCandidateTab, setSelectedCandidateTab] =
    useState("Summary Fields");

  const [categories, setCategories] = useState(categoriesData);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedFieldItem, setSelectedFieldItem] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);
  const openMenu1 = Boolean(anchorEl);
  const openMenu2 = Boolean(anchorE2);
  const [newCategoryId, setNewCategoryId] = useState(null);
  const inputRefs = useRef({});
  const [errorMessages, setErrorMessages] = useState({});
  const [addFieldDrawerOpen, setAddFieldDrawerOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [tempLabel, setTempLabel] = useState(null);
  const [defaultColorList, setDefaultColorList] = useState([]);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [originalLabel, setOriginalLabel] = useState(null);
  const [selectedLabelId, setSelectedLabelId] = useState(null);
  const [addNewLabel, setAddNewLabel] = useState(false);
  const [tempDomain, setTempDomain] = useState(null);
  const [addNewDomain, setAddNewDomain] = useState(false);
  const [selectedDomainId, setSelectedDomainId] = useState(null);
  const [addNewCategoryVisible, setAddNewCategoryVisible] = useState(false);
  const [addNewCategoryButtonDisable, setAddNewCategoryButtonDisable] =
    useState(false);
  const [tempCategory, setTempCategory] = useState(null);

  useEffect(() => {
    setCategories(categoriesData);
  }, [categoriesData]);

  const reset = () => {
    setAddNewLabel(false);
    setSelectedLabelId(null);
    setSelectedDomainId(null);
    setAddNewDomain(false);
    setTempDomain(null);
    setTempLabel(null);
    setEditingIndex(null);
    setAddNewCategoryButtonDisable(false);
  };

  const addNewLabelHandler = () => {
    const newLabel = { name: "Label Name", color: "#000000" };
    setTempLabel(newLabel);
    setAddNewLabel(true);
  };

  const addNewDomainHandler = () => {
    const newLabel = { name: "Domain Name" };
    setTempDomain(newLabel);
    setAddNewDomain(true);
  };

  const editLabel = (index, id) => {
    if (!addNewLabel) {
      setEditingIndex(index);
      setTempLabel({ ...labelData[index] });
      setOriginalLabel({ ...labelData[index] });
    }
  };

  const editDomain = (index) => {
    if (!addNewDomain) {
      setEditingIndex(index);
      setTempDomain({ ...domainData[index] });
    }
  };

  const saveLabel = () => {
    const isDuplicate = labelData?.some(
      (label, index) => label.name === tempLabel.name && index !== editingIndex
    );

    if (isDuplicate) {
      notifyError("Label with this name already exists!");
      return;
    }

    const id = tempLabel?._id;
    const httpBody = {
      name: tempLabel?.name,
      color: tempLabel?.color,
    };
    dispatch(updateLabel(id, httpBody)).then((response) => {
      if (response?.success) {
        setEditingIndex(null);
        setColorPickerVisible(false);
        notifySuccess(response?.message);
      } else {
        notifyError(response);
      }
    });
  };

  const saveDomain = () => {
    const isDuplicate = domainData?.some(
      (domain, index) =>
        domain.name === tempDomain.name && index !== editingIndex
    );

    if (isDuplicate) {
      notifyError("Domain with this name already exists!");
      return;
    }

    const id = tempDomain?._id;
    const httpBody = {
      name: tempDomain?.name,
    };
    dispatch(updateDomain(id, httpBody)).then((response) => {
      if (response?.success) {
        setEditingIndex(null);
        notifySuccess(response?.message);
      } else {
        notifyError(response);
      }
    });
  };

  const addCategoryHandler = () => {
    const isDuplicate = categories?.some(
      (category) => category?.label === tempCategory?.name
    );

    if (isDuplicate) {
      notifyError("Category with this name already exists!");
      return;
    }

    if (tempCategory?.name?.length < 2) {
      notifyError("Name must be at least 2 characters.");
      return;
    }

    const name = toSnakeCase(tempCategory?.name) || "";
    const data = {
      name: name,
      label: tempCategory?.name,
    };
    dispatch(addCategoryFunction(data)).then((response) => {
      if (response?.success) {
        setAddNewCategoryVisible(false);
        setTempCategory(null);
        notifySuccess(response?.message);
      } else {
        notifyError(response);
      }
    });
  };

  const saveCategoryHandler = () => {
    const isDuplicate = categories?.some(
      (category) => category?.label === tempCategory?.name
    );

    if (isDuplicate) {
      notifyError("Category with this name already exists!");
      return;
    }

    if (tempCategory?.name?.length < 2) {
      notifyError("Name must be at least 2 characters.");
      return;
    }

    const data = {
      label: tempCategory?.name,
    };
    dispatch(updateCategory(selectedItem?._id, data)).then((response) => {
      if (response?.success) {
        setTempCategory(null);
        setAddNewCategoryButtonDisable(false);
        notifySuccess(response?.message);
      } else {
        notifyError(response);
      }
    });
  };

  const addLabelFunction = () => {
    const isDuplicate = labelData?.some(
      (label) => label?.name === tempLabel?.name
    );

    if (isDuplicate) {
      notifyError("Label with this name already exists!");
      return;
    }

    const httpBody = {
      name: tempLabel?.name,
      color: tempLabel?.color,
    };
    dispatch(addLabel(httpBody)).then((response) => {
      if (response?.success) {
        setEditingIndex(null);
        setColorPickerVisible(false);
        setAddNewLabel(false);
        notifySuccess(response?.message);
      } else {
        notifyError(response);
      }
    });
  };

  const addDomainFunction = () => {
    const isDuplicate = domainData?.some(
      (domain) => domain.name === tempDomain.name
    );

    if (isDuplicate) {
      notifyError("Domain with this name already exists!");
      return;
    }

    const httpBody = {
      name: tempDomain?.name,
    };
    dispatch(addDomain(httpBody)).then((response) => {
      if (response?.success) {
        setEditingIndex(null);
        setAddNewDomain(false);
        notifySuccess(response?.message);
      } else {
        notifyError(response);
      }
    });
  };

  const cancelEdit = () => {
    setAddNewLabel(false);
    setTempLabel(originalLabel);
    setEditingIndex(null);
    setColorPickerVisible(false);
  };

  const cancelEditDomain = () => {
    setAddNewDomain(false);
    setTempDomain(originalLabel);
    setEditingIndex(null);
  };

  const deleteLabelFunction = (id) => {
    dispatch(deleteLabel(id)).then((response) => {
      if (response?.success) {
        setEditingIndex(null);
        setModalVisibility("labelDeleteModalVisible", false);
        notifySuccess(response?.message);
      } else {
        notifyError(response);
      }
    });
  };

  const deleteDomainFunction = (id) => {
    dispatch(deleteDomain(id)).then((response) => {
      if (response?.success) {
        setEditingIndex(null);
        setModalVisibility("domainDeleteModalVisible", false);
        notifySuccess(response?.message);
      } else {
        notifyError(response);
      }
    });
  };

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
  };

  const selectedTabHandler = (id) => {
    reset();
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
    const newCategory = { name: "Candidate Name" };
    setTempCategory(newCategory);
    setAddNewCategoryVisible(true);
  };

  const deleteCategoryHandler = () => {
    dispatch(deleteCategory(selectedItem?._id))?.then((response) => {
      if (response?.success) {
        notifySuccess(response?.message);
        setModalVisibility("categoryDeleteModalVisible", false);
        setSelectedItem(null);
      } else {
        notifyError(response);
      }
    });
  };

  const deleteCategoryFieldHandler = () => {
    dispatch(
      deleteCategoryField(selectedCategory?._id, selectedFieldItem?._id)
    )?.then((response) => {
      if (response?.success) {
        const updateData = selectedCategory?.fields?.filter(
          (item) => item?._id !== selectedFieldItem?._id
        );
        setSelectedCategory({ ...selectedCategory, fields: updateData });
        notifySuccess(response?.message);
        setModalVisibility("categoryFieldDeleteModalVisible", false);
        setSelectedFieldItem(null);
      } else {
        notifyError(response);
      }
    });
  };

  const addCategoryFieldHandler = (item) => {
    const name = toSnakeCase(item?.name);

    const httpBody = {
      fields: [
        {
          name: name,
          label: item?.name,
          type: item?.type?.type,
          fe_input_type: item?.type?.fe_input_type,
          description: item?.description,
        },
      ],
    };

    dispatch(addCategoryFieldFunction(selectedCategory?._id, httpBody)).then(
      (response) => {
        if (response?.success) {
          toggleAddFieldDrawer(false);
          notifySuccess(response?.message);
        } else {
          notifyError(response);
        }
      }
    );
  };

  const hideCategoryHandler = () => {
    const data = {
      hide: !selectedItem?.hide,
    };
    dispatch(hideCategory(selectedItem?._id, data))?.then((response) => {
      if (response?.success) {
        notifySuccess(response?.message);
        setSelectedItem(null);
      } else {
        notifyError(response?.message || response);
      }
    });
  };

  const hideCategoryFieldHandler = () => {
    const data = {
      hide: !selectedFieldItem?.hide,
    };
    dispatch(
      hideCategoryField(selectedCategory?._id, selectedFieldItem?._id, data)
    )?.then((response) => {
      if (response?.success) {
        const updateData = selectedCategory?.fields?.map((item) => {
          if (item?._id === selectedFieldItem?._id) {
            return { ...item, hide: !selectedFieldItem?.hide };
          } else {
            return item;
          }
        });
        setSelectedCategory({ ...selectedCategory, fields: updateData });
        notifySuccess(response?.message);
        setSelectedFieldItem(null);
      } else {
        notifyError(response?.message || response);
      }
    });
  };

  const updateCategoryFieldHandler = (item) => {
    const data = {
      label: item?.name,
      description: item?.description,
    };
    dispatch(
      updateCategoryField(selectedCategory?._id, selectedFieldItem?._id, data)
    )?.then((response) => {
      if (response?.success) {
        const updateData = selectedCategory?.fields?.map((item) => {
          if (item?._id === selectedFieldItem?._id) {
            return { ...item, ...data };
          } else {
            return item;
          }
        });
        setSelectedCategory({ ...selectedCategory, fields: updateData });
        notifySuccess(response?.message);
        setSelectedFieldItem(null);
        toggleAddFieldDrawer(false);
      } else {
        notifyError(response?.message || response);
      }
    });
  };

  const editCategoryHandler = () => {
    const newCategory = { name: selectedItem?.label };
    setTempCategory(newCategory);
    setAddNewCategoryButtonDisable(true);

    const updatedData = categories?.map((item) => {
      if (item?._id === selectedItem?._id) {
        return { ...item, editable: true, selected: true };
      } else {
        return { ...item, editable: false, selected: false };
      }
    });
    setCategories(updatedData);
  };

  const cancelEditCategoryHandler = () => {
    setTempCategory(null);
    setAddNewCategoryButtonDisable(false);
    const updatedData = categories?.map((item) => {
      if (item?._id === selectedItem?._id) {
        return { ...item, editable: false };
      } else {
        return { ...item, editable: false, selected: false };
      }
    });
    setCategories(updatedData);
  };

  const selectedCustomizationCategoryHandler = (item) => {
    const updatedData = categories?.map((data) => {
      if (item?._id === data?._id) {
        return { ...data, selected: true, editable: false };
      } else {
        return { ...data, selected: false, editable: false };
      }
    });
    setCategories(updatedData);
  };

  const sortDataByOrder = (data) => {
    return data
      .sort((a, b) => a?.order - b?.order)
      .map((section) => ({
        ...section,
        fields: section?.fields.sort((a, b) => a?.order - b?.order),
      }));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedItems = [...categories];
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    const updateCategories = reorderedItems?.map((item, index) => {
      return {
        categoryId: item?._id,
        order: index + 1,
      };
    });

    const httpBody = {
      categories: updateCategories,
    };

    dispatch(reorderCategory(httpBody, updateCategories)).then((response) => {
      if (response?.success) {
        const updatedCategoryData = categories?.map((category) => {
          const updatedCategory = updateCategories?.find(
            (update) => update?.categoryId === category?._id
          );
          return updatedCategory
            ? { ...category, order: updatedCategory?.order }
            : category;
        });

        setCategories(updatedCategoryData);
        notifySuccess(response?.message);
      } else {
        notifyError(response);
      }
    });
  };

  const onDragEndFields = (result) => {
    if (!result.destination) return;

    const reorderedItems = [...selectedCategory?.fields];

    const [movedItem] = reorderedItems?.splice(result.source.index, 1);
    reorderedItems?.splice(result.destination.index, 0, movedItem);

    const updateCategoryFields = reorderedItems?.map((item, index) => {
      return {
        fieldId: item?._id,
        order: index + 1,
      };
    });

    const httpBody = {
      categoryId: selectedCategory?._id,
      fields: updateCategoryFields,
    };

    dispatch(reorderCategoryFields(httpBody)).then((response) => {
      if (response?.message) {
        setSelectedCategory(response?.result);
        notifySuccess(response?.message);
      } else {
        notifyError(response);
      }
    });
  };

  useEffect(() => {
    const filterColor = labelData?.map((item) => item?.color);

    const uniqueColors = [...new Set(filterColor)];

    setDefaultColorList(uniqueColors);
  }, [labelData]);

  useEffect(() => {
    dispatch(fetchAllLabels());
    dispatch(fetchAllDomains());
    dispatch(fetchAllCategories());
  }, [dispatch]);

  useEffect(() => {
    const filterData = categories?.filter((filter) => filter?.selected);
    setSelectedCategory(filterData[0]);
  }, [categories]);

  return (
    <div className="candidate-info-main-container">
      <Navbar />
      <Breadcrumb />

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

      {selectedCandidateTab === "Summary Fields" && (
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
                Default categories and fields cannot be deleted but can be
                hidden if not needed.
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
                  disable={addNewCategoryVisible || addNewCategoryButtonDisable}
                  icon={<AddIcon stroke="white" />}
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
                        {sortDataByOrder(categories)?.map((item, index) => (
                          <Draggable
                            key={item?._id}
                            draggableId={item._id?.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className={`customize-category-item ${
                                  item?.selected && "selected-category-item"
                                }`}
                                onClick={() => {
                                  if (!!item?.fields && !item?.editable) {
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
                                  {item?.showFields && (
                                    <button className="display-flex align-center justify-center">
                                      <ArrowRight
                                        fill={
                                          item?.selected ? "#151B23" : "#797979"
                                        }
                                      />
                                    </button>
                                  )}

                                  {item?.editable ? (
                                    <>
                                      <input
                                        type="text"
                                        value={tempCategory?.name}
                                        autoFocus
                                        onFocus={(e) =>
                                          setTimeout(() => {
                                            e.target.select();
                                            e.target.focus();
                                          }, 0)
                                        }
                                        onChange={(e) =>
                                          setTempCategory({
                                            ...tempCategory,
                                            name: e.target.value?.trimStart(),
                                          })
                                        }
                                        className={`customize-category-input ${
                                          item?.selected &&
                                          "selected-customize-category-input"
                                        }`}
                                      />
                                      <div
                                        className="flex items-center"
                                        style={{ gap: 8 }}
                                      >
                                        <CancelIcon
                                          className="cursor-pointer"
                                          onClick={cancelEditCategoryHandler}
                                        />
                                        {updateCategoryLoading ? (
                                          <CommonLoader
                                            className={"loader-black"}
                                          />
                                        ) : (
                                          <RightIcon
                                            className=" cursor-pointer"
                                            onClick={saveCategoryHandler}
                                          />
                                        )}
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <div
                                        className="flex-1"
                                        style={{
                                          cursor: "pointer",
                                        }}
                                      >
                                        <span className="font-14-regular color-grey ">
                                          {item?.label}
                                        </span>
                                      </div>
                                      <div
                                        className="display-flex align-center"
                                        style={{ gap: 8 }}
                                      >
                                        {item?.default && (
                                          <LockIcon
                                            stroke={
                                              item?.selected
                                                ? "#151B23"
                                                : "#797979"
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
                                              item?.selected
                                                ? "#151B23"
                                                : "#797979"
                                            }
                                          />
                                        </button>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
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
                            <button
                              className="common-menu-item-btn"
                              onClick={() => {
                                hideCategoryHandler();
                                handleCategoryMenuClose();
                              }}
                            >
                              <HideIcon />{" "}
                              {selectedItem?.hide ? "Un-Hide" : "Hide"}
                            </button>

                            {!selectedItem?.default && (
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
                  {addNewCategoryVisible && (
                    <div
                      className={`customize-category-item ${
                        true && "selected-category-item"
                      }`}
                      style={{ marginTop: 8 }}
                    >
                      <div
                        className="display-flex align-center "
                        style={{ gap: 8, flex: 1 }}
                      >
                        <div>
                          <DraggableIcon fill={"#151B23"} />
                        </div>
                        <button className="display-flex align-center justify-center">
                          <ArrowRight fill={"#151B23"} />
                        </button>
                        <input
                          type="text"
                          value={tempCategory?.name || ""}
                          onChange={(e) =>
                            setTempCategory({
                              ...tempCategory,
                              name: e.target.value?.trimStart(),
                            })
                          }
                          className={`customize-category-input ${
                            true && "selected-customize-category-input"
                          }`}
                          autoFocus
                          onFocus={(e) =>
                            setTimeout(() => {
                              e.target.select();
                              e.target.focus();
                            }, 0)
                          }
                        />
                        <div className="flex items-center" style={{ gap: 8 }}>
                          <CancelIcon
                            className="cursor-pointer"
                            onClick={() => {
                              setAddNewCategoryVisible(false);
                              setTempCategory(null);
                            }}
                          />
                          {addCategoryLoading ? (
                            <CommonLoader className={"loader-black"} />
                          ) : (
                            <RightIcon
                              className=" cursor-pointer"
                              onClick={addCategoryHandler}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </DragDropContext>
              </div>
            </div>
            <div className="flex-1">
              {!!selectedCategory?.fields && (
                <div className="category-main-container">
                  <div className="display-flex-justify align-center">
                    <p className="font-14-medium color-dark-black">
                      Fields - {selectedCategory?.label}
                    </p>
                    <CommonAddButton
                      title={"Add Field"}
                      onClick={() => {
                        setSelectedFieldItem(null);
                        setTimeout(() => {
                          toggleAddFieldDrawer(true);
                        }, 100);
                      }}
                      icon={<AddIcon stroke="white" />}
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
                                  key={item?._id}
                                  draggableId={item._id?.toLocaleString()}
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
                                          {item?.label}
                                        </p>
                                      </div>
                                      <div
                                        className="display-flex align-center"
                                        style={{ gap: 8 }}
                                      >
                                        {item?.default && (
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
                                  <button
                                    className="common-menu-item-btn"
                                    onClick={() => {
                                      handleFieldMenuClose();
                                      hideCategoryFieldHandler();
                                    }}
                                  >
                                    <HideIcon />{" "}
                                    {selectedFieldItem?.hide
                                      ? "Un-Hide"
                                      : "Hide"}
                                  </button>

                                  {!selectedFieldItem?.default && (
                                    <>
                                      <button
                                        className="common-menu-item-btn"
                                        onClick={() => {
                                          handleFieldMenuClose();
                                          toggleAddFieldDrawer(true);
                                        }}
                                      >
                                        <EditIcon /> Edit
                                      </button>
                                      <button
                                        className="common-menu-item-btn"
                                        onClick={() => {
                                          setModalVisibility(
                                            "categoryFieldDeleteModalVisible",
                                            true
                                          );
                                          handleFieldMenuClose();
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
      )}

      {selectedCandidateTab === "Labels" && (
        <div className="candidate-customization-container">
          <p className="font-16-medium color-dark-black">
            {selectedCandidateTab}
          </p>
          <div className="display-column" style={{ gap: 10 }}>
            <p className="font-14-regular color-grey">
              Create and manage candidate labels to organize and classify
              profiles for easy filtering and categorization.
            </p>
            <ul className="font-14-regular color-grey customize-summary-field-ul">
              <li>
                Changes made here will be reflected across all users in your
                account.
              </li>
            </ul>
          </div>
          <div className="label-main-container">
            <div style={{ alignSelf: "flex-start" }}>
              <CommonAddButton
                title={"Add Label"}
                disable={editingIndex !== null || addNewLabel}
                onClick={addNewLabelHandler}
                icon={<AddIcon stroke="white" />}
              />
            </div>
            <div className="display-column" style={{ gap: 8 }}>
              {labelData?.length > 0 ? (
                <div className="display-column" style={{ gap: 8 }}>
                  {labelData?.map((label, index) => (
                    <div key={index}>
                      <div
                        className={`customize-label-item ${
                          editingIndex === index && "selected-category-item"
                        }`}
                      >
                        <div className="flex items-center gap-2 flex-1">
                          <LableIcon
                            fill={
                              editingIndex === index
                                ? tempLabel?.color
                                : label?.color
                            }
                          />
                          {editingIndex === index ? (
                            <input
                              type="text"
                              value={tempLabel?.name}
                              onChange={(e) =>
                                setTempLabel({
                                  ...tempLabel,
                                  name: e.target.value?.trimStart(),
                                })
                              }
                              className={`customize-category-input ${
                                editingIndex === index &&
                                "selected-customize-category-input"
                              }`}
                              autoFocus
                              onFocus={(e) =>
                                setTimeout(() => {
                                  e.target.select();
                                  e.target.focus();
                                }, 0)
                              }
                            />
                          ) : (
                            <span className="font-14-regular color-grey">
                              {label?.name}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center" style={{ gap: 8 }}>
                          {editingIndex === index ? (
                            <>
                              <CancelIcon
                                className="cursor-pointer"
                                onClick={cancelEdit}
                              />
                              {updateLabelLoading ? (
                                <CommonLoader className={"loader-black"} />
                              ) : (
                                <RightIcon
                                  className=" cursor-pointer"
                                  onClick={saveLabel}
                                />
                              )}
                            </>
                          ) : (
                            <>
                              <EditIcon
                                className="cursor-pointer"
                                onClick={() => editLabel(index, label?._id)}
                              />
                              <DeleteIcon
                                className="cursor-pointer"
                                onClick={() => {
                                  setSelectedLabelId(label?._id);
                                  setModalVisibility(
                                    "labelDeleteModalVisible",
                                    true
                                  );
                                }}
                              />
                            </>
                          )}
                        </div>
                      </div>

                      {editingIndex === index && (
                        <div className="select-label-color-div">
                          <p className="font-14-regular color-grey">
                            Select Label Color
                          </p>
                          <div className="default-color-div">
                            {defaultColorList?.map((item, idx) => (
                              <button
                                className={`default-color-btn ${
                                  item === tempLabel?.color
                                    ? "selected-color-btn"
                                    : ""
                                }`}
                                key={idx}
                                onClick={() =>
                                  setTempLabel({ ...tempLabel, color: item })
                                }
                              >
                                <LableIcon width={36} height={36} fill={item} />
                              </button>
                            ))}
                            <button onClick={() => setColorPickerVisible(true)}>
                              <AddCircleIcon />
                            </button>
                          </div>
                          {colorPickerVisible && (
                            <div style={{ alignSelf: "center" }}>
                              <HexColorPicker
                                color={tempLabel?.color}
                                onChange={(color) =>
                                  setTempLabel({ ...tempLabel, color })
                                }
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="font-14-regular color-grey">
                  No labels added yet. Start by creating labels to categorize
                  and organize your candidates.
                </p>
              )}
              {addNewLabel && (
                <div className="display-column" style={{ gap: 8 }}>
                  <div
                    className={`customize-label-item ${"selected-category-item"}`}
                  >
                    <div className="flex items-center gap-2 flex-1">
                      <LableIcon fill={tempLabel?.color} />

                      <input
                        type="text"
                        value={tempLabel?.name}
                        onChange={(e) =>
                          setTempLabel({
                            ...tempLabel,
                            name: e.target.value?.trimStart(),
                          })
                        }
                        className={`customize-category-input ${"selected-customize-category-input"}`}
                        autoFocus
                        onFocus={(e) =>
                          setTimeout(() => {
                            e.target.select();
                            e.target.focus();
                          }, 0)
                        }
                      />
                    </div>
                    <div className="flex items-center" style={{ gap: 8 }}>
                      <CancelIcon
                        className="cursor-pointer"
                        onClick={cancelEdit}
                      />
                      {addLabelLoading ? (
                        <CommonLoader className={"loader-black"} />
                      ) : (
                        <RightIcon
                          className=" cursor-pointer"
                          onClick={addLabelFunction}
                        />
                      )}
                    </div>
                  </div>

                  {true && (
                    <div className="select-label-color-div">
                      <p className="font-14-regular color-grey">
                        Select Label Color
                      </p>
                      <div className="default-color-div">
                        {defaultColorList?.map((item, idx) => (
                          <button
                            className={`default-color-btn ${
                              item === tempLabel?.color
                                ? "selected-color-btn"
                                : ""
                            }`}
                            key={idx}
                            onClick={() =>
                              setTempLabel({ ...tempLabel, color: item })
                            }
                          >
                            <LableIcon width={36} height={36} fill={item} />
                          </button>
                        ))}
                        <button onClick={() => setColorPickerVisible(true)}>
                          <AddCircleIcon />
                        </button>
                      </div>
                      {colorPickerVisible && (
                        <div style={{ alignSelf: "center" }}>
                          <HexColorPicker
                            color={tempLabel?.color}
                            onChange={(color) =>
                              setTempLabel({ ...tempLabel, color })
                            }
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedCandidateTab === "Domains" && (
        <div className="candidate-customization-container">
          <p className="font-16-medium color-dark-black">
            {selectedCandidateTab}
          </p>
          <div className="display-column" style={{ gap: 10 }}>
            <p className="font-14-regular color-grey">
              Create and manage domains to categorize and organize industries
              for streamlined filtering and classification.
            </p>
            <ul className="font-14-regular color-grey customize-summary-field-ul">
              <li>
                Changes made here will be reflected across all users in your
                account.
              </li>
            </ul>
          </div>
          <div className="label-main-container">
            <div style={{ alignSelf: "flex-start" }}>
              <CommonAddButton
                title={"Add Domain"}
                disable={editingIndex !== null || addNewDomain}
                onClick={addNewDomainHandler}
                icon={<AddIcon stroke="white" />}
              />
            </div>
            <div className="display-column" style={{ gap: 8 }}>
              {domainData?.length > 0 ? (
                <div className="display-column" style={{ gap: 8 }}>
                  {domainData?.map((domain, index) => (
                    <div key={index}>
                      <div
                        className={`customize-label-item ${
                          editingIndex === index && "selected-category-item"
                        }`}
                      >
                        <div className="flex items-center gap-2 flex-1">
                          {editingIndex === index ? (
                            <input
                              type="text"
                              value={tempDomain?.name}
                              onChange={(e) =>
                                setTempDomain({
                                  ...tempDomain,
                                  name: e.target.value?.trimStart(),
                                })
                              }
                              className={`customize-category-input ${
                                editingIndex === index &&
                                "selected-customize-category-input"
                              }`}
                              autoFocus
                              onFocus={(e) =>
                                setTimeout(() => {
                                  e.target.select();
                                  e.target.focus();
                                }, 0)
                              }
                            />
                          ) : (
                            <span className="font-14-regular color-grey">
                              {domain?.name}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center" style={{ gap: 8 }}>
                          {editingIndex === index ? (
                            <>
                              <CancelIcon
                                className="cursor-pointer"
                                onClick={cancelEdit}
                              />
                              {updateDomainLoading ? (
                                <CommonLoader className={"loader-black"} />
                              ) : (
                                <RightIcon
                                  className=" cursor-pointer"
                                  onClick={saveDomain}
                                />
                              )}
                            </>
                          ) : (
                            <>
                              <EditIcon
                                className="cursor-pointer"
                                onClick={() => editDomain(index)}
                              />
                              <DeleteIcon
                                className="cursor-pointer"
                                onClick={() => {
                                  setSelectedDomainId(domain?._id);
                                  setModalVisibility(
                                    "domainDeleteModalVisible",
                                    true
                                  );
                                }}
                              />
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="font-14-regular color-grey">
                  No labels added yet. Start by creating labels to categorize
                  and organize your candidates.
                </p>
              )}
              {addNewDomain && (
                <div
                  className={`customize-label-item ${"selected-category-item"}`}
                >
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="text"
                      value={tempDomain?.name}
                      onChange={(e) =>
                        setTempDomain({
                          ...tempDomain,
                          name: e.target.value?.trimStart(),
                        })
                      }
                      className={`customize-category-input ${"selected-customize-category-input"}`}
                      autoFocus
                      onFocus={(e) =>
                        setTimeout(() => {
                          e.target.select();
                          e.target.focus();
                        }, 0)
                      }
                    />
                  </div>
                  <div className="flex items-center" style={{ gap: 8 }}>
                    <CancelIcon
                      className="cursor-pointer"
                      onClick={cancelEditDomain}
                    />
                    {addDomainLoading ? (
                      <CommonLoader className={"loader-black"} />
                    ) : (
                      <RightIcon
                        className="cursor-pointer"
                        onClick={addDomainFunction}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <CommonDeleteModal
        visible={modals?.categoryDeleteModalVisible}
        title={"Delete Category"}
        description={"Are you sure you want to delete this category?"}
        onClose={() => {
          setModalVisibility("categoryDeleteModalVisible", false);
          setSelectedItem(null);
        }}
        onClickDelete={deleteCategoryHandler}
        isLoading={deleteCategoryLoading}
      />

      <CommonDeleteModal
        visible={modals?.categoryFieldDeleteModalVisible}
        title={"Delete Field"}
        description={"Are you sure you want to delete this field?"}
        onClose={() => {
          setModalVisibility("categoryFieldDeleteModalVisible", false);
          setSelectedFieldItem(null);
        }}
        onClickDelete={deleteCategoryFieldHandler}
        isLoading={deleteCategoryFieldLoading}
      />

      <CommonDeleteModal
        visible={modals?.labelDeleteModalVisible}
        title={"Delete Label"}
        description={
          "Are you sure you want to delete this label? Any used instances will be also removed."
        }
        onClose={() => {
          setModalVisibility("labelDeleteModalVisible", false);
          setSelectedLabelId(null);
        }}
        onClickDelete={() => deleteLabelFunction(selectedLabelId)}
        isLoading={deleteLabelLoading}
      />

      <CommonDeleteModal
        visible={modals?.domainDeleteModalVisible}
        title={"Delete Domain"}
        description={
          "Are you sure you want to delete this domain? Any used instances will be also removed."
        }
        onClose={() => {
          setModalVisibility("domainDeleteModalVisible", false);
          setSelectedDomainId(null);
        }}
        onClickDelete={() => deleteDomainFunction(selectedDomainId)}
        isLoading={deleteDomainLoading}
      />
      <AddFieldDrawer
        visible={addFieldDrawerOpen}
        onClose={() => toggleAddFieldDrawer(false)}
        onSave={(item) => {
          if (!!selectedFieldItem) {
            updateCategoryFieldHandler(item);
          } else {
            addCategoryFieldHandler(item);
          }
        }}
        selectedData={selectedFieldItem}
        isLoading={addCategoryFieldLoading || updateCategoryFieldLoading}
      />
    </div>
  );
};

export default CandidateCustomization;
