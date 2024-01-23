const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "House name is required"]
    },

    address: {
      type: String,
      required: [true, "House address is required"]
    },

    city: {
      type: String,
      required: [true, "City is required"]
    },

    bedRooms: {
      type: Number,
      required: [true, "Number of bedrooms are required"]
    },

    bathRooms: {
      type: Number,
      required: [true, "Number of bathrooms are required"]
    },

    roomSize: {
      type: Number,
      required: [true, "Room size is required"]
    },

    picture: {
      type: String,
      required: [true, "Room picture is required"]
    },

    availabilityDate: {
      type: Date,
      required: [true, "Availability date is required"]
    },

    rentPerMonth: {
      type: Number,
      required: [true, "Rent per month is required"]
    },

    phoneNumber: {
      type: "string",
      required: [true, "Phone number is required"],
      validate: {
        validator: function (value) {
          // Define a simplified regex pattern for Bangladeshi phone numbers
          const bangladeshiPhoneNumberRegex = /^\+8801\d{9}$/;

          // Test the value against the regex pattern
          return bangladeshiPhoneNumberRegex.test(value);
        },
        message: "Please provide a valid Bangladeshi phone number"
      }
    },

    description: {
      type: String,
      required: [true, "Description is required"]
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("House", houseSchema);
