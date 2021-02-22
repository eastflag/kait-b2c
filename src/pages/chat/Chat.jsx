import React, {useContext, useEffect, useState} from 'react';
import {notification, Typography} from "antd";
import queryString from "query-string";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import {useDispatch, useSelector} from "react-redux";
import {addMessage, setMessages} from "../../redux/reducers/ChatReducer";
import {jwtUtils} from "../../utils/jwtUtils";
import api from "../../utils/api";
import {SocketContext} from "../../context/socket";

const {Text} = Typography;

let socket;

function Chat({location}) {
  const token = useSelector(state => state.Auth.token);
  const [questionId, setQuestionId] = useState('');
  const [questionName, setQuestionName] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const socket = useContext(SocketContext);

  useEffect(() => {
    // {questionId, questionName}
    const {questionId, questionName} = queryString.parse(location.search);
    setQuestionId(questionId);
    setQuestionName(questionName);

    socket.on('message', (msgJson, error) => {
      console.log('message: ', msgJson);
      dispatch(addMessage({questionId, message: msgJson}));
    });

    getChatHistory(questionId);

    socket.emit('join', {
      userId: jwtUtils.getId(token),
      questionId: questionId,
      userName: jwtUtils.getName(token),
      questionName: questionName,
      roleName: jwtUtils.getRoles(token).indexOf('teacher') >= 0 ? 'teacher' : 'user'
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
      socket.off('message');
      socket.emit('leave', {questionId});
    };
  }, [socket]);

  const getChatHistory = async (questionId) => {
    const {data} = await api.get(`/api/chat/chatHistory?questionId=${questionId}`);
    console.log(data);

    dispatch(setMessages({questionId, messages: data}));
  }

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
        <Text strong>{questionName}</Text>
      </div>

      <Messages questionId={questionId}></Messages>
      <ChatInput message={message} setMessage={setMessage} sendMessage={sendMessage}></ChatInput>
    </div>
  );
}

export default Chat;
