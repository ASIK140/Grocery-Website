import React, { Fragment } from "react";
// import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
// import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import Footer from "../Footer/Footer";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useDispatch } from "react-redux";
import { setCart } from "../../Reducers/CartReducer";

const ConfirmOrder = ({ history }) => {
  const Dispatch = useDispatch();
  const [loading, setloading] = React.useState(false);
  const { shippingInfo, data } = useSelector((state) => state.cart);
  const Navigate = useNavigate();
  // const { user } = useSelector((state) => state.user);
  const subtotal = data.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = Math.ceil(subtotal + tax + shippingCharges);

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    // history.push("/process/payment");
  };
  const confirmOrder = async () => {
    setloading(true);
    try {
      const res = await axios.post("/api/v1/order/new", {
        shippingInfo,
        orderItems: data,
        itemsPrice: subtotal,
        shippingPrice: shippingCharges,
        taxPrice: tax,
        totalPrice,
      });
      setloading(false);
      if (res.data.success) {
        Navigate("/orderdone");
      }
    } catch (error) {
      setloading(false);

      console.log(error);
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {/* <MetaData title="Confirm Order" /> */}
          {/* <CheckoutSteps activeStep={1} /> */}
          <div className="confirmOrderPage">
            <div>
              <div className="confirmshippingArea">
                <Typography>Shipping Info</Typography>
                <div className="confirmshippingAreaBox">
                  <div>
                    <p>Name:</p>
                    <span>ASIK</span>
                  </div>
                  <div>
                    <p>Phone:</p>
                    <span>{shippingInfo.phoneNo}</span>
                  </div>
                  <div>
                    <p>Address:</p>
                    <span>{address}</span>
                  </div>
                </div>
              </div>
              <div className="confirmCartItems">
                <Typography>Your Cart Items:</Typography>
                <div className="confirmCartItemsContainer">
                  {data &&
                    data.map((item) => (
                      <div key={item.product}>
                        <img src={item.image} alt="Product" />
                        <Link to={`/product/${item.product}`}>
                          {item.name}
                        </Link>{" "}
                        <span>
                          {item.quantity} X ₹{item.price} ={" "}
                          <b>₹{item.price * item.quantity}</b>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            {/*  */}
            <div>
              <div className="orderSummary">
                <Typography>Order Summery</Typography>
                <div>
                  <div>
                    <p>Subtotal:</p>
                    <span>₹{subtotal}</span>
                  </div>
                  <div>
                    <p>Shipping Charges:</p>
                    <span>₹{shippingCharges}</span>
                  </div>
                  <div>
                    <p>GST:</p>
                    <span>₹{tax}</span>
                  </div>
                </div>

                <div className="orderSummaryTotal">
                  <p>
                    <b>Total:</b>
                  </p>
                  <span>₹{totalPrice}</span>
                </div>

                <button onClick={confirmOrder}>Proceed To Payment</button>
              </div>
            </div>
          </div>
          <Footer />
        </Fragment>
      )}
    </>
  );
};

export default ConfirmOrder;
