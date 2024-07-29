const express = require("express");
const router = express.Router();
const asyncError = require("../middleware/asyncError");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post(
    "/process",
    asyncError(async (req, res, next) => {
      const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        metadata: {
          company: "Flora",
        },
      });
      res.status(200).json({
        success: true,
        client_secret: myPayment.client_secret,
      });
    })
  );

  router.get(
    "/stripeapikey",
    asyncError(async (req, res, next) => {
      res.status(200).json({ stripeApikey: process.env.STRIPE_API_KEY });
    })
  );

  module.exports = router;