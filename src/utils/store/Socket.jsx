import React from 'react';
import { io } from 'socket.io-client'


const SocketContext = React.createContext(null)

// export const SocketContext