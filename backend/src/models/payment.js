const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    orderId: { type: String },
    amount: { type: Number },
    currency: { type: String },
    notes: {
      firstName: { type: String },
      lastName: { type: String },
      emailId: { type: String },
      membershipType: { type: String },
    },
    receipt: { type: String },
    status: { type: String },
  },
  { timestamps: true },
);

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
