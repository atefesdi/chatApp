import { useEffect } from "react";
import styles from "./Msg.module.css";


function Msg(props) {

  const {setNotification , notification} = props;

   
    // console.log('notification', notification)
  
    // if(notification > 0){

    //   setNotification(notification -1)
    // }
    // console.log('notification', notification)


  let senderStyle = "";
  let containerStyle = "";
  let notifStyle = "";
  let notifContainerStyle = "";


  if (props.authorId === props.socket.id) {
    senderStyle = styles["you"];
    containerStyle = styles["right"];
  } else {
    senderStyle = styles["another"];
    containerStyle = styles["left"];
  }

    if (props.author === "null") {
    notifContainerStyle = styles["notifContainer"];
    notifStyle = styles["notif"];
  }

  // useEffect(()=>{

    // let newNotif = notification.filter(item => item.id != props.id)
    // console.log('newNotif', newNotif)
  // }, [notification])

    return (
      <div
        className={`${styles["msg-container"]} ${containerStyle} ${notifContainerStyle}`}
      >
        <p
          className={`${styles["text-container"]} ${senderStyle} ${notifStyle}`}
        >
          {props.Message}
        </p>
        <div className={styles["meta-text"]}>
          <div>{props.author != "null" ? props.author : ""}</div>
          <div>{props.time}</div>
        </div>
      </div>
    );
}

export default Msg;
