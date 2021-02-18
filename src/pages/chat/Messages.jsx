import React, {useEffect, useState} from 'react';
import Message from "./Message";

import './Messages.scss';
import {useSelector} from "react-redux";

function Messages({questionId}) {
  const total_messages = useSelector(state => state.Chat.total_messages);
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const room = total_messages.find(item => item.questionId === questionId);
    console.log(room);
    if (room) {
      setMessages(room.messages);
    }
  }, [total_messages])

  useEffect(() => {
    const messagesSelector = document.querySelector('.messages');
    messagesSelector.scrollTop = messagesSelector.scrollHeight;
  }, [total_messages]);

  return (
    <div className="messages">
      {
        messages.map((message, index) => <Message key={index} message={message}/>)
      }
    </div>
  );
}

export default Messages;
