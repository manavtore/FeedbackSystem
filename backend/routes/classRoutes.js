const express = require("express");
const {
  AddClass,
  ShowClass,
  updateClass,
} = require("../controllers/classController");
const { isAuthenticated, authorisedRoles } = require("../middlewares/auth");

const router = express.Router();

router.route("/addclass").post(AddClass);
router.route("/showclass").get(isAuthenticated, ShowClass);
router
  .route("/updateclass")
  .post(isAuthenticated, authorisedRoles("Admin"), updateClass);

module.exports = router;
