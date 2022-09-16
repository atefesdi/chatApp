import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { Socket } from "socket.io-client";
import styles from "./privateRoom.module.css";

function PrivateRoom(props) {
  const { socket, setOpenWindow , username } = props;

  const [message, setMessage] = useState();

  function closeWindow() {
    setOpenWindow(false);
    console.log("bbbb");
  }

  function writeMessage(event) {
    setMessage(event.target.value);
  }

  function sendPrivateMessage() {
    socket.on("private-sending-message", () => {
        socket.emit("private-messaging" , {message ,username})
    });
  }
  return (
    <div className={styles["private-chat-container"]}>
      <div className={styles["header-private-message"]}>
        <p>{props.username}</p>
        <div className={styles["icons"]} onClick={closeWindow}>
          <CloseIcon />
        </div>
      </div>
      <div className={styles["message-container"]}></div>
      <div className={styles["write-message-container"]}>
        <input placeholder="send message..." onChange={writeMessage} />
        <button onClick={sendPrivateMessage}>send</button>
      </div>
    </div>
  );
}
export default PrivateRoom;
