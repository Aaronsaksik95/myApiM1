const express = require('express');
const router = express.Router();

const userRouter = require('./users.route');
const wishRouter = require('./wishs.route')
const webhooksRouter = require('./webhooks.route')
const stripeRouter = require('./stripe.route')



router.use('/users/', userRouter);
router.use('/wish/', wishRouter);
router.use('/webhook/', webhooksRouter);
router.use('/stripe/', stripeRouter);

module.exports = router;