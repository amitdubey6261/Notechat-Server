const crypto = require("crypto");
const cloudinary = require("../utils/Cloudinary.js");

const User = require("../models/userModel.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncError = require("../middleware/catchAsyncError.js");
const sendMail = require("../utils/sendMail.js");

exports.createUser = catchAsyncError(async (req, res, next) => {
    const {
        avatar,
        name,
        email,
        password,
        collage,
        city,
        gender,
        contact,
        course,
        upiid,
        year,
    } = req.body;

    const payload = {};
    const iamgeBuffer = {};

    try {
        const imgres = await cloudinary.uploader.upload(avatar, {
            folder: "avatars",
            width: 800,
            crop: "scale",
        });

        payload.name = name;
        payload.email = email;
        payload.password = password;
        payload.contact = contact;
        payload.gender = gender;
        payload.course = course;
        payload.year = year;
        payload.city = city;
        payload.collage = collage;
        payload.upiid = upiid;
        iamgeBuffer.publicid = imgres.public_id;
        iamgeBuffer.url = imgres.url;
        payload.image = iamgeBuffer;


        const user = await User.create(payload);
        const token = user.getJWTToken();

        res.status(201)
        .cookie("token", token, {
            expires: new Date(
                Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
        })
        .json({
            success: true,
            user,
            token: token,
        });

    } catch (e) {
        return next(new ErrorHandler("Image upload failed", 404));
    }
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Enter Email || Password ", 400));
    }

    const user = await User.findOne({
        email,
    }).select("+password");

    if (!user) {
        return next(new ErrorHandler("User Not Found", 401));
    }

    const isPasswordMatch = await user.comparePassword(password);

    const token = user.getJWTToken();

    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid Password", 401));
    }

    res
        .status(201)
        .cookie("token", token, {
            expires: new Date(
                Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
        })
        .json({
            success: true,
            user,
            token,
        });
});

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return next(new ErrorHandler("User Not Found ", 404));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get(
        "host"
    )}/password/reset/${resetToken}`;

    const message = `The password reset URL for Notechat is
            \n\n ${resetPasswordUrl}
            \n\n if the attempt is not done by you can ignore this mail ! `;

    try {
        await sendMail({
            email,
            subject: `NoteChat Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }
});

exports.resetPassword = catchAsyncError(async (req, res, next) => {
    const { password, confirmPassword } = req.body;

    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(
            new ErrorHandler("Reset password token is not valid or expired ", 400)
        );
    }

    const token = user.getJWTToken();

    if (password != confirmPassword) {
        return next(new ErrorHandler("Your Password Not Matched !", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res
        .status(200)
        .cookie("token", token, {
            expires: new Date(
                Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 60
            ),
            httpOnly: true,
        })
        .json({
            success: true,
            user,
            token,
        });
});

exports.getAllUser = catchAsyncError(async (req, res, next) => {
    const user = await User.find();
    res.status(201).json({
        success: true,
        user,
    });
});

exports.userDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        return next(new ErrorHandler("User Not Found", 400));
    }

    res.status(201).json({
        success: true,
        user,
    });
});

exports.updateUser = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User not found`, 404));
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(201).json({
        success: true,
        updatedUser,
    });
});

exports.deleteUser = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
        );
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
    });
});

exports.logoutUser = catchAsyncError((req, res, next) => {
    const date = new Date(Date.now());
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(201).json({
        success: true,
        message: "logged Out",
    });
});
