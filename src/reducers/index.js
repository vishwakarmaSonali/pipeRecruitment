import { combineReducers } from "redux";
import authReducer from "./authReducer";
import sourcingReducer from "./sourcingReducer";
import customizationReducer from "./customizationReducer";
import columnSlice from "../store/columnSlice";
import filterSlice from "../store/filterSlice";
import {domainReducer, labelReducer} from "./DropdownReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  sourcing: sourcingReducer,
  customization: customizationReducer,
  columns: columnSlice,
  filters: filterSlice,
  domains: domainReducer,
  labels: labelReducer,
});

export default rootReducer;
