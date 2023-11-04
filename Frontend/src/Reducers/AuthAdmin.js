import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  isAuthAdmin: false,
};

const isAuthAdmin = createSlice({
  name: "AuthAdmin",
  initialState,
  reducers: {
    getAuthAdmin: (state, action) => {
      state.isAuthAdmin = action.payload;
    },
  },
});

export const { getAuthAdmin } = isAuthAdmin.actions;
export default isAuthAdmin.reducer;

export const AuthAdmin = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/v1/isAuth/admin");
      if (data.success) {
        dispatch(getAuthAdmin(true));
      }
    } catch (error) {
      console.log("Admin not Login");
    }
  };
};
