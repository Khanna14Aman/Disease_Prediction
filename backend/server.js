const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config("./env");
const router = require("./routes/useroutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

const PORT = process.env.PORT;
const cors = require("cors");
const { errorHandler, notFound } = require("./middleware/errormiddleware");
require("./database/connection");
app.use(express.json());
app.use("/user", router);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

app.use(cors());
app.use(notFound);
app.use(errorHandler);

const server = app.listen(PORT, console.log(`Server started on PORT ${PORT}`));

const io = require("socket.io")(server, {
  pingTimeOut: 6000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("user Connected to Socket");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log("User joind room " + userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
