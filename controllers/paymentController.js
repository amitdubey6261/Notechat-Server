const catchAsyncError = require('../middleware/catchAsyncError');
const instantiate = require('../utils/razorIntance');
const myfun = require('../utils/razorIntance');
const ErrorHandler = require('../utils/ErrorHandler');
const Order = require('../models/orderModels');
const { validatePaymentVerification , validateWebhookSignature} = require('razorpay/dist/utils/razorpay-utils');
const jwt = require('jsonwebtoken');
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

            const productsInCart = user.productsInCart ; 
            const unlockedProducts = user.unlockedProducts ; 
            
            const newProductsInCart = [] ; 
            const newunlockedProducts = [...unlockedProducts] ; 
            
            productsInCart.map((elem , idx)=>newunlockedProducts.push({productid : elem.productid }));
            console.log( productsInCart  , unlockedProducts , newProductsInCart , newunlockedProducts );

            await User.findByIdAndUpdate( userId , {
                productsInCart : [], 
                unlockedProducts : newunlockedProducts , 
            } , {
                new : true
            }) ; 

            const order = await Order.create({
                razorpay_order_id :  req.body.razorpay_order_id , 
                razorpay_payment_id : req.body.razorpay_payment_id , 
                razorpay_signature : req.body.razorpay_signature
            })

            console.log( order ) ; 

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