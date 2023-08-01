import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    }, 
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true; 
    },
    logoutStart: (state) => {
      state.currentUser = null;
    },
    dislikestart:(state, action) => {
      state.currentUser.wishlist = state.currentUser.wishlist.filter(item => item !== action.payload);
    },
    likestart:(state, action) => {
      state.currentUser.wishlist.push(action.payload);
    },
    resetUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logoutStart, likestart, dislikestart, resetUser } = userSlice.actions;
export default userSlice.reducer;