const config = require('../configs/stripe.config');
const stripe = require('stripe')(config.stripe.key);
const User = require('../models/user.model');
const Subscription = require('../models/subscription.model');
const mailjet = require('../services/mailjet.service')

const webhookSecret = config.stripe.webhook_secret;

exports.stripewebhook = (req, res) => {

  // const superSub = (price) => {
  //   const prices = stripe.prices.list({
  //     limit: 2,
  //   })
  //   if (price == prices.data[0].id) {
  //     if (prices.data[0].unit_amount > prices.data[1].unit_amount) {
  //       return true
  //     }
  //     else {
  //       return false
  //     }
  //   }
  //   else if (price == prices.data[1].id) {
  //     if (prices.data[1].unit_amount > prices.data[0].unit_amount) {
  //       return true
  //     }
  //     else {
  //       return false
  //     }
  //   }
  // }
  const superSub = (price) => {
    if (price == "price_1KOL9rAfPqs9g2hE2d85Alry") {
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
      console.log(customerSubscription)
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
              mailjet.sendMailSub(customerSubscription.metadata.email, superSub(customerSubscription.metadata.price))
              return { Updated: true }
            })
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Some error occured",
          });
        });
      break;
    case "customer.subscription.deleted":
      const customerSubscriptionDeleted = data.object;
      // console.log(customerSubscriptionDeleted)
      User.findByIdAndUpdate(customerSubscriptionDeleted.metadata.user,
        {
          isSub: false,
          superSub: false,
          subscription: null,
        },
        {
          new: true
        })
        .then((data) => {
          mailjet.sendMailUnsub(data.email)
          Subscription.findOneAndDelete({ idStripeSub: customerSubscriptionDeleted.id }, function (err, docs) {
            if (err) {
              console.log(err)
            }
          });
        })
      break;
    default:
  }
  res.sendStatus(200);
};