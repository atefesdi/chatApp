import { useState } from "react";
import PrivateRoom from "./PrivateRoom";
import styles from "./contact.module.css";

function Contact(props) {

  async function privateMessage() {
  
   await props.socket.emit("send-username" , props.username)
    
    props.setPrivateFlag({flag: true , username:props.username})
  }


  return (
    <div className={styles["contact-container"]} onClick={privateMessage}>
 
      <span>{props.username}</span>
    </div>
  );
}

export default Contact;
