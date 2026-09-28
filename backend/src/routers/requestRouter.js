const express = require("express");
const mongoose = require("mongoose");
const authMiddleWare = require("../middleware/auth");
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");

const requestRouter = express.Router();

// Send connection request
requestRouter.post(
  "/send/:status/:toUserId",
  authMiddleWare,
  async (req, res) => {
    try {
      const { status, toUserId } = req.params;

      // Check if the status is valid
      if (!["ignore", "interested"].includes(status)) {
        throw new Error("Invalid status");
      }
      const toUser = await User.findById(req.params.toUserId);

      if (!toUser) {
        throw new Error("User not found, Invalid user Id");
      }

      const connectionRequest = new ConnectionRequest({
        fromUser: req.user._id,
        toUser: toUserId,
        status: status,
      });

      const existingRequest = await mongoose
        .model("ConnectionRequest")
        .findOne({
          $or: [
            { fromUser: this.fromUser, toUser: this.toUser },
            { fromUser: this.toUser, toUser: this.fromUser },
          ],
        });

      if (existingRequest) {
        throw new Error(
          "A connection request already exists between these users.",
        );
      }

      const data = await connectionRequest.save();

      res.status(200).json({
        message:
          req.user.firstName +
          " has send connection request to " +
          toUser.firstName,
        data,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
);

// Review connection request
requestRouter.post(
  "/review/:status/:requestId",
  authMiddleWare,
  async (req, res) => {
    try {
      const { status, requestId } = req.params;

      // Check if status is valid
      if (!["accepted", "rejected"].includes(status)) {
        throw new Error("Invalid status");
      }

      // Find connection request
      const connectionRequest = await ConnectionRequest.findById(requestId);

      if (!connectionRequest) {
        throw new Error("Connection request not found");
      }

      // Check whether logged-in user is the receiver
      if (connectionRequest.toUser.toString() !== req.user._id.toString()) {
        throw new Error("You are not allowed to review this request");
      }

      // Request must be interested before it can be reviewed
      if (connectionRequest.status !== "interested") {
        throw new Error("Connection request is not pending review");
      }

      // Update status
      connectionRequest.status = status;

      await connectionRequest.save();

      res.status(200).json({
        message: `Connection request has been ${status}`,
        data: connectionRequest,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
);

module.exports = requestRouter;
