const config = require('../configs/stripe.config');
const stripe = require('stripe')(config.stripe.key)
require("regenerator-runtime/runtime");

exports.createSubscription = async function (req, res) {
  const { payment_method, email, price } = req.body;

  const customer = await stripe.customers.create({
    payment_method: payment_method,
    email: email,
    invoice_settings: {
      default_payment_method: payment_method,
    },
  });

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [
      {
        price: price
      }
    ],
    metadata: {
      user: req.user.id,
      price: price
    }
  });

  const status = subscription.status
  const client_secret = subscription.client_secret
  console.log(status, client_secret)
  res.json({ 'client_secret': client_secret, 'status': status });
};

exports.getPrices = async function (req, res) {
  await stripe.prices.list({
    limit: 2,
  })
    .then((data) => {
      res.send({
        prices: data,
        response: true
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        error: 500,
        message: err.message || "NULL"
      })
    })
}