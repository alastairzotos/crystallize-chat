"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatManager = exports.ChatChannel = void 0;
class ChatChannel {
    constructor() {
        this.connections = {};
    }
    addConnection(username, conn) {
        this.connections[username] = conn;
        this.broadcast({
            username,
            eventType: 'join',
        });
        conn.on('message', (data) => {
            this.broadcast({
                username,
                eventType: 'message',
                message: data.toString(),
            });
        });
        conn.on('close', () => {
            this.removeConnection(username);
            this.broadcast({
                username,
                eventType: 'exit',
            });
        });
    }
    removeConnection(username) {
        delete this.connections[username];
    }
    broadcast(message) {
        Object.keys(this.connections).forEach(recipientName => {
            if (recipientName !== message.username) {
                this.connections[recipientName].send(JSON.stringify(message));
            }
        });
    }
}
exports.ChatChannel = ChatChannel;
class ChatManager {
    constructor(wss) {
        this.wss = wss;
        this.channels = {};
        wss.on('connection', (conn, req) => {
            const params = (new URL("https://www.site.com" + req.url)).searchParams;
            const channelName = params.get('channel');
            const username = params.get('username');
            const channel = this.getOrCreateChannel(channelName);
            channel.addConnection(username, conn);
        });
    }
    getOrCreateChannel(name) {
        if (!!this.channels[name]) {
            return this.channels[name];
        }
        const channel = new ChatChannel();
        this.channels[name] = channel;
        return channel;
    }
}
exports.ChatManager = ChatManager;
