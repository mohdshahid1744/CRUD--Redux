import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userData",
  initialState: {
    isAuthenticated: false,
    token: null,
    isAdmin: false,
  },

  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.isAdmin = action.payload.isAdmin;
    },

   
  },
});

export const { loginSuccess } = userSlice.actions;
export default userSlice.reducer;