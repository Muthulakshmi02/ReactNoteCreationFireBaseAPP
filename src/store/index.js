/* This code is for without persistent of email, password.Once login success and refresh it will go to sign in due to persistent

import { configureStore } from "@reduxjs/toolkit";
import { notesReducer } from "./notes/notes";
import { authReducer } from "./auth/auth-slice"
export const store = configureStore({
  reducer: {
    noteSlice: notesReducer,
    authSlice: authReducer,
  },
});

*/

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { notesReducer } from "./notes/notes";
import { authReducer } from "./auth/auth-slice";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const rootReducer = combineReducers({
  noteSlice: notesReducer,
  authSlice: authReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["authSlice"],
};

const persistedReducers = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };



