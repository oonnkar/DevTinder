const express = require("express");
const bcrypt = require("bcrypt");
const { validateSignupData } = require("../helper/validator");
const User = require("../models/User");

const authRouter = express.Router();

// Create a new user
authRouter.post("/signup", async (req, res) => {
  try {
    if (!req.body) {
      throw new Error("Request body is empty");
    }
    validateSignupData(req);

    const { firstName, lastName, emailId, password, phoneNumber, gender , about , skills } =
      req.body;
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
      phoneNumber,
      gender,
      about, 
      skills
    });

    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ "Error: ": error.message });
  }
});

// login user
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = await user.getJwt();

    res.cookie("token", token, { maxAge: 60 * 60 * 1000 });
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ "Error: ": error.message });
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.status(200).json({ message: "Logout successful" });
});

module.exports = authRouter;
