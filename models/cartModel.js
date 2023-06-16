const mongoose = require('mongoose');

const cartModel = mongoose.Schema({
    userid : {
        type : String , 
        required : true , 
    } , 
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
        type : String , 
        default : 'notes' , 
        required : [ true , 'Product Id not specified'] , 
    }
})

module.exports = mongoose.model('Cart' , cartModel) ; 