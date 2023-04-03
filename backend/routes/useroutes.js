const express = require("express");
const router = express.Router();
const {
  registeruser,
  authUser,
  updateUserProfile,
  verifyotp,
  changePassword,
  seeresult,
  verifyotpregister,
} = require("../Controllers/usercontrollers");
const protect = require("../middleware/usermiddleware");
router.route("/").post(registeruser);
router.route("/login").post(authUser);
router.route("/profile").post(protect, updateUserProfile);
router.route("/verify").post(verifyotp);
router.route("/changepassword").post(changePassword);
router.route("/seeresult").post(seeresult);
router.route("/verify/otpregister").post(verifyotpregister);

module.exports = router;
