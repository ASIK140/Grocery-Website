import * as React from "react";
import "./Dash.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllusers } from "../../Reducers/UserReducer";
import { fetchAllOrder } from "../../Reducers/OrderReducer";
import Loader from "../Loader/Loader";
export default function BasicGrid() {
  const Dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.allOrders);
  const { user } = useSelector((state) => state.user.allUser);
  const { loading } = useSelector((state) => state.user);
  let total = 0;
  {
    orders &&
      orders.forEach((i) => {
        if (i.orderStatus === "Delivered") {
          total += i.totalPrice;
        }
      });
  }
  React.useEffect(() => {
    Dispatch(fetchAllOrder());
    Dispatch(getAllusers());
  }, [Dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="dash">
          <div id="users" className="total">
            <h3>{user && user.length}</h3>
            <span>Users</span>
          </div>
          <div id="orders" className="total">
            <h3>{orders && orders.length}</h3>
            <span>Orders</span>
          </div>
          <div id="sell" className="total">
            <h3>₹{Math.ceil(total)}</h3>
            <span>Total Sells</span>
          </div>
        </div>
      )}
    </>
  );
}
