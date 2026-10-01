const express = require("express");
const razInstance = require("../helper/razorpay");
const paymentRouter = express.Router();
const Payment = require("../models/payment");
const authMiddleWare = require("../middleware/auth");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");
const User = require("../models/user");

const memberShipAmount = {
  gold: 500,
  silver: 300,
};

paymentRouter.post("/create", authMiddleWare, async (req, res) => {
  try {
    const { firstName, lastName, emailId } = req.user;
    const options = {
      amount: memberShipAmount[req.body.membershipType],
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`,
      notes: {
        firstName,
        lastName,
        emailId,
        membershipType: req.body.membershipType,
      },
    };

    const order = await razInstance.orders.create(options);

    const payment = new Payment({
      userId: req.user.id,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: {
        firstName,
        lastName,
        emailId,
        membershipType: req.body.membershipType,
      },
    });

    const savedPayment = await payment.save();

    res.status(201).json(savedPayment.toJSON());
  } catch (error) {
    console.error("Error creating payment order:", error);
    res.status(500).json({ error: "Unable to create payment order" });
  }
});

paymentRouter.post("/webhook", async (req, res) => {
  try {
    const webhookSignature = req.get("x-razorpay-signature");

    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.WEBHOOK_SECRET,
    );

    if (!isWebhookValid) {
      return res.status(400).json({ error: "Invalid webhook signature" });
    }

    const paymentDetails = req.body.payload.payment.entity;

    const payment = await Payment.findOne({ orderId: paymentDetails.order_id });
    payment.status = paymentDetails.status;
    payment.save();
    const user = await User.findOne({ _id: payment.userId });
    user.isPremium = true;
    user.membershipType = payment.notes.membershipType;
    return res.status(200).json({ received: true });
  } catch (error) {
    console.error("Invalid webhook signature:", error);
    return res.status(400).json({ error: "Invalid webhook signature" });
  }
});

module.exports = paymentRouter;
