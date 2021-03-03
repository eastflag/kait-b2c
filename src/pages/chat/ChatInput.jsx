import React from 'react';
import {Input, Button, Upload} from "antd"

import './ChatInput.scss';

function ChatInput({message, setMessage, sendMessage}) {
  const onChange = async (info) => {
    const reader = new FileReader();
    let bits;
    console.log('info', info);
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      console.log(`${info.file.name} file uploaded successfully`);
      reader.addEventListener('load', (image, cb) => {

        console.log(image.target.result);

      }, false);
      bits = new Blob([JSON.stringify(info.file)], {type: "image/jpeg"});
      const dataFileUrl = reader.readAsDataURL(bits);
      // console.log('dataFileUrl', dataFileUrl);
      // setImage(dataFileUrl);

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
