import React, {useEffect, useState} from 'react';
import {io} from "socket.io-client";
import {notification, Typography} from "antd";
import queryString from "query-string";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import {useDispatch, useSelector} from "react-redux";
import {addMessage, setMessages} from "../../redux/reducers/ChatReducer";
import {jwtUtils} from "../../utils/jwtUtils";

const {Text} = Typography;

let socket;

function Chat({location}) {
  const token = useSelector(state => state.Auth.token);
  const [queryParams, setQueryParams] = useState({});
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    socket = io('/chatServer');

    dispatch(setMessages([]));

    const room = queryString.parse(location.search);
    setQueryParams(room);

    socket.on('message', (msgJson, error) => {
      console.log('message: ', msgJson);
      dispatch(addMessage(msgJson));
    });

    socket.emit('join', {
      userId: jwtUtils.getId(token),
      questionId: room.questionId,
      userName: jwtUtils.getName(token),
      questionName: room.questionName,
      roleName: jwtUtils.getName(token).indexOf('teacher') >= 0 ? 'teacher' : 'user'
    }, (error) => {
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

      <Messages></Messages>
      <ChatInput message={message} setMessage={setMessage} sendMessage={sendMessage}></ChatInput>
    </div>
  );
}

export default Chat;
