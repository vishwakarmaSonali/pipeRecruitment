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
        labelData: [...state.labelData, action?.data?.resp],
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
        domainData: [...state.domainData, action?.data?.resp],
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
    default:
      return state;
  }
};

export default customizationReducer;
