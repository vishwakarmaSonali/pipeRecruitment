import axiosInstance from "./axiosInstance";
import {
  BASE_URL,
  candidateSerachByIdApiEndPOint,
  createCandidateManuallyEndpoint,
  fetchCandidatesDetailsEndpoint,
  fetchCandidatesEndpoint,
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
} from "./actionsType";

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
      candidateInfo: response.data?.candidate,
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
