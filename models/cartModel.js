const mongoose = require('mongoose'); 

const cartModel = mongoose.model({
    productid : {
        type : String , 
        required : [ true , 'Product Id not specified'] , 
    } , 
    price :{
        type : Number , 
        required : [ true , 'Product Id not specified'] , 
    }
    ,
    collage :{
        type : String , 
        required : [ true , 'Enter collage name ']
    }
    ,
    rating :{
        type : Number , 
        required : [ true , 'Enter product rating']
    }
    ,
    type : {
        type : Number , 
        required : [ true , 'Product Id not specified'] , 
    }
})

module.exports = mongoose.Schema('Cart' , cartModel) ; 