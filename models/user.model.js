const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Name must be provided"]
    },

    role: {
      type: String,
      required: [true, "Role must be provided"],
      enum: ["owner", "renter"]
    },

    phoneNumber: {
      type: String,
      required: [true, "Phone number must be provided"],
      unique: true,
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

    email: {
      type: String,
      required: [true, "Email must be provided"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email"
      ],
      unique: true
    },

    password: {
      type: String,
      required: [true, "Password must be provided"],
      minLength: 6
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
