const express = require("express");
const {
  accessChat,
  accessChatDeveloper,
  fetchChats,
} = require("../controllers/chatcontrollers");
const protect = require("../middleware/usermiddleware");
const router = express.Router();
router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
module.exports = router;
