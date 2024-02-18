import { createSlice } from "@reduxjs/toolkit";

const initialState = { isAuthenticated: false, userData: null };

const authSlice = createSlice({
  name: "auth", // Slice name
  initialState,

  // Reducers define how the state should change in response to actions
  reducers: {
    // Reducer for successful login action
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.userData = action.payload;
    },

    // Reducer for successful logout action
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.userData = null;
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUserData = (state) => state.auth.userData;

export default authSlice.reducer;

/*
Two ways of using them in the component
With variable export like we did above - const userData = useSelector(selectUserData);
without variabel export - const userData = useSelector((state) => state.auth.userData);
*/
