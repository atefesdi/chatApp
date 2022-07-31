
import {useState} from "react"
import styles from "./login.module.css"


function Login(props) {

  const {socket , setLoginFlag ,setroomValue ,setUsernameValue , roomValue, usernameValue}= props

  function usernameHandler(event) {
    setUsernameValue(event.target.value);
  }

  function roomHandler(event) {
    setroomValue(event.target.value);
  }

  function joinChatHandler() {
    if (roomValue !== "" && usernameValue !== "") {
      const data= {room:roomValue ,username: usernameValue}
      socket.emit("join-room", data);
      setLoginFlag(true)
    }
  }

  return (
    <div className={styles["container"]}>
      <h1>welcome to messenger</h1>
      <label htmlFor="username">username :</label>
      <input
        id="username"
        name="username"
        type="text"
        onChange={usernameHandler}
      />
      <label htmlFor="room">room:</label>
      <input id="room" name="room" type="text" onChange={roomHandler} />

      <button onClick={joinChatHandler}>join</button>
    </div>
  );
}

export default Login;
