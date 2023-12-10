const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");
const dotenv = require("dotenv");

const app = express();
const port = 4100 || process.env.port;

const users = [{}];

app.use(cors());

app.get("/", (req, res) => {
  res.send("HELL ITS WORKING");
});

const server = http.createServer(app);

const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("New Connection");
  socket.on("joined", ({ user }) => {
    users[socket.id] = user;
    console.log(user);
    socket.broadcast.emit("userJoined", {
      user: "Admin",
      message: `${users[socket.id]} has Joined`,
    });
  });
  socket.emit("welcome", { user: "Admin", message: "Welcome to the cchat." });
  socket.on("message", ({ message, id }) => {
    console.log(message);
    io.emit("sendMessage", { user: users[id], message, id });
  });
  socket.on("disconnect", () => {
    console.log("user left");
    socket.broadcast.emit("leave", {
      user: "Admin",
      message: `${users[socket.id]} has left`,
    });
  });
});

server.listen(port, () => {
  console.log(`server is working on ${port}`);
});
