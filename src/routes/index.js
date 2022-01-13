const express = require('express');
const router = express.Router();

const userRouter = require('./users.route');
const movieRouter = require('./movies.route')


router.use('/users/', userRouter);
router.use(movieRouter);

module.exports = router;