import axiosInstance from "./axiosInstance";
import {
  addCandidatesToArchive,
  BASE_URL,
  candidateSerachByIdApiEndPOint,
  createCandidateManuallyEndpoint,
  fetchAutoSuggestFolderApiEndPoint,
  fetchCandidatesDetailsEndpoint,
  fetchCandidatesEndpoint,
  fetchCandidateSummaryApiEndPoint,
  fetchColumnListApiEndPoint,
  updateCandidateLabelApiEndpoint,
} from "../helpers/apiConfig";
import {
  CREATE_CANDIDATE_REQUEST,
  CREATE_CANDIDATE_FAILURE,
  CREATE_CANDIDATE_SUCCESS,
  FETCH_CANDIDATES_REQUEST,
  FETCH_CANDIDATES_SUCCESS,
  FETCH_CANDIDATES_FAILURE,
  CANDIDATE_DETAILS_REQUEST,
  CANDIDATE_DETAILS_SUCCESS,
  CANDIDATE_DETAILS_FAILURE,
  UPDATE_CANDIDATE_DETAILS_REQUEST,
  UPDATE_CANDIDATE_DETAILS_SUCCESS,
  UPDATE_CANDIDATE_DETAILS_FAILURE,
  UPDATE_CANDIDATE_LABEL_REQUEST,
  UPDATE_CANDIDATE_LABEL_SUCCESS,
  UPDATE_CANDIDATE_LABEL_FAILURE,
  FETCH_SUGGESTED_FOLDER_REQUEST,
  FETCH_SUGGESTED_FOLDER_SUCCESS,
  FETCH_SUGGESTED_FOLDER_FAILURE,
  ARCHIVE_CANDIDATES_REQUEST,
  ARCHIVE_CANDIDATES_SUCCESS,
  ARCHIVE_CANDIDATES_FAILURE,
  FETCH_COLUMNS_LIST_FAILURE,
  FETCH_COLUMNS_LIST_REQUEST,
  FETCH_COLUMNS_LIST_SUCCESS,
  UPDATE_COLUMNS_LIST_REQUEST,
  UPDATE_COLUMNS_LIST_SUCCESS,
  UPDATE_COLUMNS_LIST_FAILURE,
  FETCH_CANDIDATE_SUMMARY_FAILURE,
  FETCH_CANDIDATE_SUMMARY_SUCCESS,
  FETCH_CANDIDATE_SUMMARY_REQUEST,
} from "./actionsType";
import { notifySuccess } from "../helpers/utils";

export const createCandidates = (params) => async (dispatch) => {
  dispatch({ type: CREATE_CANDIDATE_REQUEST });

  try {
    const response = await axiosInstance.post(
      createCandidateManuallyEndpoint,
      params
    );

    dispatch({
      type: CREATE_CANDIDATE_SUCCESS,
      payload: response.data,
    });

    return response.data;
  } catch (error) {
    console.error("❌ API Error:", error.response?.data || error.message);

    dispatch({ type: CREATE_CANDIDATE_FAILURE });

    return (
      error.response?.data?.message ||
      "An error occurred while creating the candidate."
    );
  }
};

export const fetchCandidatesList = (filters, page) => async (dispatch) => {
  dispatch({ type: FETCH_CANDIDATES_REQUEST });

  try {
    const response = await axiosInstance.get(fetchCandidatesEndpoint, {
      params: { ...filters, page },
    });
    console.log(
      "response of fetch candidate lisrt>>>",
      response,
      "filtersdsdsdd",
      filters
    );

    dispatch({
      type: FETCH_CANDIDATES_SUCCESS,
      candidateListData: response.data?.results,
      page,
      filters,
      totalPage: response.data?.totalPages,
      totalData: response.data?.total,
    });

    return response?.data;
  } catch (error) {
    dispatch({ type: FETCH_CANDIDATES_FAILURE });
    return error?.response?.data?.message || error.message;
  }
};

export const fetchCandidateDetails = (id) => async (dispatch) => {
  dispatch({ type: CANDIDATE_DETAILS_REQUEST });

  try {
    const response = await axiosInstance.get(
      `${fetchCandidatesDetailsEndpoint}/${id}`
    );

    dispatch({
      type: CANDIDATE_DETAILS_SUCCESS,
      candidateInfo: response.data?.data,
      candidateId: id,
    });

    return response.data;
  } catch (error) {
    dispatch({ type: CANDIDATE_DETAILS_FAILURE });
    return error?.response?.data?.message || error.message;
  }
};

