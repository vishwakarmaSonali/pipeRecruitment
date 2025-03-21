import {
  CATEGORY_CUSTOMIZATION_REQUEST,
  CATEGORY_FIELD_CUSTOMIZATION_REQUEST,
  ADD_NEW_CATEGORY_REQUEST,
  FETCH_LABEL_REQUEST,
  FETCH_LABEL_SUCCESS,
  FETCH_LABEL_FAILURE,
  UPDATE_LABEL_REQUEST,
  UPDATE_LABEL_SUCCESS,
  UPDATE_LABEL_FAILURE,
  DELETE_LABEL_REQUEST,
  DELETE_LABEL_SUCCESS,
  DELETE_LABEL_FAILURE,
  ADD_LABEL_REQUEST,
  ADD_LABEL_SUCCESS,
  ADD_LABEL_FAILURE,
  FETCH_DOMAIN_REQUEST,
  FETCH_DOMAIN_SUCCESS,
  FETCH_DOMAIN_FAILURE,
  ADD_DOMAIN_FAILURE,
  ADD_DOMAIN_REQUEST,
  ADD_DOMAIN_SUCCESS,
  UPDATE_DOMAIN_REQUEST,
  UPDATE_DOMAIN_FAILURE,
  UPDATE_DOMAIN_SUCCESS,
  DELETE_DOMAIN_FAILURE,
  DELETE_DOMAIN_REQUEST,
  DELETE_DOMAIN_SUCCESS,
  FETCH_ALL_CATEGORIES_REQUEST,
  FETCH_ALL_CATEGORIES_SUCCESS,
  FETCH_ALL_CATEGORIES_FAILURE,
  REORDER_CATEGORIES_REQUEST,
  REORDER_CATEGORIES_SUCCESS,
  REORDER_CATEGORIES_FAILURE,
  REORDER_CATEGORIRY_FIELD_SUCCESS,
  REORDER_CATEGORIRY_FIELD_REQUEST,
  REORDER_CATEGORIRY_FIELD_FAILURE,
  FETCH_ARCHIVE_CANDIDATES_SUCCESS,
  FETCH_ARCHIVE_CANDIDATES_FAILURE,
  FETCH_ARCHIVE_CANDIDATES_REQUEST,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILURE,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILURE,
  HIDE_CATEGORY_REQUEST,
  HIDE_CATEGORY_FAILURE,
  HIDE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILURE,
  DELETE_CATEGORY_FIELD_REQUEST,
  DELETE_CATEGORY_FIELD_SUCCESS,
  DELETE_CATEGORY_FIELD_FAILURE,
  HIDE_CATEGORY_FIELD_SUCCESS,
  HIDE_CATEGORY_FIELD_FAILURE,
  HIDE_CATEGORY_FIELD_REQUEST,
  ADD_CATEGORY_FIELD_REQUEST,
  ADD_CATEGORY_FIELD_SUCCESS,
  ADD_CATEGORY_FIELD_FAILURE,
  UPDATE_CATEGORY_FIELD_REQUEST,
  UPDATE_CATEGORY_FIELD_SUCCESS,
  UPDATE_CATEGORY_FIELD_FAILURE,
} from "../actions/actionsType";
import { defaultCategoryData } from "../helpers/config";

const initialState = {
  categoryData: defaultCategoryData,
  fetchLabelLoading: false,
  labelData: [],
  updateLabelLoading: false,
  deleteLabelLoading: false,
  addLabelLoading: false,
  fetchDomainLoading: false,
  domainData: [],
  updateDomainLoading: false,
  deleteDomainLoading: false,
  addDomainLoading: false,
  fetchLoading: false,
  categoriesData: [],
  reorderLoading: false,
  archivedCandidates: [],
  addCategoryLoading: false,
  deleteCategoryLoading: false,
  hideCategoryLoading: false,
  updateCategoryLoading: false,
  deleteCategoryFieldLoading: false,
  hideCategoryFieldLoading: false,
  addCategoryFieldLoading: false,
  updateCategoryFieldLoading: false,
};

const customizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_CUSTOMIZATION_REQUEST:
      return {
        ...state,
        categoryData: [...action?.data],
      };
    case CATEGORY_FIELD_CUSTOMIZATION_REQUEST:
      const updateData = state.categoryData?.map((item) => {
        if (item?.id === action?.id) {
          return { ...item, fields: action?.data };
        } else {
          return { ...item };
        }
      });
      return {
        ...state,
        categoryData: updateData,
      };
    case ADD_NEW_CATEGORY_REQUEST:
      return {
        ...state,
        categoryData: [...action?.data],
      };

    case ADD_NEW_CATEGORY_REQUEST:
      return {
        ...state,
        categoryData: [...action?.data],
      };

    case FETCH_LABEL_REQUEST:
      return {
        ...state,
        fetchLabelLoading: true,
      };
    case FETCH_LABEL_SUCCESS:
      return {
        ...state,
        fetchLabelLoading: false,
        labelData: action?.labelData,
      };
    case FETCH_LABEL_FAILURE:
      return {
        ...state,
        fetchLabelLoading: false,
      };

    case UPDATE_LABEL_REQUEST:
      return {
        ...state,
        updateLabelLoading: true,
      };
    case UPDATE_LABEL_SUCCESS:
      return {
        ...state,
        updateLabelLoading: false,
        labelData: state?.labelData?.map((item) => {
          if (item?._id === action?.data?._id) {
            return {
              ...action?.data,
            };
          } else {
            return { ...item };
          }
        }),
      };
    case UPDATE_LABEL_FAILURE:
      return {
        ...state,
        updateLabelLoading: false,
      };

    case DELETE_LABEL_REQUEST:
      return {
        ...state,
        deleteLabelLoading: true,
      };
    case DELETE_LABEL_SUCCESS:
      return {
        ...state,
        deleteLabelLoading: false,
        labelData: state?.labelData?.filter((item) => item?._id !== action?.id),
      };
    case DELETE_LABEL_FAILURE:
      return {
        ...state,
        deleteLabelLoading: false,
      };

    case ADD_LABEL_REQUEST:
      return {
        ...state,
        addLabelLoading: true,
      };
    case ADD_LABEL_SUCCESS:
      return {
        ...state,
        addLabelLoading: false,
        labelData: [...state.labelData, action?.data],
      };
    case ADD_LABEL_FAILURE:
      return {
        ...state,
        addLabelLoading: false,
      };

    case FETCH_DOMAIN_REQUEST:
      return {
        ...state,
        fetchDomainLoading: true,
      };
    case FETCH_DOMAIN_SUCCESS:
      return {
        ...state,
        fetchDomainLoading: false,
        domainData: action?.domainData,
      };
    case FETCH_DOMAIN_FAILURE:
      return {
        ...state,
        fetchDomainLoading: false,
      };

    case ADD_DOMAIN_REQUEST:
      return {
        ...state,
        addDomainLoading: true,
      };
    case ADD_DOMAIN_SUCCESS:
      return {
        ...state,
        addDomainLoading: false,
        domainData: [...state.domainData, action?.data],
      };
    case ADD_DOMAIN_FAILURE:
      return {
        ...state,
        addDomainLoading: false,
      };

    case UPDATE_DOMAIN_REQUEST:
      return {
        ...state,
        updateDomainLoading: true,
      };
    case UPDATE_DOMAIN_SUCCESS:
      return {
        ...state,
        updateDomainLoading: false,
        domainData: state?.domainData?.map((item) => {
          if (item?._id === action?.data?._id) {
            return {
              ...action?.data,
            };
          } else {
            return { ...item };
          }
        }),
      };
    case UPDATE_DOMAIN_FAILURE:
      return {
        ...state,
        updateDomainLoading: false,
      };

    case DELETE_DOMAIN_REQUEST:
      return {
        ...state,
        deleteDomainLoading: true,
      };
    case DELETE_DOMAIN_SUCCESS:
      return {
        ...state,
        deleteDomainLoading: false,
        domainData: state?.domainData?.filter(
          (item) => item?._id !== action?.id
        ),
      };
    case DELETE_DOMAIN_FAILURE:
      return {
        ...state,
        deleteDomainLoading: false,
      };

    case FETCH_ALL_CATEGORIES_REQUEST:
      return {
        ...state,
        fetchLoading: true,
      };
    case FETCH_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        categoriesData: action.categoryData,
        fetchLoading: false,
      };
    case FETCH_ALL_CATEGORIES_FAILURE:
      return {
        ...state,
        fetchLoading: false,
      };

    case REORDER_CATEGORIES_REQUEST:
      return {
        ...state,
        reorderLoading: true,
      };
    case REORDER_CATEGORIES_SUCCESS:
      const updatedCategoryData = state.categoriesData?.map((category) => {
        const updatedCategory = action?.updatedCategoryData?.find(
          (update) => update?.categoryId === category?._id
        );
        return updatedCategory
          ? { ...category, order: updatedCategory?.order }
          : category;
      });

      return {
        ...state,
        reorderLoading: false,
        categoriesData: updatedCategoryData,
      };
    case REORDER_CATEGORIES_FAILURE:
      return {
        ...state,
        reorderLoading: false,
      };

    case REORDER_CATEGORIRY_FIELD_REQUEST:
      return {
        ...state,
        reorderLoading: true,
      };
    case REORDER_CATEGORIRY_FIELD_SUCCESS:
      const updatedCategoryFieldData = state.categoriesData?.map((category) => {
        if (category?._id === action?.updatedData?.result?._id) {
          return { ...action?.updatedData?.result, selected: true };
        } else {
          return { ...category, selected: false };
        }
      });

      return {
        ...state,
        categoriesData: updatedCategoryFieldData,
        reorderLoading: false,
      };
    case REORDER_CATEGORIRY_FIELD_FAILURE:
      return {
        ...state,
        reorderLoading: false,
      };
    case FETCH_ARCHIVE_CANDIDATES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_ARCHIVE_CANDIDATES_SUCCESS:
      console.log("action.payload.dataaction.payload.data", action.payload);

      return {
        ...state,
        loading: false,
        archivedCandidates: action.payload, // Store fetched candidates
      };

    case FETCH_ARCHIVE_CANDIDATES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADD_CATEGORY_REQUEST:
      return {
        ...state,
        addCategoryLoading: true,
      };
    case ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        addCategoryLoading: false,
        categoriesData: [...state.categoriesData, action?.data],
      };
    case ADD_CATEGORY_FAILURE:
      return {
        ...state,
        addCategoryLoading: false,
      };

    case DELETE_CATEGORY_REQUEST:
      return {
        ...state,
        deleteCategoryLoading: true,
      };
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        deleteCategoryLoading: false,
        categoriesData: state?.categoriesData?.filter(
          (item) => item?._id !== action?.id
        ),
      };
    case DELETE_CATEGORY_FAILURE:
      return {
        ...state,
        deleteCategoryLoading: false,
      };

    case HIDE_CATEGORY_REQUEST:
      return {
        ...state,
        hideCategoryLoading: true,
      };
    case HIDE_CATEGORY_SUCCESS:
      const updatedData = state?.categoriesData?.map((item) => {
        if (item?._id === action?.categoryId) {
          return {
            ...item,
            hide: action?.data?.hide,
            selected: false,
          };
        } else {
          return { ...item, selected: false };
        }
      });
      return {
        ...state,
        hideCategoryLoading: false,
        categoriesData: updatedData,
      };
    case HIDE_CATEGORY_FAILURE:
      return {
        ...state,
        hideCategoryLoading: false,
      };

    case UPDATE_CATEGORY_REQUEST:
      return {
        ...state,
        updateCategoryLoading: true,
      };
    case UPDATE_CATEGORY_SUCCESS:
      const updatedCategory = state?.categoriesData?.map((item) => {
        if (item?._id === action?.data?.categoryId) {
          return {
            ...item,
            label: action?.data?.label,
            editable: false,
          };
        } else {
          return { ...item };
        }
      });
      return {
        ...state,
        updateCategoryLoading: false,
        categoriesData: updatedCategory,
      };
    case UPDATE_CATEGORY_FAILURE:
      return {
        ...state,
        updateCategoryLoading: false,
      };

    case DELETE_CATEGORY_FIELD_REQUEST:
      return {
        ...state,
        deleteCategoryFieldLoading: true,
      };
    case DELETE_CATEGORY_FIELD_SUCCESS:
      const updatedFiterFieldsData = state?.categoriesData?.map((item) => {
        if (item?._id === action?.categoryID) {
          const filterFields = item?.fields?.filter(
            (filter) => filter?._id !== action?.fieldId
          );
          return { ...item, fields: filterFields, selected: true };
        } else {
          return { ...item, selected: false };
        }
      });
      return {
        ...state,
        deleteCategoryFieldLoading: false,
        categoriesData: updatedFiterFieldsData,
      };
    case DELETE_CATEGORY_FIELD_FAILURE:
      return {
        ...state,
        deleteCategoryFieldLoading: false,
      };

    case HIDE_CATEGORY_FIELD_REQUEST:
      return {
        ...state,
        hideCategoryFieldLoading: true,
      };
    case HIDE_CATEGORY_FIELD_SUCCESS:
      const updatedFiterHideFieldsData = state?.categoriesData?.map((item) => {
        if (item?._id === action?.categoryID) {
          const filterFields = item?.fields?.map((filter) => {
            if (filter?._id === action?.fieldId) {
              return {
                ...filter,
                hide: action?.data?.hide,
              };
            } else {
              return filter;
            }
          });
          return { ...item, fields: filterFields, selected: true };
        } else {
          return { ...item, selected: false };
        }
      });
      return {
        ...state,
        hideCategoryFieldLoading: false,
        categoriesData: updatedFiterHideFieldsData,
      };
    case HIDE_CATEGORY_FIELD_FAILURE:
      return {
        ...state,
        hideCategoryFieldLoading: false,
      };

    case ADD_CATEGORY_FIELD_REQUEST:
      return {
        ...state,
        addCategoryFieldLoading: true,
      };
    case ADD_CATEGORY_FIELD_SUCCESS:
      const filterCategoryData = state?.categoriesData?.map((item) => {
        if (item?._id === action?.categoryID) {
          return {
            ...item,
            fields: [...item?.fields, ...action?.data],
            selected: true,
          };
        } else {
          return item;
        }
      });
      return {
        ...state,
        categoriesData: filterCategoryData,
        addCategoryFieldLoading: false,
      };
    case ADD_CATEGORY_FIELD_FAILURE:
      return {
        ...state,
        addCategoryFieldLoading: false,
      };

    case UPDATE_CATEGORY_FIELD_REQUEST:
      return {
        ...state,
        updateCategoryFieldLoading: true,
      };
    case UPDATE_CATEGORY_FIELD_SUCCESS:
      const updatedFieldsData = state?.categoriesData?.map((item) => {
        if (item?._id === action?.categoryID) {
          const filterFields = item?.fields?.map((filter) => {
            if (filter?._id === action?.fieldId) {
              return {
                ...filter,
                label: action?.data?.label,
                description: action?.data?.description || "",
              };
            } else {
              return filter;
            }
          });
          return { ...item, fields: filterFields, selected: true };
        } else {
          return { ...item, selected: false };
        }
      });
      return {
        ...state,
        updateCategoryFieldLoading: false,
        categoriesData: updatedFieldsData,
      };
    case UPDATE_CATEGORY_FIELD_FAILURE:
      return {
        ...state,
        updateCategoryFieldLoading: false,
      };
    default:
      return state;
  }
};

export default customizationReducer;
