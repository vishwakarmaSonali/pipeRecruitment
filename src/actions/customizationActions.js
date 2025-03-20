import {
  addNewCategoryApiEndPoint,
  deleteCategoryApiEndPoint,
  fetchAllCategoriesApiEndPoint,
  getDomainEndpoint,
  getLabelEndpoint,
  reorderCategoryApiEndPoint,
  reorderCategoryFieldApiEndPoint,
} from "../helpers/apiConfig";
import { notifySuccess } from "../helpers/utils";
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
  FETCH_ALL_CATEGORIES_REQUEST,
  FETCH_ALL_CATEGORIES_SUCCESS,
  FETCH_ALL_CATEGORIES_FAILURE,
  REORDER_CATEGORIES_REQUEST,
  REORDER_CATEGORIES_SUCCESS,
  REORDER_CATEGORIES_FAILURE,
  REORDER_CATEGORIRY_FIELD_REQUEST,
  REORDER_CATEGORIRY_FIELD_SUCCESS,
  REORDER_CATEGORIRY_FIELD_FAILURE,
  FETCH_ARCHIVE_CANDIDATES_REQUEST,
  FETCH_ARCHIVE_CANDIDATES_SUCCESS,
  FETCH_ARCHIVE_CANDIDATES_FAILURE,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILURE,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILURE,
  HIDE_CATEGORY_REQUEST,
  HIDE_CATEGORY_SUCCESS,
  HIDE_CATEGORY_FAILURE,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILURE,
  DELETE_CANDIDATE_FAILURE,
  DELETE_CANDIDATE_SUCCESS,
  DELETE_CANDIDATE_REQUEST,

  RESTORE_CANDIDATE_REQUEST,
  RESTORE_CANDIDATE_SUCCESS,
  RESTORE_CANDIDATE_FAILURE,
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

export const fetchAllCategories = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ALL_CATEGORIES_REQUEST });
    try {
      const response = await axiosInstance.get(fetchAllCategoriesApiEndPoint);
      dispatch({
        type: FETCH_ALL_CATEGORIES_SUCCESS,
        categoryData: response.data,
      });
      return response.data;
    } catch (error) {
      dispatch({ type: FETCH_ALL_CATEGORIES_FAILURE });
      return error.response?.data?.message || error.message;
    }
  };
};
export const reorderCategory = (data, updateCategories) => {
  return async (dispatch) => {
    dispatch({ type: REORDER_CATEGORIES_REQUEST });
    try {
      const response = await axiosInstance.put(
        reorderCategoryApiEndPoint,
        data
      );
      dispatch({
        type: REORDER_CATEGORIES_SUCCESS,
        updatedCategoryData: updateCategories,
      });
      return response?.data;
    } catch (error) {
      dispatch({ type: REORDER_CATEGORIES_FAILURE });
      return error.response?.data?.message || error.message;
    }
  };
};

export const reorderCategoryFields = (data) => {
  return async (dispatch) => {
    dispatch({ type: REORDER_CATEGORIRY_FIELD_REQUEST });
    try {
      const response = await axiosInstance.put(
        reorderCategoryFieldApiEndPoint,
        data
      );
      dispatch({
        type: REORDER_CATEGORIRY_FIELD_SUCCESS,
        updatedData: response?.data,
      });
      return response?.data;
    } catch (error) {
      dispatch({ type: REORDER_CATEGORIRY_FIELD_FAILURE });
      return error.response?.data?.message || error.message;
    }
  };
};

export const UpdateCategoryFields = (data, categoryId, fieldId) => {
  return async (dispatch) => {
    dispatch({ type: REORDER_CATEGORIRY_FIELD_REQUEST });
    try {
      const response = await axiosInstance.put(
        `api/form-field-categories/${categoryId}/fields/${fieldId}`,
        data
      );
      dispatch({
        type: REORDER_CATEGORIRY_FIELD_SUCCESS,
        updatedData: response?.data,
      });
      return response?.data;
    } catch (error) {
      dispatch({ type: REORDER_CATEGORIRY_FIELD_FAILURE });
      return error.response?.data?.message || error.message;
    }
  };
};

