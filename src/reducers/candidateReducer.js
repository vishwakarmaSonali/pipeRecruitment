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
} from "../actions/actionsType";

const initialState = {
  loading: false,
  candidatesListingData: [],
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
};
const candidateReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CANDIDATES_REQUEST:
      return { ...state, fetchMoreLoading: true };

    case FETCH_CANDIDATES_SUCCESS:
      return {
        ...state,
        fetchMoreLoading: false,
        candidatesListingData: action.candidateListData,
        candidateFilters: action.filters,
        totalCandidatePages: action.totalPage,
        totalCandidateData: action.totalData,
      };

    case FETCH_CANDIDATES_FAILURE:
      return { ...state, fetchMoreLoading: false };

    // ✅ Handle Fetching a Single Candidate's Details
    case CANDIDATE_DETAILS_REQUEST:
      return {
        ...state,
        candidateDetailsLoading: true,
        candidateId: null,
        candidateInfo: {},
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
    default:
      return state;
  }
};

export default candidateReducer;
