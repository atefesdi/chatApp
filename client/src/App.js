import io from "socket.io-client";
import Login from "./components/Login";
import { useState, useEffect } from "react";
import styles from "./App.module.css";
import Room from "./components/Room";

const socket = io.connect("http://localhost:3001");

function App() {
  const [loginFlag, setLoginFlag] = useState(false);
  const [usernameValue, setUsernameValue] = useState();
  const [users, setUsers] = useState([]);
  const [privateMessage, setPrivateMessage] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [contactId, setContactId] = useState("");

  socket.on("get-contact", (allUsers) => {
    setUsers([...users, ...allUsers]);
    console.log("all users:", allUsers);
  });
  console.log("users", users);



  socket.on("join-message", (user) => {
    let notif = {
      username: user.username,
      Message: `${user.username} join in the room `,
      author: "null",
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };
    setMessageList([...messageList, notif]);
    setUsers([...users ,{username: user.username , id: user.id }])
  });

  socket.on("disconnect-message", (username) => {
    let notif = {
      username: username,
      Message: `${username} left the room `,
      author: "null",
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };
    setMessageList([...messageList, notif]);
  });


  socket.on("recive-id", (id) => {
    setContactId(id);
  });

  socket.on("recive-private-message", (data) => {
    console.log("recive-private-message", data);
    setPrivateMessage( [ ...data]);
  });

  socket.on("recive-message", (data) => {
    setMessageList([...messageList, data]);
  });

  return (
    <div className={styles["app"]}>
      {!loginFlag && (
        <Login
          socket={socket}
          setLoginFlag={setLoginFlag}
          setUsernameValue={setUsernameValue}
          usernameValue={usernameValue}
        />
      )}
      {loginFlag && (
        <Room
          socket={socket}
          usernameValue={usernameValue}
          users={users}
          setUsers={setUsers}
          contactId={contactId}
          setMessageList={setMessageList}
          messageList={messageList}
          privateMessage={privateMessage}
          setPrivateMessage={setPrivateMessage}
        />
      )}
    </div>
  );
}

export default App;
