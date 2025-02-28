import {
  DOMAIN_FETCH_REQUEST,
  DOMAIN_FETCH_SUCCESS,
  DOMAIN_FETCH_FAILURE,
  LABEL_FETCH_REQUEST,
  LABEL_FETCH_SUCCESS,
  LABEL_FETCH_FAILURE,
} from "../actions/actionsType";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const domainReducer = (state = initialState, action) => {
  switch (action.type) {
    case DOMAIN_FETCH_REQUEST:
      return { ...state, loading: true, error: null };
    case DOMAIN_FETCH_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case DOMAIN_FETCH_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const labelReducer = (state = initialState, action) => {
  switch (action.type) {
    case LABEL_FETCH_REQUEST:
      return { ...state, loading: true, error: null };
    case LABEL_FETCH_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case LABEL_FETCH_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
