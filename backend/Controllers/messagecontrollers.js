const asyncHandler = require("express-async-handler");
const Message = require("../Model/messagemodel");
const User = require("../Model/usermodel");
const Chat = require("../Model/chatmodel");

// getting all message I have with particular user.

const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// for sending messsage to particular user
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
      lastUpdate: Date.now(),
    });

    // if sending message then increase the pendingView of person to whom we sent message
    var updateView = await Chat.findById({ _id: chatId });
    var previousValue = 0;
    if (updateView.pendingView[0].user.toString() !== req.user._id.toString()) {
      previousValue = updateView.pendingView[0].value;
      updateView.pendingView[0].value = previousValue + 1;
    } else {
      previousValue = updateView.pendingView[1].value;
      updateView.pendingView[1].value = previousValue + 1;
    }

    await updateView.save();

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { allMessages, sendMessage };
