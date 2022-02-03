const express = require('express');
const router = express.Router();
const stripe = require('../controllers/stripe.controller');
const verifyToken = require('../middlewares/verifyToken');

router.post('/sub', verifyToken, stripe.createSubscription);



module.exports = router; 