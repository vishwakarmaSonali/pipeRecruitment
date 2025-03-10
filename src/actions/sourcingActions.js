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

// ✅ Handle API Failure (Logout if session expired)
const handleApiFailure = (error, dispatch) => {
  console.error("❌ API Error:", error.response?.data || error.message);

  if (error.response?.status ===false) {
    alert("Session expired. Please log in again.");
    dispatch(logoutUser()); // Remove token from Redux
    window.location.href = "/login"; // Redirect to login page
  }
};

// ✅ Fetch Candidates
export const fetchCandidates = (token, filters, page) => {
  return async (dispatch) => {
    dispatch({ type: SEARCH_CANDIDATE_REQUEST });

    if (!token) {
      console.error("❌ Token is missing! Redirecting to login...");
      dispatch(logoutUser());
      window.location.href = "/login";
      return;
    }

    try {
      const authToken = token.trim();

      console.log("🔹 Token being used:", authToken);

      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        params: {
          ...filters,
          page,
        },
      };

      const response = await axios.get(`${BASE_URL}${candidateSearchApiEndPoint}`, config);

      console.log("✅ API Response:", response.data);

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
      handleApiFailure(error, dispatch);
      return error?.response?.data?.message || error.message;
    }
  };
};

// ✅ Add Source to Candidates
export const addSourceToCandidates = (selectedCandidates) => async (dispatch, getState) => {
  dispatch({ type: ADD_SOURCE_TO_CANDIDATE_REQUEST });

  const { token, refreshToken } = getState().auth; // Get token from Redux

  if (!token) {
    console.error("Token is missing. Redirecting to login...");
    dispatch(logoutUser());
    window.location.href = "/login";
    return;
  }

  if (!selectedCandidates.length) {
    console.warn("No candidates selected.");
    return;
  }

  const requestData = {
    candidateIds: selectedCandidates.map((id) => id),
  };

  try {
    const response = await axios.post(
      "http://3.110.81.44/api/candidates/add-to-candidate",
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "x-refresh-token": refreshToken || "",
        },
      }
    );

    console.log("✅ API Response:", response.data);

    if (response.data.success) {
      dispatch({
        type: ADD_SOURCE_TO_CANDIDATE_SUCCESS,
        payload: response.data.message,
      });
      alert("Candidates added successfully!");
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

    handleApiFailure(error, dispatch); // Handle session expiry
  }
};
