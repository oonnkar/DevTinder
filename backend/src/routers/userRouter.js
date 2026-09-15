const express = require('express');
const authMiddleWare = require('../middleware/auth');
const ConnectionRequest = require('../models/connectionRequest');

const userRouter = express.Router();

userRouter.get('/requests/received', authMiddleWare, async (req, res) => {
  const loggedInUser = req.user;
  const connectionRequests = await ConnectionRequest.find({ toUser: loggedInUser._id , status: "interested"}).populate('fromUser', 'firstName lastName emailId');

  res.status(200).json({message : "data fetched successfully", data : connectionRequests});
});


userRouter.get('/connections', authMiddleWare, async (req, res) => {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
        $or:[
            { fromUser: loggedInUser._id, status: "accepted" },
            { toUser: loggedInUser._id, status: "accepted" }
        ]
    }).populate('fromUser', 'firstName lastName emailId').populate('toUser', 'firstName lastName emailId');

    const data = connectionRequests.map(request => {
        if(request.fromUser._id.toString() === loggedInUser._id.toString()){
            return {
                user: request.toUser,
            }

        }
        return request.fromUser;
    })

    res.status(200).json({message : "data fetched successfully", "All connections" : data});
})

module.exports = userRouter;
