const form = document.getElementById("form");
const input = document.getElementById("message");
const exitButton = document.getElementById("exit-button");
const loader = document.getElementById("loader");
const main = document.getElementById("main");

const ws = new WebSocket(
  `ws://${document.location.hostname}:4001?name=${username}`
);

disableMain();

ws.addEventListener("open", (event) => {
  // Соединение с сервером налажено
  console.log("connection established");
  enableMain();
});

ws.addEventListener("close", (event) => {
  // Соединение с сервером закрыто
  console.log("connection closed");
  disableMain();
});

ws.addEventListener("error", (event) => {
  // Ошибка при соединении с сервером
  console.log("ERROR: connection failed");
});

ws.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);
  console.log(data);

  // Если подключился новый пользователь
  if (data.type === "user-connect") {
    addServerMessage(data.payload);
  }

  // Если пришло новое сообщение
  if (data.type === "user-message") {
    console.log(`${data.author}: ${data.payload}`);
    addMessage(data.author, data.payload);
  }

  if (data.type === "user-leave") {
    addServerMessage(data.payload);
  }

  if (data.type === "message-history") {
    const messages = JSON.parse(data.payload);

    messages.forEach((message) => addMessage(message.author, message.payload));
  }
});

exitButton.addEventListener("click", () => {
  localStorage.removeItem("username");
  window.location.replace("/login");
});

form.addEventListener("submit", sendMessage);

function disableMain() {
  main.style.display = "none";
  loader.style.display = "block";
}

function enableMain() {
  main.style.display = "flex";
  loader.style.display = "none";
}

function sendMessage() {
  const text = input.value;
  console.log(`sending message to server: "${text}"`);
  ws.send(text);
  input.value = "";

  addMessage(username, text);
}

function addMessage(author, payload) {
  const authorDiv = document.createElement("p");
  authorDiv.textContent = author === username ? "you" : author;
  authorDiv.className = "author";

  const textDiv = document.createElement("p");
  textDiv.textContent = payload;
  textDiv.className = "text";

  const container = document.createElement("div");
  container.className = "message";

  container.appendChild(authorDiv);
  container.appendChild(textDiv);

  const messages = document.getElementById("messages");
  messages.appendChild(container);
}

function addServerMessage(payload) {
  const container = document.createElement("div");
  container.className = "server-message";
  const textDiv = document.createElement("p");
  textDiv.textContent = payload;
  textDiv.className = "text";

  container.appendChild(textDiv);

  const messages = document.getElementById("messages");
  messages.appendChild(container);
}
