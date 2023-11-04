const app=require('./App')
const mongo = require("mongoose");
const dotenv = require("dotenv");
const db = require("./Config/Database");
const db_Connection = require("./Config/Database");

//Uncaught Exception Error
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log("Shutting down the server :(");
    process.exit(1)
})

//Config
dotenv.config({ path: "Config/Config.env" });
const PORT = process.env.PORT;
db_Connection()
//Server
const server=app.listen(PORT, () => {
  console.log(`Serser is running on http://localhost:${PORT}`);
});




//Unhandled RejectionError

process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err.message}`);
    console.log("Shutting down the server :(");
    server.close(()=>{
        process.exit(1)
    })
})