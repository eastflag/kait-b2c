import React, {useEffect} from 'react';
import Message from "./Message";

import './Messages.scss';
import {useSelector} from "react-redux";

function Messages() {
  const messages = useSelector(state => state.Chat.messages);

  useEffect(() => {
    const messagesSelector = document.querySelector('.messages');
    messagesSelector.scrollTop = messagesSelector.scrollHeight;
  }, [messages]);

  return (
    <div className="messages">
      {
        messages.map((message, index) => <Message key={index} message={message}/>)
      }
    </div>
  );
}

export default Messages;
