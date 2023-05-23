const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
// conectio to db
mongoose.connect(process.env.MONGO_URL);

mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
});

mongoose.connection.on("error", (err) => {
  console.log("error connecting to mongo: reason :", err.message);
});

module.exports = mongoose;
