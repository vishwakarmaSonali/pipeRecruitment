import { combineReducers } from "redux";
import authReducer from "./authReducer";
import sourcingReducer from "./sourcingReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  sourcing: sourcingReducer,
});

export default rootReducer;
