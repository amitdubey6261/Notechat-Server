const catchAsyncError = require("../middleware/catchAsyncError");
const UnlockedNotes = require('../models/unlockedModel') ; 

exports.unlockNote = catchAsyncError(async( req , res , next )=>{
    console.log('unlock note')
    res.status(201).json({
        success : true , 
    })
})

exports.getAllUnlocked = catchAsyncError(async( req , res , next )=>{
    console.log('all unlock note')
    res.status(201).json({
        success : true , 
    })
})