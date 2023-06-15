const cloudinary = require('cloudinary').v2;

console.log( process.env.CLOUDINARY_CLOUD_NAME ,process.env.CLOUDINARY_API_KEY , process.env.CLOUDINARY_API_SECRET )
console.log( process.env.PORT )

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME  , 
    api_key : process.env.CLOUDINARY_API_KEY ,
    api_secret : process.env.CLOUDINARY_API_SECRET  ,  
})

module.exports = cloudinary;