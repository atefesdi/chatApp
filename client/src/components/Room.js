import { useEffect, useState } from "react";
import Welcome from "./Welcome";
import styles from "./room.module.css";
import Chat from "./Chat";
import Contact from "./Contact";

function Room(props) {
  const {
    socket,
    usernameValue,
    setUsers,
    users,
    setMessageList,
    contactId,
    messageList,
    setPrivateMessage,
    privateMessage,
  } = props;
  
  const [activeContact , setActiveContact ] = useState(false)
  const [privatContact, setPrivateContact] = useState({
    fals: false,
    username: "",
  });

  return (
    <div className={styles["room-container"]}>
      <div className={styles["contact-container"]}>
        <div className={styles["contact-info"]}>
          <div className={styles["cyrcle-info"]}></div>
          <span>{usernameValue}</span>
        </div>
        {users.map((item) => (
          <Contact
            username={item.username}
            socket={socket}
            setPrivateFlag={setPrivateContact}
            key={item.id}
            setActiveContact={setActiveContact}
          />
        ))}
      </div>
      {privatContact.flag ? (
        <Chat
          socket={socket}
          usernameValue={usernameValue}
          privatContact={privatContact}
          setUsers={setUsers}
          users={users}
          setMessageList={setMessageList}
          contactId={contactId}
          messageList={messageList}
          privateMessage={privateMessage}
          setPrivateMessage={setPrivateMessage}
        />
      ) : (
        <Welcome />
      )}
    </div>
  );
}
export default Room;
