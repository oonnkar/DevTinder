import { io } from "socket.io-client";
import { BACKEND_API } from "./constants";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(BACKEND_API);
  } else {
    return io("/", {
      path: "/api/socket.io",
    });
  }
};
