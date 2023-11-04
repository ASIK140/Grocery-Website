import React from "react";
// import Home from './Components/Home/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Components/User/Sighup/Register";
import Login from "./Components/User/Sighup/Login";
import Cart from "./Components/Cart/Cart";
import Shipping from "./Components/Cart/Shipping";
import Home from "./Components/Home/Home";
import Profile from "./Components/User/Profile/Profile";
import Search from "./Components/Search/Search";
import ConfirmOrder from "./Components/Cart/ConfirmOrder";
import UpdatePassword from "./Components/User/Profile/UpdatePassword";
// import Page from './Components/Footer/Page'
import Loader from "./Components/Loader/Loader";
import Test from "./Components/test/test";
import Admin from "./Components/Admin/Admin";
import UpdateProfile from "./Components/User/Profile/UpdateProfile";
import NotFound from "./Components/NotFound/NotFound";
import "./Components/NotFound/NotFound.css";
import OrderSuccess from "./Components/Cart/OrderSuccess";
import { useSelector, useDispatch } from "react-redux";

// import AuthAdmin from "./Reducers/AuthAdmin";
// import { useEffect } from "react";
// import AuthUser from "./Reducers/AuthUser";
import MyOrders from "./Components/Order/MyOrders";
import ProductDetais from "./Components/Product/ProductDetais";
import CatDetails from "./Components/Product/CatDetails";
function App() {
  const { isAuthUser } = useSelector((state) => state.authuser);
  const { isAuthAdmin } = useSelector((state) => state.authAdmin);
  return (
    // <Home/>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/profile"
          element={isAuthUser ? <Profile /> : <NotFound />}
        />
        {/* <Route path="/product" element={<Page/>}/> */}
        <Route path="/product/:id" element={<ProductDetais />} />
        <Route path="/admin" element={isAuthAdmin ? <Admin /> : <NotFound />} />
        <Route path="/cart" element={isAuthUser ? <Cart /> : <NotFound />} />
        <Route
          path="/order"
          element={isAuthUser ? <Shipping /> : <NotFound />}
        />
        <Route
          path="/order/confirm"
          element={isAuthUser ? <ConfirmOrder /> : <NotFound />}
        />
        <Route path="/notfound" element={<NotFound />} />
        <Route
          path="/orderdone"
          element={isAuthUser ? <OrderSuccess /> : <NotFound />}
        />
        <Route
          path="/profile/update"
          element={isAuthUser ? <UpdateProfile /> : <NotFound />}
        />
        <Route
          path="/profile/update/pass"
          element={isAuthUser ? <UpdatePassword /> : <NotFound />}
        />
        <Route path="/search" element={<Search />} />
        <Route path="/category/:keyword" element={<CatDetails />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/loader" element={<Loader />} />
      </Routes>
    </Router>
  );
}

export default App;
