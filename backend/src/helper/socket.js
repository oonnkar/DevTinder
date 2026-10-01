const { Server } = require("socket.io");
const Chat = require("../models/chat");

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: [
        process.env.FRONTEND_DEV_URL || "http://localhost:5173",
        process.env.FRONTEND_URL || "http://44.200.13.119",
        "http://127.0.0.1:5173",
      ],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {

    socket.on("joinChat", ({ userId, id }) => {
      const room = [userId, id].sort().join("_");


      socket.join(room);
    });

    socket.on("sendMessage", async ({ firstName, userId, id, text }) => {
      try {
        const room = [userId, id].sort().join("_");

        let chat = await Chat.findOne({
          participants: { $all: [userId, id] },
        });

        if (!chat) {
          chat = new Chat({
            participants: [userId, id],
            messages: [{ senderId: userId, text }],
          });
        } else {
          chat.messages.push({
            senderId: userId,
            text,
          });
        }

        await chat.save();

        socket.to(room).emit("messageReceived", {
          firstName,
          text,
        });
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

module.exports = initSocket;