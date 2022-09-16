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
    contactId,
    setMessageList,
    messageList,
    setPrivateMessage,
    privateMessage,
    privatContact,
    notifArr,
    setNotifArr
  } = props



  useEffect(() => {
    socket.on('recive-private-message', data => {
      let newArr = notifArr.filter(item => item.authorId !== data.authorId)
      setNotifArr(newArr)
    })
  }, [notifArr  , setNotifArr])


  

  console.log('notifArr', notifArr)

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
        authorId: socket.id,
        contactId: contactId,
        id: Math.random(),
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
    }
  }

  return (
    <div className={styles['chat-container']}>
      <div className={styles['chat-header']}>
        <h3>{privatContact.username}</h3>
      </div>
      <ScrollToBottom className={styles['chat-body']}>
        {props.privatContact.username === 'public'
          ? messageList.map(item => (
              <Msg
                username={usernameValue}
                Message={item.Message}
                authorId={item.authorId}
                author={item.author}
                id={item.id}
                time={item.time}
                key={Math.random()}
                socket={socket}
              />
            ))
          : privateMessage.map(item => (
              <Msg
                username={usernameValue}
                Message={item.Message}
                authorId={item.authorId}
                author={item.author}
                id={item.id}
                time={item.time}
                key={Math.random()}
                socket={socket}
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
      </div>
    </div>
  )
}

export default Chat
