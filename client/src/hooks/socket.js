import React, { useContext } from 'react'
import socketio from "socket.io-client";

export const socket = socketio.connect();
export const SocketContext = React.createContext();
export const useSocket = () => {
    return useContext(SocketContext)
}