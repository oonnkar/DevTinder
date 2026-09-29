const express = require("express");
const connectDB = require("./config/database");
var cookieParser = require("cookie-parser");
const authRouter = require("./routers/authRouter");
const profileRouter = require("./routers/profileRouter");
const requestRouter = require("./routers/requestRouter");
const userRouter = require("./routers/userRouter");
const cors = require("cors");
require("dotenv").config();
// Create Express app
const app = express();

// Parse JSON request body
app.use(
  cors({

    origin:[ process.env.FRONTEND_DEV_URL, 
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

// Connect DB and start server
connectDB()
  .then(() => {
    console.log("database connection successful");

    app.listen(process.env.PORT, () =>
      console.log(
        "server is successfully listening on port " + process.env.PORT,
      ),
    );
  })
  .catch((error) => {
    console.log(error.message);
  });
