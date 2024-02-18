import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./slices/authenticationSlice";

// Combine reducers into a single root reducer
const rootReducer = combineReducers({
  auth: authReducer,
});

// Configuration options for persisting state to local storage
// Key under which the persisted state will be stored in local storage, Storage engine, which defaults to localStorage, Version of your persisted state, for potential future migrations
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

// Create a persisted reducer by wrapping the root reducer with persist configuration
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  // Provide the persisted reducer as the main reducer
  reducer: persistedReducer,

  // Middleware configuration
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false });
  },

  devTools: false,
});

// Create a persistor to sync your store with local storage
export const persistor = persistStore(store);

/*
   if navigating to the same component with different parameters, it might lead to a re-initialization,of the store.
   ===============================================================================================
   In Redux Toolkit, "serializable" refers to the ability of the state and actions in your store to be easily converted to a plain JavaScript object and serialized to JSON. Redux includes a "serializability check" to catch mistakes where non-serializable values are accidentally included in the state.

   During development, Redux Toolkit's default middleware, `serializableCheck`, performs these checks. It ensures that both the state and actions dispatched to the store are serializable.

   When you disable the serializability check, as done in your Redux store configuration with `serializableCheck: false`, you're informing Redux Toolkit to skip these checks. This can be useful when intentionally including non-serializable values in the state, such as functions, promises, or other complex objects managed by libraries like Immer.
   ==================================================================================================
   Every time we refresh the page, the data will be gone from the store, and this is the default behavior of the store. So, to keep the data alive, we have to store it in the local storage. But we don't need to do it manually; we have an npm package called 'redux-persist,' which will perform this task for us."
*/
