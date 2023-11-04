const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../Controler/orderController");
const router = express.Router();

const { Auth, checkAuthAdmin } = require("../Middleware/auth");

router.route("/order/new").post(Auth, newOrder);

router.route("/order/:id").get(Auth, getSingleOrder);

router.route("/myorders").get(Auth, myOrders);

router.route("/admin/orders").get(Auth, checkAuthAdmin("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(Auth, checkAuthAdmin("admin"), updateOrder)
  .delete(Auth, checkAuthAdmin("admin"), deleteOrder);

module.exports = router;
