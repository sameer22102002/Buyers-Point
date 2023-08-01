// const router = require("express").Router();
// // const stripe = require("stripe")(process.env.STRIPE_KEY);
// // const KEY = process.env.STRIPE_KEY
// const stripe = require("stripe")("sk_test_51NOJNySJF82wPtMwrFQ5Rdem47Y3KaLeWOYObDLuiCQqVkI7hCFfv6hW2N328SVPzduAZrCsx1vpeXoZUSIdN6uK00m6klQS9F");

// router.post("/payment", (req, res) => {
//   stripe.charges.create(
//     {
//       source: req.body.tokenId,
//       amount: req.body.amount,
//       currency: "INR",
//     },
//     (stripeErr, stripeRes) => {
//       if (stripeErr) {
//         console.log("😒")
//         res.status(500).json(stripeErr);
//       } else {
//         res.status(200).json(stripeRes);
//       }
//     }
//   );
// });

// module.exports = router;

const router = require("express").Router();
const stripe = require("stripe")("sk_test_51NOJNySJF82wPtMwrFQ5Rdem47Y3KaLeWOYObDLuiCQqVkI7hCFfv6hW2N328SVPzduAZrCsx1vpeXoZUSIdN6uK00m6klQS9F");

router.post("/payment", async (req, res) => {
  try {
    const { tokenId, amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      payment_method_types: ["card"],
      amount: amount,
      currency: "INR",
      payment_method_data: {
        type: "card",
        card: {
          token: tokenId,
        },
      },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: "Unable to create payment intent" });
  }
});

module.exports = router;
