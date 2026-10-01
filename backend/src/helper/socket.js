const { Server } = require("socket.io");
const Chat = require("../models/chat");

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "http://44.200.13.119",
      ],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinChat", ({ userId, id }) => {
      const room = [userId, id].sort().join("_");

      console.log("Joining room:", room);

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

        io.to(room).emit("messageReceived", {
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