import { useState } from "react";
import styles from "./login.module.css";

function Login(props) {
  const {
    socket,
    setLoginFlag,
    setUsernameValue,
    usernameValue,
  } = props;

  function usernameHandler(event) {
    setUsernameValue(event.target.value);
  }

  function joinChatHandler() {
    if (usernameValue !== "") {
      const data = { username: usernameValue };
      socket.emit("join-room", data);
      setLoginFlag(true);
    }
  }
  return (
    <div className={styles["container"]}>
      <h1>welcome to messenger</h1>
      <label htmlFor="username">username:</label>
      <input
        id="username"
        name="username"
        type="text"
        onChange={usernameHandler}
      />

      <button onClick={joinChatHandler}>join</button>
    </div>
  );
}

export default Login;
