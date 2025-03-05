import {
  FETCH_CANDIDATES_FAILURE,
  FETCH_CANDIDATES_REQUEST,
  FETCH_CANDIDATES_SUCCESS,
  CANDIDATE_DETAILS_REQUEST,
  CANDIDATE_DETAILS_SUCCESS,
  CANDIDATE_DETAILS_FAILURE,
} from "../actions/actionsType";

const initialState = {
  loading: false,
  candidatesListingData: [],
  error: "",
  fetchMoreLoading: false,
  totalCandidateData: 0,
  totalCandidatePages: 1,
  candidateFilters: {},
  candidateDetails: null, // Added state for single candidate details
  candidateDetailsLoading: false, // Loading state for candidate details
  candidateDetailsError: null, // Error state for candidate details
};
const candidateReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CANDIDATES_REQUEST:
      return { ...state, loading: true };

    case FETCH_CANDIDATES_SUCCESS:
      return {
        ...state,
        loading: false,
        candidatesListingData: action.payload,
      };

    case FETCH_CANDIDATES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // ✅ Handle Fetching a Single Candidate's Details
    case CANDIDATE_DETAILS_REQUEST:
      return { ...state, candidateDetailsLoading: true };

    case CANDIDATE_DETAILS_SUCCESS:
      return {
        ...state,
        candidateDetailsLoading: false,
        candidateDetails: action.payload,
      };

    case CANDIDATE_DETAILS_FAILURE:
      return {
        ...state,
        candidateDetailsLoading: false,
        candidateDetailsError: action.payload,
      };

    default:
      return state;
  }
};



export default candidateReducer;
