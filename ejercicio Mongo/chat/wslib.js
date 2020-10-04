const WebSocket = require("ws");
const { response } = require("./app");
const Model = require("./models/client")
const mongo = require("./controllers/mongo");

const clients = [];
const messages = [];

const wsConnection = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    clients.push(ws);
    sendMessages();

    ws.on("message", (message) => {
      let msg = JSON.parse(message)
      messages.push(msg);
      mongo.insertMessage(msg).then((response) => {
        sendMessages();
      })
      
    });
  });

  const sendMessages = () => {
    clients.forEach((client) => client.send(JSON.stringify(messages)));
  };
};

exports.wsConnection = wsConnection;