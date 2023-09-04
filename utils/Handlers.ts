import { WebSocket, WebSocketServer } from "ws";
import { sendMessageToMany } from "./Messages";
import Message from "../Classes/Message";
import { addUser, deleteUser } from "./Users";
import { usersMap } from "../@types/All";

export function handleUserConnection(
  server: WebSocketServer,
  socket: WebSocket,
  username: string,
  users: usersMap
) {
  const doIfUserIsNew = () => {
    const message = new Message(
      "user-connect",
      `${username} has been connected`,
      null
    );

    sendMessageToMany(server.clients, message, socket);
  };

  addUser(users, username, doIfUserIsNew);

  // Обработка полученного сообщения
  socket.on("message", (data) => {
    handleUserMessage(server, socket, data.toString(), username);
  });

  socket.on("close", () => {
    handleUserClose(server, socket, username, users);
  });
}

export function handleUserMessage(
  server: WebSocketServer,
  socket: WebSocket,
  data: string,
  username: string
) {
  const message = new Message("user-message", data, username);
  sendMessageToMany(server.clients, message, socket);
}

export function handleUserClose(
  server: WebSocketServer,
  socket: WebSocket,
  username: string,
  users: usersMap
) {
  const callback = () => {
    const message = new Message(
      "user-leave",
      `${username} left the chat`,
      null
    );

    sendMessageToMany(server.clients, message, socket);
  };

  deleteUser(users, username, callback);
}
