const express = require("express");

const {
  createSession,
  getSessions,
} = require("../controllers/sessionController");
const { isAuthenticated, authorisedRoles } = require("../middlewares/auth");

const router = express.Router();

router
  .route("/addsession")
  .put(isAuthenticated, authorisedRoles("Admin"), createSession);
router.route("/getsessions").get(isAuthenticated, getSessions);

module.exports = router;
