const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetais,
  adminProducts,
} = require("../Controler/ProductControler");
const { Auth, checkAuthAdmin } = require("../Middleware/auth");

const router = express.Router();
router.route("/allproduct").get(Auth, checkAuthAdmin("admin"), adminProducts);
router.route("/product").get(getAllProducts);
router.route("/product/new").post(Auth, checkAuthAdmin("admin"), createProduct);
// router.route("/product/new").post(createProduct);

router
  .route("/product/:id")
  .put(Auth, checkAuthAdmin("admin"), updateProduct)
  .delete(Auth, checkAuthAdmin("admin"), deleteProduct)
  .get(getProductDetais);

module.exports = router;
