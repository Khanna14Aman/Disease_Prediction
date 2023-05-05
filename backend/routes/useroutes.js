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
  allUsers,
} = require("../Controllers/usercontrollers");
const protect = require("../middleware/usermiddleware");
router.route("/").post(registeruser);
router.route("/login").post(authUser);
router.route("/profile").put(protect, updateUserProfile);
router.route("/verify").post(verifyotp);
router.route("/changepassword").post(changePassword);
router.route("/seeresult").post(seeresult);
router.route("/verify/otpregister").post(verifyotpregister);
router.route("/getalluser").get(protect, allUsers);

module.exports = router;
