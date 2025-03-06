import axios from "axios";
import { BASE_URL, candidateSerachByIdApiEndPOint, createCandidateManuallyEndpoint, fetchCandidatesDetailsEndpoint, fetchCandidatesEndpoint } from "../helpers/apiConfig";
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
export const fetchCandidatesList = (token,filters, page) => {
  console.log("  `${BASE_URL}${fetchCandidatesEndpoint}?limit=100&page=1`",  `${BASE_URL}${fetchCandidatesEndpoint}?limit=100&page=1`);
  return async (dispatch) => {
    dispatch({ type: FETCH_CANDIDATES_REQUEST });

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }) // ✅ Add token if available
        }
      };
      const response = await axios.get(
        `${BASE_URL}${fetchCandidatesEndpoint}?limit=100&page=1`,
       config
      );
console.log("fetch candidates api response",response);

      dispatch({
        type: FETCH_CANDIDATES_SUCCESS,
        candidateListData:response.data?.results,
        page,
        filters,
        totalPage:response.data?.totalPages,
        totalData:response.data?.total,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_CANDIDATES_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const fetchCandidateDetails = (id,token) => async (dispatch) => {
  console.log("${BASE_URL}${candidateSerachByIdApiEndPOint}${id}",`${BASE_URL}${fetchCandidatesDetailsEndpoint}/${id}`);
  try {
    dispatch({ type: CANDIDATE_DETAILS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }) // ✅ Add token if available
      }
    };
    const response = await axios.get(  `${BASE_URL}${fetchCandidatesDetailsEndpoint}/${id}`,config); // API call
console.log("response in fetch candidate details>>>",id,"id>>>>>>>>>>>",response);

    dispatch({
      type: CANDIDATE_DETAILS_SUCCESS,
      candidateDetailByIdData:response?.data,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CANDIDATE_DETAILS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
