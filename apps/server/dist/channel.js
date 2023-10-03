"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatChannel = void 0;
class ChatChannel {
    constructor() {
        this.connections = {};
    }
    addConnection(username, conn) {
        if (!!this.connections[username]) {
            return;
        }
        this.connections[username] = conn;
        this.broadcast({
            username,
            eventType: 'join',
        });
        conn.on('message', (buffer) => {
            this.broadcast({
                username,
                eventType: 'message',
                message: buffer.toString(),
            });
        });
        conn.on('close', () => {
            delete this.connections[username];
            this.broadcast({
                username,
                eventType: 'exit',
            });
        });
    }
    broadcast(message) {
        Object.values(this.connections).forEach(conn => conn.send(JSON.stringify(message)));
    }
}
exports.ChatChannel = ChatChannel;
