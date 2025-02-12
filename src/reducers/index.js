import { combineReducers } from "redux";
import authReducer from "./authReducer";
import sourcingReducer from "./sourcingReducer";
import customizationReducer from "./customizationReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  sourcing: sourcingReducer,
  customization: customizationReducer,
});

export default rootReducer;
