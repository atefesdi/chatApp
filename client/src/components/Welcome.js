import styles from "./welcome.module.css"
import React from "react";


function Welcome(props) {
  const {username} = props
  return (
    <div className={styles["container"]}>
      <h1>Hi, {username}</h1>
      <h3>Welcome to Messenger</h3>
    </div>
  );
}

export default Welcome;


