const mu = require("../lib/mongo")

function getMessages() {
  return mu.conn().then((client) => {
    return client.db('chatdb').collection('msgs').find({}).toArray();
  });
}

function insertMessage(msg) {
  return mu.conn().then((client) => {
    return client.db('chatdb').collection('msgs').insertOne(msg); // Si no se provee un ID, este será generado automáticamente
  });
}


module.exports = [getMessages, insertMessages];