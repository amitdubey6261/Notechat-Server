const express = require('express');
const router = express.Router();

const { checkout } = require('../controllers/paymentController');

router.route( '/payment/order' ).post(checkout);

module.exports = router ; 