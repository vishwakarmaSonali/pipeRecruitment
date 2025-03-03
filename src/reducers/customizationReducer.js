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
} from "../actions/actionsType";
import { defaultCategoryData } from "../helpers/config";

const initialState = {
  categoryData: defaultCategoryData,
  fetchLabelLoading: false,
  labelData: [],
  updateLabelLoading: false,
  deleteLabelLoading: false,
  addLabelLoading: false,
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
          if (item?._id === action?.id) {
            return {
              ...item,
              name: action?.data?.name,
              color: action?.data?.color,
              createdAt: action?.data?.createdAt,
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
        labelData: [action?.data?.resp, ...state.labelData],
      };
    case ADD_LABEL_FAILURE:
      return {
        ...state,
        addLabelLoading: false,
      };

    default:
      return state;
  }
};

export default customizationReducer;
