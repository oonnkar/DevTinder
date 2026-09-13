const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/User");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const user = new User({
      firstName: "Jane",
      lastName: "Smith",
      emailId: "janesmith@gmail.com",
      password: "abcdef",
      phoneNumber: "9876543210",
      gender: "Female",
    });

    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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
