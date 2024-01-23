const { default: mongoose } = require("mongoose");
const CustomError = require("../errors/customError.error");
const House = require("../models/house.model");

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

module.exports = {
  addHouse,
  updateHouse
};
