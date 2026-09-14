const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/User");
const { validateSignupData } = require("./helper/validator");
const bcrypt = require("bcrypt");
var cookieParser = require("cookie-parser");
var jwt = require("jsonwebtoken");
const { authMiddleWare } = require("./middleware/auth");

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

    var token = jwt.sign({ userId: user._id }, "shhhhh", { expiresIn: "1h" });

    res.cookie("token", token, { maxAge: 60 * 60 * 1000 });
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ "Error: ": error.message });
  }
});

// Get user by ID
app.get("/user/:id", authMiddleWare, async (req, res) => {
  try {
    user = req.user;
    res.status(200).json({ message: "User fetched successfully", user });
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
