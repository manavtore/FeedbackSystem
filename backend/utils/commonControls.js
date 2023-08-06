const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("./ErrorHandler");
const mongoose = require("mongoose");
const sendToken = require("./jwtToken");
exports.updateuser = (model) => {
  return catchAsyncError(async (req, res, next) => {
    console.log(req.body);
    const user = await model.updateOne(
      { _id: new mongoose.Types.ObjectId(req.body._id) },
      { $set: req.body }
    );

    res.status(200).json({
      success: true,
      user,
    });
  });
};

exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "logged out successfully",
  });
});

exports.deleteuser = (model) => {
  return catchAsyncError(async (req, res, next) => {
    const user = await model.deleteOne({ _id: req.body._id });
    res.status(200).json({
      success: true,
      user,
    });
  });
};

exports.LoginUser = (model) => {
  return catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(
        new ErrorHandler("Please enter valid email and password", 400)
      );
    }
    const user = await model.findOne({ EMAIL: email });
    if (!user) {
      return next(
        new ErrorHandler("Please enter valid email and password", 400)
      );
    }
    // check the password is correct or not
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return next(
        new ErrorHandler("Please enter correct email and password", 400)
      );
    }
    sendToken(model, 200, res);
  });
};
