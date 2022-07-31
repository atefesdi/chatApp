import styles from "./Msg.module.css";

// username, author, room, Message, time;
function Msg(props) {
  let senderStyle = "";
  let containerStyle = "";
  let notifStyle = "";
  let notifContainerStyle = "";

  if (props.username === props.author) {
    senderStyle = styles["you"];
    containerStyle = styles["right"];
  }
  if (props.author === "null") {
    notifContainerStyle = styles["notifContainer"];
    notifStyle = styles["notif"];
  } else {
    senderStyle = styles["another"];
    containerStyle = styles["left"];
  }
  return (
    <div
      className={`${styles["msg-container"]} ${containerStyle} ${notifContainerStyle}`}
    >
      <p className={`${styles["text-container"]} ${senderStyle} ${notifStyle}`}>
        {props.Message}
      </p>
      <div className={styles["meta-text"]}>
        <div>{props.author !== "null"? props.author :""}</div>
        <div>{props.time}</div>
      </div>
    </div>
  );
}

export default Msg;
