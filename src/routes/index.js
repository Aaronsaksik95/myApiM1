const express = require('express');
const router = express.Router();

const userRouter = require('./users.route');
const movieRouter = require('./movies.route')
const checkoutRouter = require('./checkout.route')



router.use('/users/', userRouter);
router.use('/movie/', movieRouter);
router.use('/checkout/', checkoutRouter);

module.exports = router;