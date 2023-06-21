const catchAsyncError = require('../middleware/catchAsyncError.js');
const ErrorHandler = require('../utils/ErrorHandler.js');
const sendMail = require('../utils/sendMail.js');
const Email = require('../models/emailModel.js');

exports.createEmail = catchAsyncError(async(req , res , next)=>{

    const options = {   
        email : 'amitdubey6261@gmail.com',
        subject : 'Contacting...' , 
        message : ` from : ${ req.body.name } , email : ${req.body.email} , contact : ${req.body.contact} , query : ${ req.body.query } `, 
    }

    try{
        const resp = await sendMail(options);
        
        const email = await Email.create( req.body ); 

        res.status(201).json({
            success : true , 
            email 
        })
    }
    catch(e){
        return next( new ErrorHandler(e.message , 500));
    }
})

exports.getAllEmails = catchAsyncError(async(req , res , next)=>{
    res.status(201).json({
        success : true,  
    })
})