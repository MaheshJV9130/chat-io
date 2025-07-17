const { io } = require("socket.io-client");

export const connectSoc = () => {
  const socket = io('http://localhost:8080/')
}
