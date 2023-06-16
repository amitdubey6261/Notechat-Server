const express = require('express') ; 
const { insertInCart, getAllinCart, deleteFromCart } = require('../controllers/cartController');
const router = express.Router() ; 

router.route('/cart/insert').post(insertInCart) ; 
router.route('/cart/getAll').get( getAllinCart) ; 
router.route('/cart/delete/:id').delete(deleteFromCart);

module.exports = router ; 