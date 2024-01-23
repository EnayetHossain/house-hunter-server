require("dotenv").config();
const connectDB = require("./db/connect.db");
const House = require("./models/house.model");
const jsonData = require("./house.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    await House.deleteMany();
    await House.create(jsonData);
    console.log("populated successfully!!!");
  } catch (error) {
    console.log(error);
  }
};

start();
