const config = require('../configs/stripe.config');
const stripe = require('stripe')(config.stripe.key)
require("regenerator-runtime/runtime");

exports.createSubscription = async function (req, res) {
  const { email, payment_method } = req.body;

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
        price: 'price_1KOL9SAfPqs9g2hEMXoxyfCT'
      }
    ],
    metadata: {
      user: req.user.id
    }
  });

  const status = subscription.status
  const client_secret = subscription.client_secret
  console.log(status, client_secret)
  res.json({ 'client_secret': client_secret, 'status': status });
};
