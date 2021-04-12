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

function Chat({location, history}) {
  const token = useSelector(state => state.Auth.token);
  const [questionId, setQuestionId] = useState('');
  const [questionName, setQuestionName] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const socket = useContext(SocketContext);

  useEffect(() => {
    if (!socket) {
      return;
    }
    // {questionId, questionName}
    const {questionId, questionName} = queryString.parse(location.search);
    setQuestionId(questionId);
    setQuestionName(questionName);

    socket.on('message', (msgJson, error) => {
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
      socket.emit('message', {
        type: 'text',
        msg: message
      });
      setMessage('');
    }
  };

  const sendImage = (id) => {
    socket.emit('message', {
      type: 'image',
      msg: id.toString()
    });
  }

  const setChatHistory = async () => {
    const {data} = await api.put(`/api/chat/chatHistory?questionId=${questionId}`);
    // isClear 세팅후 방 나가기 및 메시지 처리
    notification.open({
      message: <span className="error-msg-title">완료 처리</span>,
      description: "해당 학생 방을 완료 처리하였습니다.,",
      duration: 3,
    });
    history.goBack();
  }

  return (
    <div>
      <div style={{borderBottom: '1px solid #dddddd'}}>
        <Text strong>{questionName}</Text>
      </div>

      <Messages questionId={questionId}></Messages>
      <ChatInput message={message} setMessage={setMessage} sendMessage={sendMessage} sendImage={sendImage}
        setChatHistory={setChatHistory}></ChatInput>
    </div>
  );
}

export default Chat;
