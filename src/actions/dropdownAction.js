import axios from "axios";
import {
  DOMAIN_FETCH_REQUEST,
  DOMAIN_FETCH_SUCCESS,
  DOMAIN_FETCH_FAILURE,
  LABEL_FETCH_REQUEST,
  LABEL_FETCH_SUCCESS,
  LABEL_FETCH_FAILURE,
} from "./actionsType";
import {
  BASE_URL,
  getDomainEndpoint,
  getLabelEndpoint,
} from "../helpers/apiConfig";

export const fetchDomains = () => {
  return async (dispatch) => {
    dispatch({ type: DOMAIN_FETCH_REQUEST });

    try {
      const response = await axios.get(`${BASE_URL}${getDomainEndpoint}`, {
        headers: {
          //   Authorization: "Bearer {{accessToken}}",
        },
      });

      dispatch({ type: DOMAIN_FETCH_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: DOMAIN_FETCH_FAILURE,
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };
};
export const fetchLabels = () => {
  return async (dispatch) => {
    dispatch({ type: LABEL_FETCH_REQUEST });

    try {
      const response = await axios.get(`${BASE_URL}${getLabelEndpoint}`, {
        headers: {
          //   Authorization: "Bearer {{accessToken}}",
        },
      });

      dispatch({ type: LABEL_FETCH_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: LABEL_FETCH_FAILURE,
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };
};
