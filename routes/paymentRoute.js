const express = require('express');
const router = express.Router();

const { checkout, paymentVerification } = require('../controllers/paymentController');

router.route( '/payment/order' ).post(checkout);
router.route('/payment/paymentVerification').post(paymentVerification) ; 

module.exports = router ; 