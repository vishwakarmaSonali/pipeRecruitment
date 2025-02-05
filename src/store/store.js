import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import { thunk, withExtraArgument } from "redux-thunk";
import rootReducer from "../reducers/index"; // Ensure all reducers are combined
import filterReducer from "./filterSlice"; // Import the filter slice
import columnReducer from "./columnSlice";

// Persist configuration
const persistConfig = {
  key: "root",
  storage, // Uses localStorage to persist state
};

// Wrap root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: {
    filters: filterReducer, // Add your filter slice
    persisted: persistedReducer, // Persisted reducers
    columns: columnReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
});

// Create persistor
const persistor = persistStore(store);

export { store, persistor };
