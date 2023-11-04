import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: {},
  allUser: [],
  loading: false,
  isAuth: false,
};

const userReduser = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setError: (state, action) => {
      state.error.message = action.payload;
    },
    getAlluser: (state, action) => {
      state.allUser = action.payload;
    },
    setStatus: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { getUser, setStatus, setError, setAuth, getAlluser } =
  userReduser.actions;
export default userReduser.reducer;
//login

// register
export const registerUser = (data) => {
  return async (dispatch) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const res = await axios.post("/api/v1/register", data, config);
      dispatch(getUser(res.data));
    } catch (error) {
      dispatch(setError(error.response.data.error));
    }
  };
};

//User Details
export const getUserDetais = () => {
  return async (dispatch) => {
    dispatch(setStatus(true));
    try {
      const { data } = await axios.get("/api/v1/profile");
      dispatch(getUser(data.user));
      dispatch(setStatus(false));
    } catch (error) {
      dispatch(setStatus(false));

      console.log(error);
    }
  };
};

// Log Out

export const getAllusers = () => {
  return async (dispatch) => {
    dispatch(setStatus(true));
    try {
      const { data } = await axios.get("/api/v1/users");
      dispatch(getAlluser(data));
      dispatch(setStatus(false));
    } catch (error) {
      dispatch(setStatus(false));
      console.log(error);
    }
  };
};
