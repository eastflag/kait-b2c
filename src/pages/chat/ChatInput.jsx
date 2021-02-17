import React from 'react';
import {Input, Button} from "antd"

import './ChatInput.scss';

function ChatInput({message, setMessage, sendMessage}) {
  return (
    <form className="form">
      <Input
        size="large"
        className="message-input"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={({ target: { value } = {} }) => setMessage(value)}
        onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
      />
      <Button
        onClick={e => sendMessage(e)}
        className="send-message"
        type="primary"
        size="large"
      >
        Send
      </Button>
    </form>
  );
}

export default ChatInput;
