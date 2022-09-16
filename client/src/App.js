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
  const [notification, setNotification] = useState(0);
  const [notificationUserId, setNotificationUserId] = useState("");
  const [notifArr, setNotifArr] = useState([]);

  function sendNotification(data) {
    if (notifArr.length === 0) {
      setNotifArr([...notifArr, { authorId: data.authorId, counter: 1 }]);
    } else {
      let index = notifArr.findIndex((item) => item.authorId == data.authorId);
      let findNode = notifArr[index];
      if (index >= 0) {
        let newarr = notifArr.filter((item) => item.authorId !== data.authorId);
        findNode = { authorId: data.authorId, counter: findNode.counter + 1 };
        setNotifArr([...newarr, findNode]);
      } else {
        setNotifArr([...notifArr, { authorId: data.authorId, counter: 1 }]);
      }
    }
  }
  socket.on("get-contact", (allUsers) => {
    let newArr = allUsers.filter((item) => item.id !== socket.id);

    setUsers([...users, ...newArr]);
  });

  socket.on("join-message", (user) => {
    let notif = {
      username: user.username,
      Message: `${user.username} join in the room `,
      author: "null",
      authorId: "null",
      id: Math.random(),
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };
    setMessageList([...messageList, notif]);
    setUsers([...users, { username: user.username, id: user.id }]);
  });

  socket.on("disconnect-message", (username) => {
    let notif = {
      username: username,
      Message: `${username} left the room `,
      author: "null",
      authorId: "null",
      id: Math.random(),
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

  socket.on("recive-message", (data) => {
    setNotification(notification + 1);
    setNotificationUserId("public");
    setMessageList([...messageList, data]);
  });

  socket.on("recive-private-message", (data) => {
    sendNotification(data);
    setPrivateMessage([...privateMessage, data]);
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
          setNotification={setNotification}
          notification={notification}
          notificationUserId={notificationUserId}
          notifArr={notifArr}
          setNotifArr={setNotifArr}
        />
      )}
    </div>
  );
}

export default App;
