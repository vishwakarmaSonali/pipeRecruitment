import axios from "axios";
import { BASE_URL, loginEndpoint } from "../helpers/apiConfig";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "./actionsType";
import { notifyError, notifySuccess } from "../helpers/utils";

// Login action
export const loginUser = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
      const response = await axios.post(
        `${BASE_URL}${loginEndpoint}`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const { accessToken, refreshToken } = response.data?.data;

      // Store tokens in Redux
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { accessToken, refreshToken },
      });

      // Save tokens in localStorage
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      return response?.data;
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
  localStorage.removeItem("refreshToken"); // Clear token storage (if used)
  dispatch({ type: LOGOUT_USER });
};
export const registerUser = (userData) => async (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });

  try {
    const response = await axios.post("/api/auth/register", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: response.data,
    });

    notifySuccess("Signup successful! Redirecting...");
    return { success: true, data: response.data };
  } catch (error) {
    console.error("❌ Signup Error:", error.response?.data || error.message);
    dispatch({
      type: SIGNUP_FAILURE,
      payload: error.response?.data?.message || "Signup failed",
    });

    notifyError(error.response?.data?.message || "Signup failed");
    return { success: false, error: error.response?.data?.message };
  }
};
