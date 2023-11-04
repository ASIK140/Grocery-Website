const ErrorHander = require("../Utils/ErrorHander");
const AsyncError = require("../Middleware/catchAsyncError");
const Users = require("../Models/UserModel");
const bcrypt = require("bcryptjs");
const sendCookie = require("../Utils/Cookies");

// Create User
exports.register = AsyncError(async (req, res, next) => {
  const { name, email } = req.body;
  let password = await bcrypt.hash(req.body.password, 10);

  const user = await Users.create({
    name,
    email,
    password,
    avatar: {
      public_id: "This is public id",
      url: "wwwwww",
    },
  });

  sendCookie(user, 201, res);
  // const token = user.getJWTToken();
  // res.status(201).json({
  //   success: true,
  //   user,
  //   token,
  // });
});

//Loging User
exports.login = AsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander(400, "Invalid email & password"));
  }

  const isMatch = await user.comPass(password);
  if (!isMatch) {
    return next(new ErrorHander(400, "Invalid email & password"));
  }
  sendCookie(user, 200, res);
});

// Get All User

exports.getAllUser = AsyncError(async (req, res) => {
  const user = await Users.find();
  const countuser = await Users.countDocuments();
  res.status(200).json({
    total_user: countuser,
    success: true,
    user,
  });
});

//Logout User

exports.logout = AsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "User Logout!!",
  });
});

//Profile
exports.profile = AsyncError(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

//Change Password
exports.changePass = AsyncError(async (req, res, next) => {
  const user = await Users.findById(req.user.id).select("+password");
  // console.log(user);
  const { oldpass, newpass, confirmpass } = req.body;
  const isMatch = await user.comPass(oldpass);
  if (!isMatch) {
    return next(new ErrorHander(400, "Invalid Password"));
  }
  if (newpass != confirmpass) {
    return next(new ErrorHander(400, "Password does not match"));
  }

  user.password = await bcrypt.hash(newpass, 10);
  await user.save();
  console.log(user);
  sendCookie(user, 200, res);
});

//Update Profile

exports.updateProfile = AsyncError(async (req, res, next) => {
  const newData = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await Users.findByIdAndUpdate(req.user.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  if (!user) {
    return next(new ErrorHander(500, "Somthing went wrong"));
  }
  res.status(200).json({
    user,
    success: true,
    message: "Profile Update Successfull",
  });
});

// Get single user

exports.getSingleUser = AsyncError(async (req, res) => {
  const user = await Users.findById(req.params.id);
  res.status(200).json({
    success: true,
    user,
  });
});

// Change role
exports.chnageRole = AsyncError(async (req, res) => {
  let user = await Users.findById(req.params.id);
  const newData = {
    role: req.body.role,
  };
  user = await Users.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    user,
  });
});

//Delete User
exports.DeleteUser = AsyncError(async (req, res, next) => {
  const user = await Users.findById(req.params.id);
  if (!user) {
    return next(new ErrorHander(404, "User not found"));
  }
  user.deleteOne();

  res.status(200).json({
    success: true,
    message: "User Deleted",
  });
});

//Authentication

exports.isAuth = AsyncError((req, res) => {
  res.status(200).json({
    success: true,
  });
});
