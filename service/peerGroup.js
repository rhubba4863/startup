/**
 * Here the WebSocket object is initialized
 */
const { WebSocketServer } = require('ws');
const uuid = require('uuid');

function peerGroup(httpServer){

  // 1) Websocket object
  const wss = new WebSocketServer({ noServer: true });

  // 2) upgrade the HTTP to Websocket
  httpServer.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request);
    });
  });

  // 3) All users connected to message
  let connections = [];

  //4) Forward the Messages
  wss.on('connection', (ws) => {
    const connection = { id: uuid.v4(), alive: true, ws: ws };
    connections.push(connection);

    // Forward messages to everyone except the sender
    ws.on('message', function message(data) {
      connections.forEach((c) => {
        if (c.id !== connection.id) {
          c.ws.send(data);
        }
      });
    });

    // Remove the closed connection so we don't try to forward anymore
    ws.on('close', () => {
      const pos = connections.findIndex((o, i) => o.id === connection.id);

      if (pos >= 0) {
        connections.splice(pos, 1);
      }
    });

    // Respond to pong messages by marking/making the connection alive
    ws.on('pong', () => {
      connection.alive = true;
    });
  });

  // 5) Keep active connections alive
  setInterval(() => {
    //Go through each and check which connections are up/down
    connections.forEach((c) => {
      // Kill any connection that didn't respond to the ping last time
      if (!c.alive) {
        c.ws.terminate();
      } else {
        c.alive = false;
        c.ws.ping();
      }
    });
  }, 10000);
}


//Return the code for use on other pages
module.exports = {peerGroup};