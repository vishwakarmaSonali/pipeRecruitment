import axios from "axios";
import { BASE_URL, candidateSearchApiEndPoint } from "../helpers/apiConfig";
import {
  SEARCH_CANDIDATE_REQUEST,
  SEARCH_CANDIDATE_FAILURE,
  SEARCH_CANDIDATE_SUCCESS,
} from "./actionsType";

export const fetchCandidates = (token, filters, page) => {
  return async (dispatch) => {
    dispatch({ type: SEARCH_CANDIDATE_REQUEST });
    try {
      const config = {
        headers: {
          //   Authorization: `Bearer ${token}`,
        },
        params: {
          ...filters,
          page,
        },
      };
      const response = await axios.get(
        `${BASE_URL}${candidateSearchApiEndPoint}`,
        config
      );

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
      if (error?.response?.data) {
        dispatch({
          type: SEARCH_CANDIDATE_FAILURE,
        });
        return error?.response?.data?.message;
      } else {
        dispatch({
          type: SEARCH_CANDIDATE_FAILURE,
        });
        return error.message;
      }
    }
  };
};
