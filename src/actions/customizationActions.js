import { getDomainEndpoint, getLabelEndpoint } from "../helpers/apiConfig";
import {
  CATEGORY_CUSTOMIZATION_REQUEST,
  CATEGORY_FIELD_CUSTOMIZATION_REQUEST,
  ADD_NEW_CATEGORY_REQUEST,
  DELETE_CATEGORY_REQUEST,
  FETCH_LABEL_REQUEST,
  FETCH_LABEL_SUCCESS,
  FETCH_LABEL_FAILURE,
  ADD_LABEL_FAILURE,
  ADD_LABEL_REQUEST,
  ADD_LABEL_SUCCESS,
  UPDATE_LABEL_REQUEST,
  UPDATE_LABEL_SUCCESS,
  UPDATE_LABEL_FAILURE,
  DELETE_LABEL_REQUEST,
  DELETE_LABEL_SUCCESS,
  DELETE_LABEL_FAILURE,
  FETCH_DOMAIN_REQUEST,
  FETCH_DOMAIN_SUCCESS,
  FETCH_DOMAIN_FAILURE,
  ADD_DOMAIN_REQUEST,
  ADD_DOMAIN_FAILURE,
  ADD_DOMAIN_SUCCESS,
  UPDATE_DOMAIN_REQUEST,
  UPDATE_DOMAIN_FAILURE,
  UPDATE_DOMAIN_SUCCESS,
  DELETE_DOMAIN_FAILURE,
  DELETE_DOMAIN_REQUEST,
  DELETE_DOMAIN_SUCCESS,
} from "./actionsType";
import axiosInstance from "./axiosInstance";

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

export const fetchAllLabels = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_LABEL_REQUEST });
    try {
      const response = await axiosInstance.get(getLabelEndpoint);
      dispatch({ type: FETCH_LABEL_SUCCESS, labelData: response.data });
      return response.data;
    } catch (error) {
      dispatch({ type: FETCH_LABEL_FAILURE });
      return error.response?.data?.message || error.message;
    }
  };
};

export const updateLabel = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_LABEL_REQUEST });
    try {
      const response = await axiosInstance.put(
        `${getLabelEndpoint}/${id}`,
        data
      );
      dispatch({ type: UPDATE_LABEL_SUCCESS, data: response.data?.label });
      return response?.data;
    } catch (error) {
      dispatch({ type: UPDATE_LABEL_FAILURE });
      return error.response?.data?.message || error.message;
    }
  };
};

export const deleteLabel = (id) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_LABEL_REQUEST });
    try {
      const response = await axiosInstance.delete(`${getLabelEndpoint}/${id}`);
      dispatch({ type: DELETE_LABEL_SUCCESS, id });
      return response?.data;
    } catch (error) {
      dispatch({ type: DELETE_LABEL_FAILURE });
      return error.response?.data?.message || error.message;
    }
  };
};

export const addLabel = (data) => {
  return async (dispatch) => {
    dispatch({ type: ADD_LABEL_REQUEST });
    try {
      const response = await axiosInstance.post(getLabelEndpoint, data);
      dispatch({ type: ADD_LABEL_SUCCESS, data: response.data?.lable });
      return response.data;
    } catch (error) {
      dispatch({ type: ADD_LABEL_FAILURE });
      return error.response?.data?.message || error.message;
    }
  };
};

export const fetchAllDomains = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_DOMAIN_REQUEST });
    try {
      const response = await axiosInstance.get(getDomainEndpoint);
      dispatch({ type: FETCH_DOMAIN_SUCCESS, domainData: response.data });
      return response.data;
    } catch (error) {
      dispatch({ type: FETCH_DOMAIN_FAILURE });
      return error.response?.data?.message || error.message;
    }
  };
};

export const addDomain = (data) => {
  return async (dispatch) => {
    dispatch({ type: ADD_DOMAIN_REQUEST });
    try {
      const response = await axiosInstance.post(getDomainEndpoint, data);
      dispatch({ type: ADD_DOMAIN_SUCCESS, data: response.data?.domain });
      return response.data;
    } catch (error) {
      dispatch({ type: ADD_DOMAIN_FAILURE });
      return error.response?.data?.message || error.message;
    }
  };
};

export const updateDomain = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_DOMAIN_REQUEST });
    try {
      const response = await axiosInstance.put(
        `${getDomainEndpoint}/${id}`,
        data
      );
      dispatch({
        type: UPDATE_DOMAIN_SUCCESS,
        data: response.data?.domain,
        id,
      });
      return response?.data;
    } catch (error) {
      dispatch({ type: UPDATE_DOMAIN_FAILURE });
      return error.response?.data?.message || error.message;
    }
  };
};

export const deleteDomain = (id) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_DOMAIN_REQUEST });
    try {
      const response = await axiosInstance.delete(`${getDomainEndpoint}/${id}`);
      dispatch({ type: DELETE_DOMAIN_SUCCESS, id });
      return response?.data;
    } catch (error) {
      dispatch({ type: DELETE_DOMAIN_FAILURE });
      return error.response?.data?.message || error.message;
    }
  };
};
