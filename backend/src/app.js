const express = require("express");
const connectDB = require("./config/database");
var cookieParser = require("cookie-parser");
const authRouter = require("./routers/authRouter");
const profileRouter = require("./routers/profileRouter");
const requestRouter = require("./routers/requestRouter");

// Create Express app
const app = express();

// Parse JSON request body
app.use(express.json());
app.use(cookieParser());

// routers
app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/request", requestRouter);

// Connect DB and start server
connectDB()
  .then(() => {
    console.log("database connection successful");

    app.listen(3000, () =>
      console.log("server is successfully listening on port 3000"),
    );
  })
  .catch((error) => {
    console.log(error.message);
  });
