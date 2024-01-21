const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
//env config
dotenv.config();
// const uri = "mongodb+srv://Abhishek:Abhi%40123@abhikiblogapi.bgd2jlm.mongodb.net/blog?retryWrites=true&w=majority";
const connectDB = async () => {
  try {
    // mongoose.connect(uri);
    await mongoose.connect(process.env.DB_URL);
    console.log(
      `Connected to Mongodb Database ${mongoose.connection.host}`.bgMagenta
        .white
    );
  } catch (error) {
    console.log(`MONGO Connect Error ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
