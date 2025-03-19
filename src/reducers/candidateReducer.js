import {
  FETCH_CANDIDATES_FAILURE,
  FETCH_CANDIDATES_REQUEST,
  FETCH_CANDIDATES_SUCCESS,
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
  FETCH_COLUMNS_LIST_REQUEST,
  FETCH_COLUMNS_LIST_SUCCESS,
  FETCH_COLUMNS_LIST_FAILURE,
  UPDATE_COLUMNS_LIST_REQUEST,
  UPDATE_COLUMNS_LIST_SUCCESS,
  UPDATE_COLUMNS_LIST_FAILURE,
} from "../actions/actionsType";

const initialState = {
  loading: false,
  candidatesListingData: [],
  candidateListID: [],
  error: "",
  fetchMoreLoading: false,
  totalCandidateData: 0,
  totalCandidatePages: 1,
  candidateFilters: {},
  totalCandidateData: 0,
  totalCandidatePages: 1,
  candidateFilters: {},
  candidateInfo: {},
  candidateId: null,
  candidateDetailsLoading: false,
  updateCandidateLoading: false,
  fetchFolderLoading: false,
  folderList: [],
  fetchColumnLoading: false,
  columnList: [],
  updateColumnLoading: false,
};
const candidateReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CANDIDATES_REQUEST:
      return {
        ...state,
        fetchMoreLoading: true,
        candidatesListingData: [],
        candidateListID: [],
      };

    case FETCH_CANDIDATES_SUCCESS:
      const candidateID = action.candidateListData?.map((item) => item?._id);
      return {
        ...state,
        fetchMoreLoading: false,
        candidatesListingData: action.candidateListData,
        candidateListID: candidateID,
        candidateFilters: action.filters,
        totalCandidatePages: action.totalPage,
        totalCandidateData: action.totalData,
      };

    case FETCH_CANDIDATES_FAILURE:
      return {
        ...state,
        fetchMoreLoading: false,
        candidatesListingData: [],
        candidatesListingData: [],
      };

    // ✅ Handle Fetching a Single Candidate's Details
    case CANDIDATE_DETAILS_REQUEST:
      return {
        ...state,
        candidateDetailsLoading: true,
        candidateId: null,
      };

    case CANDIDATE_DETAILS_SUCCESS:
      return {
        ...state,
        candidateDetailsLoading: false,
        candidateInfo: action.candidateInfo,
        candidateId: action.candidateId,
      };

    case CANDIDATE_DETAILS_FAILURE:
      return {
        ...state,
        candidateDetailsLoading: false,
        candidateId: null,
        candidateInfo: {},
      };

    case UPDATE_CANDIDATE_DETAILS_REQUEST:
      return { ...state, updateCandidateLoading: true };

    case UPDATE_CANDIDATE_DETAILS_SUCCESS:
      return {
        ...state,
        updateCandidateLoading: false,
      };

    case UPDATE_CANDIDATE_DETAILS_FAILURE:
      return {
        ...state,
        updateCandidateLoading: false,
      };

    case UPDATE_CANDIDATE_LABEL_REQUEST:
      return { ...state, updateCandidateLoading: true };

    case UPDATE_CANDIDATE_LABEL_SUCCESS:
      return {
        ...state,
        updateCandidateLoading: false,
      };

    case UPDATE_CANDIDATE_LABEL_FAILURE:
      return {
        ...state,
        updateCandidateLoading: false,
      };

    case FETCH_SUGGESTED_FOLDER_REQUEST:
      return { ...state, fetchFolderLoading: true };

    case FETCH_SUGGESTED_FOLDER_SUCCESS:
      return {
        ...state,
        fetchFolderLoading: false,
        folderList: action.folderData,
      };

    case FETCH_SUGGESTED_FOLDER_FAILURE:
      return {
        ...state,
        fetchFolderLoading: false,
      };

    case FETCH_COLUMNS_LIST_REQUEST:
      return { ...state, fetchColumnLoading: true };

    case FETCH_COLUMNS_LIST_SUCCESS:
      return {
        ...state,
        fetchColumnLoading: false,
        columnList: action.columnList,
      };

    case FETCH_COLUMNS_LIST_FAILURE:
      return {
        ...state,
        fetchColumnLoading: false,
      };

    case UPDATE_COLUMNS_LIST_REQUEST:
      return { ...state, updateColumnLoading: true };

    case UPDATE_COLUMNS_LIST_SUCCESS:
      return {
        ...state,
        updateColumnLoading: false,
      };

    case UPDATE_COLUMNS_LIST_FAILURE:
      return {
        ...state,
        updateColumnLoading: false,
      };
    default:
      return state;
  }
};

export default candidateReducer;
