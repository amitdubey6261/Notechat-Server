const catchAsyncError = require('../middleware/catchAsyncError')
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');
const ErrorHandler = require('../utils/ErrorHandler');

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    console.log(`gathered token is : ${token}`);
    if (!token) {
        return next(new ErrorHandler(`Please Login to access this resource `));
    }

    const decodeddata = jwt.verify( token , process.env.JWT_SECRET );
    req.user = await User.findById( decodeddata.id );

    next();
})

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new ErrorHander(
            `Role: ${req.user.role} is not allowed to access this resouce `,
            403
          )
        );
      }
  
      next();
    };
  };