const asyncHandler = require("express-async-handler");
const Chat = require("../Model/chatmodel");
const User = require("../Model/usermodel");

// fetch all one-to-one chat with particular user
const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }
  var isChat = await Chat.find({
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });
  if (isChat.length > 0) {
    res.json(isChat[0]);
  } else {
    var chatData = {
      users: [req.user._id, userId],
      pendingView: [
        {
          user: req.user._id,
        },
        { user: userId },
      ],
    };
    const createdChat = await Chat.create(chatData);
    const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
      "users",
      "-password"
    );
    res.json(FullChat);
  }
});

// fetching all the chat we have done with users
const fetchChats = asyncHandler(async (req, res) => {
  try {
    Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
      lastUpdate: { $gt: 0 },
    })
      .populate("users", "-password")
      .populate("latestMessage")
      .sort({ lastUpdate: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// setting our pendingView to 0 for particular chat because we seen all message
const setPendingViewZero = asyncHandler(async (req, res) => {
  const { chatId } = req.body;
  if (!chatId) {
    throw new Error("Please provide ChatId");
  }

  var setView = await Chat.findById({ _id: chatId });
  if (!setView) {
    throw new Error("Chat not found");
  }

  if (setView.pendingView[0].user.toString() === req.user._id.toString()) {
    setView.pendingView[0].value = 0;
  } else {
    setView.pendingView[1].value = 0;
  }
  await setView.save();
  res.json({ message: "done" });
});

module.exports = { accessChat, fetchChats, setPendingViewZero };
