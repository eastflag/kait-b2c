import React from 'react';
import {io} from "socket.io-client";

export const socketCreator = () => {
  return io('/chatServer');
}
export const SocketContext = React.createContext();
