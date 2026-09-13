require("dotenv").config();
const mongoose = require("mongoose");

async function connectDB() {
  const uri = "mongodb+srv://oonnkar2_db_user:sZ0v5KeWLQqCIMW1@cluster0.5ppndi9.mongodb.net/devTinder";

  if (!uri) {
    throw new Error(
      "MongoDB connection string is missing. Set URI in the .env file.",
    );
  }

  return mongoose.connect(uri);
}

module.exports = connectDB;
