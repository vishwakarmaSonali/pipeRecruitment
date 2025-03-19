import {
  CATEGORY_CUSTOMIZATION_REQUEST,
  CATEGORY_FIELD_CUSTOMIZATION_REQUEST,
  ADD_NEW_CATEGORY_REQUEST,
  DELETE_CATEGORY_REQUEST,
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
    case DELETE_CATEGORY_REQUEST:
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
          return action?.updatedData?.result;
        } else {
          return category;
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
      console.log("action.payload.dataaction.payload.data",action.payload);
      
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

    default:
      return state;
  }
};

export default customizationReducer;
