
const express = require("express");

const profileRouter = express.Router();
// Get user by ID
profileRouter.get("/user/:id", authMiddleWare, async (req, res) => {
  try {
    user = req.user;
    res.status(200).json({ message: "User fetched successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = profileRouter;