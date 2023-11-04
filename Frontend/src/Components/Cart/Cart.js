import React, { Fragment, useState } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { Typography } from "@mui/material";
// import IconButton from "@mui/material/IconButton";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Footer/Footer";
import { useEffect } from "react";
import { setCart, removeCart } from "../../Reducers/CartReducer";
import Loader from "../Loader/Loader";

const Cart = ({ history }) => {
  const { data } = useSelector((state) => state.cart);
  const [cartItems, setcartItems] = useState([]);
  const { isAuthUser } = useSelector((state) => state.authuser);
  const { isAuthAdmin } = useSelector((state) => state.authAdmin);
  const [loading, setloading] = useState(false);
  const Dispatch = useDispatch();
  const Navigate = useNavigate();
  const decreaseQuantity = (item) => {
    const newitem = { ...item };

    if (item.quantity > 1) {
      newitem.quantity = -1;
      Dispatch(setCart(newitem));
    }
  };
  const increaseQuantity = (item) => {
    const newitem = { ...item };

    if (item.quantity < 10) {
      newitem.quantity = 1;
      Dispatch(setCart(newitem));
    }
  };
  const deleteCartItems = (id) => {
    Dispatch(removeCart(id));
  };
  // useEffect(() => {
  //   setcartItems(data);
  // });
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {data.length === 0 ? (
            <div className="emptyCart">
              <RemoveShoppingCartIcon />

              <Typography>No Product in Your Cart</Typography>
              <Link to="/">View Products</Link>
            </div>
          ) : (
            <Fragment>
              <div className="cartPage">
                <div className="cartHeader">
                  <p>Product</p>
                  <p>Quantity</p>
                  <p>Subtotal</p>
                </div>

                {data &&
                  data.map((item) => (
                    <div className="cartContainer" key={item.id}>
                      <CartItemCard
                        item={item}
                        deleteCartItems={() => {
                          deleteCartItems(item.id);
                        }}
                      />
                      <div className="cartInput">
                        <button
                          onClick={() => {
                            decreaseQuantity(item);
                          }}
                        >
                          -
                        </button>
                        {item.quantity}
                        <button
                          onClick={() => {
                            increaseQuantity(item);
                          }}
                        >
                          +
                        </button>
                      </div>
                      <p className="cartSubtotal">{`₹${
                        item.price * item.quantity
                      }`}</p>
                    </div>
                  ))}

                <div className="cartGrossProfit">
                  <div></div>
                  <div className="cartGrossProfitBox">
                    <p>Gross Total</p>
                    <p>{`₹${cartItems.reduce(
                      (acc, item) => acc + item.quantity * item.price,
                      0
                    )}`}</p>
                  </div>
                  <div></div>
                  <div className="checkOutBtn">
                    <button
                      onClick={() => {
                        Navigate("/order");
                      }}
                    >
                      Check Out
                    </button>
                  </div>
                </div>
              </div>
            </Fragment>
          )}
          <Footer />
        </Fragment>
      )}
    </>
  );
};

export default Cart;
