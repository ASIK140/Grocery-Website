const mongo = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongo.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: 30,
    minLength: 4,
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    // validate: [validator.isEmil, "Please Enter Valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Password"],
    minLength: [8, "Password must greater than 8 charecters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetpasswordToken: String,
  resetpasswordExpire: String,
});
//JWT Token

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECKEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.comPass = async function (log_pass) {
  return await bcrypt.compare(log_pass, this.password);
};

module.exports = mongo.model("Users", userSchema);
