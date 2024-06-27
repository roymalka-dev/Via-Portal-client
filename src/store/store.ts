import { configureStore, combineReducers } from "@reduxjs/toolkit";
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
import storage from "redux-persist/lib/storage";

// Import your reducers
import authSlice from "./slices/auth.slice";
import themeSlice from "./slices/theme.slice";
import formSlice from "./slices/form.slice";

// Configure persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "form", "theme"], // Only persist the auth reducer, add other reducers you want to persist
};

const rootReducer = combineReducers({
  auth: authSlice,
  theme: themeSlice,
  form: formSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
