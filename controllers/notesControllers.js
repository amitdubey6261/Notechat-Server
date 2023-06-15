const catchAsyncError = require("../middleware/catchAsyncError");
const Notes = require("../models/notesModel.js");
const ErrorHandler = require("../utils/ErrorHandler");
const cloudinary = require('../utils/Cloudinary.js');
const ApiFeatures = require("../utils/ApiFeatures");

exports.createNotes = catchAsyncError(async (req, res, next) => {
    console.log("createnotes");

    const {
        name,
        collage,
        batchof,
        file,
        subject,
        faculty,
        aboutpdf,
        index,
        price,
        category , 
        thumbnail1,
        thumbnail2,
        thumbnail3,
        thumbnail4,
    } = req.body;

    const thumbnails = {} ; 
    const thum1 = {} ; 
    const thum2 = {} ; 
    const thum3 = {} ; 
    const thum4 = {} ; 

    thumbnails.thum1 = thum1 ; 
    thumbnails.thum2 = thum2 ; 
    thumbnails.thum3 = thum3 ; 
    thumbnails.thum4 = thum4 ; 


    const filePayload = {} ; 

    const payload = {
        file : filePayload ,
        thums : thumbnails , 
        createdby : name , 
        subject , 
        price ,
        faculty , 
        collage , 
        batchof , 
        aboutpdf , 
        index , 
        category , 
    }

    //file uplaod 
    try{
        console.log(file)
        const fileres = await cloudinary.uploader.upload( file , {
            folder : 'pdfs' , 
        } )

        console.log( fileres )

        filePayload.url = fileres.url ;
        filePayload.publicid = fileres.public_id ; 

        console.log( 'file upload ') ; 
    }
    catch(e){
        console.log(e)
        return next( new ErrorHandler( e.message , 500 ));
    }  

    //thumnail1

    try{
        const thumb1res = await cloudinary.uploader.upload( thumbnail1 , {
            folder : 'thumbnails' , 
            width : 800 , 
            crop : 'scale' , 
        })

        thum1.publicid = thumb1res.public_id ; 
        thum1.url = thumb1res.url ; 
        
        console.log( 'th1' , thumb1res );
    }   
    catch(e){
        return next( new ErrorHandler( e.message , 500 ));
    }

    //th3
    try{
        const thumb2res = await cloudinary.uploader.upload( thumbnail2 , {
            folder : 'thumbnails' , 
            width : 800 , 
            crop : 'scale' , 
        })

        thum2.publicid = thumb2res.public_id ; 
        thum2.url = thumb2res.url ; 

        console.log( 't2' , thumb2res );
    }   
    catch(e){
        return next( new ErrorHandler( e.message , 500 ));
    }

    // th4
    try{
        const thumb3res = await cloudinary.uploader.upload( thumbnail3 , {
            folder : 'thumbnails' , 
            width : 800 , 
            crop : 'scale' , 
        })

        thum3.publicid = thumb3res.public_id ; 
        thum3.url = thumb3res.url ; 

        console.log( 't3' , thumb3res );
    }   
    catch(e){
        return next( new ErrorHandler( e.message , 500 ));
    }

    try{
        const thumb4res = await cloudinary.uploader.upload( thumbnail4 , {
            folder : 'thumbnails' , 
            width : 800 , 
            crop : 'scale' , 
        })

        thum4.publicid = thumb4res.public_id ; 
        thum4.url = thumb4res.url ; 

        console.log( 't4' , thumb4res );
    }   
    catch(e){
        return next( new ErrorHandler( e.message , 500 ));
    }

    const notes = await Notes.create( payload );  
    
    res.status(201).json({
        success: true,
        notes
    });

});

exports.getAllNotes = catchAsyncError(async (req, res, next) => {

    const resultperpage = 12 ; 

    const apifeatures = new ApiFeatures(Notes.find() , req.query )
    .search()
    .filter()
    .pagination(resultperpage);

    const notes = await apifeatures.query; 

    res.status(201).json({
        success: true,
        notes,
    });
});

exports.getNotesDetails = catchAsyncError(async (req, res, next) => {
    console.log("notesDeatils");

    const notes = await Notes.findById(req.params.id);

    if (!notes) {
        return next(new ErrorHandler("Notes not found", 404));
    }

    res.status(200).json({
        success: true,
        notes,
    });
});

exports.deleteNotes = catchAsyncError(async (req, res, next) => {
    console.log("deleteNotes");

    const notes = Notes.findById(req.params.id);

    if (!notes) {
        return next(new ErrorHandler(`notes not found `, 404));
    }

    await Notes.findByIdAndDelete(req.params.id);

    const message = `Notes Deleted  Sucessfully !`;

    res.status(200).json({
        success: true,
        message,
    });
});
