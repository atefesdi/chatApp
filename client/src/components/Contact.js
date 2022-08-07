import { useState } from "react";
import PrivateRoom from "./PrivateRoom";
import styles from "./contact.module.css";
import { style } from "@mui/system";

function Contact(props) {
  const { activeStyle } = props;

  const [activeClass , setActiveClass] = useState()




  async function privateMessage() {
    await props.socket.emit("send-username", props.username);
    // setActiveContact(props.socket.id)
    props.setPrivateFlag({ flag: true, username: props.username });
    props.checkActiveContact(props.id);

  }

  return (
    <div className={styles[`contact-container`] }  onClick={privateMessage}>
      <span className={styles[`${activeClass}`]}>{props.username}</span>
    </div>
  );
}

export default Contact;
