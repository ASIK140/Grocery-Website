import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  loading: false,
  allProduct: [],
  error: { message: "" },
};

const productReducer = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProduct: (state, action) => {
      state.data = action.payload;
    },
    getAllProduct: (state, action) => {
      state.allProduct = action.payload;
    },
    setStatus: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error.message = action.payload;
    },
  },
});

export const { getProduct, setStatus, setError, getAllProduct } =
  productReducer.actions;
export default productReducer.reducer;

export const fetchProduct = () => {
  return async (dispatch) => {
    dispatch(setStatus(true));
    try {
      const res = await axios.get("/api/v1/product");
      dispatch(getProduct(res.data));
      dispatch(setStatus(false));
    } catch (error) {
      dispatch(setStatus(false));
      console.log(error);
      dispatch(setError(error.response.data.error));
    }
  };
};

export const fetchAllProduct = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/v1/allproduct");
      dispatch(getAllProduct(res.data));
    } catch (error) {
      console.log(error);

      dispatch(setError(error.response.data.error));
    }
  };
};

export const fetchProductDetais = (id) => {
  return async (dispatch) => {
    dispatch(setStatus(true));
    try {
      const res = await axios.get(`/api/v1/product/${id}`);
      dispatch(getProduct(res.data));
      dispatch(setStatus(false));
    } catch (error) {
      dispatch(setStatus(false));
      console.log(error);

      dispatch(setError(error.response.data.error));
    }
  };
};

export const searchProduct = (keyword) => {
  return async (dispatch) => {
    dispatch(setStatus(true));
    try {
      const { data } = await axios.get(`/api/v1/product?name=${keyword}`);
      dispatch(getProduct(data));
      dispatch(setStatus(false));
      // dispatch(setStatus(STATUS.SUCCESS));
    } catch (error) {
      dispatch(setStatus(false));
      console.log(error);
    }
  };
};

export const CatProduct = (keyword) => {
  return async (dispatch) => {
    dispatch(setStatus(true));
    try {
      const { data } = await axios.get(`/api/v1/product?category=${keyword}`);
      dispatch(getProduct(data));
      dispatch(setStatus(false));
    } catch (error) {
      dispatch(setStatus(false));
      console.log(error);
    }
  };
};
