const mongoose = require('mongoose');
const validator = require('validator');

const EmailModel = mongoose.Schema({
    name : {
        type : String , 
        required : [ true , 'Enter valid name']
    }
    ,
    email : {
        type : String , 
        required : [ true , 'Enter valid email'] , 
        validate: [validator.isEmail, 'please enter valid email'] ,
    }
    ,
    contact : {
        type : String , 
        required : [ true , 'Enter valid conatct']
    }
    ,
    query : {
        type : String , 
        required : [ true , 'Enter query '] , 
        minLength : [10 , 'At least 10 chacters must be there']
    }
    ,
    createdon : {
        type : Date , 
        default : Date.now
    }
})

module.exports = mongoose.model( 'Email' , EmailModel );