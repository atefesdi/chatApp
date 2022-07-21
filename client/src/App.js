import io from "socket.io-client";
import Login from "./components/Login";
import { useState } from "react";
import Chat from "./components/Chat";
import styles from "./App.module.css";

const socket = io.connect("http://localhost:3001");

function App() {
  const [loginFlag, setLoginFlag] = useState(false);
  const [usernameValue, setUsernameValue] = useState();
  const [roomValue, setroomValue] = useState();

  return (
    <div className={styles["app"]}>
      {!loginFlag && (
        <Login
          socket={socket}
          setLoginFlag={setLoginFlag}
          setUsernameValue={setUsernameValue}
          setroomValue={setroomValue}
          usernameValue={usernameValue}
          roomValue={roomValue}
        />
      )}
      {loginFlag && <Chat socket={socket} roomValue={roomValue} usernameValue={usernameValue}/>}
    </div>
  );
}

export default App;
