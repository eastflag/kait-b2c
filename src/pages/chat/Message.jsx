import React from 'react';
import { Typography } from "antd";
import moment from 'moment';
import ReactEmoji from 'react-emoji';
import './Message.scss';

const { Text } = Typography;

function Message({ message: { msg, userName, time } = {} }) {
  let isUserSent = false;
  let isAdminSent = false;

  if (userName === 'system') {
    isAdminSent = true;
  } else {
    isUserSent = true;
  }

  return (
    <div className={`msg-container ${isUserSent ? "content-justify-right" : "content-justify-left"}`}>
      <div className="msg-user padding-left-10">
        <Text className="which-user">{isUserSent && !isAdminSent ? "" : userName}</Text>
        <Text className="msg-time">{moment(time).fromNow()}</Text>
      </div>
      <div className={`${isUserSent ? "bg-blue" : ""} ${isAdminSent ? "bg-system" : ""} msg-box`}>
        <Text
          className={`msg-text ${isUserSent || isAdminSent ? "white" : "black"} ${isAdminSent ? "bold" : ""}`}>
          {ReactEmoji.emojify(msg)}
        </Text>
      </div>
    </div>
  );
}

export default Message;
