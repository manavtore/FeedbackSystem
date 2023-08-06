const express = require("express");

const {
  AddTeacher,
  DeptTeachers,
  LoginTeacher,
  UpdateTeacher,
  getAllTeachers,
  DeleteTeacher,
  ChangePassword,
  ForgotPassword,
} = require("../controllers/TeacherController");
const { isAuthenticated, authorisedRoles } = require("../middlewares/auth");
const { logoutUser } = require("../utils/commonControls");

let router = express.Router();
router.route("/teachers").get(isAuthenticated, getAllTeachers);
router
  .route("/addteacher")
  .put(isAuthenticated, authorisedRoles(["Admin", "Teacher"]), AddTeacher);
router
  .route("/teachers/:DEPARTMENT")
  .get(isAuthenticated, authorisedRoles("Admin"), DeptTeachers);
router.route("/loginteacher").put(LoginTeacher);
router.route("/logout").post(isAuthenticated, logoutUser);
router
  .route("/updateteacher")
  .post(isAuthenticated, authorisedRoles(["Teacher", "Admin"]), UpdateTeacher);
router
  .route("/deleteteacher")
  .delete(isAuthenticated, authorisedRoles("Admin"), DeleteTeacher);
router
  .route("/changeteacherpassword")
  .post(isAuthenticated, authorisedRoles(["Teacher", "Admin"]), ChangePassword);
router.route("/password/forget").post(ForgotPassword);
module.exports = router;
