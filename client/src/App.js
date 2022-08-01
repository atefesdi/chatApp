import io from "socket.io-client";
import Login from "./components/Login";
import { useState , useEffect } from "react";
import Chat from "./components/Chat";
import styles from "./App.module.css";
import Room from "./components/Room";

const socket = io.connect("http://localhost:3001");

function App() {
  const [loginFlag, setLoginFlag] = useState(false);
  const [usernameValue, setUsernameValue] = useState();
  const [roomValue, setroomValue] = useState();
  const [users, setUsers] = useState([]);

  useEffect(()=>{

      socket.on("get-contact", (allUsers) => {
        if (roomValue === allUsers[0]?.room) {
          setUsers([...allUsers]);
        }
        console.log("all users:" , allUsers)
      });
    
      console.log(users , "dddddd")
  },[loginFlag])



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
      {loginFlag && (
        <Room
          socket={socket}
          roomValue={roomValue}
          usernameValue={usernameValue}
          users={users}
        />
      )}
    </div>
  );
}

export default App;
