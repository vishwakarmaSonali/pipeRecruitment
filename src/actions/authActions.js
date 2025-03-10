import axios from "axios";
import { BASE_URL, loginEndpoint } from "../helpers/apiConfig";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_USER } from "./actionsType";

// Login action
export const loginUser = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
      const response = await axios.post(`${BASE_URL}${loginEndpoint}`, { email, password }, {
        headers: { "Content-Type": "application/json" },
      });

      const { accessToken, refreshToken } = response.data?.data;
console.log(" response.data",response.data?.success);

      // Store tokens in Redux
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { accessToken, refreshToken },
      });

      // Save tokens in localStorage
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: error.response?.data?.message || "Login failed",
      });
    }
  };
};
export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("token"); // Clear token storage (if used)
    dispatch({ type: LOGOUT_USER });
  };