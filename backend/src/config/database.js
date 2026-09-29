const mongoose = require("mongoose");

async function connectDB() {
  if (!process.env.MONGODB_URI) {
    throw new Error(
      "MongoDB connection string is missing. Set URI in the .env file.",
    );
  }

  return mongoose.connect(process.env.MONGODB_URI);
}

module.exports = connectDB;
