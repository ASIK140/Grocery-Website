const express = require("express");
const product = require("./Routes/ProductRouter");
const user = require("./Routes/UserRouter");
const order = require("./Routes/orderRoute");
const errorMiddleware = require("./Middleware/Error");
const cookieParser = require("cookie-parser");
const fileupload = require("express-fileupload");
const app = express();
// const cors = require("cors")
// app.use(cors({
//     origin:"http://localhost:3000",
//     credentials:true,
// }))
app.use(express.json());
app.use(cookieParser());
app.use(
  fileupload({
    useTempFiles: true,
  })
);
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

app.use(errorMiddleware);
module.exports = app;
