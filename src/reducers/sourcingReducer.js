import {
  SEARCH_CANDIDATE_FAILURE,
  SEARCH_CANDIDATE_REQUEST,
  SEARCH_CANDIDATE_SUCCESS,
  ADD_SOURCE_TO_CANDIDATE_REQUEST,
  ADD_SOURCE_TO_CANDIDATE_SUCCESS,
  ADD_SOURCE_TO_CANDIDATE_FAILURE,
} from "../actions/actionsType";

const initialState = {
  fetchMoreLoading: false,
  candidateData: [],
  totalCandidateData: 0,
  totalCandidatePages: 1,
  candidateFilters: {},
  addingCandidates: false,
  addCandidatesSuccessMessage: "",
  addCandidatesErrorMessage: "",
};

const sourcingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_CANDIDATE_REQUEST:
      return {
        ...state,
        fetchMoreLoading: true,
      };
    case SEARCH_CANDIDATE_SUCCESS:
      return {
        ...state,
        candidateData: action.candidateData,
        candidateFilters: action.filters,
        totalCandidatePages: action.totalPage,
        totalCandidateData: action.totalData,
        fetchMoreLoading: false,
      };
    case SEARCH_CANDIDATE_FAILURE:
      return {
        ...state,
        fetchMoreLoading: false,
        candidateData: [],
        totalCandidatePages: 1,
        totalCandidateData: 0,
      };

    // ✅ Handle Adding Candidates API
    case ADD_SOURCE_TO_CANDIDATE_REQUEST:
      return {
        ...state,
        addingCandidates: true,
        addCandidatesSuccessMessage: "",
        addCandidatesErrorMessage: "",
      };
    case ADD_SOURCE_TO_CANDIDATE_SUCCESS:
      return {
        ...state,
        addingCandidates: false,
        addCandidatesSuccessMessage: action.payload,
        addCandidatesErrorMessage: "",
      };
    case ADD_SOURCE_TO_CANDIDATE_FAILURE:
      return {
        ...state,
        addingCandidates: false,
        addCandidatesSuccessMessage: "",
        addCandidatesErrorMessage: action.payload,
      };

    default:
      return state;
  }
};

export default sourcingReducer;
