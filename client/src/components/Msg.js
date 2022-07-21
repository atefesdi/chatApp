import styles from "./Msg.module.css";

function Msg(props) {

    let senderStyle = ""
    let containerStyle=""
    if(props.username === props.author){
        senderStyle=styles["you"]
        containerStyle=styles["right"]
    }else{
        senderStyle=styles["another"]
        containerStyle=styles["left"]
    }
  return (
    <div className={`${styles["msg-container"]} ${containerStyle}`}>
      <p className={`${styles["text-container"]} ${senderStyle}`}>{props.Message}</p>
      <div className={styles["meta-text"]}>
        <div>{props.author}</div>
        <div>{props.time}</div>
      </div>
    </div>
  );
}

export default Msg;
