
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
    // Handle incoming WebSocket connections
    console.log('Client connected');

    // Example: Send a message to the client
    ws.send('Hello from server!');

    // Example: Handle messages from client
    ws.on('message', function incoming(message) {
        console.log('Received message from client:', message);
    });
});

// Example: Broadcast message to all connected clients
function broadcast(message) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

module.exports = {broadcast}