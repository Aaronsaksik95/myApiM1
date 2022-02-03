const express = require('express');
const router = express.Router();

const userRouter = require('./users.route');
const movieRouter = require('./movies.route')
const webhooksRouter = require('./webhooks.route')
const stripeRouter = require('./stripe.route')



router.use('/users/', userRouter);
router.use('/movie/', movieRouter);
router.use('/webhook/', webhooksRouter);
router.use('/stripe/', stripeRouter);

module.exports = router;