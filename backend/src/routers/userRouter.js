const express = require('express');
const authMiddleWare = require('../middleware/auth');
const ConnectionRequest = require('../models/connectionRequest');

const userRouter = express.Router();

userRouter.get('/requests/received', authMiddleWare, async (req, res) => {
  const loggedInUser = req.user;
  const connectionRequests = await ConnectionRequest.find({ toUser: loggedInUser._id , status: "interested"}).populate('fromUser', 'firstName lastName emailId');

  res.status(200).json({message : "data fetched successfully", data : connectionRequests});
});

module.exports = userRouter;
