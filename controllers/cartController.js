const catchAsyncError = require('../middleware/catchAsyncError');
const Cart = require('../models/cartModel') ; 
const ErrorHandler = require('../utils/ErrorHandler');

exports.insertInCart = catchAsyncError(async( req , res , next)=>{
    try{
        
        const data = await Cart.find({ productid : req.body.productid }) ; 
        if( data.length == 0 ){
            const data = await Cart.create( req.body ) ; 
            res.status(201).json({
                sucess : true , 
                data
            })
        }
        else{
            throw (new Error('Already Exists !')) ; 
        }
    }
    catch(e){
        return next( new ErrorHandler( e.message  , 500 )) ; 
    }
} )

exports.getAllinCart = catchAsyncError(async( req , res , next )=>{
    try{
        const data = await Cart.find() ; 
        let totalBill = 0 ;  

        data.map(( elem , idx)=>{
            totalBill += elem.price ; 
        })

        console.log( totalBill )

        res.status(201).json({
            sucess : true , 
            cards : data, 
            totalBill , 
        })
    }
    catch(e){
        return next( new ErrorHandler( e.message , 500 )) ; 
    }
})

exports.deleteFromCart = catchAsyncError( async( req  , res , next )=>{
    try{

        const data = await Cart.findByIdAndDelete( req.params.id )

        res.status(201).json({
            sucess : true , 
            data , 
        })
    }
    catch(e){
        return next( new ErrorHandler( e.message  , 500 )) ; 
    }
})