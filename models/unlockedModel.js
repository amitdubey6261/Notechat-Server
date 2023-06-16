const mongoose = require('mongoose') ; 

const unlockedNotesSchema = mongoose.Schema({
    userId :{
        type : String , 
        required : [ true , 'Enter User Who unlocked'] , 
    }
    ,
    productID : {
        type : String , 
        required : [ true , 'Spencify product id please']
    }
})

module.exports = mongoose.model('UnlockedNotes' , unlockedNotesSchema) ; 