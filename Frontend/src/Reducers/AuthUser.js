import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  isAuthUser: false,
};

const isAuthUser = createSlice({
  name: "AuthUser",
  initialState,
  reducers: {
    getAuthUser: (state, action) => {
      state.isAuthUser = action.payload;
    },
  },
});

export const { getAuthUser } = isAuthUser.actions;
export default isAuthUser.reducer;

export const AuthUser = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/v1/isAuth/user");
      if (data.success) {
        dispatch(getAuthUser(true));
      }
    } catch (error) {
      console.log("User not Login");
    }
  };
};
