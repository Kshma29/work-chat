import {io} from 'socket.io-client';
import react from 'react';
const SOCKET_URL="http://localhost:5001";
export const socket=io(SOCKET_URL);
export const AppContext=react.createContext();