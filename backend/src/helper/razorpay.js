const Razorpay = require("razorpay");
require("dotenv").config();

const instance = new Razorpay({
  key_id: process.env.RAZ_TEST_API_KEY,
  key_secret: process.env.RAZ_TEST_SEC_KEY,
});

module.exports = instance;