export const fetchArchivedCandidates = (page = 1) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ARCHIVE_CANDIDATES_REQUEST });

    try {
      console.log(`Fetching Candidates for Page: ${page}`);
      const response = await axiosInstance.get(`api/candidates/archive?limit=10&page=${page}`);

      dispatch({
        type: FETCH_ARCHIVE_CANDIDATES_SUCCESS,
        payload: {
          results: response.data.results, // Store candidates
          total: response.data.total, // Store total candidates
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching archived candidates:", error);
      dispatch({ type: FETCH_ARCHIVE_CANDIDATES_FAILURE });
      return error.response?.data?.message || error.message;
    }
  };
};

export const addCategoryFunction = (data) => {
  return async (dispatch) => {
    dispatch({ type: ADD_CATEGORY_REQUEST });
    try {
      const response = await axiosInstance.post(
        addNewCategoryApiEndPoint,
        data
      );
      dispatch({ type: ADD_CATEGORY_SUCCESS, data: response.data?.result });
      return response.data;
    } catch (error) {
      dispatch({ type: ADD_CATEGORY_FAILURE });
      return error.response?.data?.message || error.message;
    }
  };
};

export const deleteCategory = (id) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_CATEGORY_REQUEST });
    try {
      const response = await axiosInstance.delete(
        `${deleteCategoryApiEndPoint}/${id}`
      );
      dispatch({ type: DELETE_CATEGORY_SUCCESS, id });
      return response?.data;
    } catch (error) {
      dispatch({ type: DELETE_CATEGORY_FAILURE });
      return error.response?.data?.message || error.message;
    }
  };
};

export const hideCategory = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: HIDE_CATEGORY_REQUEST });
    try {
      const response = await axiosInstance.put(
        `${deleteCategoryApiEndPoint}/${id}`,
        data
      );
      dispatch({
        type: HIDE_CATEGORY_SUCCESS,
        data: response.data?.updatedFields,
      });
      return response?.data;
    } catch (error) {
      dispatch({ type: HIDE_CATEGORY_FAILURE });
      return error.response?.data?.message || error.message;
    }
  };
};

export const updateCategory = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_CATEGORY_REQUEST });
    try {
      const response = await axiosInstance.put(
        `${deleteCategoryApiEndPoint}/${id}`,
        data
      );
      dispatch({
        type: UPDATE_CATEGORY_SUCCESS,
        data: response.data?.updatedFields,
      });
      return response?.data;
    } catch (error) {
      dispatch({ type: UPDATE_CATEGORY_FAILURE });
      return error.response?.data?.message || error.message;
    }
  };
};
export const restoreArchivedCandidates = (candidateIds) => {
  return async (dispatch) => {
    dispatch({ type: RESTORE_CANDIDATE_REQUEST });

    try {
      const response = await axiosInstance.post(`api/candidates/restore`, 
        { candidateIds }, 
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response from Restore Candidates API:", response.data);

      dispatch({
        type: RESTORE_CANDIDATE_SUCCESS,
        payload: candidateIds, // Send restored candidate IDs to reducer
      });

      notifySuccess("Candidates successfully restored.");
      return response.data;
    } catch (error) {
      console.log("Error restoring candidates:", error);
      dispatch({ type: RESTORE_CANDIDATE_FAILURE });
      return error.response?.data?.message || error.message;
    }
  };
};
export const deleteArchivedCandidates = (candidateIds) => {
  return async (dispatch) => {
    dispatch({ type:DELETE_CANDIDATE_REQUEST });

    try {
      const response = await axiosInstance.delete(`api/candidates`, {
        data: { candidateIds }, // Pass candidateIds in the request body
      });
console.log("response indetele candidates",response,candidateIds);

      dispatch({
        type:DELETE_CANDIDATE_SUCCESS,
        payload: candidateIds, // Send deleted candidate IDs to reducer
      });

      notifySuccess(response?.data?.message);
      return response.data;
    } catch (error) {
      console.log("Error deleting candidates:", error);
      dispatch({ type:DELETE_CANDIDATE_FAILURE });

      return error.response?.data?.message || error.message;
    }
  };
};