import React from 'react'
import { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import styles from './chat.module.css'
import Msg from './Msg'

function Chat (props) {
  const [Message, setMessage] = useState()
  const {
    socket,
    usernameValue,
    setUsers,
    users,
    contactId,
    setMessageList,
    messageList,
    setPrivateMessage,
    privateMessage
  } = props
  console.log('privateMessage', privateMessage)

  function msgHandler (event) {
    setMessage(event.target.value)
  }

  function enterHandler (event) {
    if (event.key == 'Enter') {
      if (Message !== '') {
        sendHandler()
        setMessage('')
      }
    }
  }

  async function sendHandler () {
    if (Message !== '') {
      const messageData = {
        Message: Message,
        author: usernameValue,
        contactId: contactId,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes()
      }
      await socket.emit('send-message', messageData)
      if (props.privatContact.username === 'public') {
        setMessageList([...messageList, messageData])
      } else {
        setPrivateMessage([...privateMessage, messageData])
      }
      // }else {
      //   console.log("private conditions")
      //   const messageData = {
      //     Message: Message,
      //     author: usernameValue,
      //     id: contactId,
      //     time:
      //       new Date(Date.now()).getHours() +
      //       ':' +
      //       new Date(Date.now()).getMinutes()
      //   }
      //   await socket.emit("send-private-message", messageData)
      //   setPrivateMessage([...privateMessage , messageData])
      // }
    }
  }

  return (
    <div className={styles['chat-container']}>
      <div className={styles['chat-header']}></div>
      <ScrollToBottom className={styles['chat-body']}>
        {//  props.id === "public"?
        props.privatContact.username === 'public'
          ? messageList.map(item => (
              <Msg
                username={usernameValue}
                Message={item.Message}
                author={item.author}
                time={item.time}
                key={Math.random()}
              />
            ))
          : privateMessage.map(item => (
              <Msg
                username={usernameValue}
                Message={item.Message}
                author={item.author}
                time={item.time}
                key={Math.random()}
              />
            ))}
      </ScrollToBottom>
      <div className={styles['chat-footer']}>
        <input
          type='text'
          placeholder='type message...'
          onChange={msgHandler}
          onKeyUp={enterHandler}
          value={Message}
        />
        <button onClick={sendHandler}>send</button>
        {/* <Button title="Send" onClick={sendHandler} color="" /> */}
      </div>
    </div>
  )
}

export default Chat

// interface ButtonProps {
//   title: String;
//   onClick(): void;
//   color: "primary" | "secondary" |'Asghar';
//   private?:boolean
// }

// function Button(props: ButtonProps) {
//   const {private=false}=props;
//   console.log('private', private)
//   return (
//     <button
//       onClick={props.onClick}
//       style={{ color: props.color == "primary" ? "#f06" : "#0ff" }}
//     >
//       {" "}
//       {props.title}
//     </button>
//   );
// }
