const config = require('../configs/stripe.config');
const stripe = require('stripe')(config.stripe.key);
const User = require('../models/user.model');
const Subscription = require('../models/subscription.model');

const webhookSecret = "whsec_996e05aa652dc26eba5b99f26685216442e90892164c1cf5128cab2f83bec3b5";

exports.stripewebhook = (req, res) => {

  const superSub = (price) => {
    if (price == "price_1KOL9rAfPqs9g2hE2d85Alry"){
      return true
    }
    else {
      return false
    }
  }

  let data;
  let eventType;


  if (webhookSecret) {
    let event;
    let signature = req.headers["stripe-signature"];

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        webhookSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err);
      return res.sendStatus(400);
    }
    data = event.data;
    eventType = event.type;
  } else {
    data = req.body.data;
    eventType = req.body.type;
  }

  switch (eventType) {
    case "payment_intent.succeeded":
      const paymentIntent = data.object;
      console.log("Paiement réussi.")
      break;
    case "customer.subscription.created":
      const customerSubscription = data.object;
      const sub = new Subscription({
        dateSub: Date.now(),
        idStripeSub: customerSubscription.id,
        user: customerSubscription.metadata.user,
        price: customerSubscription.metadata.price,
      });
      sub.save()
        .then((data) => {
          User.findByIdAndUpdate(customerSubscription.metadata.user,
            {
              subscription: data.id,
              isSub: true,
              superSub: superSub(customerSubscription.metadata.price),
            },
            {
              new: true,
            })
            .then(() => {
              return { Updated: true }
            })
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Some error occured",
          });
        });
      break;
    default:
  }
  res.sendStatus(200);
};