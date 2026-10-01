import { io } from "socket.io-client";
import { BACKEND_API } from "./constants";


export const createSocketConnection = () => { 
    return io(BACKEND_API)
}