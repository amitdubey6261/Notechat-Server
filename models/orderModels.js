const mongoose = require( 'mongoose') ; 

const OrdersSchema = mongoose.Schema({
    razorpay_payment_id : {
        type : String ,
        required : [ true , 'Enter Fields !'] 
    }
    ,
    razorpay_order_id : {
        type : String ,
        required : [ true , 'Enter Fields !'] 
    }
    ,
    razorpay_signature : {
        type : String ,
        required : [ true , 'Enter Fields !'] 
    }
})

module.exports = mongoose.model( 'Orders' , OrdersSchema ) ; 