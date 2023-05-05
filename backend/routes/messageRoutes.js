const express = require("express");
const {
  allMessages,
  sendMessage,
} = require("../controllers/messagecontrollers");
const protect = require("../middleware/usermiddleware");

const router = express.Router();

router.route("/:chatId").get(protect, allMessages);
router.route("/").post(protect, sendMessage);

module.exports = router;
