import { createSlice } from "@reduxjs/toolkit";

const initialState = { isAuthenticated: false, user: null };

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      // Update state immutably
      state.isAuthenticated = true;
      state.user = action.payload;
    },

    logOut: (state) => {
      // Update state immutably
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setCredentials, logOut } = authenticationSlice.actions;
export const selectIsAuthenticated = (state) =>
  state.authentication.isAuthenticated;
export const selectUserData = (state) => state.authentication.user;

export default authenticationSlice.reducer;
