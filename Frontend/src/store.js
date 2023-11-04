import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./Reducers/UserReducer";
import ProductReducer from "./Reducers/ProductReducer";
import CartReducer from "./Reducers/CartReducer";
import AuthUser from "./Reducers/AuthUser";
import AuthAdmin from "./Reducers/AuthAdmin";
import OrderReducer from "./Reducers/OrderReducer";
const store = configureStore({
  reducer: {
    user: UserReducer,
    product: ProductReducer,
    cart: CartReducer,
    authuser: AuthUser,
    authAdmin: AuthAdmin,
    orders: OrderReducer,
  },
});

export default store;
