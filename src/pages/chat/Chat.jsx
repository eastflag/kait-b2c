import React, {useEffect, useState} from 'react';
import {io} from "socket.io-client";
import {notification, Typography} from "antd";
import queryString from "query-string";
import ChatInput from "./ChatInput";
import Messages from "./Messages";

const {Text} = Typography;

let socket;

function Chat({location}) {
  const [queryParams, setQueryParams] = useState({});
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket = io('/chatServer');

    const room = queryString.parse(location.search);
    setQueryParams(room);

    socket.on('message', (msgJson, error) => {
      console.log('messages: ', messages);
      console.log('message: ', msgJson);

      setMessages([...messages, msgJson ]);
    });

    socket.emit('join', room, (error) => {
      if(error) {
        notification.open({
          message: <span className="error-msg-title">An Error Has Occurred</span>,
          description: error,
          duration: 10,
        });
      }
    });
    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    if(message) {
      socket.emit('message', message);
      setMessage('');
    }
  };

  return (
    <div>
      <div style={{borderBottom: '1px solid #dddddd'}}>
        <Text strong>{queryParams['questionName']}</Text>
      </div>

      <Messages messages={messages}></Messages>
      <ChatInput message={message} setMessage={setMessage} sendMessage={sendMessage}></ChatInput>
    </div>
  );
}

export default Chat;
