const config = require('../configs/stripe.config');
const stripe = require('stripe')(config.stripe.key)
require("regenerator-runtime/runtime");

const initiateStripeSession = async (req) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: "test product"
          },
          unit_amount: req.body.amount,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${config.stripe.vue_url}success`,
    cancel_url: `${config.stripe.vue_url}cancel`,
  });
  return session;
}

exports.createSession = async function (req, res) {
  try {
    const session = await initiateStripeSession(req);
    res.status(200).json({
      id: session.id,
      price: session.amout_total,
      currency: session.currency,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
