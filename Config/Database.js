const mongo = require("mongoose");
const uri =
  "mongodb+srv://asikeducation140:asik140@cluster0.67kucei.mongodb.net/Products?retryWrites=true&w=majority";

const db_Connection = () => {
  mongo.connect(uri).then((data) => {
    console.log(`Database connected with server:${data.connection.host} `);
  });
};

module.exports = db_Connection;
