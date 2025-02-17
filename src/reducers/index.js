import { combineReducers } from "redux";
import authReducer from "./authReducer";
import sourcingReducer from "./sourcingReducer";
import customizationReducer from "./customizationReducer";
import columnSlice from "../store/columnSlice"
import filterSlice from "../store/filterSlice"
const rootReducer = combineReducers({
  auth: authReducer,
  sourcing: sourcingReducer,
  columns: columnSlice, 
  filters:filterSlice,
});

export default rootReducer;
