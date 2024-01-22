require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;

// middlewares
app.use(express.json());
app.use(cors());
