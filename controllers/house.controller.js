const { default: mongoose } = require("mongoose");
const CustomError = require("../errors/customError.error");
const House = require("../models/house.model");

// get all the houses with search and filter capability
const getAllHouses = async (req, res) => {
  const { city, name, sort, fields, numericFilters } = req.query;
  const queryObject = {
    isBooked: false
  };

  if (city) queryObject.city = city;
  if (name) queryObject.name = { $regex: name, $options: "i" };

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte"
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["bedRooms", "bathRooms", "roomSize", "rentPerMonth"];
    filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = House.find(queryObject);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    const filedList = fields.split(",").join(" ");
    result = result.select(filedList);
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const houses = await result;
  res.status(200).json({ status: "Success", nbHits: houses.length, houses });
};

// add a house in database
const addHouse = async (req, res) => {
  const {
    name,
    address,
    city,
    bedRooms,
    bathRooms,
    roomSize,
    picture,
    availabilityDate,
    rentPerMonth,
    phoneNumber,
    description,
    owner
  } = req.body;

  if (
    !name ||
    !address ||
    !city ||
    !bedRooms ||
    !bathRooms ||
    !roomSize ||
    !picture ||
    !availabilityDate ||
    !rentPerMonth ||
    !phoneNumber ||
    !description ||
    !owner
  )
    throw new CustomError("All fields are required", 400);

  try {
    const house = await House.create({
      name,
      address,
      city,
      bedRooms,
      bathRooms,
      roomSize,
      picture,
      availabilityDate,
      rentPerMonth,
      phoneNumber,
      description,
      owner
    });

    res.status(201).json({ status: "Success", house });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "Failed", error });
  }
};

// update a house in database
const updateHouse = async (req, res) => {
  const {
    name,
    address,
    city,
    bedRooms,
    bathRooms,
    roomSize,
    picture,
    availabilityDate,
    rentPerMonth,
    phoneNumber,
    description
  } = req.body;

  const id = req.params.id;
  console.log(id);

  if (
    !name ||
    !address ||
    !city ||
    !bedRooms ||
    !bathRooms ||
    !roomSize ||
    !picture ||
    !availabilityDate ||
    !rentPerMonth ||
    !phoneNumber ||
    !description
  )
    throw new CustomError("All fields are required", 400);

  try {
    const filter = { _id: new mongoose.Types.ObjectId(id) };
    const updateDoc = {
      name,
      address,
      city,
      bedRooms,
      bathRooms,
      roomSize,
      picture,
      availabilityDate,
      rentPerMonth,
      phoneNumber,
      description
    };

    const updatedHouse = await House.findOneAndUpdate(filter, updateDoc, {
      new: true
    });

    res.status(201).json({ status: "Success", updatedHouse });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "Failed", error });
  }
};

// delete a house from database
const deleteHouse = async (req, res) => {
  const id = req.params.id;

  try {
    const query = { _id: new mongoose.Types.ObjectId(id) };
    const deleteHouse = await House.deleteOne(query);

    res.status(200).json({ status: "Success", deleteHouse });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "Failed", error });
  }
};

module.exports = {
  getAllHouses,
  addHouse,
  updateHouse,
  deleteHouse
};