export const updateCandidateDetails = (id, data) => async (dispatch) => {
  dispatch({ type: UPDATE_CANDIDATE_DETAILS_REQUEST });

  try {
    const response = await axiosInstance.put(
      `${fetchCandidatesDetailsEndpoint}/${id}`,
      JSON.stringify(data)
    );

    dispatch({
      type: UPDATE_CANDIDATE_DETAILS_SUCCESS,
      data: response?.data,
      id: id,
    });

    return response?.data;
  } catch (error) {
    dispatch({ type: UPDATE_CANDIDATE_DETAILS_FAILURE });
    return error?.response?.data?.message || error.message;
  }
};

export const updateCandidateLabel = (data) => async (dispatch) => {
  dispatch({ type: UPDATE_CANDIDATE_LABEL_REQUEST });

  try {
    const response = await axiosInstance.put(
      updateCandidateLabelApiEndpoint,
      JSON.stringify(data)
    );

    dispatch({
      type: UPDATE_CANDIDATE_LABEL_SUCCESS,
      data: response?.data,
    });

    return response?.data;
  } catch (error) {
    dispatch({ type: UPDATE_CANDIDATE_LABEL_FAILURE });
    return error?.response?.data?.message || error.message;
  }
};

export const fetchSuggestedFolders = (query) => async (dispatch) => {
  dispatch({ type: FETCH_SUGGESTED_FOLDER_REQUEST });

  try {
    const response = await axiosInstance.get(
      `${fetchAutoSuggestFolderApiEndPoint}`,
      {
        params: {
          query: query,
        },
      }
    );

    dispatch({
      type: FETCH_SUGGESTED_FOLDER_SUCCESS,
      folderData: response?.data,
    });

    return response?.data;
  } catch (error) {
    dispatch({ type: FETCH_SUGGESTED_FOLDER_FAILURE });
    return error?.response?.data?.message || error.message;
  }
};

// ✅ Add Source to Candidates
export const addCandidateToArchiveAction =
  (selectedCandidates) => async (dispatch) => {
    dispatch({ type: ARCHIVE_CANDIDATES_REQUEST });

    if (!selectedCandidates.length) {
      console.warn("No candidates selected.");
      return;
    }

    const requestData = {
      candidateIds: selectedCandidates,
    };

    try {
      const response = await axiosInstance.post(
        addCandidatesToArchive,
        requestData
      );

      if (response.data.success) {
        dispatch({
          type: ARCHIVE_CANDIDATES_SUCCESS,
          payload: response.data.message,
        });
        notifySuccess("Candidates archived successfully!");
      } else {
        dispatch({
          type: ARCHIVE_CANDIDATES_FAILURE,
          payload: response.data.message || "Failed to add candidates.",
        });
        alert(response.data.message || "Failed to add candidates.");
      }
    } catch (error) {
      dispatch({
        type: ARCHIVE_CANDIDATES_FAILURE,
        payload: error.response?.data?.message || "Something went wrong.",
      });
    }
  };

export const fetchColumnsList = () => async (dispatch) => {
  dispatch({ type: FETCH_COLUMNS_LIST_REQUEST });

  try {
    const response = await axiosInstance.get(`${fetchColumnListApiEndPoint}`);
    dispatch({
      type: FETCH_COLUMNS_LIST_SUCCESS,
      columnList: response?.data,
    });

    return response?.data;
  } catch (error) {
    dispatch({ type: FETCH_COLUMNS_LIST_FAILURE });
    return error?.response?.data?.message || error.message;
  }
};

export const updateSelectedColumns = (data) => async (dispatch) => {
  dispatch({ type: UPDATE_COLUMNS_LIST_REQUEST });

  try {
    const response = await axiosInstance.post(fetchColumnListApiEndPoint, data);
    dispatch({
      type: UPDATE_COLUMNS_LIST_SUCCESS,
      data: response?.data,
    });

    return response?.data;
  } catch (error) {
    dispatch({ type: UPDATE_COLUMNS_LIST_FAILURE });
    return error?.response?.data?.message || error.message;
  }
};

export const fetchCandidateSummary = (id) => async (dispatch) => {
  dispatch({ type: FETCH_CANDIDATE_SUMMARY_REQUEST });

  try {
    const response = await axiosInstance.get(
      `${fetchCandidateSummaryApiEndPoint}/${id}`
    );

    dispatch({
      type: FETCH_CANDIDATE_SUMMARY_SUCCESS,
      data: response.data?.data,
    });

    return response.data;
  } catch (error) {
    dispatch({ type: FETCH_CANDIDATE_SUMMARY_FAILURE });
    return error?.response?.data?.message || error.message;
  }
};
