import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/auth.slice";
import themeSlice from "./slices/theme.slice";
import formSlice from "./slices/form.slice";
const rootReducer = combineReducers({
  auth: authSlice,
  theme: themeSlice,
  form: formSlice,
});

export default rootReducer;
