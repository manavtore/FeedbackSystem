const QuestionarrieModel = require("../models/QuestionarrieModel");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const ApiFeatures = require("../utils/apifeatures");

exports.addQuestions = catchAsyncError(async (req, res, next) => {
  let questions = await QuestionarrieModel.create(req.body);
  res.status(201).json({
    success: true,
    questions,
  });
});

exports.getQuestions = catchAsyncError(async (req, res, next) => {
  let apifeature = new ApiFeatures(QuestionarrieModel.find(), req)
    .search()
    .filter();
  const questions = await apifeature.query;
  if (!questions) {
    return next(new ErrorHandler("No session Found", 400));
  }

  res.status(200).json({
    success: true,
    questions,
  });
});
