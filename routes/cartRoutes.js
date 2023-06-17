const express = require('express') ; 
const { insertInCart, getAllinCart, deleteFromCart } = require('../controllers/cartController');
const router = express.Router() ; 

router.route('/cart/insert').post(insertInCart) ; 
router.route('/cart/getAll/:uid').get( getAllinCart) ; 
router.route('/cart/delete/:uid/:pid').delete(deleteFromCart);

module.exports = router ; 