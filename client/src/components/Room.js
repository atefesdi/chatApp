import { useEffect, useState } from "react";
import styles from "./room.module.css";
import Chat from "./Chat";
import Contact from "./Contact";

function Room(props) {
  const { socket, roomValue, usernameValue, users } = props;
 

console.log('users in room', users)

  return (
    <div className={styles["room-container"]}>
      <div className={styles["contact-container"]}>
        <div className={styles["contact-info"]}>
          <div className={styles["cyrcle-info"]}></div>
          <span>{usernameValue}</span>
        </div>
        {users.map((item) => (
          <Contact room={item.room} username={item.username} />
        ))}
      </div>
      <Chat
        socket={socket}
        roomValue={roomValue}
        usernameValue={usernameValue}

      />
    </div>
  );
}
export default Room;
