import axiosInstance from "./axiosInstance";
import {
  addAttachmentApiEndPoint,
  addCandidatesToArchive,
  BASE_URL,
  candidateSerachByIdApiEndPOint,
  createCandidateManuallyEndpoint,
  fetchAutoSuggestFolderApiEndPoint,
  fetchCandidatesDetailsEndpoint,
  fetchCandidatesEndpoint,
  fetchCandidateSummaryApiEndPoint,
  fetchColumnListApiEndPoint,
  profileUploadApiEndPoint,
  updateCandidateLabelApiEndpoint,
  uploadResumeEndpoint,
} from "../helpers/apiConfig";

import axios from "axios";
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
  FETCH_SUGGESTED_FOLDER_REQUEST,
  FETCH_SUGGESTED_FOLDER_SUCCESS,
  FETCH_SUGGESTED_FOLDER_FAILURE,
  ARCHIVE_CANDIDATES_REQUEST,
  ARCHIVE_CANDIDATES_SUCCESS,
  ARCHIVE_CANDIDATES_FAILURE,
  FETCH_COLUMNS_LIST_FAILURE,
  FETCH_COLUMNS_LIST_REQUEST,
  FETCH_COLUMNS_LIST_SUCCESS,
  UPDATE_COLUMNS_LIST_REQUEST,
  UPDATE_COLUMNS_LIST_SUCCESS,
  UPDATE_COLUMNS_LIST_FAILURE,
  FETCH_CANDIDATE_SUMMARY_FAILURE,
  FETCH_CANDIDATE_SUMMARY_SUCCESS,
  FETCH_CANDIDATE_SUMMARY_REQUEST,
  EXTRACT_RESUME_FAILURE,
  EXTRACT_RESUME_SUCCESS,
  EXTRACT_RESUME_REQUEST,
  ADD_ATTACHMENTS_REQUEST,
  ADD_ATTACHMENTS_SUCCESS,
  ADD_ATTACHMENTS_FAILURE,
  UPLOAD_ATTACHMENT_REQUEST,
  UPLOAD_ATTACHMENT_FAILURE,
  UPLOAD_ATTACHMENT_SUCCESS,
  UPLOAD_PROFILE_REQUEST,
  UPLOAD_PROFILE_SUCCESS,
  UPLOAD_PROFILE_FAILURE,
} from "./actionsType";
import { notifySuccess } from "../helpers/utils";

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
    console.log(
      "response of fetch candidate lisrt>>>",
      response,
      "filtersdsdsdd",
      filters
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
      candidateInfo: response.data?.data,
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

export const fetchSuggestedFolders = (query) => async (dispatch) => {
  dispatch({ type: FETCH_SUGGESTED_FOLDER_REQUEST });

  try {
    const response = await axiosInstance.get(
      `${fetchAutoSuggestFolderApiEndPoint}`,
      {
        params: {
          query: query,
        },
      }
    );

    dispatch({
      type: FETCH_SUGGESTED_FOLDER_SUCCESS,
      folderData: response?.data,
    });

    return response?.data;
  } catch (error) {
    dispatch({ type: FETCH_SUGGESTED_FOLDER_FAILURE });
    return error?.response?.data?.message || error.message;
  }
};

// ✅ Add Source to Candidates
export const addCandidateToArchiveAction =
  (selectedCandidates) => async (dispatch) => {
    dispatch({ type: ARCHIVE_CANDIDATES_REQUEST });

    if (!selectedCandidates.length) {
      console.warn("No candidates selected.");
      return;
    }

    const requestData = {
      candidateIds: selectedCandidates,
    };

    try {
      const response = await axiosInstance.post(
        addCandidatesToArchive,
        requestData
      );

      if (response.data.success) {
        dispatch({
          type: ARCHIVE_CANDIDATES_SUCCESS,
          payload: response.data.message,
        });
        notifySuccess("Candidates archived successfully!");
      } else {
        dispatch({
          type: ARCHIVE_CANDIDATES_FAILURE,
          payload: response.data.message || "Failed to add candidates.",
        });
        alert(response.data.message || "Failed to add candidates.");
      }
    } catch (error) {
      dispatch({
        type: ARCHIVE_CANDIDATES_FAILURE,
        payload: error.response?.data?.message || "Something went wrong.",
      });
    }
  };

export const fetchColumnsList = () => async (dispatch) => {
  dispatch({ type: FETCH_COLUMNS_LIST_REQUEST });

  try {
    const response = await axiosInstance.get(`${fetchColumnListApiEndPoint}`);
    dispatch({
      type: FETCH_COLUMNS_LIST_SUCCESS,
      columnList: response?.data,
    });

    return response?.data;
  } catch (error) {
    dispatch({ type: FETCH_COLUMNS_LIST_FAILURE });
    return error?.response?.data?.message || error.message;
  }
};

export const updateSelectedColumns = (data) => async (dispatch) => {
  dispatch({ type: UPDATE_COLUMNS_LIST_REQUEST });

  try {
    const response = await axiosInstance.post(fetchColumnListApiEndPoint, data);
    dispatch({
      type: UPDATE_COLUMNS_LIST_SUCCESS,
      data: response?.data,
    });

    return response?.data;
  } catch (error) {
    dispatch({ type: UPDATE_COLUMNS_LIST_FAILURE });
    return error?.response?.data?.message || error.message;
  }
};

export const fetchCandidateSummary = (id) => async (dispatch) => {
  dispatch({ type: FETCH_CANDIDATE_SUMMARY_REQUEST });

  try {
    const response = await axiosInstance.get(
      `${fetchCandidateSummaryApiEndPoint}/${id}`
    );

    dispatch({
      type: FETCH_CANDIDATE_SUMMARY_SUCCESS,
      data: response.data?.data,
    });

    return response.data;
  } catch (error) {
    dispatch({ type: FETCH_CANDIDATE_SUMMARY_FAILURE });
    return error?.response?.data?.message || error.message;
  }
};

export const extractResume = (file, title) => async (dispatch) => {
  dispatch({ type: EXTRACT_RESUME_REQUEST });

  console.log("file in extract resume >>>>", file);

  if (!file || !(file instanceof File)) {
    console.error("⚠️ No valid file provided for upload.");
    return;
  }

  const formData = new FormData();
  formData.append("files", file); // ✅ Correct key
  formData.append("documentOrigin", title);

  try {
    const response = await axiosInstance.post(
      "api/extract-resume/extract",
      formData
      // ❌ DO NOT pass headers here — let browser handle it
    );

    dispatch({
      type: EXTRACT_RESUME_SUCCESS,
      payload: response.data,
    });

    console.log("✅ Resume Extracted:", response.data);
    return response.data;
  } catch (error) {
    dispatch({
      type: EXTRACT_RESUME_FAILURE,
      payload: error.response?.data?.message || "Error extracting resume.",
    });

    console.error("❌ Resume Extraction Error:", error);
    return error.response?.data?.message || "Error extracting resume.";
  }
};

export const addAttachmentFunction = (data) => {
  return async (dispatch) => {
    dispatch({ type: ADD_ATTACHMENTS_REQUEST });
    try {
      const response = await axiosInstance.post(
        `${addAttachmentApiEndPoint}`,
        data
      );
      dispatch({
        type: ADD_ATTACHMENTS_SUCCESS,
        data: response.data,
      });
      return response;
    } catch (error) {
      dispatch({ type: ADD_ATTACHMENTS_FAILURE });
      return error.response?.data?.message || error.message;
    }
  };
};

export const uploadAttachment = (url) => {
  return async (dispatch) => {
    dispatch({ type: UPLOAD_ATTACHMENT_REQUEST });
    try {
      const response = await axiosInstance.put(url);
      dispatch({
        type: UPLOAD_ATTACHMENT_SUCCESS,
        data: response?.data,
      });
      return response?.data;
    } catch (error) {
      dispatch({ type: UPLOAD_ATTACHMENT_FAILURE });
      return error.response?.data?.message || error.message;
    }
  };
};

export const uploadProfileImage = (formdata) => {
  return async (dispatch) => {
    dispatch({ type: UPLOAD_PROFILE_REQUEST });
    try {
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token && { Authorization: `Bearer ${token}` }),
          ...(refreshToken && { "x-refresh-token": refreshToken }),
        },
      };
      const response = await axios.post(
        `${BASE_URL}${profileUploadApiEndPoint}`,
        formdata,
        config
      );
      dispatch({
        type: UPLOAD_PROFILE_SUCCESS,
      });

      return response?.data;
    } catch (error) {
      if (error?.response?.data) {
        dispatch({
          type: UPLOAD_PROFILE_FAILURE,
        });
        return error?.response?.data?.message;
      } else {
        dispatch({
          type: UPLOAD_PROFILE_FAILURE,
        });
        return error.message;
      }
    }
  };
};
