"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatChannel = void 0;
class ChatChannel {
    constructor(channelName, chatDatabase) {
        this.channelName = channelName;
        this.chatDatabase = chatDatabase;
        this.connections = {};
    }
    addConnection(username, conn) {
        if (!!this.connections[username]) {
            return;
        }
        this.chatDatabase.getMessagesForChannel(this.channelName).forEach(message => this.sendMessageToConnection(conn, message));
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
        this.chatDatabase.addMessageToChannel(this.channelName, message);
        Object.values(this.connections).forEach(conn => this.sendMessageToConnection(conn, message));
    }
    sendMessageToConnection(conn, message) {
        conn.send(JSON.stringify(message));
    }
}
exports.ChatChannel = ChatChannel;
