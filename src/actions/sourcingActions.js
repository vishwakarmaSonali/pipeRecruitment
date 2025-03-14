import axios from "axios";
import { BASE_URL, candidateSearchApiEndPoint } from "../helpers/apiConfig";
import {
  SEARCH_CANDIDATE_REQUEST,
  SEARCH_CANDIDATE_FAILURE,
  SEARCH_CANDIDATE_SUCCESS,
  ADD_SOURCE_TO_CANDIDATE_FAILURE,
  ADD_SOURCE_TO_CANDIDATE_SUCCESS,
  ADD_SOURCE_TO_CANDIDATE_REQUEST,
} from "./actionsType";
import { logoutUser } from "./authActions";
import axiosInstance from "./axiosInstance";
import { notifySuccess } from "../helpers/utils";

export const fetchCandidates = (filters, page) => {
  return async (dispatch) => {
    dispatch({ type: SEARCH_CANDIDATE_REQUEST });

    try {
      const response = await axiosInstance.get(candidateSearchApiEndPoint, {
        params: { ...filters, page },
      });

      dispatch({
        type: SEARCH_CANDIDATE_SUCCESS,
        candidateData: response.data?.results,
        page,
        filters,
        totalPage: response.data?.totalPages,
        totalData: response.data?.total,
      });

      return response.data;
    } catch (error) {
      dispatch({ type: SEARCH_CANDIDATE_FAILURE });
      return error.response?.data?.message || error.message;
    }
  };
};

// ✅ Add Source to Candidates
export const addSourceToCandidates =
  (selectedCandidates) => async (dispatch) => {
    dispatch({ type: ADD_SOURCE_TO_CANDIDATE_REQUEST });

    if (!selectedCandidates.length) {
      console.warn("No candidates selected.");
      return;
    }

    const requestData = {
      candidateIds: selectedCandidates,
    };

    try {
      const response = await axiosInstance.post(
        "api/candidates/add-to-candidate",
        requestData
      );

      console.log("✅ API Response:", response.data);

      if (response.data.success) {
        dispatch({
          type: ADD_SOURCE_TO_CANDIDATE_SUCCESS,
          payload: response.data.message,
        });
        notifySuccess("Candidates added successfully!");
      } else {
        dispatch({
          type: ADD_SOURCE_TO_CANDIDATE_FAILURE,
          payload: response.data.message || "Failed to add candidates.",
        });
        alert(response.data.message || "Failed to add candidates.");
      }
    } catch (error) {
      dispatch({
        type: ADD_SOURCE_TO_CANDIDATE_FAILURE,
        payload: error.response?.data?.message || "Something went wrong.",
      });
    }
  };
