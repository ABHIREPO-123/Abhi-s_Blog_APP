const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");
const router = express.Router();

const dotenv = require("dotenv");
//env config
dotenv.config();

//router import
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

//mongodb connection
connectDB();

//rest objecct
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
router.use("/user", userRoutes);
router.use("/blog", blogRoutes);

// Port
const PORT = process.env.PORT || 8080;
//listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode port no ${PORT}`.bgCyan.white
  );
});

app.use('/', router);
module.exports = app;
// module.exports.handler = serverless(app);
