import axios from "axios";
import {
  BASE_URL,
  candidateSerachByIdApiEndPOint,
  createCandidateManuallyEndpoint,
  fetchCandidatesDetailsEndpoint,
  fetchCandidatesEndpoint,
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
import { useNavigate } from "react-router-dom";
import { logoutUser } from "./authActions";

// ✅ Handle API failure (Unauthorized)
const handleApiFailure = (error, dispatch) => {
  console.error("❌ API Error:", error.response?.data || error.message);

  if (error.response?.status === false || error.response?.status === false) {
    alert("Session expired. Please log in again.");
    dispatch(logoutUser()); // Remove token from Redux
    window.location.href = "/login"; // Redirect to login page
  }
};
export const createCandidates = (token, params,refreshToken) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_CANDIDATE_REQUEST });

    try {
      // ✅ API Headers
      const config = {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }), // ✅ Add token if available
          "x-refresh-token": refreshToken || "",
        },
      };

      console.log(
        "🚀 Sending API Request to:",
        `${BASE_URL}${createCandidateManuallyEndpoint}`
      );
      console.log("📩 Payload:", params?.candidateData);

      // ✅ Correct Axios POST Request
      const response = await axios.post(
        `${BASE_URL}${createCandidateManuallyEndpoint}`,
        params,
        config
      );

      console.log("✅ API Response:", response.data);

      dispatch({
        type: CREATE_CANDIDATE_SUCCESS,
        payload: response.data, // ✅ Use proper response data
      });

      return response.data;
    } catch (error) {
      console.error("❌ API Error:", error.response?.data || error.message);
      // handleApiFailure(error, dispatch);
      dispatch({ type: CREATE_CANDIDATE_FAILURE });

      // ✅ Return a proper error message
      return (
        error.response?.data?.message ||
        "An error occurred while creating the candidate."
      );
    }
  };
};
export const fetchCandidatesList = (token, filters, page,refreshToken) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CANDIDATES_REQUEST });
console.log("calleddddddd in fetchcandidate list");

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
          "x-refresh-token": refreshToken || "",
        },
        params: {
          ...filters,
          page,
        },
      };

      const response = await axios.get(
        `${BASE_URL}${fetchCandidatesEndpoint}`,
        config
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
      // handleApiFailure(error, dispatch);
      if (error?.response?.data) {
        dispatch({
          type: FETCH_CANDIDATES_FAILURE,
        });
        return error?.response?.data?.message;
      } else {
        dispatch({
          type: FETCH_CANDIDATES_FAILURE,
        });
        return error.message;
      }
    }
  };
};

export const fetchCandidateDetails = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: CANDIDATE_DETAILS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };
    const response = await axios.get(
      `${BASE_URL}${fetchCandidatesDetailsEndpoint}/${id}`,
      config
    );

    dispatch({
      type: CANDIDATE_DETAILS_SUCCESS,
      candidateInfo: response.data?.candidate,
      candidateId: id,
    });
  } catch (error) {
    // handleApiFailure(error, dispatch);
    if (error?.response?.data) {
      dispatch({
        type: CANDIDATE_DETAILS_FAILURE,
      });
      return error?.response?.data?.message;
    } else {
      dispatch({
        type: CANDIDATE_DETAILS_FAILURE,
      });
      return error.message;
    }
  }
};

export const updateCandidateDetails = (token, id, data) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_CANDIDATE_DETAILS_REQUEST });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      };
      const response = await axios.put(
        `${BASE_URL}${fetchCandidatesDetailsEndpoint}/${id}`,
        JSON.stringify(data),
        config
      );
      dispatch({
        type: UPDATE_CANDIDATE_DETAILS_SUCCESS,
        data: response?.data,
        id: id,
      });
      return response?.data;
    } catch (error) {
      if (error?.response?.data) {
        dispatch({
          type: UPDATE_CANDIDATE_DETAILS_FAILURE,
        });
        return error?.response?.data?.message;
      } else {
        dispatch({
          type: UPDATE_CANDIDATE_DETAILS_FAILURE,
        });
        return error.message;
      }
    }
  };
};

export const updateCandidateLabel = (token, data) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_CANDIDATE_LABEL_REQUEST });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      };
      const response = await axios.put(
        `${BASE_URL}${fetchCandidatesDetailsEndpoint}`,
        JSON.stringify(data),
        config
      );
      dispatch({
        type: UPDATE_CANDIDATE_LABEL_SUCCESS,
        data: response?.data,
      });
      return response?.data;
    } catch (error) {
      if (error?.response?.data) {
        dispatch({
          type: UPDATE_CANDIDATE_LABEL_FAILURE,
        });
        return error?.response?.data?.message;
      } else {
        dispatch({
          type: UPDATE_CANDIDATE_LABEL_FAILURE,
        });
        return error.message;
      }
    }
  };
};
