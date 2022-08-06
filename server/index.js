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

let allUsers = [{ username: "public", id: "public" }];
let privateData = [];
io.on("connection", (socket) => {
  socket.on("join-room", (data) => {
    const user = {
      username: data.username,
      id: socket.id,
    };
    console.log('data', user)
    allUsers.push(user);
    socket.broadcast.emit("join-message", user);
    socket.emit("get-contact", allUsers);
  });

  // socket.emit("get-contact", allUsers);

  // socket.on("send-message", (data) => {
  //   console.log("public data", data);
  //   socket.broadcast.emit("recive-message", data);
  // });
  socket.on("send-username", (username) => {
    const user = allUsers.filter((item) => item.username === username);
    let userId = user.pop();
    console.log( userId?.id);
    socket.emit("recive-id", userId?.id);
  });

  socket.on("send-message", (data ) => {
    privateData.push(data);
    console.log('data.id', data.id)

    if (data.contactId == "public") {
      socket.broadcast.emit("recive-message", data);
      console.log("public");
    } else {
      socket.to(data.contactId).emit("recive-private-message", privateData );
      // socket.emit("recive-private-message", privateData);
    }
  });
  socket.on("disconnect", () => {
    const disconnectedUser = allUsers.filter((item) => item.id == socket.id);
    allUsers = allUsers.filter((item) => socket.id !== item.id);
    const userrr = disconnectedUser.pop();

    socket.broadcast.emit("disconnect-message", userrr?.username);
  });
});

server.listen(3001, () => {
  console.log("the app is running");
});
