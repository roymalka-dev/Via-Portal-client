import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string;
  id: string;
  isAuthenticated: boolean;
  authorizations: string[];
  email: string;
}

const initialState: AuthState = {
  token: "",
  id: "",
  isAuthenticated: false,
  authorizations: [],
  email: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setIsAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    setAuthorizations(state, action: PayloadAction<string[]>) {
      state.authorizations = action.payload;
    },
    setDetails(state, action: PayloadAction<AuthState>) {
      state.id = action.payload.id;
      state.email = action.payload.email;
    },
    logout(state) {
      state.token = "";
      state.id = "";
      state.isAuthenticated = false;
      state.authorizations = [];
      state.email = "";
    },
  },
});

export const {
  setToken,
  setIsAuthenticated,
  setAuthorizations,
  setDetails,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
