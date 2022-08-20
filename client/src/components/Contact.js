import { useEffect, useState } from "react";
import PrivateRoom from "./PrivateRoom";
import styles from "./contact.module.css";
import { style } from "@mui/system";

function Contact(props) {
  const { activeStyle, checkActiveContact, notifArr, setNotifArr } = props;

  const [activeClass, setActiveClass] = useState();
  const [currentNode, setCurrentNode] = useState();

  let active = "";
  if (activeStyle == props.id) {
    active = styles["active"];
  } else {
    active = styles[""];
  }

  useEffect(() => {
    let node = notifArr.filter((item) => props.id == item.authorId);
    let newNode = node.pop();
    setCurrentNode(newNode);
  }, [notifArr]);

  async function privateMessage() {
    await props.socket.emit("send-username", props.username);
    checkActiveContact(props.id);
    props.setPrivateFlag({ flag: true, username: props.username });
    props.checkActiveContact(props.id);

    let newArr = notifArr.filter((item) => item.authorId !== props.id);
    setNotifArr(newArr);
  }

  return (
    <div
      className={`${styles[`contact-container`]} ${active}`}
      onClick={privateMessage}
    >
      <span className={styles[`${activeClass}`]}>{props.username}</span>
      {!!currentNode && (
        <span className={styles["notif"]}>{currentNode?.counter}</span>
      )}
    </div>
  );
}

export default Contact;
