import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default is localStorage for web
import rootReducer from "../reducers/index";

// Persist configuration
const persistConfig = {
  key: "root",
  storage, // Specify storage (localStorage by default)
};

// Wrap root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));

// Create persistor
const persistor = persistStore(store);

export { store, persistor };
