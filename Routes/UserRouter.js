const express = require("express");
const {
  register,
  login,
  getAllUser,
  logout,
  profile,
  changePass,
  updateProfile,
  getSingleUser,
  chnageRole,
  DeleteUser,
  isAuth,
} = require("../Controler/UserControler");
const { Auth, checkAuthAdmin } = require("../Middleware/auth");

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);
router.route("/users").get(Auth, checkAuthAdmin("admin"), getAllUser);
router.route("/logout").get(logout);
router.route("/profile").get(Auth, profile);
router.route("/UpdatePassword").put(Auth, changePass);
router.route("/UpdateProfile").put(Auth, updateProfile);
router
  .route("/admin/user/:id")
  .get(Auth, checkAuthAdmin("admin"), getSingleUser)
  .put(Auth, checkAuthAdmin("admin"), chnageRole)
  .delete(Auth, checkAuthAdmin("admin"), DeleteUser);
router.route("/isAuth/user").get(Auth, isAuth);
router.route("/isAuth/admin").get(Auth, checkAuthAdmin("admin"), isAuth);

module.exports = router;
