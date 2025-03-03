import axios from "axios";
import {
  BASE_URL,
  getDomainEndpoint,
  getLabelEndpoint,
} from "../helpers/apiConfig";
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

export const fetchAllLabels = (token) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_LABEL_REQUEST });
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${BASE_URL}${getLabelEndpoint}`,
        config
      );

      dispatch({
        type: FETCH_LABEL_SUCCESS,
        labelData: response?.data,
      });
      return response.data;
    } catch (error) {
      if (error?.response?.data) {
        dispatch({
          type: FETCH_LABEL_FAILURE,
        });
        return error?.response?.data?.message;
      } else {
        dispatch({
          type: FETCH_LABEL_FAILURE,
        });
        return error.message;
      }
    }
  };
};

export const updateLabel = (token, id, data) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_LABEL_REQUEST });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        `${BASE_URL}${getLabelEndpoint}/${id}`,
        JSON.stringify(data),
        config
      );
      dispatch({
        type: UPDATE_LABEL_SUCCESS,
        data: response?.data,
        id: id,
      });
      return response;
    } catch (error) {
      if (error?.response?.data) {
        dispatch({
          type: UPDATE_LABEL_FAILURE,
        });
        return error?.response?.data?.message;
      } else {
        dispatch({
          type: UPDATE_LABEL_FAILURE,
        });
        return error.message;
      }
    }
  };
};

export const deleteLabel = (token, id) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_LABEL_REQUEST });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(
        `${BASE_URL}${getLabelEndpoint}/${id}`,
        config
      );
      dispatch({
        type: DELETE_LABEL_SUCCESS,
        id: id,
      });
      return response?.data;
    } catch (error) {
      if (error?.response?.data) {
        dispatch({
          type: DELETE_LABEL_FAILURE,
        });
        return error?.response?.data?.message;
      } else {
        dispatch({
          type: DELETE_LABEL_FAILURE,
        });
        return error.message;
      }
    }
  };
};

export const addLabel = (token, data) => {
  return async (dispatch) => {
    dispatch({ type: ADD_LABEL_REQUEST });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${BASE_URL}${getLabelEndpoint}`,
        JSON.stringify(data),
        config
      );
      dispatch({
        type: ADD_LABEL_SUCCESS,
        data: response?.data,
      });
      return response?.data;
    } catch (error) {
      if (error?.response?.data) {
        dispatch({
          type: ADD_LABEL_FAILURE,
        });
        return error?.response?.data?.message;
      } else {
        dispatch({
          type: ADD_LABEL_FAILURE,
        });
        return error.message;
      }
    }
  };
};

export const fetchAllDomains = (token) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_DOMAIN_REQUEST });
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${BASE_URL}${getDomainEndpoint}`,
        config
      );

      dispatch({
        type: FETCH_DOMAIN_SUCCESS,
        domainData: response?.data,
      });
      return response.data;
    } catch (error) {
      if (error?.response?.data) {
        dispatch({
          type: FETCH_DOMAIN_FAILURE,
        });
        return error?.response?.data?.message;
      } else {
        dispatch({
          type: FETCH_DOMAIN_FAILURE,
        });
        return error.message;
      }
    }
  };
};

export const addDomain = (token, data) => {
  return async (dispatch) => {
    dispatch({ type: ADD_DOMAIN_REQUEST });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${BASE_URL}${getDomainEndpoint}`,
        JSON.stringify(data),
        config
      );
      dispatch({
        type: ADD_DOMAIN_SUCCESS,
        data: response?.data,
      });
      return response?.data;
    } catch (error) {
      if (error?.response?.data) {
        dispatch({
          type: ADD_DOMAIN_FAILURE,
        });
        return error?.response?.data?.message;
      } else {
        dispatch({
          type: ADD_DOMAIN_FAILURE,
        });
        return error.message;
      }
    }
  };
};

export const updateDomain = (token, id, data) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_DOMAIN_REQUEST });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        `${BASE_URL}${getDomainEndpoint}/${id}`,
        JSON.stringify(data),
        config
      );
      dispatch({
        type: UPDATE_DOMAIN_SUCCESS,
        data: response?.data,
        id: id,
      });
      return response;
    } catch (error) {
      if (error?.response?.data) {
        dispatch({
          type: UPDATE_DOMAIN_FAILURE,
        });
        return error?.response?.data?.message;
      } else {
        dispatch({
          type: UPDATE_DOMAIN_FAILURE,
        });
        return error.message;
      }
    }
  };
};

export const deleteDomain = (token, id) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_DOMAIN_REQUEST });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(
        `${BASE_URL}${getDomainEndpoint}/${id}`,
        config
      );
      dispatch({
        type: DELETE_DOMAIN_SUCCESS,
        id: id,
      });
      return response?.data;
    } catch (error) {
      if (error?.response?.data) {
        dispatch({
          type: DELETE_DOMAIN_FAILURE,
        });
        return error?.response?.data?.message;
      } else {
        dispatch({
          type: DELETE_DOMAIN_FAILURE,
        });
        return error.message;
      }
    }
  };
};
