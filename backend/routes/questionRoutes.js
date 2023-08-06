const express = require("express");
const {
  addQuestions,
  getQuestions,
} = require("../controllers/QuestionController");
const { isAuthenticated, authorisedRoles } = require("../middlewares/auth");

let router = express.Router();

router
  .route("/addquestions")
  .post(isAuthenticated, authorisedRoles("Admin"), addQuestions);

router.route("/getquestions").get(isAuthenticated, getQuestions);
module.exports = router;
