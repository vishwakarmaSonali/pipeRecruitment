import { combineReducers } from "redux";
import authReducer from "./authReducer";
import sourcingReducer from "./sourcingReducer";
import columnSlice from "../store/columnSlice"
import filterSlice from "../store/filterSlice"
import { filter } from "lodash";
const rootReducer = combineReducers({
  auth: authReducer,
  sourcing: sourcingReducer,
  columns: columnSlice, 
  filters:filterSlice
});

export default rootReducer;
