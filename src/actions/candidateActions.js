import axios from "axios";
import { BASE_URL, createCandidateManuallyEndpoint } from "../helpers/apiConfig";
import {
  CREATE_CANDIDATE_REQUEST,
  CREATE_CANDIDATE_FAILURE,
  CREATE_CANDIDATE_SUCCESS,
} from "./actionsType";
import { useNavigate } from "react-router-dom";


export const createCandidates = (token, params) => {

  return async (dispatch) => {
    dispatch({ type: CREATE_CANDIDATE_REQUEST });

    try {
      // ✅ API Headers
      const config = {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }) // ✅ Add token if available
        }
      };

      console.log("🚀 Sending API Request to:", `${BASE_URL}${createCandidateManuallyEndpoint}`);
      console.log("📩 Payload:", params?.candidateData);

      // ✅ Correct Axios POST Request
      const response = await axios.post(`${BASE_URL}${createCandidateManuallyEndpoint}`, params, config);

      console.log("✅ API Response:", response.data);

      dispatch({
        type: CREATE_CANDIDATE_SUCCESS,
        payload: response.data, // ✅ Use proper response data
      });
     
      return response.data;
    } catch (error) {
      console.error("❌ API Error:", error.response?.data || error.message);

      dispatch({ type: CREATE_CANDIDATE_FAILURE });

      // ✅ Return a proper error message
      return error.response?.data?.message || "An error occurred while creating the candidate.";
    }
  };
};
