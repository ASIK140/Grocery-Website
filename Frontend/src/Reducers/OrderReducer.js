import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  myOrders: [],
  allOrders: [],
  loading: false,
};

const orderReducer = createSlice({
  name: "order",
  initialState,
  reducers: {
    getMyOrders: (state, action) => {
      state.myOrders = action.payload;
    },
    getAllOrders: (state, action) => {
      state.allOrders = action.payload;
    },
    setStatus: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { getAllOrders, getMyOrders, setStatus } = orderReducer.actions;
export default orderReducer.reducer;

export const fetchOrder = () => {
  return async (dispatch) => {
    dispatch(setStatus(true));
    try {
      const { data } = await axios.get("/api/v1/myorders");
      dispatch(getMyOrders(data.orders));
      dispatch(setStatus(false));
    } catch (error) {
      dispatch(setStatus(false));
      console.log(error);
    }
  };
};
export const fetchAllOrder = () => {
  return async (dispatch) => {
    try {
      dispatch(setStatus(true));
      const { data } = await axios.get("/api/v1/admin/orders");
      dispatch(getAllOrders(data.orders));
      dispatch(setStatus(false));
    } catch (error) {
      dispatch(setStatus(false));
      console.log(error);
    }
  };
};

export const deleteOrder = (id) => {
  return async () => {
    try {
      const { data } = await axios.delete(`/api/v1/admin/order/${id}`);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
};
