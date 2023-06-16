const catchAsyncError = require('../middleware/catchAsyncError');
const instantiate = require('../utils/razorIntance');
const myfun = require('../utils/razorIntance');
const ErrorHandler = require('../utils/ErrorHandler');
const Order = require('../models/orderModels');
const { validatePaymentVerification , validateWebhookSignature} = require('razorpay/dist/utils/razorpay-utils');
const jwt = require('jsonwebtoken');
const Cart = require('../models/cartModel');
const User = require('../models/userModel');

exports.checkout = catchAsyncError(async(req , res , next)=>{
    const { price } = req.body ;

    let options = {
        amount : Number( price * 100 ) , // 1rs -----> 100p 
        currency : 'INR' , 
    }

    const order = await instantiate().orders.create(options);

    res.status(201).json({
        success : true , 
        order
    })
})


exports.paymentVerification = catchAsyncError( async( req , res, next )=>{
    try{
        const validate = validatePaymentVerification({"order_id": req.body.razorpay_order_id , "payment_id": req.body.razorpay_payment_id }, req.body.razorpay_signature , process.env.RAZOR_PAY_KEY_SECRET );
        if( validate ){
            const userId = jwt.verify( req.cookies.token , process.env.JWT_SECRET ).id ;
            const user = await User.findById( userId ) ;
            const userUnlkdPrdcts = user.unlockedProducts ;  
            const newUnlockedProducts = [...userUnlkdPrdcts] ; 
            const CartItems = await Cart.find(); 
            CartItems.map(( e , idx)=>{
                newUnlockedProducts.push({
                    productid : e.productid 
                })
            })

            const updatedUser = await User.findByIdAndUpdate(userId , {
                unlockedProducts : newUnlockedProducts
            } , {
                new : true
            })

            res.send('<h1> Payment successfull ! Access orders page to access your resourcs </h1> ')
        }
        else{
            throw ( new Error('Payment Validation failed !')) ; 
        }
    }
    catch(e){
        return next( new ErrorHandler( e.message , 500)) ; 
    }

})