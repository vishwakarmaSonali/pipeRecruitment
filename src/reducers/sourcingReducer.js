import {
  SEARCH_CANDIDATE_FAILURE,
  SEARCH_CANDIDATE_REQUEST,
  SEARCH_CANDIDATE_SUCCESS,
} from "../actions/actionsType";

const initialState = {
  fetchMoreLoading: false,
  candidateData: [],
  totalCandidateData: 0,
  totalCandidatePages: 1,
  candidateFilters: {},
};

const sourcingReducer = (state = initialState, action) => {
  console.log("action>>>>",action?.payload);
  
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
        totalCandidateData: 1,
        totalCandidateData: 0,
      };
    default:
      return state;
  }
};

export default sourcingReducer;
