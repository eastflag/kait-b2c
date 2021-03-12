import React from 'react';
import {Input, Button, Upload} from "antd"

import './ChatInput.scss';

function ChatInput({message, setMessage, sendMessage, sendImage}) {
  const onChange = async (info) => {
    console.log('info', info);
    // file이 업로드가 되면 info.file.status가 uploading
    // info.file.percent 에 진행상황이 퍼센트로 표시 percent: 99
    // 완료되면 info.file.status === done
    // info.file.response에 리턴 결과 표시

    if (info.file.status !== 'uploading') {
      // show loading bar
      console.log('show loading bar');
    }
    if (info.file.status === 'done') {
      // get response: info.file.response.data 에 이미지 아이디가 리턴된다.
      sendImage(info.file.response.data);

    } else if (info.file.status === 'error') {
      console.log(`${info.file.name} file upload failed.`);
    }
  }

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
      <Upload
        name="chat-image"
        action="/api/image/upload"
        showUploadList={false}
        onChange={onChange}
      >
        <Button size="large" className="upload-button">Upload</Button>
      </Upload>
    </form>
  );
}

export default ChatInput;
