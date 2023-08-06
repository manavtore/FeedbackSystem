const catchAsyncError = require("../middlewares/catchAsyncError");
const sessionModel = require("../models/sessionmodel");
const ApiFeatures = require("../utils/apifeatures");

exports.createSession = catchAsyncError(async (req, res, next) => {
  const session = await sessionModel.create(req.body);

  res.status(201).json({
    success: true,
    session,
  });
});

exports.getSessions = catchAsyncError(async (req, res, next) => {
  let apifeatures = new ApiFeatures(sessionModel, req).search().filter();
  const session = await apifeatures.query;
  res.status(201).json({
    success: true,
    session,
  });
});
