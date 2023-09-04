import Express from "express";
import { WebSocketServer } from "ws";
import { handleUserConnection } from "./utils/Handlers";
import { parseUsernameFromQuery } from "./utils/Parsers";

import { usersMap } from "./@types/All";

const SERVER_PORT = 4000;
const WS_PORT = 4001;

const wss = new WebSocketServer({
  port: WS_PORT,
});

const users: usersMap = new Map();

wss.on("connection", (ws, req) => {
  const username = parseUsernameFromQuery(req.url);

  if (!username) {
    ws.close();
    return;
  }

  handleUserConnection(wss, ws, username, users);
});

const app = Express();

app.use(Express.static("public"));

app.listen(SERVER_PORT, () => {
  console.log(`server is listening on ${SERVER_PORT}...`);
});
