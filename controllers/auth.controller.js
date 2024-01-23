require("dotenv").config();
const User = require("../models/user.model.js");
const CustomError = require("../errors/customError.error.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// login user
const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new CustomError("Provide all credentials", 400);

  const user = await User.findOne({ email });

  if (!user) throw new CustomError("User not found", 403);

  try {
    const isMatch = await bcrypt.compare(password, user.password);

    if (user.email !== email || !isMatch)
      return res
        .status(401)
        .json({ status: "Failed", error: "Email or password is not correct" });

    // generate token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.TOKEN_EXPIRES_IN
    });

    res.status(200).json({ status: "Success", token });
  } catch (error) {
    res.status(400).json({ status: "Failed", error });
  }
};

// register the user.
const signUp = async (req, res) => {
  const { fullName, role, phoneNumber, email, password, confirmPassword } =
    req.body;
  const result = await User.findOne({ email });

  if (result) throw new CustomError("User already exists with this email", 403);

  if (
    !fullName ||
    !role ||
    !phoneNumber ||
    !email ||
    !password ||
    !confirmPassword
  )
    throw new CustomError("All fields are required", 400);

  if (password !== confirmPassword)
    throw new CustomError("Password and confirm password doesn't match", 403);

  try {
    // generate salt for password
    const salt = await bcrypt.genSalt(12);
    // hash the password
    const hashedPassword = await bcrypt.hash(password, salt);
    // create a user on the database
    const user = await User.create({
      fullName,
      role,
      phoneNumber,
      email,
      password: hashedPassword
    });
    // generate token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.TOKEN_EXPIRES_IN
    });

    res.status(201).json({ status: "Success", token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "Failed", error });
  }
};

// change the password
const changePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;
  const id = req.decoded._id;

  const user = await User.findById(id);

  if (!user) throw new CustomError("User doesn't exists", 403);

  // match the user provided password with password in database
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  // throw error if password doesn't match
  if (!isMatch) throw new CustomError("incorrect password", 403);

  if (newPassword !== confirmNewPassword)
    throw new CustomError(
      "New password and confirm new password doesn't match",
      403
    );

  try {
    // generate salt for new password
    const salt = await bcrypt.genSalt(12);
    // hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    // find user by user's id
    const filter = { _id: new mongoose.Types.ObjectId(id) };
    // filed to be updated
    const updateDoc = { password: hashedPassword };
    // update the field
    const doc = await User.findOneAndUpdate(filter, updateDoc, {
      new: true
    }).select("-password");

    if (!doc) {
      return res
        .status(404)
        .json({ status: "Failed", error: "User not found" });
    }

    res
      .status(200)
      .json({ status: "success", message: "Password changed", doc });
  } catch (error) {
    console.error(error); // Log the error to the console for debugging
    res.status(400).json({ status: "Failed", error: error.message });
  }
};

module.exports = {
  signIn,
  signUp,
  changePassword
};
