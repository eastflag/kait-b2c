import React, {useEffect, useState} from 'react';
import {io} from "socket.io-client";
import {notification} from "antd";
import queryString from "query-string";
import {useSelector} from "react-redux";
import {jwtUtils} from "../../utils/jwtUtils";

function Chat({location}) {
  const [queryParams, setQueryParams] = useState({});

  useEffect(() => {
    const room = queryString.parse(location.search);
    console.log(room);
    setQueryParams(room);

    const socket = io('/chatServer');

    socket.emit('join', room, (error) => {
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

  return (
    <div></div>
  );
}

export default Chat;
