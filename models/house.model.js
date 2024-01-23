const mongoose = require("mongoose");

//sub document schema for the renter
const RenterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Renter's name is required"]
  },

  email: {
    type: String,
    required: [true, "Renter's email is required"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email"
    ]
  },

  phoneNumber: {
    type: String,
    required: [true, "Phone number must be provided"],
    validate: {
      validator: function (value) {
        // Define a simplified regex pattern for Bangladeshi phone numbers
        const bangladeshiPhoneNumberRegex = /^\+8801\d{9}$/;

        // Test the value against the regex pattern
        return bangladeshiPhoneNumberRegex.test(value);
      },
      message: "Please provide a valid Bangladeshi phone number"
    }
  }
});

// house schema
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

    status: {
      type: Boolean,
      required: [true, "Status is required"],
      default: false
    },

    owner: {
      required: [true, "owner is required"],
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    renter: RenterSchema
  },
  { timestamps: true }
);

module.exports = mongoose.model("House", houseSchema);
