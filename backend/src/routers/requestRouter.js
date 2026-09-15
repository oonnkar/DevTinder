const express = require("express");
const authMiddleWare = require("../middleware/auth");
const User = require("../models/User");
const ConnectionRequest = require("../models/connectionRequest");

const requestRouter = express.Router();

requestRouter.post("/:status/:toUserId", authMiddleWare, async (req, res) => {
    try{

        const { status, toUserId } = req.params;
        
        // Check if the status is valid
        if (!["rejected", "interested"].includes(status)) {
            throw new Error({ message: "Invalid status" });
        }
        const toUser = await User.findById(req.params.toUserId);
        
        if (!toUser) {
            throw new Error({ message: "User not found, Invalid user Id" });
        }
        
        const connectionRequest = new ConnectionRequest({
            fromUser: req.user._id,
            toUser: toUserId,
            status: status,
        });
        
        const data =await connectionRequest.save();
        
        res.status(200).json({
            message:
            req.user.firstName +
            " has send connection request to " +
            toUser.firstName,
            data 
        });
    }catch(error){
        res.status(400).json({ message: error.message });
    }
});

module.exports = requestRouter;
