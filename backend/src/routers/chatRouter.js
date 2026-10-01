const express = require("express");
const Chat = require("../models/chat");
const authMiddleWare = require("../middleware/auth");
const chatRouter = express.Router();

chatRouter.get("/:id", authMiddleWare, async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  try {
    let chat = await Chat.findOne({
      participants: { $all: [userId, id] },
    }).populate("messages.senderId", "firstName lastName");
    if (!chat) {
      chat = await Chat.create({
        participants: [userId, id],
      });
      await chat.save();
    }
    res.json(chat);
  } catch (err) {}
  res.send("Chat router is working");
});

module.exports = chatRouter;
