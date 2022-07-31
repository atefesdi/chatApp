const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000 ",
    methods: ["GET", "POST"],
  },
});


let allUsers = [];
io.on("connection", (socket) => {
  socket.on("join-room", (data) => {
    socket.join(data.room);
    const user = {
      room: data.room,
      username: data.username,
      id: socket.id,
    };
    allUsers.push(user);
    console.log("users =", allUsers);
    console.log(`user with id ${socket.id} join room ${data.room}`);
    socket.to(data.room).emit("join-message", data.username);
  });

  socket.on("send-message", (data) => {
    socket.to(data.room).emit("recive-message", data);
  });

  socket.on("disconnect", () => {
    const disconnectedUser = allUsers.filter((item) => item.id == socket.id);
    const userrr = disconnectedUser.pop();
    const { username, room } = userrr;
    socket.to(room).emit("disconnect-message", username);
  });
});

server.listen(3001, () => {
  console.log("the app is running");
});
