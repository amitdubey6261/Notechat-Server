const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/ErrorHandler');
const User = require('../models/userModel') ; 
const { pseudoRandomBytes } = require('crypto');

exports.insertInCart = catchAsyncError(async( req , res , next)=>{
    try{
        const {uid , pid , price , subject , collage , rating } = req.body ; 
        const user = await User.findById( uid ); 
        if( !user ) throw ( new Error( 'Product not found')) ; 
        let productsInCart = user.productsInCart ;  
        const unlockedProducts = user.unlockedProducts ; 
        let flag = false ;

        productsInCart.map((elem , idx)=>{
            if( elem.productid == pid ) {
                flag = true ; 
            }
        }) 

        unlockedProducts.map((elem , idx)=>{
            if( elem.productid == pid ){
                flag = true ; 
            }
        })

        if( !flag ){
            productsInCart.push({
                productid : pid ,
                price , 
                subject , 
                collage ,
                rating , 
            })
        }
        else{
            throw new Error( 'Product already in cart ') ; 
        }

        const updatedUser = await User.findByIdAndUpdate( uid , {
            productsInCart , 
        } , {
            new : true
        })

        res.status(201).json({
            success : true , 
            updatedUser , 
        })
    }
    catch(e){
        return next( new ErrorHandler( e.message  , 500 )) ; 
    }
} )

exports.getAllinCart = catchAsyncError(async( req , res , next )=>{
    try{
        const uid  = req.params.uid ; 
        const user = await User.findById(uid) ; 
        if( !user ) throw ( new Error('User Not Found !') ) ; 
        const data = user.productsInCart ; 
        let totalBill = 10 ; 
        data.map((elem , idx)=>totalBill += Number(elem.price) ) ; 

        res.status(201).json({
            sucess : true , 
            cartProducts : data , 
            totalBill , 
        })
    }
    catch(e){
        return next( new ErrorHandler( e.message , 500 )) ; 
    }
})

exports.deleteFromCart = catchAsyncError( async( req  , res , next )=>{
    try{
        const { uid , pid } = req.params ; 
        const user = await User.findById( uid ); 
        if( !user ) throw ( new Error('User Not Found !') ) ;   

        const productsInCart = user.productsInCart ; 
        let newProductsInCart = [] ; 

        productsInCart.map((elem , idx)=>{
            if( pid !== elem.productid ){
                newProductsInCart.push(elem);
            }
        })

        await User.findByIdAndUpdate( uid , {
            productsInCart : newProductsInCart 
        } , {
            new : true
        } )

        res.status(201).json({
            sucess : true , 
        })

    }
    catch(e){
        return next( new ErrorHandler( e.message  , 500 )) ; 
    }
})