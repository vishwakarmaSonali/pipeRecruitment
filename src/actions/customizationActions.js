import {
  CATEGORY_CUSTOMIZATION_REQUEST,
  CATEGORY_FIELD_CUSTOMIZATION_REQUEST,
  ADD_NEW_CATEGORY_REQUEST,
  DELETE_CATEGORY_REQUEST,
} from "./actionsType";

export const categoryDraggableFuction = (data) => {
  return (dispatch) => {
    dispatch({ type: CATEGORY_CUSTOMIZATION_REQUEST, data: data });
  };
};

export const categoryFieldDraggableFuction = (id, data) => {
  return (dispatch) => {
    dispatch({
      type: CATEGORY_FIELD_CUSTOMIZATION_REQUEST,
      id: id,
      data: data,
    });
  };
};

export const addNewCategoryFunction = (data) => {
  return (dispatch) => {
    dispatch({
      type: ADD_NEW_CATEGORY_REQUEST,
      data: data,
    });
  };
};

export const deleteCategoryFunction = (data) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_CATEGORY_REQUEST,
      data: data,
    });
  };
};
