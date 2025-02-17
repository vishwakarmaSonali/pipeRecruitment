import {
  CATEGORY_CUSTOMIZATION_REQUEST,
  CATEGORY_FIELD_CUSTOMIZATION_REQUEST,
  ADD_NEW_CATEGORY_REQUEST,
  DELETE_CATEGORY_REQUEST,
} from "../actions/actionsType";
import { defaultCategoryData } from "../helpers/config";

const initialState = {
  categoryData: defaultCategoryData,
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
    default:
      return state;
  }
};

export default customizationReducer;
