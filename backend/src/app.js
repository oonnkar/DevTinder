const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/User");
const { validateSignupData } = require("./helper/validator");
const bcrypt = require("bcrypt");
var cookieParser = require("cookie-parser");
var jwt = require("jsonwebtoken");

// Create Express app
const app = express();

// Parse JSON request body
app.use(express.json());
app.use(cookieParser());

// Create a new user
app.post("/signup", async (req, res) => {
  try {
    if (!req.body) {
      throw new Error("Request body is empty");
    }
    validateSignupData(req);

    const { firstName, lastName, emailId, password, phoneNumber, gender } =
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
    });

    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ "Error: ": error.message });
  }
});

// login user
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    var token = jwt.sign({ userId: user._id }, "shhhhh");

    res.cookie("token", token);
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ "Error: ": error.message });
  }
});

// Get user by ID
app.get("/user/:id", async (req, res) => {
  try {
    var decoded = jwt.verify(req.cookies.token, "shhhhh");

    if (!decoded || !decoded.userId) {
      throw new Error("Invalid token");
    }

    const userId = decoded.userId;
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }
    res.status(200).json({ message: "User fetched successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get users by email
app.get("/getAllUsers", async (req, res) => {
  const user = await User.find({ emailId: "rahulsharma@example.com" });
  res.status(200).json({ message: "User fetched successfully", user });
});

// Delete user by ID
app.delete("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    await User.findByIdAndDelete(user._id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

// Update user by ID
app.patch("/user/:id", async (req, res) => {
  try {
    const allowedUpdates = ["password", "phoneNumber"];

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is empty" });
    }

    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update),
    );

    if (!isValidOperation) {
      return res.status(400).json({ message: "Invalid updates" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true },
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Connect DB and start server
connectDB()
  .then(() => {
    console.log("database connection successful");

    app.listen(3000, () =>
      console.log("server is successfully listening on port 3000"),
    );
  })
  .catch((error) => {
    console.log(error.message);
  });
