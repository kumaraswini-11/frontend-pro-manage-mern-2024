import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authenticationApi } from "./api/authenticationApi";
import { todoApi } from "./api/todoApi";
import authReducer from "./slices/authenticationSlice";

// Combine reducers into a single root reducer
const rootReducer = combineReducers({
  authentication: authReducer,
  [authenticationApi.reducerPath]: authenticationApi.reducer,
  [todoApi.reducerPath]: todoApi.reducer,
});

// Configuration options for persisting state to local storage
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

// Create a persisted reducer by wrapping the root reducer with persist configuration
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authenticationApi.middleware, todoApi.middleware),
  devTools: true,
});

// Setup RTK Query listeners
setupListeners(store.dispatch);

// Create a persistor to sync the store with local storage
export const persistor = persistStore(store);
