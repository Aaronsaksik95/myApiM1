const express = require('express');
const router = express.Router();
const checkout = require('../controllers/checkout.controller');


router.post('/', checkout.createSession);



module.exports = router; 