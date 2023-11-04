import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOrder } from "../../Reducers/OrderReducer";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LaunchIcon from "@mui/icons-material/Launch";
import Loader from "../Loader/Loader";
const MyOrders = () => {
  const dispatch = useDispatch();
  const { myOrders } = useSelector((state) => state.orders);
  const { loading } = useSelector((state) => state.orders);
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return <LaunchIcon />;
      },
    },
  ];
  const rows = [];

  myOrders &&
    myOrders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    dispatch(fetchOrder());
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="myOrdersPage">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="myOrdersTable"
              autoHeight
            />

            <Typography id="myOrdersHeading">ASIK's Orders</Typography>
          </div>
        </Fragment>
      )}
    </>
  );
};

export default MyOrders;
