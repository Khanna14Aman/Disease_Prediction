const express = require("express");
const {
  accessChat,
  setPendingViewZero,
  fetchChats,
} = require("../Controllers/chatcontrollers");
const protect = require("../middleware/usermiddleware");
const router = express.Router();
router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/setZero").put(protect, setPendingViewZero);
module.exports = router;
