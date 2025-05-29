const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");

// @route POST /api/subscribe
// @desc Handle newsletter subscription
// @access Public
router.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // check if the email is already subscribed
    const subscriber = await Subscriber.findOne({ email });

    if (subscriber) {
      return res.status(400).json({ message: "Email already subscribed" });
    }

    // Create a new subscriber
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    res.status(201).json({ message: "Subscribed successfully to newsletter!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
