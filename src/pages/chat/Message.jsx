import React from 'react';
import { Typography } from "antd";
import moment from 'moment';
import ReactEmoji from 'react-emoji';
import './Message.scss';
import {jwtUtils} from "../../utils/jwtUtils";
import {useSelector} from "react-redux";

const { Text } = Typography;

function Message({ message: { msg, userName, userId, time, roleName } = {} }) {
  const token = useSelector(state => state.Auth.token);

  let isUserSent = false;
  let isTeacherSent = false;

  if (userId == jwtUtils.getId(token)) {
    isUserSent = true;
  }

  if (roleName === 'teacher') {
    isTeacherSent = true;
  }

  return (
    <div className={`msg-container ${isUserSent ? "content-justify-right" : ""}`}>
      <div className={`${isUserSent ? "bg-me" : (isTeacherSent ? "bg-teacher" : "bg-other")} msg-box`}>
        <Text
          className={`msg-text ${isUserSent || isTeacherSent ? "white" : "black"} ${isTeacherSent ? "bold" : ""}`}>
          {ReactEmoji.emojify(msg)}
        </Text>
      </div>
      <div className="msg-user">
        <Text className="which-user">{isUserSent ? "나" : (isTeacherSent ? roleName : userName)}</Text>
        <Text className="msg-time">{moment(time).fromNow()}</Text>
      </div>
    </div>
  );
}

export default Message;
