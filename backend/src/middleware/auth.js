var jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleWare = async (req, res, next) => {
  var decoded = jwt.verify(req.cookies.token, "shhhhh");

  if (!decoded || !decoded.userId) {
    throw new Error("Invalid token");
  }

  const userId = decoded.userId;
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }
  req.user = user;
  next();
};

module.exports = {
  authMiddleWare,
};
