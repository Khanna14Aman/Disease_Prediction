const express = require("express");
const router = express.Router();
const {
  registeruser,
  authUser,
  updateUserProfile,
  verifyotp,
  changePassword,
  seeresult,
} = require("../Controllers/usercontrollers");
const protect = require("../middleware/usermiddleware");
router.route("/").post(registeruser);
router.route("/login").post(authUser);
router.route("/profile").post(protect, updateUserProfile);
router.route("/verify").post(verifyotp);
router.route("/changepassword").post(changePassword);
router.route("/seeresult").post(seeresult);

module.exports = router;
