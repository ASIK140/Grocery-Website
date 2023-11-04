import { createSlice } from "@reduxjs/toolkit";
const storeData = JSON.parse(localStorage.getItem("cartItems"));
const initialState = {
  data: storeData ? storeData : [],
  shippingInfo: [],
  loading: false,
};

const CartReducer = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCart: (state, action) => {
      const item = action.payload;
      const isItemExist = state.data.find((i) => i.id === item.id);
      if (isItemExist) {
        isItemExist.quantity = isItemExist.quantity + item.quantity;
      } else {
        state.data.push(item);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.data));
    },
    removeCart: (state, action) => {
      state.data = state.data.filter((i) => i.id !== action.payload);
    },
    setshippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
    },
    setStatus: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setCart, removeCart, setshippingInfo } = CartReducer.actions;
export default CartReducer.reducer;
