const socket = require("socket.io");
require("dotenv").config();

const initSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: [
        process.env.FRONTEND_DEV_URL,
        process.env.FRONTEND_URL || "http://44.200.13.119",
      ].filter(Boolean),
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", ({ userId, id }) => {
      const room = [userId, id].sort().join("_");
      console.log(room);
      socket.join(room);
    });

    socket.on("sendMessage", ({ firstName, userId, id, text }) => {
      const room = [userId, id].sort().join("_");
      console.log(firstName + " " + text);
      io.to(room).emit("messageReceived", { firstName, text });
    });
    
    socket.on("disconnect", () => {});
  });
};

module.exports = initSocket;
