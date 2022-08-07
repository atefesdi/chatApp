import { useEffect, useState } from "react";
import Welcome from "./Welcome";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
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

  const [activeStyle, setActiveStyle] = useState(-1);
  const [privatContact, setPrivateContact] = useState({
    flag: false,
    username: "",
  });

  function checkActiveContact(activeContact) {
    console.log("activeContact", activeContact);
    
  }

  return (
    <div className={styles["room-container"]}>
      <div className={styles["contact-container"]}>
        <div className={styles["contact-info"]}>
          <div className={styles["cyrcle-info"]}>
            <PersonOutlineIcon className={styles["user-icon-styles"]} />
          </div>
          <span>{usernameValue}</span>
        </div>
        {users.map((item) => (
          <Contact
            username={item.username}
            socket={socket}
            setPrivateFlag={setPrivateContact}
            key={item.id}
            id={item.id}
            checkActiveContact={checkActiveContact}
            activeStyle={activeStyle}
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
        <Welcome username={usernameValue} />
      )}
    </div>
  );
}
export default Room;
