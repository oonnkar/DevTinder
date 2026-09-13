const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/User");

// Create Express app
const app = express();

// Parse JSON request body
app.use(express.json());

// Create a new user
app.post("/signup", async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body is empty" });
    }

    const user = new User(req.body);

    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user by ID
app.get("/getUser/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
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
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

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
