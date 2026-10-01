const express = require("express");
var cookieParser = require("cookie-parser");
const http = require("http");

const connectDB = require("./config/database");

const authRouter = require("./routers/authRouter");
const profileRouter = require("./routers/profileRouter");
const requestRouter = require("./routers/requestRouter");
const userRouter = require("./routers/userRouter");
const cors = require("cors");
const paymentRouter = require("./routers/paymentRouter");
const initSocket = require("./helper/socket");

require("dotenv").config();

const app = express();
const server = http.createServer(app);
initSocket(server);

app.use(
  cors({
    origin: [
      process.env.FRONTEND_DEV_URL,
      process.env.FRONTEND_URL || "http://44.200.13.119",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

// routers
app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/request", requestRouter);
app.use("/user", userRouter);
app.use("/payment", paymentRouter);


// Connect DB and start server
connectDB()
  .then(() => {
    console.log("database connection successful");

    server.listen(process.env.PORT, () =>
      console.log(
        "server is successfully listening on port " + process.env.PORT,
      ),
    );
  })
  .catch((error) => {
    console.log(error.message);
  });
