import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_USER, SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS } from "../actions/actionsType";


const initialState = {
  loading: false,
  token: localStorage.getItem("token") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  error: null,
  token: null,
  refreshToken: null,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        error: null,
      };

    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
      case LOGOUT_USER:
        return {
          ...state,
          token: null,
          refreshToken: null,
          user: null,
        };
        case SIGNUP_REQUEST:
          return { ...state, loading: true };
    
        case SIGNUP_SUCCESS:
          return { ...state, loading: false, token: action.payload.token };
    
        case SIGNUP_FAILURE:
          return { ...state, loading: false, error: action.payload };
      
    default:
      return state;
  }
};

export default authReducer;
