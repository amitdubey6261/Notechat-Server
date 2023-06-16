const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    image: {
        publicid: {
            type: String, 
            required : true , 
        },
        url: {
            type: String,
            required : true , 
            validate: [validator.isURL, 'Enter correct url'] , 
        }
    },
    name: {
        type: String,
        required: [true, 'Please Enter Name'],
        minLength: [4, 'Your Name should have altleast 4 characters'],
        maxLength: [30, 'Your Name should not be more than 40 characters'],
    },
    email: {
        type: String,
        unique: true,
        index : true ,
        required: [true, 'Please Enter email'],
        validate: [validator.isEmail, 'please enter valid email']
    },
    password: {
        type: String,
        required: [true, 'Please Enter password '],
        minLength: [4, 'Password should be atleast 4 characters long'],
        maxLength: [30, 'Password should not be grater than 30 characters'],
        select: false
    },
    collage: {
        type: String,
        required: [true, 'Please Enter collage name'],
        minLength: [4, 'Your collage Name should have altleast 4 characters'],
        maxLength: [30, 'Your collage Name should not be more than 40 characters'],
    },
    contact: {
        type: String,
        required: [true, 'Please Enter Contact number '],
        validate: [validator.isMobilePhone , 'Enter Correct Mobile Phone Number']
    },
    year: {
        type: String,
        minLength: [4, 'Enter Correct Year '],
        maxLength: [4, 'Enter Correct Year '],
        required: [true, 'Enter Your collage year']
    },
    gender: {
        type: String,
        required: [true, 'Enter Your gender'],
        maxLength: [40, 'Your collage name should not be more than 40 characters'],
    },
    city: {
        type: String,
        required: [true, 'Enter city you live in'],
        minLength: [4, 'Your collage name should have altleast 4 characters'],
        maxLength: [40, 'Your collage name should not be more than 40 characters'],
    },
    course: {
        type: String,
        required: [true, 'Enter your course name'],
        minLength: [4, 'Your collage name should have altleast 4 characters'],
        maxLength: [40, 'Your collage name should not be more than 40 characters'],
    },
    upiid: {
        type: String,
        unique: true,
        required: [true, 'Enter UPI ID to recieve payment'],
        minLength: [4, 'Your collage name should have altleast 4 characters'],
        maxLength: [30, 'Your collage name should not be more than 40 characters'],
    },
    unlockedProducts : [
        {
            productid : {
                type : String , 
            }
        }
    ]
    ,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
}

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
}

userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
}

module.exports = mongoose.model('User', userSchema);