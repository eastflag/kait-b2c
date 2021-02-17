import React, {useEffect} from 'react';
import Message from "./Message";

import './Messages.scss';

function Messages({messages}) {
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
