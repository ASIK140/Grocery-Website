import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuItem from "@mui/material/MenuItem";
import { InputLabel } from "@mui/material";
import { FormControl } from "@mui/material";
import Loader from "../Loader/Loader";
import Select from "@mui/material/Select";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { deleteOrder, fetchAllOrder } from "../../Reducers/OrderReducer";
import axios from "axios";
export default function BasicTable() {
  const Dispatch = useDispatch();
  const [status, setStatus] = React.useState("");
  const orders = useSelector((state) => state.orders.allOrders);
  const { loading } = useSelector((state) => state.orders);
  const edit = async (id) => {
    if (status === "") {
      alert("Choose Order Status!!");
    } else {
      try {
        const { data } = await axios.put(`api/v1/admin/order/${id}`, {
          status,
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const DeleteOrder = (id) => {
    const text = "Do you wnat Delete this Order?";
    if (window.confirm(text) === true) {
      Dispatch(deleteOrder(id));
    }
  };
  React.useEffect(() => {
    Dispatch(fetchAllOrder());
  }, [Dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Total Price</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell align="right">Action&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders &&
                orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>₹{order.totalPrice}</TableCell>
                    <TableCell>
                      {order.shippingInfo.address},{order.shippingInfo.city},
                      {order.shippingInfo.pinCode}
                    </TableCell>
                    <TableCell>
                      {" "}
                      <select onChange={(e) => setStatus(e.target.value)}>
                        <option value="">
                          {order.orderStatus === "Delivered"
                            ? "Delivered"
                            : "Choose"}
                        </option>
                        {order.orderStatus === "Processing" && (
                          <option value="Shipped">Shipped</option>
                        )}

                        {order.orderStatus === "Shipped" && (
                          <option value="Delivered">Delivered</option>
                        )}
                      </select>
                    </TableCell>
                    <TableCell>{order.shippingInfo.phoneNo}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => {
                          DeleteOrder(order._id);
                        }}
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          edit(order._id);
                        }}
                        aria-label="edit"
                      >
                        <CheckCircleIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
