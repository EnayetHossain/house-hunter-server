require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth.route");
const errorHandler = require("./middlewares/errorHandler.middleware");
const notFound = require("./middlewares/notFound.middleware");
const connectDB = require("./db/connect.db");
const houseRouter = require("./routes/house.route");

const app = express();
// eslint-disable-next-line no-unused-vars
const port = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/houses", houseRouter);

// routes
app.get("/", (req, res) => {
  res.send("server running");
});

// error handler
app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(
      port,
      console.log("connected to database visit http://localhost:5000")
    );
  } catch (error) {
    console.log(error);
  }
};

start();
