import { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import styles from "./chat.module.css";
import Msg from "./Msg";

function Chat(props) {
  const [Message, setMessage] = useState();
  const [messageList, setMessageList] = useState([]);
  const [peopleJoinRoom, setPeopleJoinRoom] = useState("");
  const { socket, roomValue, usernameValue } = props;

  useEffect(() => {
    socket.on("recive-message", (data) => {
      setMessageList([...messageList, data]);
    });
    socket.on("join-message", (username) => {
      console.log(`someone join in the room ${username}`);
      let notif = {
        username: username,
        Message: `${username} join in the room `,
        room: "null",
        author: "null",
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      setMessageList([...messageList, notif]);
    });

    socket.on("disconnect-message", (username)=>{
      console.log('text' , username)
      let notif = {
        username: username,
        Message: `${username} left room `,
        room: "null",
        author: "null",
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      setMessageList([...messageList, notif]);
    })
  }, [socket, messageList]);

  function msgHandler(event) {
    setMessage(event.target.value);
  }

  function enterHandler(event) {
    if (event.key == "Enter") {
      if (Message !== "") {
        sendHandler();
        setMessage("");
      }
    }
  }

  async function sendHandler() {
    if (Message !== "") {
      const messageData = {
        room: roomValue,
        Message: Message,
        author: usernameValue,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send-message", messageData);
      setMessageList([...messageList, messageData]);
    }
  }

  return (
    <div className={styles["chat-container"]}>
      <div className={styles["chat-header"]}></div>
      <ScrollToBottom className={styles["chat-body"]}>
        {messageList.map((item) => (
          <Msg
            username={usernameValue}
            Message={item.Message}
            author={item.author}
            time={item.time}
            room={item.room}
            key={Math.random()}
          />
        ))}
      </ScrollToBottom>
      <div className={styles["chat-footer"]}>
        <input
          type="text"
          placeholder="type message..."
          onChange={msgHandler}
          onKeyUp={enterHandler}
          value={Message}
        />
        <button onClick={sendHandler}>send</button>
      </div>
    </div>
  );
}

export default Chat;
