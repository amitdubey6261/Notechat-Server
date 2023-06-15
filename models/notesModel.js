const mongoose = require("mongoose");

const notesSchema = mongoose.Schema({
    file: {
        publicid: {
            type: String,
            required: [true, "File pid not defined"],
        },
        url: {
            type: String,
            required: [true, "File url not defined"],
        },
    },
    thums: {
        thum1: {
            publicid: {
                type: String,
                required: [true, "thumb1 pid not defined"],
            },
            url: {
                type: String,
                required: [true, "thumb1 url not defined"],
            },
        },
        thum2: {
            publicid: {
                type: String,
                required: [true, "thumb2 pid not defined"],
            },
            url: {
                type: String,
                required: [true, "thumb2 url not defined"],
            },
        },
        thum3: {
            publicid: {
                type: String,
                required: [true, "thumb3 pid not defined"],
            },
            url: {
                type: String,
                required: [true, "thumb3 url not defined"],
            },
        },
        thum4: {
            publicid: {
                type: String,
                required: [true, "thumb4 pid not defined"],
            },
            url: {
                type: String,
                required: [true, "thumb4 url not defined"],
            },
        },
    },
    createdby: {
        type: String,
        required: [true, "User Name Not Defined"],
    },
    subject: {
        type: String,
        required: [true, "subject not defined"],
    },
    faculty: {
        type: String,
        required: [true, "Enter faculty name "],
    },
    time: {
        type: Date,
        default: Date.now,
        required: [true, "Enter Creation Date"],
    },
    rating: {
        type: Number,
        default: 0,
        required: [true, "Rating not defined"],
        maxLength: [5, " Max length should be 5 "],
    },
    review: [
        {
            createdby: {
                type: String,
            },
            date: {
                type: Date,
                default: Date.now,
            },
            text: {
                type: String,
            },
        },
    ],
    collage : {
        type : String , 
        required : true , 
    },
    batchof : {
        type : String , 
        required : true , 
    },
    aboutpdf: {
        type: String,
        required: [true, "about pdf not defined"],
    },
    category : {
        type : String , 
        required : [true  , 'Enter category please '] ,
    },
    price : {
        type : Number , 
        required : [ true , 'Enter Price of the product '], 
        minLength : [ 10 , 'Price should be grater than 10₹ '],
        maxLength : [ 1000 , 'Price should be less than 1000₹ ']
    },
    index: {
        type: String,
        required: [true, "Enter Index"],
    },
});

module.exports = mongoose.model("Notes", notesSchema);
