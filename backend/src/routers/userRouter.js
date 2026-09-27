const express = require("express");
const authMiddleWare = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/User");

const userRouter = express.Router();
const selectedUserFields = [
  "firstName",
  "lastName",
  "about",
  "skills",
  "gender",
  "phoneNumber",
  "profilePicture",
];

userRouter.get("/requests/received", authMiddleWare, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      toUser: loggedInUser._id,
      status: "interested",
    }).populate("fromUser", selectedUserFields);

    res
      .status(200)
      .json({ message: "data fetched successfully", data: connectionRequests });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
});

userRouter.get("/connections", authMiddleWare, async (req, res) => {
  const loggedInUser = req.user;

  const connectionRequests = await ConnectionRequest.find({
    $or: [
      { fromUser: loggedInUser._id, status: "accepted" },
      { toUser: loggedInUser._id, status: "accepted" },
    ],
  })
    .populate("fromUser", selectedUserFields)
    .populate("toUser", selectedUserFields);

  const data = connectionRequests.map((request) => {
    if (request.fromUser._id.toString() === loggedInUser._id.toString()) {
      return {
        user: request.toUser,
      };
    }
    return request.fromUser;
  });

  res
    .status(200)
    .json({ message: "data fetched successfully", "connections": data });
});

userRouter.get("/feed", authMiddleWare, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit > 50 ? (limit = 50) : (limit = limit);
    const skip = (page - 1) * limit;

    const usersToHide = await ConnectionRequest.find({
      $or: [{ fromUser: req.user._id }, { toUser: req.user._id }],
    }).select("fromUser toUser");

    const userIdsToHide = usersToHide.reduce((userIdsToHideSet, request) => {
      userIdsToHideSet.add(request.fromUser.toString());
      userIdsToHideSet.add(request.toUser.toString());
      return userIdsToHideSet;
    }, new Set());

    const usersToShow = await User.find({
      _id: {
        $nin: Array.from(userIdsToHide),
        $ne: req.user._id,
      },
    })
      .select(selectedUserFields)
      .skip(skip)
      .limit(limit);

    res
      .status(200)
      .json({ message: "data fetched successfully", data: usersToShow });
  } catch (err) {
    res
      .status(500)
      .json({ message: "internal server error", error: err.message });
  }
});

module.exports = userRouter;
