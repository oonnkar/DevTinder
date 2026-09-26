const express = require("express");
const validator = require("validator");
const authMiddleWare = require("../middleware/auth");

const profileRouter = express.Router();
// Get the authenticated user's profile
profileRouter.get("/view", authMiddleWare, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ message: "User fetched successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

profileRouter.patch("/edit", authMiddleWare, async (req, res) => {
  try {
    const user = req.user;
    const allowedUpdates = [
      "firstName",
      "lastName",
      "phoneNumber",
      "gender",
      "about",
      "skills",
    ];
    const isValidOperation = Object.keys(req.body).every((update) =>
      allowedUpdates.includes(update),
    );

    if (!isValidOperation) {
      throw new Error("Invalid updates");
    }

    Object.keys(req.body).forEach((update) => {
      user[update] = req.body[update];
    });

    console.log("req came to me");
    
    
    await user.save();
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

profileRouter.patch("/edit/password", authMiddleWare, async (req, res) => {
  try {
    const user = req.user;
    const newPassword = req.body.password;

    if (!validator.isStrongPassword(newPassword)) {
      throw new Error("Password is not strong enough");
    }

    
    user.password = await user.getJwt(newPassword);

    await user.save();
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = profileRouter;
