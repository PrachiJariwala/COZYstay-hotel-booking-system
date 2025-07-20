const mongoose = require("mongoose");
// here you can add your connection string to connect with your database
var mongoURL = "mongodb://localhost:27017/Rooms";
// mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.connect(mongoURL);
var connection = mongoose.connection;

connection.on("connected", () => {
  console.log("MongoDb Connection Successfully");
});
connection.on("error", () => {
  console.log("MongoDb Connection Failed");
});
module.exports=mongoose;