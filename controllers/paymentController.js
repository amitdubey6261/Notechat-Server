const catchAsyncError = require('../middleware/catchAsyncError');
const instantiate = require('../utils/razorIntance');
const myfun = require('../utils/razorIntance');

exports.checkout = catchAsyncError(async(req , res , next)=>{
    const { amount } = req.body ;

    let options = {
        amount : Number( amount * 100 ) , // 1rs -----> 100p 
        currency : 'INR' , 
    }

    const order = await instantiate().orders.create(options);

    res.status(201).json({
        success : true , 
        order
    })
})