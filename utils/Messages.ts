import Message from "../Classes/Message";
import { WebSocket } from "ws";

export function sendMessageToMany(
  clients: Set<WebSocket>,
  message: Message,
  exept: WebSocket
) {
  // TODO: Переделать
  const clientsArray = Array.from(clients);
  const receivers = clientsArray.filter((client) => client !== exept);
  receivers.forEach((client) => client.send(message.toString()));
}

export function sendMessageToOne(client: WebSocket, message: Message) {
  client.send(message.toString());
}
